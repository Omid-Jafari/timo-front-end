import { HandCoins, ShieldCheck, ShoppingCart, Truck } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const FooterFeatures = () => {
  const t = useTranslations("Footer");

  return (
    <div className="flex flex-col md:flex-row self-center sm:self-stretch md:items-center gap-2 justify-between text-black">
      <div className="flex items-center gap-2">
        <Truck />
        <strong className="font-bold ">{t("expressDelivery")}</strong>
      </div>
      <div className="flex items-center gap-2 mr-1 sm:mr-0">
        <ShoppingCart />
        <strong className="font-bold ">{t("easyShoping")}</strong>
      </div>
      <div className="flex items-center gap-2">
        <HandCoins />
        <strong className="font-bold ">{t("moneyBack")}</strong>
      </div>
      <div className="flex items-center gap-2">
        <ShieldCheck />
        <strong className="font-bold ">{t("securePayment")}</strong>
      </div>
    </div>
  );
};

export default FooterFeatures;
