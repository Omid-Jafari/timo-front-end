import TitleComp from "@/app/_components/common/TitleComp";
import CategoryList from "./CategoryList";
import { useTranslations } from "next-intl";

const CategorySec = () => {
  const t = useTranslations("Home");

  return (
    <div className="flex flex-col gap-2" id="#categories">
      <TitleComp title={t("categories")} className="mx-auto" />
      <CategoryList />
    </div>
  );
};

export default CategorySec;
