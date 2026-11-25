import { emailQueue } from "./emailQueue";
import type { EmailJobData } from "./types/type";

export async function enqueueEmail(data: EmailJobData) {
  const job = await emailQueue.add("send-email", data);

  console.log("EMAIL JOB ADDED ", job.id);

  return job;
}
