import { auth } from "@/auth";
import Header from "@/components/Header";
import { db } from "@/db/drizzle";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { ReactNode } from "react";

export default async function HomeLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (!session) redirect("/signin");

  after(async () => {
    if (!session?.user?.id) return;

    const user = await db
      .select()
      .from(users)
      .where(eq(users?.id, session.user.id))
      .limit(1);

    if (user[0].lastActivityDate === new Date()) return;

    await db
      .update(users)
      .set({ lastActivityDate: new Date() })
      .where(eq(users?.id, session.user.id));
  });

  return (
    <main className="root-container">
      <div className="mx-auto max-w-7xl">
        <Header session={session} />

        <div className="mt-20 pb-20"> {children}</div>
      </div>
    </main>
  );
}
