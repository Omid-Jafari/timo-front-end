import { Product } from "@/app/_constant/Product";
import priceComma from "@/app/_utils/priceComma";
import dynamic from "next/dynamic";
import Image from "next/image";
import { Link } from "@/i18n.config";
import { useTranslations } from "next-intl";

const AddToCartBtn = dynamic(() =>
  import("./AddToCartBtn").then((module) => module.default)
);

const CardShowProduct = ({ product }: { product: Product }) => {
  const t = useTranslations("Product");

  return (
    <div className="h-full p-2 md:p-3 border border-[#e9ecef] rounded-md flex flex-col text-center justify-between items-center gap-2 md:gap-3 hover:shadow-lg transition-all duration-300 bg-white">
      <Link
        href={`/shop/product/${product?.link_title}`}
        className="relative w-full aspect-square"
      >
        <Image
          fill
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 15vw"
          width={0}
          height={0}
          src={product?.cover}
          alt="product card show image"
          className="object-contain rounded-lg"
        />
      </Link>
      <Link href={`/shop/product/${product?.link_title}`}>
        <h5 className="font-semibold text-base md:text-lg">{product?.title}</h5>
      </Link>
      <Link
        href={`/shop/product/${product?.link_title}`}
        className="flex flex-col gap-1 items-center"
      >
        <span className="text-[13px] md:text-base">
          {priceComma(product?.gross_price)}
        </span>
      </Link>
      <AddToCartBtn
        product={product}
        className="primary-btn !rounded !h-8 sm:!h-9  flex justify-center items-center gap-2 w-full text-xs sm:text-sm font-medium shadow-inner"
        bigger
        btnText={
          <>
            {t("addToCart")}
            <Image
              src="/common/cart-plus-svgrepo-com.svg"
              className="object-contain w-[18px] sm:w-[20px] h-[18px] sm:h-[20px]"
              width={20}
              height={20}
              alt="shopping cart"
              style={{
                filter:
                  "invert(99%) sepia(2%) saturate(847%) hue-rotate(260deg) brightness(115%) contrast(100%)",
              }}
            />
          </>
        }
      />
    </div>
  );
};

export default CardShowProduct;
