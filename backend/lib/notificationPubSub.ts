import { redisPublisher, redisSubscriber } from "./redis";

const NOTIFICATION_CHANNEL = "notifications";

export async function publishNotification(data: string) {
  await redisPublisher.publish(NOTIFICATION_CHANNEL, data);
}

export async function subscribeToNotification(
  cb: (message: string) => void,
): Promise<() => void> {
  const messageHandler = (channel: string, message: string) => {
    if (channel === NOTIFICATION_CHANNEL) {
      cb(message);
    }
  };

  redisSubscriber.on("message", messageHandler);

  try {
    await redisSubscriber.subscribe(NOTIFICATION_CHANNEL);
  } catch (error) {
    redisSubscriber.off("message", messageHandler);
    throw error;
  }

  return () => {
    redisSubscriber.off("message", messageHandler);
  };
}
