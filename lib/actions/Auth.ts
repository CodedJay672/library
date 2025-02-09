"use server";

import { signIn } from "@/auth";
import { db } from "../../db/drizzle";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
import { genSaltSync, hashSync } from "bcryptjs";
import { headers } from "next/headers";
import ratelimit from "../ratelimit";
import { redirect } from "next/navigation";
import { workflowClient } from "../workflows";
import config from "../config";

export const signInWithCredentials = async (
  param: Pick<AuthCredentials, "email" | "password">
) => {
  const { email, password } = param;
  //enable ratelimiting for the signup endpoint
  const ip = (await headers()).get("x-forwared-for") || "127.0.0.1";

  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return redirect("/too-many-requests");
  }

  try {
    const user = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (!user) {
      return { success: false, error: user.error };
    }

    return { success: true };
  } catch (error) {
    console.log(error, "Signin error");
    return { success: false, error: "Signin error" };
  }
};

export const signUp = async (param: AuthCredentials) => {
  const { email, password, fullName, universityId, universityCard } = param;

  //enable ratelimiting for the signup endpoint
  const ip = (await headers()).get("x-forwared-for") || "127.0.0.1";

  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return redirect("/too-many-requests");
  }

  const user = await db.select().from(users).where(eq(users.email, email));

  if (user.length > 0) {
    return { success: false, error: "Email already exists" };
  }

  //generate salt and encrypt password
  const salt = genSaltSync(10);
  const hashedPwd = hashSync(password, salt);

  try {
    await db.insert(users).values({
      email,
      password: hashedPwd,
      fullName,
      universityId,
      universityCard,
    });

    // commence workflow when user signs up
    const workflow = await workflowClient.trigger({
      url: `${config.env.upstash.qstashUrl}/api/auth/workflows/onboarding`,
      body: { email, fullName },
    });

    // log user in
    await signInWithCredentials({ email, password });
    return { success: true };
  } catch (error) {
    console.log(error, "Signup error");
    return { success: false, error: "Signup error" };
  }
};
