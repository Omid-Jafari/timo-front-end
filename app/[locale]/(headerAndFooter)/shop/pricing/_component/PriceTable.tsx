"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { Product, ProductResponse } from "@/app/_constant/Product";
import priceComma from "@/app/_utils/priceComma";
import useScrollDirection from "@/app/_hooks/useScrollDirection";
import { useEffect } from "react";
import { getProductsData } from "../../_api/productsApi";
import { useTranslations } from "next-intl";
import Loading from "@/app/_components/common/Loading";

const PriceTable = ({
  iniProductData,
}: {
  iniProductData: ProductResponse;
}) => {
  const search = useSearchParams()?.get("search") || null;
  const category = useSearchParams()?.get("catLink") || null;
  const scrollDirection = useScrollDirection();
  const t = useTranslations("PriceTable");
  const queryKey = ["getPriceTableDataQuery", search, category];

  const {
    data: productsData,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam = 1 }) =>
      getProductsData({ search, category, page: `${pageParam}` }),
    initialData: { pageParams: [1], pages: [iniProductData] },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const maxPages = lastPage?.num_pages;
      const nextPage = allPages.length + 1;

      return nextPage <= maxPages ? nextPage : undefined;
    },
  });
  useEffect(() => {
    let fetching = false;
    const onScroll = async (e: any) => {
      const { scrollHeight, scrollTop, clientHeight } =
        e.target.scrollingElement;

      if (
        !fetching &&
        !isFetching &&
        scrollHeight - scrollTop <= clientHeight * 3.8
      ) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };
    document.addEventListener("scroll", onScroll);

    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, [fetchNextPage, hasNextPage, isFetching]);

  return (
    <>
      <div className="flex flex-col bg-gray-500 rounded-md border text-center relative">
        <div
          className={`grid grid-cols-6 gap-px font-bold rounded-t-md overflow-hidden text-sm text-white sticky transition-all ease-in-out duration-300 ${
            scrollDirection === "down"
              ? "top-[51px] sm:top-[62px]"
              : "top-[101px] sm:top-[106px]"
          }`}
        >
          <div className="col-span-4 py-2 bg-gray-500 flex items-center justify-center">
            {t("product")}
          </div>
          <div className="py-2 bg-gray-500">{t("price")}</div>
          <div className="py-2 bg-gray-500">{t("unit")}</div>
        </div>
        <div
          data-testid={`productpricingListTable`}
          className="flex flex-col [&>*]:bg-[#e9ecef] [&>*:nth-child(even)_span]:bg-[rgba(0,0,0,0.05)] [&>*:nth-child(odd)_span]:bg-white"
        >
          {productsData?.pages?.map((pIndex: any) =>
            pIndex?.results?.length === 0 ? (
              <div
                className="bg-white p-4"
                data-testid={`noProductPricing`}
                key={`notFoundKey`}
              >
                {t("noProduct")}
              </div>
            ) : (
              pIndex?.results?.map((product: Product, productIdx: number) => (
                <div
                  key={`productIdx${productIdx + product?.identifier}`}
                  className="grid grid-cols-6 gap-px font-semibold"
                  data-testid={product?.link_title}
                >
                  <span className="col-span-4 py-2 flex items-center justify-center text-sm sm:text-base">
                    {product?.title}
                  </span>
                  <div className="flex flex-col gap-px">
                    <span className="py-2 px-1 h-full flex items-center justify-center">
                      {priceComma(product?.gross_price)}
                    </span>
                  </div>
                  <div className="flex flex-col gap-px">
                    <span className="py-2 px-1 h-full flex items-center justify-center text-[12px] sm:text-sm">
                      {product?.unit?.title}
                    </span>
                  </div>
                </div>
              ))
            )
          )}
        </div>
      </div>
      {isFetching ? (
        <div className="mx-auto">
          <Loading bg="bg-primary" />
        </div>
      ) : null}
    </>
  );
};

export default PriceTable;
