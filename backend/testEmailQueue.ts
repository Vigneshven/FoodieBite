import "./config/env";
import { enqueueEmail } from "@/backend/queues/producer/emailProducer";
import { emailQueue } from "@/backend/queues/emailQueue";

async function testEmailQueue() {
  try {
    const job = await enqueueEmail({
      to: "vikiarts@gmail.com",
      subject: "Testing queue added in redis",
      html: "<h1>Testing queue added</h1>",
    });
    console.log("JOB ID ", job.id);

    const waitingCount = await emailQueue.getWaitingCount();

    console.log("job waiting count in queue", waitingCount);

    const savedJob = await emailQueue.getJob("29");

    console.log("Saved job data : ", savedJob?.data);

    console.log("JOB STATE ", await savedJob?.getState());

    if (savedJob) {
      console.log("Final job state:", await savedJob.getState());
      console.log("Attempts made:", savedJob.attemptsMade);
      console.log("Failure reason:", savedJob.failedReason);
    }
  } catch (error) {
    console.log(error);
  } finally {
    await emailQueue.close();
  }
}

testEmailQueue();
