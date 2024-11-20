"use client";

import { Link, usePathname } from "@/i18n.config";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

const FooterQuickAccess = () => {
  const pathName = usePathname();
  const t = useTranslations();
  const quickAccess = [
    { name: t("Header.home"), path: "/" },
    { name: t("Header.shop"), path: "/shop" },
    { name: t("Header.pricing"), path: "/shop/pricing" },
    { name: t("Header.aboutUs"), path: "#" },
    { name: t("Footer.myAccount"), path: "/profile/dashboard" },
    { name: t("Footer.myOrders"), path: "/profile/orders" },
  ];

  return (
    <div className="flex flex-col gap-2 md:max-w-[330px]">
      <h5 className="font-medium text-xl mb-5 text-black">
        {t("Footer.quickAccess")}
      </h5>
      {quickAccess?.map((qAccess, qAccessIdx) => (
        <Link
          href={qAccess?.path}
          key={`qAccessIdx${qAccessIdx}`}
          className={`font-medium text-base transition-all duration-300 flex items-center gap-1 ${
            pathName === qAccess.path
              ? "text-primary hover:text-red-300"
              : "hover:text-[#ADB5BD]"
          }`}
        >
          <ChevronRight size={18} />
          {qAccess?.name}
        </Link>
      ))}
    </div>
  );
};

export default FooterQuickAccess;
