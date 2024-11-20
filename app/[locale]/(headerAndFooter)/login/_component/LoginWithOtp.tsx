"use client";

import { useSearchParams } from "next/navigation";
import LoginWithOtpFirstStep from "./LoginWithOtpFirstStep";
import { loginChapters } from "../_constant/loginConstants";
import LoginWithOtpSecondStep from "./LoginWithOtpSecondStep";

const LoginWithOtp = () => {
  const searchParams = useSearchParams();
  const loginActiveSec =
    searchParams.get("loginActiveSec") || loginChapters.getNumber;

  return (
    <>
      {loginActiveSec === loginChapters?.getNumber ? (
        <LoginWithOtpFirstStep />
      ) : (
        <LoginWithOtpSecondStep />
      )}
    </>
  );
};

export default LoginWithOtp;
