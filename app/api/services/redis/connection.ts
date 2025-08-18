import { createClient, RedisClientType } from "redis";

let client: RedisClientType | null = null;

const getRedisClient = async () => {
  if (!client) {
    client = createClient({
      username: "default",
      password: process.env.REDIS_PASSWORD,
      socket: {
        host: "redis-10248.c11.us-east-1-3.ec2.redns.redis-cloud.com",
        port: 10248,
      },
    });

    client.on("error", (err) => console.log("Redis Client Error", err));
    await client.connect();
  }
  return client;
};

const redis_set = async (key: string, value: string) => {
  const redisClient = await getRedisClient();
  await redisClient.set(key, value);
};

const redis_get = async (key: string) => {
  const redisClient = await getRedisClient();
  const result = await redisClient.get(key);
  return result;
};

export { redis_set, redis_get };
