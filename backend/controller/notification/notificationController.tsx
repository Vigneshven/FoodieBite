import { subscribeToNotification } from "@/backend/lib/notificationPubSub";
import {
  countUnReadNotification,
  findLastestNotificationId,
  findNewNotifications,
  findNotifications,
  markNotificationAsRead,
} from "@/backend/model/notification/notificationModel";
import {
  errorResponse,
  successResponse,
} from "@/backend/utils/api/apiResponse";
import type { Request, Response } from "express";

export async function streamNotification(
  req: Request,
  res: Response,
): Promise<void> {
  const lastNotificationId = await findLastestNotificationId(req.id);

  let lastSentId = lastNotificationId;
  let isPolling = false;
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache , no-transform");
  res.setHeader("Connection", "keep-alive");

  res.flushHeaders();
  res.write("retry: 5000\n\n");

  res.write(
    `event: connected\ndata: ${JSON.stringify({
      message: "Notification stream connected",
    })}\n\n`,
  );

  console.log("SSE client connected", req.id);

  let unsubscribe: (() => void) | undefined;

  try {
    unsubscribe = await subscribeToNotification((message) => {
      if (res.destroyed || res.writableEnded) return;

      const notifications = JSON.parse(message);

      if (notifications.recipientId !== req.id) {
        return;
      }

      res.write(
        `id:${notifications.id}\nevent: notifications\ndata: ${message}\n\n`,
      );
    });
  } catch (error) {
    console.log("Redis subscription failed: ", error);
    if (!res.destroyed || !res.writableEnded) {
      res.write(
        `event: error\data: ${JSON.stringify({
          message: "Notification service temporary unavailable",
        })}\n\n`,
      );
      res.end();
    }
    return;
  }

  const heartbeat = setInterval(() => {
    if (!res.destroyed && !res.writableEnded) {
      res.write(": heartbeat\n\n");
    }
  }, 25000);

  res.on("close", () => {
    clearInterval(heartbeat);
    unsubscribe?.();
    console.log("SSE client disconnected", req.id);
  });
}

export async function getNotification(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const recipientId = req.id;
    const [notifications, unreadCount] = await Promise.all([
      findNotifications(recipientId),
      countUnReadNotification(recipientId),
    ]);

    successResponse(res, {
      message: "Notification fetched successfully",
      data: { notifications, unreadCount },
      statusCode: 200,
    });
  } catch (error) {
    console.log(error);

    errorResponse(res, {
      message: "Failed to fetch notification",
      statusCode: 500,
    });
  }
}

export async function readNotification(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const notificationId = Number(req.params.notificationId);

    if (!Number.isInteger(notificationId) || notificationId <= 0) {
      errorResponse(res, {
        message: "Invalid notification ID",
        statusCode: 400,
      });
      return;
    }

    const result = await markNotificationAsRead(notificationId, req.id);

    if (result.count === 0) {
      errorResponse(res, {
        message: "Notification not found or already read",
        statusCode: 404,
      });
      return;
    }

    const unreadCount = await countUnReadNotification(req.id);

    successResponse(res, {
      message: "Notification marked as read",
      data: { unreadCount },
      statusCode: 200,
    });
  } catch (error) {
    console.log(error);
    errorResponse(res, {
      message: "Failed to mark notification as read",
      statusCode: 500,
    });
  }
}
