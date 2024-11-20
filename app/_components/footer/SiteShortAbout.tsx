"use client";

import { useShop } from "@/app/_hooks/shop-state";

const SiteShortAbout = () => {
  const { shopData } = useShop();
  return (
    <strong className="text-start text-sm md:text-base font-medium">
      {shopData?.site_short_about}
    </strong>
  );
};

export default SiteShortAbout;
