import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Stepper from "../_component/Stepper";
import dynamic from "next/dynamic";
import { getDataSsr } from "@/app/_api/FetchSSR";
import ShippingInfoForm from "./_component/ShippingInfoForm";

const CheckoutCartContainer = dynamic(() =>
  import("../_component/CheckoutCartContainer").then((module) => module.default)
);

const ShippingInfo = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["getUserAddressesQuery"],
    queryFn: () => getDataSsr(`accounts/addresses/`),
  });
  await queryClient.prefetchQuery({
    queryKey: ["getDeliveryMethodQuery"],
    queryFn: () => getDataSsr(`shipping/delivery-methods/`),
  });

  return (
    <main className="p-3 sm:p-5 flex flex-col gap-4 container-2xl-w ">
      <Stepper activeStep={1} />
      <div className="flex gap-4">
        <CheckoutCartContainer />
        <HydrationBoundary state={dehydrate(queryClient)}>
          <ShippingInfoForm />
        </HydrationBoundary>
      </div>
    </main>
  );
};

export default ShippingInfo;
