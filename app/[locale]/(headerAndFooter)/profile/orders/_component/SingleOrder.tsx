import {
  CheckCircle,
  ChevronRight,
  Circle,
  CreditCard,
  RefreshCcw,
} from "lucide-react";
import { Order } from "../_constant/orders";
import { useTranslations } from "next-intl";
import priceComma from "@/app/_utils/priceComma";
import { Link } from "@/i18n.config";

const SingleOrder = ({ order }: { order: Order }) => {
  const t = useTranslations("User");

  return (
    <div
      data-testid={order?.identifier}
      className={`flex flex-col gap-1 border rounded-md p-2`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {order?.status === "paid" ? (
            <CheckCircle size={18} className="text-secondary" />
          ) : (
            <RefreshCcw size={18} className="text-primary" />
          )}
          <span className="font-bold">{order?.humanized_status}</span>
        </div>
        <div className="bg-gray-100 p-1 rounded-md font-bold text-sm">
          {new Date(order?.created_at).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
      <div className="flex items-center gap-2 text-[13px]">
        <div className="flex items-center gap-1">
          <span className="text-gray-400">{t("orderNumber")}</span>
          <span>{order?.ref_id}</span>
        </div>
        <div className="flex items-center gap-1">
          <Circle size={8} className="text-gray-400" />
          <span className="text-gray-400">{t("total")}</span>
          <span>{priceComma(+order?.gross_total)}</span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        {order?.status === "unpaid" ? (
          <Link
            className="text-primary text-sm flex items-center font-bold gap-1"
            href={`/checkout/payment-info?identifier=${order?.identifier}`}
            target="_blank"
          >
            {t("pay")}
            <CreditCard size={18} />
          </Link>
        ) : null}
        <Link
          className="ltr:ml-auto rtl:mr-auto text-primary text-sm flex items-center font-bold"
          href={`/profile/orders/${order?.identifier}`}
        >
          {t("orderDetail")}
          <ChevronRight size={18} className="rtl:rotate-180" />
        </Link>
      </div>
    </div>
  );
};

export default SingleOrder;
