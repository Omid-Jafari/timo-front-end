import { Info } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";

const InputComp = ({
  label,
  value,
  info,
  isRequired = false,
  hasError = false,
  icon,
  name,
  onChange,
  onBlur,
  type = "text",
  dir,
  className,
  error,
  disabled = false,
}: {
  label: string;
  value: string | number | undefined;
  name: string;
  icon?: string | ReactNode;
  type?: string;
  info?: string | undefined;
  isRequired?: boolean;
  hasError?: boolean;
  dir?: "ltr" | "rtl";
  onChange: any;
  onBlur: any;
  className?: string;
  error?: string;
  disabled?: boolean;
}) => {
  return (
    <div className={`flex flex-col gap-1 sm:gap-2 ${className}`}>
      <label htmlFor={name} className="text-sm font-bold">
        {label} {isRequired ? <span className="text-red-500">*</span> : null}
      </label>
      <div className="relative w-full">
        <input
          dir={dir}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          className={`border w-full rounded-md p-2 outline-none focus:border-secondary transition-all duration-300 relative pr-8 ${
            hasError ? "!border-[#e43f52]" : "border-[#e9ecef]"
          }`}
        />
        <div className="absolute top-1/2 -translate-y-1/2 right-[12px] pointer-events-none">
          {typeof icon === "string" ? (
            <Image
              src={icon}
              className="object-contain w-[18px] h-[18px]"
              width={18}
              height={18}
              alt="icon"
              style={{
                filter:
                  "invert(16%) sepia(12%) saturate(342%) hue-rotate(163deg) brightness(99%) contrast(90%)",
              }}
            />
          ) : icon ? (
            icon
          ) : null}
        </div>
      </div>
      {info ? (
        <div className="flex items-center gap-1 text-xs text-[#8492A6]">
          <Info size={14} />
          <span>{info}</span>
        </div>
      ) : null}
      {hasError ? (
        <div className="text-red-500 w-full text-sm animate__animated animate__headShake">
          {error}
        </div>
      ) : null}
    </div>
  );
};

export default InputComp;
