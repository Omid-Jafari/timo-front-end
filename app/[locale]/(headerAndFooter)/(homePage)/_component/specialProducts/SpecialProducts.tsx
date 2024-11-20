import { getDataSsr } from "@/app/_api/FetchSSR";
import TitleComp from "@/app/_components/common/TitleComp";
import SpecialProductsSlider from "./SpecialProductsSlider";
import { getTranslations } from "next-intl/server";

const SpecialProducts = async () => {
  const specialProductData = await getDataSsr(`products/suggested-products/`);
  const t = await getTranslations("Home");

  return (
    <div className="flex flex-col gap-5 specialSlider">
      <TitleComp title={t("specialProducts")} className="mx-auto" />
      <SpecialProductsSlider specialProductData={specialProductData} />
    </div>
  );
};

export default SpecialProducts;
