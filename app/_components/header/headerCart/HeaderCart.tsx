"use client";

import Image from "next/image";
import { Link } from "@/i18n.config";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../../ui/hover-card";
import dynamic from "next/dynamic";
import { useCart } from "@/app/_hooks/cart-state";

const CartHoverContent = dynamic(() =>
  import("./CartHoverContent").then((module) => module.default)
);
const CartCount = dynamic(() =>
  import("./CartCount").then((module) => module.default)
);

const HeaderCart = () => {
  const { cartData } = useCart();

  return (
    <HoverCard openDelay={0}>
      <HoverCardTrigger>
        <Link href="/cart" className="icon_hover_system relative">
          <Image
            src="/common/shopping-cart.svg"
            className="object-contain w-[24px] h-[24px]"
            width={24}
            height={24}
            alt="shopping cart"
            style={{
              filter:
                "invert(0%) sepia(0%) saturate(4545%) hue-rotate(46deg) brightness(83%) contrast(92%)",
            }}
          />
          <CartCount />
        </Link>
      </HoverCardTrigger>
      <HoverCardContent
        className={`flex-col gap-2 ${
          cartData?.items?.length > 0 ? "hidden md:flex" : "hidden"
        }`}
        align="end"
        sideOffset={8}
      >
        <CartHoverContent />
      </HoverCardContent>
    </HoverCard>
  );
};

export default HeaderCart;
