import { Suspense } from "react";
import ProductSkeleton from "./_component/skeleton/ProductSkeleton";
import PageTitleComp from "@/app/_components/common/PageTitleComp";
import dynamic from "next/dynamic";
import ProductsList from "./_component/products/ProductsList";
import ShopLoading from "./_component/skeleton/ShopLoading";
import { useTranslations } from "next-intl";
import ProductListContainer from "./_component/products/ProductListContainer";

const FilterSec = dynamic(() =>
  import("./_component/filterSec/FilterSec").then((module) => module.default)
);
const FilterSectionContainer = dynamic(() =>
  import("./_component/filterSec/FilterSectionContainer").then(
    (module) => module.default
  )
);
const SortAndShow = dynamic(() =>
  import("./_component/products/SortAndShow").then((module) => module.default)
);

const Products = ({
  searchParams: { cardShow, search, page, catLink },
}: {
  searchParams: {
    cardShow: string | undefined;
    search: string | undefined;
    page: string | undefined;
    catLink: string | undefined;
  };
}) => {
  const t = useTranslations();

  return (
    <Suspense fallback={<ShopLoading cardShow={cardShow || "0"} />}>
      <main className="flex flex-col gap-1 sm:gap-2 container-2xl-w">
        <PageTitleComp title={t("Header.shop")} />
        <div className="flex gap-3">
          <FilterSectionContainer mt="mt-[37px]">
            <FilterSec />
          </FilterSectionContainer>
          <div className={`flex-1 flex flex-col gap-2`}>
            <SortAndShow />
            <Suspense
              fallback={<ProductSkeleton paramCardShow={cardShow || "0"} />}
            >
              <ProductListContainer
                page={page || "1"}
                search={search || null}
                catLink={catLink || null}
                cardShow={cardShow || "0"}
              />
            </Suspense>
          </div>
        </div>
      </main>
    </Suspense>
  );
};

export default Products;
