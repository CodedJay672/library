import { auth } from "@/auth";
import Image from "next/image";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await auth();

  if (session) redirect("/");

  return (
    <main className="auth-container">
      <section className="auth-form">
        <div className="auth-box">
          <div className="flex flex-row gap-3 items-center">
            <Image
              src="/assets/icons/logo.svg"
              alt="bookwise"
              height={24}
              width={24}
            />
            <h1 className="text-2xl font-semibold text-white">BookWise</h1>
          </div>
          <div>{children}</div>
        </div>
      </section>

      <section className="auth-illustration bg-black">
        <Image
          src="/assets/images/auth-illustration.png"
          fill
          alt="Auth Illustration"
        />
      </section>
    </main>
  );
}
