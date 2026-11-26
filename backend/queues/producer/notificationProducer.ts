import { notificationQueue } from "../notificationQueue";
import { NotificationJobData } from "../types/type";

export async function enqueueNotification(data: NotificationJobData) {
  const job = await notificationQueue.add("create-notification", data);

  console.log("Notification job added", job.id);

  return job;
}
