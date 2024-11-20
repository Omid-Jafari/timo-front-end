import Image from "next/image";
import { OrdersData } from "../_constant/orders";
import SingleOrder from "./SingleOrder";
import { useTranslations } from "next-intl";

const OrdersList = ({ ordersData }: { ordersData: OrdersData }) => {
  const t = useTranslations("User");

  if (+ordersData?.count === 0)
    return (
      <div
        data-testid="noOrder"
        className="flex flex-col gap-4 items-center font-bold"
      >
        <Image
          src="/user/no-order.webp"
          width={110}
          height={110}
          alt="no order image"
        />
        {t("noOrder")}
      </div>
    );

  return ordersData?.results?.map((order, orderIdx) => (
    <SingleOrder order={order} key={`orderIdx${orderIdx}`} />
  ));
};
export default OrdersList;
