import { Worker } from "bullmq";
import "../config/env";
import { NotificationJobData } from "../queues/types/type";
import { prisma } from "../lib/prisma";
import redis, { redisPublisher } from "../lib/redis";
import { publishNotification } from "../lib/notificationPubSub";

const notificationWorker = new Worker<NotificationJobData>(
  "notification-queue",
  async (job) => {
    console.log("Notification job started: ", job.id);

    const notification = await prisma.notifications.create({
      data: {
        recipientId: job.data.recipientId,
        title: job.data.title,
        message: job.data.message,
        type: job.data.type,
      },
    });
    console.log("Notification saved :", notification.id);
    try {
      await publishNotification(JSON.stringify(notification));
      console.log("Notification event published:", notification.id);
    } catch (error) {
      console.log("Failed to publish notification:", error);
    }
    return {
      success: true,
      notification: notification.id,
    };
  },
  {
    connection: redis,
    concurrency: 1,
  },
);

notificationWorker.on("completed", (job) => {
  console.log("Notification job completed: ", job.id);
});

notificationWorker.on("failed", (job, error) => {
  console.log("Notification job completed: ", job?.id, error.message);
});

async function shutdown(signal: string) {
  console.log(`${signal} received.Closing the Notification worker`);
  try {
    await notificationWorker.close();
    await redis.quit();
    await redisPublisher.quit();
    console.log("Notification worker shutdown succesfully");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

process.once("SIGINT", () => shutdown("SIGINT"));
process.once("SIGTERM", () => shutdown("SIGTERM"));

console.log("Notification worker started and waiting for jobs...");
