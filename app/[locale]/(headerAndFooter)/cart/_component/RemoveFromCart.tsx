import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import { removeFromCartFunc } from "../../shop/_api/productsApi";
import toast from "react-hot-toast";
import Loading from "@/app/_components/common/Loading";
import { CartItem, removeFromCart, useCart } from "@/app/_hooks/cart-state";

const RemoveFromCart = ({ cartItem }: { cartItem: CartItem }) => {
  const queryClient = useQueryClient();
  const { cartData } = useCart();
  const { mutate: removeFromCartMutate, isPending: removePending } =
    useMutation({
      mutationKey: ["removeFromCartMutation"],
      mutationFn: removeFromCartFunc,
      onSuccess: () => {
        toast.success("با موفقیت از سبد خرید شما حذف شد.");
        removeFromCart({ queryClient, cartItem, cartData });
        queryClient.invalidateQueries({ queryKey: ["getCartDataQuery"] });
      },
    });

  return (
    <button
      disabled={removePending}
      onClick={() => removeFromCartMutate(cartItem?.identifier)}
      className="mr-auto mb-auto absolute top-3 right-3 sm:relative sm:top-0 sm:right-0"
    >
      {removePending ? (
        <Loading bg="bg-red-500" />
      ) : (
        <Trash2 className="text-red-500" />
      )}
    </button>
  );
};

export default RemoveFromCart;
