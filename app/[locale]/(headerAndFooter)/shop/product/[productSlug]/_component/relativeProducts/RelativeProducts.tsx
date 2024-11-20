import TitleComp from "@/app/_components/common/TitleComp";
import RelativeProductsSlider from "./RelativeProductsSlider";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getDataSsr } from "@/app/_api/FetchSSR";
import { getTranslations } from "next-intl/server";

const RelativeProducts = async ({ productSlug }: { productSlug: string }) => {
  const t = await getTranslations("Product");
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["getRelateProductsQuery", productSlug],
    queryFn: async () =>
      await getDataSsr(`products/related-products/${productSlug}/`),
  });

  return (
    <div className="flex flex-col gap-4 w-full">
      <TitleComp title={t("relatedProducts")} smaller />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <RelativeProductsSlider />
      </HydrationBoundary>
    </div>
  );
};

export default RelativeProducts;
