import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { verifyOtp } from "../_api/loginApi";
import Loading from "@/app/_components/common/Loading";
import { Edit } from "lucide-react";
import { Link } from "@/i18n.config";
import { setCookie } from "cookies-next";
import dynamic from "next/dynamic";
import InputForOtp from "./InputForOtp";
import { useTranslations } from "next-intl";
import { useTransition } from "react";

const CountDownComponent = dynamic(() =>
  import("./CountDownComponent").then((module) => module.default)
);

const LoginWithOtpSecondStep = () => {
  const t = useTranslations("Login");
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get("phoneNumber") || "0";

  const nextForwardToPathname =
    searchParams.get("next") || "/profile/dashboard";

  const verifyOtpMutation = useMutation({
    mutationKey: ["verifyOtpMutation"],
    mutationFn: verifyOtp,
    onSuccess: (res) => {
      const daysFromNow = new Date();
      daysFromNow.setDate(new Date().getDate() + 7);
      setCookie("token", res?.token, {
        expires: daysFromNow,
      });
      setCookie(
        "full_name",
        `${res?.user?.first_name} ${res?.user?.last_name}`,
        {
          expires: daysFromNow,
        }
      );
      startTransition(() => {
        queryClient.invalidateQueries({ queryKey: ["getCartDataQuery"] });
        queryClient.invalidateQueries({ queryKey: ["getUserDataQuery"] });
        window.location.replace(decodeURIComponent(nextForwardToPathname));
      });
    },
    onError: () => {},
  });
  const formik = useFormik({
    initialValues: { code: null },
    validationSchema: Yup.object({
      code: Yup.number().required(t("validOneTimePass")),
    }),

    onSubmit: (data) => {
      data?.code &&
        verifyOtpMutation.mutate({
          code: data?.code,
          phone_number: phoneNumber,
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 ">
        <label htmlFor={"phoneNumber"} className="text-sm font-bold">
          {t("phoneNumber")}
        </label>
        <div className="relative w-full">
          <input
            disabled
            dir="ltr"
            name="phoneNumber"
            value={phoneNumber}
            className={`text-left font-semibold border border-[#e9ecef] w-full rounded-md p-2 outline-none focus:border-primary transition-all duration-300 relative `}
          />
          <Link href={`/login?phoneNumber=${phoneNumber}`}>
            <Edit className="text-primary object-contain w-[18px] h-[18px] absolute top-1/2 -translate-y-1/2 right-[3%]" />
          </Link>
        </div>
      </div>
      <InputForOtp
        value={formik.values.code}
        onChange={(e: string) => formik.setFieldValue("code", e)}
        onComplete={() => formik.handleSubmit()}
      />
      {formik.errors.code && formik.touched.code && (
        <div className="text-red-600 w-full text-sm px-3 py-2 animate__animated animate__headShake">
          {formik.errors.code as string}
        </div>
      )}
      <button type="submit" className="primary-btn">
        {verifyOtpMutation?.isPending || isPending ? <Loading /> : t("login")}
      </button>
      <CountDownComponent />
    </form>
  );
};

export default LoginWithOtpSecondStep;
