import { getDataSsr } from "@/app/_api/FetchSSR";
import TitleComp from "@/app/_components/common/TitleComp";
import { Link } from "@/i18n.config";
import { ChevronRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { type OrdersData } from "../../orders/_constant/orders";
import Image from "next/image";

const OrdersData = async () => {
  const t = await getTranslations("User");
  const unpaidOrders: OrdersData = await getDataSsr(
    `orders/orders/?status=unpaid`
  );
  const preparingOrders: OrdersData = await getDataSsr(
    `orders/orders/?status=preparing`
  );
  const sentOrders: OrdersData = await getDataSsr(`orders/orders/?status=sent`);

  return (
    <div className="flex flex-col border p-2 sm:p-4 gap-3 rounded-md">
      <div className="flex justify-between items-center">
        <TitleComp title={t("ordersData")} smaller />
        <Link
          href="/profile/orders"
          className="flex items-center gap-1 text-primary font-bold text-sm"
        >
          {t("seeAll")}
          <ChevronRight size={14} className="rtl:rotate-180" />
        </Link>
      </div>
      <div className="mt-5 flex flex-col md:flex-row gap-4 md:items-center justify-between">
        <Link href={`/profile/orders?status=unpaid`} className="flex gap-1">
          <Image
            src="/user/incomplete-order.webp"
            width={110}
            height={110}
            alt="unpaid products image"
          />
          <div className="flex flex-col gap-1 justify-center">
            <span className="font-bold text-3xl">{unpaidOrders?.count}</span>
            <span className="font-bold">{t("unpaidOrders")}</span>
          </div>
        </Link>
        <Link href={`/profile/orders?status=preparing`} className="flex gap-1">
          <Image
            src="/user/incomplete-order.webp"
            width={110}
            height={110}
            alt="preparing products image"
          />
          <div className="flex flex-col gap-1 justify-center">
            <span className="font-bold text-3xl">{preparingOrders?.count}</span>
            <span className="font-bold">{t("preparingOrders")}</span>
          </div>
        </Link>
        <Link href={`/profile/orders?status=sent`} className="flex gap-1">
          <Image
            src="/user/completed-orders.webp"
            width={110}
            height={110}
            alt="sent products image"
          />
          <div className="flex flex-col gap-1 justify-center">
            <span className="font-bold text-3xl">{sentOrders?.count}</span>
            <span className="font-bold">{t("sentOrders")}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default OrdersData;
