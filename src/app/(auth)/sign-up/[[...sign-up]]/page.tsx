import type { Metadata } from "next";

import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <SignUp />
    </div>
  );
};

export const metadata: Metadata = {
  title: "Sign up",
  description: "register to te Moom",
};

export default SignUpPage;
