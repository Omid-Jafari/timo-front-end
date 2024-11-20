import { Frown } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const NoProductFound = () => {
  const t = useTranslations("Product");

  return (
    <div
      data-testid={`noProductFound`}
      className="px-2 md:px-3 py-10 border border-[#e9ecef] rounded-md flex flex-col justify-center items-center h-full gap-3"
    >
      <Image
        src="/common/notFoundImg.jpg"
        className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px]"
        width={250}
        height={250}
        alt="not found product image"
      />
      <div className="flex items-center gap-2">
        <Frown size={24} />
        <h5 className="font-semibold text-lg">{t("noProductFound")}</h5>
      </div>
    </div>
  );
};

export default NoProductFound;
