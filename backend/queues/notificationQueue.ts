import { Queue } from "bullmq";
import { NotificationJobData } from "./types/type";
import redis from "../lib/redis";

export const notificationQueue = new Queue<NotificationJobData>(
  "notification-queue",
  {
    connection: redis,
    defaultJobOptions: {
      attempts: 5,
      backoff: {
        type: "exponential",
        delay: 5000,
      },
      removeOnComplete: {
        age: 24 * 60 * 60,
        count: 1000,
      },
      removeOnFail: {
        age: 7 * 24 * 60 * 60,
      },
    },
  },
);
