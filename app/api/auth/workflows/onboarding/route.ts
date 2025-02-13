import { serve } from "@upstash/workflow/nextjs";
import { sendEmail } from "@/lib/workflows";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

type InitialData = {
  email: string;
  fullName: string;
};

const ONE_DAY_IN_MS = 60 * 60 * 24 * 1000;
const THREE_DAYS_IN_MS = 3 * ONE_DAY_IN_MS;
const ONE_MONTH_IN_MS = 30 * ONE_DAY_IN_MS;

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload;

  await context.run("new-signup", async () => {
    await sendEmail({
      fullName,
      message:
        "Please note that your library acount can take up to 3 days to be activated.",
    });
  });

  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3);

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email);
    });

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail({
          fullName,
          message:
            "Hey!, You have not been active for a while. Please sign into your account to activate your account.",
        });
      });
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmail({
          fullName,
          message: "Hey!, Your account has been activated.",
        });
      });
    }

    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30);
  }
});

type UserState = "non-active" | "active";

const getUserState = async (email: string): Promise<UserState> => {
  const now = Date.now();
  const user = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (user.length === 0) return "non-active";

  //check users last active date
  const lastActiveDate = new Date(user?.[0].lastActivityDate);
  const timeDiff = now - lastActiveDate.getTime();

  if (timeDiff > THREE_DAYS_IN_MS && timeDiff < ONE_MONTH_IN_MS) {
    return "non-active";
  }

  return "active";
};
