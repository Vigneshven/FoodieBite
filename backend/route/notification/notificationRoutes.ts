import {
  getNotification,
  readNotification,
  streamNotification,
} from "@/backend/controller/notification/notificationController";
import { requireAuth } from "@/backend/middleware/requireAuth";
import { Router } from "express";

const router = Router();

// get notification history and unread count
router.get("/", requireAuth, getNotification);

// mark notification as read
router.patch("/:notificationId/read", requireAuth, readNotification);

// sse stream notify
router.get("/stream", requireAuth, streamNotification);

export default router;
