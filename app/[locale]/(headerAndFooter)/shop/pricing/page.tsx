import PageTitleComp from "@/app/_components/common/PageTitleComp";
import { Suspense } from "react";
import PriceTableContainer from "./_component/PriceTableContainer";
import PriceTableSkeleton from "@/app/_components/loadingSkeletons/PriceTableSkeleton";
import { useTranslations } from "next-intl";
import dynamic from "next/dynamic";

const SelectedFilterSec = dynamic(() =>
  import("./_component/SelectedFilterSec").then((module) => module.default)
);
const PriceListFilterSec = dynamic(() =>
  import("./_component/PriceListFilterSec").then((module) => module.default)
);

const PriceTable = (params: {
  searchParams: {
    search: string | undefined;
    catLink: string | undefined;
  };
}) => {
  const t = useTranslations();

  return (
    <div className="flex flex-col gap-2 container-2xl-w">
      <PageTitleComp title={t("Header.pricing")} />
      <SelectedFilterSec />
      <PriceListFilterSec />
      <Suspense fallback={<PriceTableSkeleton />}>
        <PriceTableContainer
          search={params?.searchParams?.search}
          category={params?.searchParams?.catLink}
        />
      </Suspense>
    </div>
  );
};

export default PriceTable;
