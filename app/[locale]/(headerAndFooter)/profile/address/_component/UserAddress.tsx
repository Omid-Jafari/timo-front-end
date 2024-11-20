"use client";

import { userAddressesFunc } from "@/app/[locale]/checkout/_api/checkoutApi";
import { useQuery } from "@tanstack/react-query";
import { MapPinOff } from "lucide-react";
import { useTranslations } from "next-intl";
import EditUserAddress from "./EditUserAddress";
import DeleteUserAddress from "./DeleteUserAddress";

export type Address = {
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
};
const UserAddress = () => {
  const { data: userAddressesData } = useQuery({
    queryKey: ["getUserAddressesQuery"],
    queryFn: userAddressesFunc,
  });
  const t = useTranslations();

  return (
    <div className="grid grid-cols-2 gap-3">
      {userAddressesData?.count === 0 ? (
        <div
          data-testid="noAddressFound"
          className="col-span-2 flex items-center gap-1 justify-center text-red-500 flex-col font-semibold"
        >
          <MapPinOff /> {t("Checkout.noAddressFound")}
        </div>
      ) : (
        userAddressesData?.results?.map(
          (address: Address, addressIdx: number) => (
            <div
              key={`addressIdx${addressIdx}`}
              data-testid={address?.identifier}
              className={`relative col-span-2 md:col-span-1 text-center p-4 rounded-md flex flex-col gap-2 items-start border`}
            >
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
                  <span className="text-gray-500">{t("User.city_area")}:</span>
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
              <div className="flex items-center justify-end mt-auto w-full gap-3">
                <EditUserAddress addressData={address} />
                <DeleteUserAddress addressData={address} />
              </div>
            </div>
          )
        )
      )}
    </div>
  );
};

export default UserAddress;
