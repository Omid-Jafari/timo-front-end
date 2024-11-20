"use client";

import { getFetchData } from "@/app/_api/ApiServise";
import { phonenumberConvertor } from "@/app/_utils/phone_number_converter";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Link } from "@/i18n.config";
import { useMemo } from "react";
import { Phone } from "lucide-react";

const HeaderPhone = ({
  noIcon = false,
  mobileHide = true,
}: {
  noIcon?: boolean;
  mobileHide?: boolean;
}) => {
  const { data: phoneData } = useQuery({
    queryKey: ["getPhoneDataQuery"],
    queryFn: () => getFetchData("site-content/phone-numbers/"),
  });

  return (
    <Link
      href={phonenumberConvertor(phoneData?.results[0]?.phone_number)}
      className={`sm:flex items-center gap-1 ${mobileHide ? "hidden" : "flex"}`}
    >
      <span
        dir="ltr"
        className="text-base font-medium text-[#2d2e48] leading-4"
      >
        {phoneData?.results[0]?.phone_number}
      </span>
      {!noIcon ? <Phone size={18} /> : null}
    </Link>
  );
};

export default HeaderPhone;
