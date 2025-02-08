import { Redis } from "@upstash/redis";
import config from "@/lib/config";

// Create a Redis client
const redis = new Redis({
  url: config.env.upstash.redisEndpoint,
  token: config.env.upstash.redisToken,
});

export default redis;
