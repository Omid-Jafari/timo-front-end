import { Product } from "@/app/_constant/Product";
import priceComma from "@/app/_utils/priceComma";
import Image from "next/image";
import { Link } from "@/i18n.config";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

const AddToCartBtn = dynamic(() =>
  import("./AddToCartBtn").then((module) => module.default)
);

const RowShowProduct = ({ product }: { product: Product }) => {
  const t = useTranslations("Product");

  return (
    <div
      data-testid={product?.link_title}
      className="p-2 border border-[#e9ecef] rounded-md justify-between items-center flex gap-2 hover:shadow-lg transition-all duration-300 bg-white"
    >
      <Link
        href={`/shop/product/${product?.link_title}`}
        className="w-1/3 aspect-square relative"
      >
        <Image
          fill
          width={0}
          height={0}
          sizes="(max-width: 768px) 30vw, (max-width: 1200px) 25vw, 12vw"
          src={product?.cover}
          alt="product image"
          className="object-contain rounded-md"
        />
      </Link>
      <div className="flex-1 flex flex-col gap-2 h-full">
        <Link
          href={`/shop/product/${product?.link_title}`}
          className="flex flex-col gap-1 justify-center mb-auto sm:mb-0 mt-auto"
        >
          <h5 className="font-semibold text-base md:text-lg mb-1 sm:mb-2">
            {product?.title}
          </h5>
          <strong className="font-normal italic text-base">
            {priceComma(product?.gross_price)}
          </strong>
        </Link>
        <div className="rtl:mr-auto ltr:ml-auto lg:mb-1 rtl:lg:ml-1 ltr:lg:mr-1">
          <AddToCartBtn product={product} btnText={t("add")} />
        </div>
      </div>
    </div>
  );
};

export default RowShowProduct;
