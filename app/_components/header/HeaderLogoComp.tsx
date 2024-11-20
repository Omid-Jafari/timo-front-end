"use client";

import { useShop } from "@/app/_hooks/shop-state";
import Image from "next/image";

const HeaderLogoComp = ({ className = "" }: { className?: string }) => {
  const { shopData } = useShop();

  return (
    <Image
      src={shopData?.logo}
      className={className}
      width={104}
      height={70}
      alt="logo"
      loading="eager"
    />
  );
};

export default HeaderLogoComp;
