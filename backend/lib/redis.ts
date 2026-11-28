import Redis from "ioredis";

const redisOptions = {
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),

  maxRetriesPerRequest: null, //allow to command to run without any timelimit needed in bullmq

  enableReadyCheck: true, //needed check redis loaded from disk

  retryStrategy(times: number) {
    return Math.min(times * 500, 5000); //needed for redis connection if failed retry after +5s
    //Incremental backoff for reconnecting, capped at a max of 5 seconds
  },
};

// bullmq
const redis = new Redis(redisOptions);

// publishing events
export const redisPublisher = new Redis(redisOptions);

// subscribing to events
export const redisSubscriber = new Redis(redisOptions);

redis.on("connect", () => {
  console.log("redis connection establised");
});

redis.on("ready", () => {
  console.log("redis is ready");
});

redis.on("error", (error) => {
  console.error("Redis connection error ", error.message);
});

export default redis;
