"use client";

import { useShop } from "@/app/_hooks/shop-state";

const FooterCopright = () => {
  const { shopData } = useShop();

  return (
    <span className="text-[#8492a6] text-sm font-medium text-center">
      {shopData?.site_copyright}
    </span>
  );
};

export default FooterCopright;
