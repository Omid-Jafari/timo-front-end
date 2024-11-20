"use client";

import { useQuery } from "@tanstack/react-query";
import { userAddressesFunc } from "../../_api/checkoutApi";
import { useTranslations } from "next-intl";
import { CheckCircle, MapPinOff } from "lucide-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import TitleComp from "@/app/_components/common/TitleComp";
import { Checkbox } from "@/app/_components/ui/checkbox";
import dynamic from "next/dynamic";

const AddNewAddress = dynamic(() =>
  import(
    "@/app/[locale]/(headerAndFooter)/profile/address/_component/AddNewAddress"
  ).then((module) => module.default)
);

const UserAddresses = ({
  shipping_address,
  setShipping_address,
  billing_address,
  setBilling_address,
}: {
  shipping_address: string;
  setShipping_address: Dispatch<SetStateAction<string>>;
  billing_address: string;
  setBilling_address: Dispatch<SetStateAction<string>>;
}) => {
  const [shipSameAsBill, setShipSameAsBill] = useState(true);
  const t = useTranslations("");
  const { data: userAddressesData } = useQuery({
    queryKey: ["getUserAddressesQuery"],
    queryFn: userAddressesFunc,
  });
  useEffect(() => {
    userAddressesData?.count > 0 &&
      setShipping_address(userAddressesData?.results[0]?.identifier);
    userAddressesData?.count > 0 &&
      setBilling_address(userAddressesData?.results[0]?.identifier);

    return () => {
      setShipping_address("");
    };
  }, [
    setBilling_address,
    setShipping_address,
    userAddressesData?.count,
    userAddressesData?.results,
  ]);

  return (
    <>
      <div className="flex flex-col gap-3">
        <TitleComp title={t("User.shipAddress")} smaller />
        <div className="grid grid-cols-2 gap-3">
          {userAddressesData?.count === 0 ? (
            <div className="col-span-2 flex items-center gap-1 justify-center text-red-500 flex-col font-semibold">
              <MapPinOff /> {t("Checkout.noAddressFound")}
            </div>
          ) : (
            userAddressesData?.results?.map(
              (
                address: {
                  identifier: string;
                  title: string;
                  country: {
                    code: string;
                    name: string;
                  };
                  country_area?: string | undefined;
                  city: string;
                  city_area?: string | undefined;
                  street_address: string;
                  postal_code?: string | undefined;
                },
                addressIdx: number
              ) => (
                <button
                  type="button"
                  key={`addressIdx${addressIdx}`}
                  className={`relative col-span-2 md:col-span-1 text-center p-4 rounded-md flex flex-col gap-2 items-start ${
                    shipping_address === address?.identifier
                      ? "border-secondary border"
                      : "border"
                  }`}
                  onClick={() => setShipping_address(address?.identifier)}
                >
                  {shipping_address === address?.identifier ? (
                    <CheckCircle
                      size={18}
                      className="text-secondary absolute rtl:left-3 ltr:right-3 top-3"
                    />
                  ) : null}
                  <h6 className="font-semibold">{address?.title}</h6>
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-gray-500">{t("User.country")}:</span>
                    <span className="">{address?.country?.name}</span>
                  </div>
                  {address?.country_area ? (
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-gray-500">
                        {t("User.country_area")}:
                      </span>
                      <span className="">{address?.country_area}</span>
                    </div>
                  ) : null}
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-gray-500">{t("User.city")}:</span>
                    <span className="">{address?.city}</span>
                  </div>
                  {address?.city_area ? (
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-gray-500">
                        {t("User.city_area")}:
                      </span>
                      <span className="">{address?.city_area}</span>
                    </div>
                  ) : null}
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-gray-500">
                      {t("User.street_address")}:
                    </span>
                    <span className="">{address?.street_address}</span>
                  </div>
                  {address?.postal_code ? (
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-gray-500">
                        {t("User.postal_code")}:
                      </span>
                      <span className="">{address?.postal_code}</span>
                    </div>
                  ) : null}
                </button>
              )
            )
          )}
          <AddNewAddress />
        </div>
        <div
          onClick={() => {
            if (shipSameAsBill) setShipSameAsBill(false);
            else {
              setShipSameAsBill(true);
              setBilling_address(shipping_address);
            }
          }}
          className="flex items-center gap-1 cursor-pointer"
        >
          <Checkbox
            checked={shipSameAsBill}
            onCheckedChange={() => {
              if (shipSameAsBill) setShipSameAsBill(false);
              else {
                setShipSameAsBill(true);
                setBilling_address(shipping_address);
              }
            }}
          />
          <span className="font-semibold text-sm text-gray-500">
            {t("User.shipSameAsBill")}
          </span>
        </div>
      </div>

      {!shipSameAsBill ? (
        <div className="flex flex-col gap-3">
          <TitleComp title={t("User.billAddress")} smaller />
          <div className="grid grid-cols-2 gap-3">
            {userAddressesData?.count === 0 ? (
              <div className="col-span-2 flex items-center gap-1 justify-center text-red-500 flex-col font-semibold">
                <MapPinOff /> {t("Checkout.noAddressFound")}
              </div>
            ) : (
              userAddressesData?.results?.map(
                (
                  address: {
                    identifier: string;
                    title: string;
                    country: {
                      code: string;
                      name: string;
                    };
                    country_area?: string | undefined;
                    city: string;
                    city_area?: string | undefined;
                    street_address: string;
                    postal_code?: string | undefined;
                  },
                  addressIdx: number
                ) => (
                  <button
                    type="button"
                    key={`addressIdx${addressIdx}`}
                    className={`relative col-span-2 md:col-span-1 text-center p-4 rounded-md flex flex-col gap-2 items-start ${
                      billing_address === address?.identifier
                        ? "border-secondary border"
                        : "border"
                    }`}
                    onClick={() => setBilling_address(address?.identifier)}
                  >
                    {billing_address === address?.identifier ? (
                      <CheckCircle
                        size={18}
                        className="text-secondary absolute rtl:left-3 ltr:right-3 top-3"
                      />
                    ) : null}
                    <h6 className="font-semibold">{address?.title}</h6>
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-gray-500">
                        {t("User.country")}:
                      </span>
                      <span className="">{address?.country?.name}</span>
                    </div>
                    {address?.country_area ? (
                      <div className="flex items-center gap-1 text-sm">
                        <span className="text-gray-500">
                          {t("User.country_area")}:
                        </span>
                        <span className="">{address?.country_area}</span>
                      </div>
                    ) : null}
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-gray-500">{t("User.city")}:</span>
                      <span className="">{address?.city}</span>
                    </div>
                    {address?.city_area ? (
                      <div className="flex items-center gap-1 text-sm">
                        <span className="text-gray-500">
                          {t("User.city_area")}:
                        </span>
                        <span className="">{address?.city_area}</span>
                      </div>
                    ) : null}
                    <div className="flex items-center gap-1 text-sm">
                      <span className="text-gray-500">
                        {t("User.street_address")}:
                      </span>
                      <span className="">{address?.street_address}</span>
                    </div>
                    {address?.postal_code ? (
                      <div className="flex items-center gap-1 text-sm">
                        <span className="text-gray-500">
                          {t("User.postal_code")}:
                        </span>
                        <span className="">{address?.postal_code}</span>
                      </div>
                    ) : null}
                  </button>
                )
              )
            )}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default UserAddresses;
