import "../config/env";
import { Worker } from "bullmq";
import type { EmailJobData } from "../queues/types/type";
import redis from "../lib/redis";
import { sendEmail } from "../utils/email/email";
import { handleEmailError } from "../utils/email/emailErrorHandler";

const emailWorker = new Worker<EmailJobData>(
  "email-queue",
  // async (job) => {
  //   console.log("Processing email job :", job.id);

  //   const { to, subject, html } = job.data;

  //   await sendEmail({
  //     to,
  //     subject,
  //     html,
  //   });
  //   console.log("email sent succesfully: ", job.id);
  //   return {
  //     success: true,
  //     recepient: to,
  //   };
  // },

  async (job) => {
    const { to, subject, html } = job.data;

    const attemptedNumber = job.attemptsMade + 1;

    console.log(
      JSON.stringify({
        event: "email_job_started",
        jobId: job.id,
        attempt: attemptedNumber,
        timeStamp: new Date().toISOString(),
      }),
    );

    try {
      await sendEmail({ to, subject, html });
      console.log(
        JSON.stringify({
          event: "email_job_send",
          jobId: job.id,
          attempt: attemptedNumber,
          timeStamp: new Date().toISOString(),
        }),
      );
      return {
        success: true,
        recipient: to,
      };
    } catch (error) {
      if (error instanceof Error) {
        console.error(
          JSON.stringify({
            event: "email_job_processing_failed",
            jobId: job.id,
            attempt: attemptedNumber,
            message: error.message,
            timeStamp: new Date().toISOString(),
          }),
        );
        handleEmailError(error);
      }
    }
    throw new Error("Email sending failed");
  },

  {
    connection: redis,
    concurrency: 1,
  },
);

emailWorker.on("completed", (job, result) => {
  // console.log(`job ${job.id} completed`);
  // console.log(`Result : `, result);
  console.log(
    JSON.stringify({
      event: "email_job_completed",
      jobId: job.id,
      result,
      timestamp: new Date().toISOString(),
    }),
  );
});

emailWorker.on("failed", (job, error) => {
  // console.log(`job ${job?.id} failed`);
  // console.log(`error : ${error}`);
  console.log(
    JSON.stringify({
      event: "email_job_failed",
      jobId: job?.id,
      attemptsMade: job?.attemptsMade,
      failureReason: error.message,
      timestamp: new Date().toISOString(),
    }),
  );
});

emailWorker.on("error", (error) => {
  // console.log(`Email worker error : ${error}`);
  console.error(
    JSON.stringify({
      event: "email_worker_error",
      message: error.message,
      timestamp: new Date().toISOString(),
    }),
  );
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
