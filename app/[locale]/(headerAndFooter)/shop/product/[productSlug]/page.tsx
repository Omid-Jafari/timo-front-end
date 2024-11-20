import { getDataSsr } from "@/app/_api/FetchSSR";
import { Metadata, ResolvingMetadata } from "next";
import CoverAndDetail from "./_component/CoverAndDetail/CoverAndDetail";
import dynamic from "next/dynamic";
import PageTitleComp from "@/app/_components/common/PageTitleComp";
import { Category } from "@/app/_constant/Product";
import { Suspense } from "react";
import SingleProductSkeleton from "./_component/SingleProductSkeleton";
import { getTranslations } from "next-intl/server";

const FilterSec = dynamic(() =>
  import("../../_component/filterSec/FilterSec").then(
    (module) => module.default
  )
);
const FilterSectionContainer = dynamic(() =>
  import("../../_component/filterSec/FilterSectionContainer").then(
    (module) => module.default
  )
);
const ProductDetailTable = dynamic(() =>
  import("./_component/productDetailTable/ProductDetailTable").then(
    (module) => module.default
  )
);
const RelativeProducts = dynamic(() =>
  import("./_component/relativeProducts/RelativeProducts").then(
    (module) => module.default
  )
);

type Props = {
  params: { productSlug: string };
};

async function getProductData(productSlug: string) {
  return await getDataSsr(`products/products/${productSlug}/`);
}

export async function generateMetadata(
  { params }: Props,

  parent: ResolvingMetadata
): Promise<Metadata> {
  const productData = await getProductData(params?.productSlug);

  return {
    title: `${productData?.seo_title || "فروشگاه ادویه، خشکبار، عطاری"} | ${
      (await parent)?.title?.absolute
    }`,
    description: productData?.seo_description,
  };
}

const SingleProduct = async ({ params }: Props) => {
  const productData = await getProductData(params?.productSlug);
  const t = await getTranslations();
  // await new Promise((resolve) => setTimeout(resolve, 10000));

  return (
    <main className="flex flex-col gap-1 sm:gap-2 container-2xl-w">
      <PageTitleComp
        title={productData?.title}
        extraLinks={[
          { title: t("Header.shop"), href: "/shop" },
          ...productData?.categories?.map((catData: Category) => {
            return {
              title: catData?.title,
              href: `/shop?catLink=${catData?.link_title}`,
            };
          }),
        ]}
      />
      <div className="flex gap-3">
        <FilterSectionContainer>
          <FilterSec />
        </FilterSectionContainer>
        <div
          className={`p-3 sm:p-4 xl:p-5 flex-1 flex flex-col gap-6 border border-[#e9ecef] rounded-md mt-1 w-1/2`}
        >
          <Suspense fallback={<SingleProductSkeleton />}>
            <CoverAndDetail productData={productData} />
          </Suspense>
          <hr className="border-[#e9ecef] border-2 rounded-full opacity-25" />
          <ProductDetailTable productData={productData} />
          <hr className="border-[#e9ecef] border-2 rounded-full opacity-25" />
          <RelativeProducts productSlug={params?.productSlug as string} />
        </div>
      </div>
    </main>
  );
};

export default SingleProduct;
