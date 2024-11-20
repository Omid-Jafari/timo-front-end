import { useTranslations } from "next-intl";
import Image from "next/image";
import cancelImage from "@/public/callback/cancel.webp";
import successlImage from "@/public/callback/check.webp";
import { Link } from "@/i18n.config";

const Callback = ({
  searchParams: { status },
}: {
  searchParams: { status: "verify_success" | "verify_failure" };
}) => {
  const t = useTranslations("Callback");
  if (status === "verify_success")
    return (
      <div className="flex-1 flex justify-center items-center flex-col gap-6">
        <Image
          src={successlImage}
          alt={"success image"}
          className="object-contain rounded-md w-24 h-24"
        />
        <h5 className="font-bold ">{t("successTitle")}</h5>
        <p className="">{t("successTxt")}</p>
        <div className="flex items-center gap-2 ">
          <Link className="primary-btn px-3 " href="/profile/dashboard">
            {t("userPanel")}
          </Link>
          <Link className="transparent-btn px-3 " href="/">
            {t("backToHome")}
          </Link>
        </div>
      </div>
    );
  else
    return (
      <div className="flex-1 flex justify-center items-center flex-col gap-6">
        <Image
          src={cancelImage}
          alt={"cancel image"}
          className="object-contain rounded-md w-24 h-24"
        />
        <h5 className="font-bold ">{t("failedTitle")}</h5>
        <p className="">{t("failedTxt")}</p>
        <div className="flex items-center gap-2 ">
          <Link
            target="_blank"
            className="primary-btn px-3 "
            href="/checkout/payment-info"
          >
            {t("payAgain")}
          </Link>
          <Link className="transparent-btn px-3 " href="/checkout/user-info">
            {t("backToCart")}
          </Link>
        </div>
      </div>
    );
};

export default Callback;
