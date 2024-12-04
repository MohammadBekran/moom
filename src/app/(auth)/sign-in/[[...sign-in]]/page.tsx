import type { Metadata } from "next";

import { SignIn } from "@clerk/nextjs";

const SignInPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <SignIn />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Sign in",
  description: "login to te Moom",
};

export default SignInPage;
