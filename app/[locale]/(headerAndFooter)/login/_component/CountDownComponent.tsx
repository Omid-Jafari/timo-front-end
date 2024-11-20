"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Loading from "@/app/_components/common/Loading";
import { getOtp } from "../_api/loginApi";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

const CountDownComponent = () => {
  const t = useTranslations("Login");
  const phoneNumber = useSearchParams().get("phoneNumber") || null;
  const [timer, setTimer] = useState<any>(59);

  const getOtpMutation = useMutation({
    mutationKey: ["getOtpMutation"],
    mutationFn: getOtp,
    onSuccess: () => {
      setTimer(59);
    },
    onError: () => {},
  });
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setTimer(false);
    }
  }, [timer]);

  return (
    <div className="flex items-center justify-center">
      {timer ? (
        <span className="text-gray-500 font-medium text-[13px]">
          {t("timerTxt", { timer: timer ? `00:${timer}` : "" })}
        </span>
      ) : (
        <button
          type="button"
          className="text-[13px] font-semibold"
          onClick={() =>
            phoneNumber &&
            getOtpMutation.mutate({
              phone_number: phoneNumber,
            })
          }
        >
          {getOtpMutation?.isPending ? (
            <Loading className="w-10 h-6" bg="bg-primary" />
          ) : (
            t("getCodeAgain")
          )}
        </button>
      )}
    </div>
  );
};

export default CountDownComponent;
