import { emailQueue } from "@/backend/queues/emailQueue";
import "./config/env";

async function cleanEmailQueue() {
  try {
    await emailQueue.drain();

    await emailQueue.clean(0, 50, "completed");
    await emailQueue.clean(0, 50, "failed");

    console.log("Email queue cleaned succesfully");

    const jobCounts = await emailQueue.getJobCounts(
      "waiting",
      "active",
      "completed",
      "failed",
      "delayed",
    );

    console.log("Queue count :", jobCounts);
  } catch (error) {
    console.log(error);
  } finally {
    await emailQueue.close();
  }
}

cleanEmailQueue();
