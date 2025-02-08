"use client";

import AuthForm from "../../../components/shared/AuthForm";
import { signUp } from "@/lib/actions/Auth";
import { signUpSchema } from "@/lib/validation";

const SignUp = () => {
  return (
    <AuthForm
      type="SIGN_UP"
      schema={signUpSchema}
      defaultValues={{
        email: "",
        password: "",
        fullName: "",
        universityId: 0,
        universityCard: "",
      }}
      onSubmit={signUp}
    />
  );
};

export default SignUp;
