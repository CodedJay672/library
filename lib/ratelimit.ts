import { Ratelimit } from "@upstash/ratelimit";
import redis from "@/db/redis";
// Create a Ratelimit instance
const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(5, "1 m"),
  analytics: true,
  prefix: "@upstash/ratelimit",
});

export default ratelimit;
