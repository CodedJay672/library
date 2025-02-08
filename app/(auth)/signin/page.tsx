"use client";

import AuthForm from "@/components/shared/AuthForm";
import { signInWithCredentials } from "@/lib/actions/Auth";
import { signInSchema } from "@/lib/validation";

const SignIn = () => {
  return (
    <AuthForm
      type="SIGN_IN"
      schema={signInSchema}
      defaultValues={{
        email: "",
        password: "",
      }}
      onSubmit={signInWithCredentials}
    />
  );
};

export default SignIn;
