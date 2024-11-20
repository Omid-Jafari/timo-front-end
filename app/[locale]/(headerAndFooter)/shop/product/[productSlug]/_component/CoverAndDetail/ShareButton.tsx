"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import toast from "react-hot-toast";

const ShareButton = () => {
  const t = useTranslations("Product");

  return (
    <button
      className="flex items-center gap-1 text-sm text-[#7b7b7b] font-semibold"
      onClick={() => {
        if (navigator.share) {
          navigator
            .share({
              title: "Web Share API Draft",
              text: "Take a look at this spec!",
              url: window.location.href,
            })
            .then(() => toast.success("اشتراک گزاری موفقیت آمیز بود"))
            .catch((error) => toast.error("اشتراک گزاری با خطا مواجه شد"));
        } else {
          toast.error("اشتراک گزاری با خطا مواجه شد");
        }
      }}
      type="button"
    >
      <Image
        src="/common/share.svg"
        className="object-contain w-[20px] h-[20px]"
        width={20}
        height={20}
        alt="info icon"
        style={{
          filter:
            "invert(61%) sepia(31%) saturate(216%) hue-rotate(176deg) brightness(88%) contrast(86%)",
        }}
      />
      <span>{t("shareProduct")}</span>
    </button>
  );
};

export default ShareButton;
