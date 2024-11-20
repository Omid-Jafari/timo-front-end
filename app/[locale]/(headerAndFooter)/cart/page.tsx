import PageTitleComp from "@/app/_components/common/PageTitleComp";
import CartProductList from "./_component/CartProductList";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

const CartDetail = dynamic(() =>
  import("./_component/CartDetail").then((module) => module.default)
);

const Cart = () => {
  const t = useTranslations("Cart");

  return (
    <div className="flex flex-col gap-3 sm:gap-4 container-2xl-w">
      <PageTitleComp title={t("cart")} />
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-start">
        <CartProductList />
        <CartDetail />
      </div>
    </div>
  );
};

export default Cart;
