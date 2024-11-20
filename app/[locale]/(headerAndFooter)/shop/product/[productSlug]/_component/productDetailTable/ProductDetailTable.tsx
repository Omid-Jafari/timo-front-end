import TitleComp from "@/app/_components/common/TitleComp";
import { SingleProduct } from "@/app/_constant/Product";
import priceComma from "@/app/_utils/priceComma";
import Image from "next/image";
import { Link } from "@/i18n.config";
import { useTranslations } from "next-intl";

const ProductDetailTable = ({
  productData,
}: {
  productData: SingleProduct;
}) => {
  const t = useTranslations("");

  return (
    <div className="flex flex-col gap-4 pb-4">
      <TitleComp title={t("Product.productDetail")} smaller />
      <table className="border border-[#e9ecef] font-semibold text-sm">
        <tbody>
          <tr className="border-b border-[#e9ecef]">
            <td className="py-2 px-3 border-l border-[#e9ecef]">
              {t("Product.category")}
            </td>
            <td className="py-2 px-3 text-primary">
              <Link
                href={`/shop?catLink=${productData?.categories[0]?.link_title}/`}
              >
                {productData?.categories[0]?.title}
              </Link>
            </td>
          </tr>
          <tr className="border-b border-[#e9ecef]">
            <td className="py-2 px-3 border-l border-[#e9ecef]">
              {t("Product.unit")}
            </td>
            <td className="py-2 px-3">{productData?.unit?.title}</td>
          </tr>
          <tr className="border-b border-[#e9ecef]">
            <td className="py-2 px-3 border-l border-[#e9ecef]">
              {t("Product.availabilityStatus")}
            </td>
            <td className="py-2 px-3">
              {productData?.stock_status ? (
                <span className="text-secondary">{t("Product.inStock")}</span>
              ) : (
                <span className="text-primary">{t("Cart.outOfStock")}</span>
              )}
            </td>
          </tr>
          <tr className="border-b border-[#e9ecef]">
            <td className="py-2 px-3 border-l border-[#e9ecef]">
              {t("Product.price")}
            </td>
            <td className="py-2 px-3">
              {priceComma(productData?.gross_price)}
            </td>
          </tr>

          <tr>
            <td className="py-2 px-3 border-l border-[#e9ecef]">
              {t("Product.usersScore")}
            </td>
            <td className="py-2 px-3 flex items-center gap-1">
              <Image src="/common/star.svg" width={16} height={16} alt="star" />
              4.7
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductDetailTable;
