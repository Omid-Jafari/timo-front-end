import * as Yup from "yup";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import createQueryString from "@/app/_utils/createQueryString";
import { useRouter, useSearchParams } from "next/navigation";
import { loginChapters } from "../_constant/loginConstants";
import { getOtp } from "../_api/loginApi";
import Loading from "@/app/_components/common/Loading";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useTransition } from "react";

const LoginWithOtpFirstStep = () => {
  const t = useTranslations("Login");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const phoneNumber = searchParams.get("phoneNumber") || "";
  const phoneRegExp = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  const getOtpMutation = useMutation({
    mutationKey: ["getOtpMutation"],
    mutationFn: getOtp,
    onSuccess: (res) => {
      startTransition(() => {
        router.push(
          "login?" +
            createQueryString(
              "loginActiveSec",
              loginChapters.verifyOtp,
              searchParams,
              "phoneNumber",
              formik.values.mobile
            )
        );
      });
    },
    onError: () => {},
  });
  const formik = useFormik({
    initialValues: { mobile: phoneNumber },
    enableReinitialize: true,
    validationSchema: Yup.object({
      mobile: Yup.string()
        .required("لطفا شماره موبایل را وارد کنید")
        .matches(phoneRegExp, "Phone number is not valid"),
    }),

    onSubmit: (data) => {
      getOtpMutation.mutate({ phone_number: data?.mobile });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 ">
        <label htmlFor={"mobile"} className="text-sm font-bold">
          {t("phoneNumber")} <span className="text-red-500">*</span>
        </label>
        <PhoneInput
          defaultCountry="tr"
          value={formik.values.mobile}
          onChange={(phone) => formik.setFieldValue("mobile", phone)}
          onBlur={formik.handleBlur}
          className="w-full"
          inputClassName="flex-1"
          style={{ direction: "ltr" }}
        />
        <div className="flex items-center gap-1 text-xs text-[#8492A6]">
          <Image
            src="/common/infoIcon.svg"
            className="object-contain w-[14px] h-[14px]"
            width={14}
            height={14}
            alt="logo"
            style={{
              filter:
                "invert(61%) sepia(31%) saturate(216%) hue-rotate(176deg) brightness(88%) contrast(86%)",
            }}
          />
          <span>{t("enterPhoneNumber")}</span>
        </div>
      </div>
      {formik.errors.mobile && formik.touched.mobile && (
        <div className="text-red-600 w-full text-sm px-3 py-2 animate__animated animate__headShake">
          {formik.errors.mobile as string}
        </div>
      )}
      <button type="submit" className="primary-btn">
        {getOtpMutation?.isPending || isPending ? <Loading /> : t("getCode")}
      </button>
    </form>
  );
};

export default LoginWithOtpFirstStep;
