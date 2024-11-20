import { Link } from "@/i18n.config";
import Image from "next/image";
import errorImg from "@/public/404/not-found.jpg";
import Header from "../_components/header/Header";
import Footer from "../_components/footer/Footer";
import { useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("Notfound");

  return (
    <>
      <Header />
      <div className="flex-1 flex flex-col justify-center items-center gap-4 my-5">
        <Image
          src={errorImg}
          alt="404 image"
          className="object-contain max-w-[80vw] sm:max-w-[50vw] max-h-[50vh]"
        />
        <h2 className="font-bold text-xl mt-5">{t("title")}</h2>
        <p>{t("text")}</p>
        <div className="flex items-center gap-2">
          <Link className="primary-btn px-4" href="/">
            {t("home")}
          </Link>
          <Link className="transparent-btn px-4" href="/shop">
            {t("shop")}
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}
