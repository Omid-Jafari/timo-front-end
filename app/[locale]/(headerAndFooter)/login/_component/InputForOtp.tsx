import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/app/_components/ui/input-otp";
import { useTranslations } from "next-intl";
import Image from "next/image";

const InputForOtp = ({
  onChange,
  value,
  onComplete,
}: {
  onChange: any;
  value: any;
  onComplete: any;
}) => {
  const t = useTranslations("Login");

  return (
    <div className="flex flex-col gap-3 ">
      <label htmlFor="code" className="text-sm font-bold">
        {t("otp")} <span className="text-red-500">*</span>
      </label>
      <div className="w-full py-2" dir="ltr">
        <InputOTP
          maxLength={6}
          onChange={(value) => onChange(value)}
          value={value}
          onComplete={onComplete}
          containerClassName=" justify-around"
          autoFocus
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot index={1} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot index={3} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot index={4} />
          </InputOTPGroup>
          <InputOTPGroup>
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

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
        <span>{t("oneTimeTxt")}</span>
      </div>
    </div>
  );
};

export default InputForOtp;
