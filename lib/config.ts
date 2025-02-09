const config = {
  env: {
    endpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
    prodEndpoint: process.env.NEXT_PUBLIC_PROD_API_ENDPOINT!,
    databaseUrl: process.env.DATABASE_URL!,
    authSecret: process.env.AUTH_SECRET!,
    imagekit: {
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_API_ENDPOINT!,
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    },
    upstash: {
      redisEndpoint: process.env.UPSTASH_REDIS_REST_URL!,
      redisToken: process.env.UPSTASH_REDIS_REST_TOKEN!,
      qstashUrl: process.env.QSTASH_URL!,
      qstashToken: process.env.QSTASH_TOKEN!,
    },
    emailjs: {
      serviceId: process.env.EMAILJS_SERVICE_ID!,
      templateId: process.env.EMAILJS_TEMPLATE_ID!,
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUCLIC_TOKEN!,
    },
  },
};

export default config;
