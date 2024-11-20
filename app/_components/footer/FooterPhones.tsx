"use client";

import { getFetchData } from "@/app/_api/ApiServise";
import { phonenumberConvertor } from "@/app/_utils/phone_number_converter";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Link } from "@/i18n.config";
import { Phone } from "lucide-react";

const FooterPhones = () => {
  const { data: phoneData } = useQuery({
    queryKey: ["getPhoneDataQuery"],
    queryFn: () => getFetchData("site-content/phone-numbers/"),
  });

  return (
    <>
      {phoneData?.results?.map(
        (
          phone: {
            identifier: string;
            phone_number: string;
          },
          phoneIdx: number
        ) => (
          <Link
            href={phonenumberConvertor(phone?.phone_number)}
            className="flex items-center gap-1"
            key={`phoneIdx${phoneIdx}`}
          >
            <Phone size={18} />
            <span dir="ltr" className="text-base">
              {phone?.phone_number}
            </span>
          </Link>
        )
      )}
    </>
  );
};

export default FooterPhones;
