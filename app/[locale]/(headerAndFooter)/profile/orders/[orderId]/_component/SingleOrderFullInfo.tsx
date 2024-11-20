import { getDataSsr } from "@/app/_api/FetchSSR";
import SingleOrderDetail from "./SingleOrderDetail";

const SingleOrderFullInfo = async ({ orderId }: { orderId: string }) => {
  const singleOrderData = await getDataSsr(`orders/orders/${orderId}/`);

  return (
    <div className="flex flex-col border p-2 sm:p-4 gap-3 rounded-md flex-1 sm:self-start">
      <SingleOrderDetail singleOrderData={singleOrderData} />
    </div>
  );
};

export default SingleOrderFullInfo;
