import { getDataSsr } from "@/app/_api/FetchSSR";
import { OrdersData } from "../_constant/orders";
import dynamic from "next/dynamic";
import OrdersList from "./OrdersList";

const SearchFormContainer = dynamic(() =>
  import("../../../shop/_component/filterSec/SearchFormContainer").then(
    (module) => module.default
  )
);
const OrdersStatusSelect = dynamic(() =>
  import("./OrdersStatusSelect").then((module) => module.default)
);

const OrdersInfo = async ({
  search,
  status,
}: {
  search: string | undefined;
  status: string | undefined;
}) => {
  let queryArray = [];
  let queryArrayString = "";

  if (search) {
    queryArray.push(`search=${search}`);
  }
  if (status && status !== "all") {
    queryArray.push(`status=${status}`);
  }
  queryArrayString = queryArray.join("&");
  const ordersData: OrdersData = await getDataSsr(
    `orders/orders/${queryArrayString ? `?${queryArrayString}` : ""}`
  );

  return (
    <div className="flex flex-col border p-2 sm:p-4 gap-3 rounded-md flex-1 sm:self-start">
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center justify-between ">
        <OrdersStatusSelect />
        <SearchFormContainer />
      </div>
      <OrdersList ordersData={ordersData} />
    </div>
  );
};

export default OrdersInfo;
