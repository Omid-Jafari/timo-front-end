import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

const FooterAddress = dynamic(() =>
  import("./FooterAddress").then((module) => module.default)
);
const FooterEmail = dynamic(() =>
  import("./FooterEmail").then((module) => module.default)
);
const FooterPhones = dynamic(() =>
  import("./FooterPhones").then((module) => module.default)
);

const FooterContacts = () => {
  const t = useTranslations("Footer");

  return (
    <div className="flex flex-col w-full sm:w-auto gap-3 md:max-w-[330px]">
      <h5 className="font-medium text-xl mb-5 text-black">{t("contacts")}</h5>
      <FooterAddress />
      <FooterEmail />
      <FooterPhones />
    </div>
  );
};

export default FooterContacts;
