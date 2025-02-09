import { Client as WorkflowClient } from "@upstash/workflow";
import config from "./config";
import emailjs from "@emailjs/browser";

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

export const sendEmail = async ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    await emailjs.send(
      config.env.emailjs.serviceId,
      config.env.emailjs.templateId,
      {
        to_email: email,
        subject,
        message,
      },
      config.env.emailjs.publicKey
    );
  } catch (error) {
    console.log(error);
  }
};
