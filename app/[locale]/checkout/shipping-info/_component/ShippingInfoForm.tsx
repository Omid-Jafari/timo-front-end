"use client";

import { useState, useTransition } from "react";
import DeliveryMethod from "./DeliveryMethod";
import UserAddresses from "./UserAddresses";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addCeckoutFunc } from "../../_api/checkoutApi";
import Loading from "@/app/_components/common/Loading";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

const ShippingInfoForm = () => {
  const t = useTranslations("Checkout");
  const queryClient = useQueryClient();
  const [shipping_address, setShipping_address] = useState("");
  const [billing_address, setBilling_address] = useState("");
  const [deliveryMethodState, setdeliveryMethodState] = useState("");
  const [isPending, startTransition] = useTransition();

  const addCeckoutMutation = useMutation({
    mutationKey: ["addCeckoutMutation"],
    mutationFn: addCeckoutFunc,
    onSuccess: (res) => {
      startTransition(() => {
        toast.success("success");
        window.open(
          `/checkout/payment-info?identifier=${res?.identifier}`,
          "_blank"
        );

        queryClient.setQueryData(["getCartDataQuery"], {
          identifier: "",
          discount_amount: "",
          gross_total: "",
          net_total: "",
          items_count: 0,
          items: [],
        });
      });
    },
    onError: () => {},
  });

  return (
    <div className="flex flex-col gap-10 border p-3 sm:p-5 rounded-md flex-1 self-start">
      <UserAddresses
        shipping_address={shipping_address}
        setShipping_address={setShipping_address}
        billing_address={billing_address}
        setBilling_address={setBilling_address}
      />
      <DeliveryMethod
        deliveryMethodState={deliveryMethodState}
        setdeliveryMethodState={setdeliveryMethodState}
      />
      <button
        onClick={() =>
          addCeckoutMutation.mutate({
            delivery_method: deliveryMethodState,
            shipping_address,
            billing_address,
          })
        }
        className="disabled:opacity-60 col-span-2 primary-btn ltr:mr-auto rtl:ml-auto px-4 relative overflow-hidden"
        type="submit"
        disabled={!deliveryMethodState || !shipping_address || !billing_address}
      >
        {addCeckoutMutation?.isPending || isPending ? (
          <div className="w-full flex justify-center items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-30">
            <Loading bg="bg-white" />
          </div>
        ) : null}
        {t("submitOrder")}
      </button>
    </div>
  );
};

export default ShippingInfoForm;
