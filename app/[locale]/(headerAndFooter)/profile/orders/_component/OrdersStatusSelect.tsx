"use client";

import Loading from "@/app/_components/common/Loading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import createQueryString from "@/app/_utils/createQueryString";
import { useRouter } from "@/i18n.config";
import { useLocale, useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useTransition } from "react";

const OrdersStatusSelect = () => {
  const t = useTranslations("User");
  const [isPending, startTransition] = useTransition();
  const status = useSearchParams().get("status") || "all";
  const router = useRouter();
  const searchParams = useSearchParams();
  const localeActive = useLocale();

  return (
    <Select
      defaultValue={status}
      onValueChange={(e) => {
        startTransition(() => {
          router.push("?" + createQueryString("status", e, searchParams));
        });
      }}
    >
      <SelectTrigger className="relative overflow-hidden" disabled={isPending}>
        {isPending ? (
          <div className="w-full flex justify-center items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-30">
            <Loading bg="bg-primary" />
          </div>
        ) : null}
        <SelectValue />
      </SelectTrigger>
      <SelectContent align={localeActive !== "fa" ? "end" : "start"}>
        <SelectItem value="all">{t("all")}</SelectItem>
        <SelectItem value="unpaid">{t("unpaid")}</SelectItem>
        <SelectItem value="preparing">{t("preparing")}</SelectItem>
        <SelectItem value="sent">{t("sent")}</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default OrdersStatusSelect;
