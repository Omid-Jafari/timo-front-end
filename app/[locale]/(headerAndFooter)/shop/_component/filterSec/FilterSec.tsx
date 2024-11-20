import TitleComp from "@/app/_components/common/TitleComp";
import { Suspense, memo } from "react";
import CategorySkeleton from "../skeleton/CategorySkeleton";
import CategoriesList from "./CategoriesList";
import SelectedFilterSec from "../../pricing/_component/SelectedFilterSec";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

const SearchFormContainer = dynamic(() =>
  import("./SearchFormContainer").then((module) => module.default)
);

const FilterSec = () => {
  const t = useTranslations();

  return (
    <>
      <SelectedFilterSec className="lg:flex-col items-center justify-between lg:justify-start lg:items-start -mb-2" />
      <SearchFormContainer />
      <TitleComp smaller title={t("Home.categories")} />

      <Suspense fallback={<CategorySkeleton />}>
        <CategoriesList />
      </Suspense>
    </>
  );
};

export default memo(FilterSec);
