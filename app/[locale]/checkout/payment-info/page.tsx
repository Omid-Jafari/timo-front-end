import { postDataSsr } from "@/app/_api/FetchSSR";
import Stepper from "../_component/Stepper";
import dynamic from "next/dynamic";
import PaymentGatewayStatus from "./_component/PaymentGatewayStatus";

const PaymentForm = dynamic(() =>
  import("./_component/PaymentForm").then((module) => module.default)
);

const PaymentInfo = async ({
  searchParams: { identifier },
}: {
  searchParams: { identifier: string };
}) => {
  const paymentFormData: {
    identifier: string;
    status: string;
    form: string;
    authority: string;
    created_at: string;
    modified_at: string;
  } = await postDataSsr(`payments/digital-payment/request/`, {
    order: identifier,
  });

  return (
    <main className="p-3 sm:p-5 flex flex-col gap-4 container-2xl-w flex-1  ">
      <Stepper activeStep={2} />

      <PaymentGatewayStatus paymentFormData={paymentFormData} />
      <PaymentForm paymentFormData={paymentFormData} />
    </main>
  );
};

export default PaymentInfo;
