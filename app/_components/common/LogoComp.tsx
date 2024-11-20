"use client";

import { useShop } from "@/app/_hooks/shop-state";
import { Link } from "@/i18n.config";
import Image from "next/image";

const LogoComp = ({ className = "" }: { className?: string }) => {
  const { shopData } = useShop();

  return (
    <Link href="/">
      <Image
        src={shopData?.logo}
        className={className}
        width={104}
        height={70}
        alt="logo"
        loading="eager"
      />
    </Link>
  );
};

export default LogoComp;
