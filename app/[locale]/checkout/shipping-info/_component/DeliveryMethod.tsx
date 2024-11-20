"use client";

import { useQuery } from "@tanstack/react-query";
import { deliveryMethodFunc } from "../../_api/checkoutApi";
import { useTranslations } from "next-intl";
import { CheckCircle } from "lucide-react";
import { Dispatch, SetStateAction, useEffect } from "react";
import TitleComp from "@/app/_components/common/TitleComp";
import Image from "next/image";
import priceComma from "@/app/_utils/priceComma";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";

const DeliveryMethod = ({
  deliveryMethodState,
  setdeliveryMethodState,
}: {
  deliveryMethodState: string;
  setdeliveryMethodState: Dispatch<SetStateAction<string>>;
}) => {
  const t = useTranslations("");

  const { data: deliveryMethodData } = useQuery({
    queryKey: ["getDeliveryMethodQuery"],
    queryFn: deliveryMethodFunc,
  });
  useEffect(() => {
    deliveryMethodData?.count > 0 &&
      setdeliveryMethodState(deliveryMethodData?.results[0]?.identifier);

    return () => {
      setdeliveryMethodState("");
    };
  }, [
    deliveryMethodData?.count,
    deliveryMethodData?.results,
    setdeliveryMethodState,
  ]);

  return (
    <div className="flex flex-col gap-3">
      <TitleComp title={t("User.deliveryMethod")} smaller />
      <div className="grid grid-cols-2 gap-3">
        {deliveryMethodData?.results?.map(
          (
            deliveryMethod: {
              delivery_cost: number | null;
              icon: string;
              identifier: string;
              is_active: boolean;
              title: string;
            },
            deliveryMethodIdx: number
          ) => (
            <TooltipProvider key={`deliveryMethodIdx${deliveryMethodIdx}`}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    disabled={!deliveryMethod?.is_active}
                    type="button"
                    className={`disabled:opacity-60 relative col-span-2 sm:col-span-1 text-center p-4 rounded-md flex flex-col gap-2 items-start ${
                      deliveryMethodState === deliveryMethod?.identifier
                        ? "border-secondary border"
                        : "border"
                    }`}
                    onClick={() =>
                      setdeliveryMethodState(deliveryMethod?.identifier)
                    }
                  >
                    {deliveryMethodState === deliveryMethod?.identifier ? (
                      <CheckCircle
                        size={18}
                        className="text-secondary absolute rtl:left-3 ltr:right-3 top-3"
                      />
                    ) : null}
                    <div className="flex items-center gap-2">
                      <Image
                        src={deliveryMethod?.icon}
                        width={28}
                        height={28}
                        alt="delivery method icon"
                      />
                      <h6 className="font-semibold">{deliveryMethod?.title}</h6>
                    </div>
                    {deliveryMethod?.delivery_cost ||
                    deliveryMethod?.delivery_cost === 0 ? (
                      <div className="flex items-center gap-1 text-sm">
                        <span className="text-gray-500">
                          {t("User.deliveryCost")}:
                        </span>
                        <span className="">
                          {deliveryMethod?.delivery_cost === 0
                            ? t("User.free")
                            : priceComma(deliveryMethod?.delivery_cost)}
                        </span>
                      </div>
                    ) : null}
                  </button>
                </TooltipTrigger>
                {!deliveryMethod?.is_active ? (
                  <TooltipContent>
                    <p>{t("Checkout.notAvailableDelivery")}</p>
                  </TooltipContent>
                ) : null}
              </Tooltip>
            </TooltipProvider>
          )
        )}
      </div>
    </div>
  );
};

export default DeliveryMethod;
