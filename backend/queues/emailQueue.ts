import { Queue } from "bullmq";
import redis from "../lib/redis";
import type { EmailJobData } from "./types/type";

export const emailQueue = new Queue<EmailJobData>("email-queue", {
  connection: redis,

  defaultJobOptions: {
    attempts: 5, //sending emails fails bullmq try to send 5 times

    backoff: {
      type: "exponential", //its wont retry continues instead it wait for 5s and 5*2-10s 10*2=20s
      delay: 5000,
    },

    removeOnComplete: {
      age: 24 * 60 * 60 * 1000, //remove the complete jobs on the redis for 24 hours or
      count: 1000,              //when its count hits 1000 from redis
    },

    removeOnFail: {
      age: 7 * 24 * 60 * 60, //keeps the failed jobs in redis for 7 days for inspect the logs
    },
  },
});
