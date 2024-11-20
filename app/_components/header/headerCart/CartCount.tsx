import { useCart } from "@/app/_hooks/cart-state";

const CartCount = () => {
  const { cartData } = useCart();

  return cartData?.items?.length > 0 ? (
    <div className=" min-w-5 h-5 font-semibold flex justify-center items-center text-white bg-red-500 rounded-md absolute bottom-[-8px] right-[-9px] border-2 border-white">
      <span className="text-[11px] relative top-[1px]">
        {cartData?.items?.length}
      </span>
    </div>
  ) : null;
};

export default CartCount;
