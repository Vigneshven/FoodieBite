import "./config/env";

import { enqueueNotification } from "@/backend/queues/producer/notificationProducer";

async function testNotificationQueue() {
  try {
    const job = await enqueueNotification({
      recipientId: 1,
      title: "New Order",
      message: "You have received a new order",
      type: "test",
    });

    console.log("Test notification job: ", job.id);
  } catch (error) {
    console.log(error);
  }
}

testNotificationQueue();
