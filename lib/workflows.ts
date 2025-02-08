import { Client } from "@upstash/workflow";
import config from "./config";

const workflowClient = new Client({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

export default workflowClient;
