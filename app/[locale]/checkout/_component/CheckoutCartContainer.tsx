"use client";

import CartHoverContent from "@/app/_components/header/headerCart/CartHoverContent";
import { useCart } from "@/app/_hooks/cart-state";
import { useRouter } from "next/navigation";

const CheckoutCartContainer = () => {
  const { cartData } = useCart();
  const router = useRouter();

  if (cartData?.items?.length !== 0 || cartData?.items?.length)
    return (
      <div className="hidden md:flex flex-col gap-2 w-96 border p-5 rounded-md self-start">
        <CartHoverContent hasBtn={false} />
      </div>
    );
  else router.replace("/cart");
};

export default CheckoutCartContainer;
