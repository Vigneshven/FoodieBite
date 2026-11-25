import "../config/env";
import { Worker } from "bullmq";
import type { EmailJobData } from "../queues/types/type";
import redis from "../lib/redis";
import { sendEmail } from "../utils/email/email";
import { EmailError } from "../utils/types/type";
import { handleEmailError } from "../utils/email/emailErrorHandler";

const emailWorker = new Worker<EmailJobData>(
  "email-queue",
  //   async (job) => {
  //     console.log("Processing email job :", job.id);

  //     const { to, subject, html } = job.data;

  //     await sendEmail({
  //       to,
  //       subject,
  //       html,
  //     });
  //     console.log("email sent succesfully: ", job.id);
  //     return {
  //       success: true,
  //       recepient: to,
  //     };
  //   },
  async (job) => {
    console.log(`Processing job: ${job.id}, attempt: ${job.attemptsMade + 1}`);

    const error = new Error("SMTP connection timed out") as EmailError;

    error.code = "ETIMEDOUT";
    error.responseCode = 421;

    handleEmailError(error);
  },

  {
    connection: redis,
    concurrency: 1,
  },
);

emailWorker.on("completed", (job, result) => {
  console.log(`job ${job.id} completed`);
  console.log(`Result : `, result);
});

emailWorker.on("failed", (job, error) => {
  console.log(`job ${job?.id} failed`);
  console.log(`error : ${error}`);
});

emailWorker.on("error", (error) => {
  console.log(`Email worker error : ${error}`);
});

async function shutdown(signal: string) {
  console.log(`${signal} received.Closing the email worker`);
  try {
    await emailWorker.close();
    await redis.quit();
    console.log("email worker shutdown succesfully");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

process.once("SIGINT", () => shutdown("SIGINT"));
process.once("SIGTERM", () => shutdown("SIGTERM"));

console.log("Email worker started and waiting for jobs...");
