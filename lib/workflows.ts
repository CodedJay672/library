import { Client as WorkflowClient } from "@upstash/workflow";
import config from "./config";
import emailjs from "@emailjs/browser";

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

export const sendEmail = async ({
  message,
  fullName,
}: {
  message: string;
  fullName: string;
}) => {
  try {
    const response = await emailjs.send(
      config.env.emailjs.serviceId,
      config.env.emailjs.templateId,
      {
        to_name: fullName,
        message,
      },
      config.env.emailjs.publicKey
    );

    if (!response.status) {
      console.log(response.text);
    }
  } catch (error) {
    console.log(error);
  }
};
