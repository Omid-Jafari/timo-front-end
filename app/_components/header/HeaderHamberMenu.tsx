"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/_components/ui/sheet";
import Image from "next/image";
import { Link } from "@/i18n.config";
import { usePathname } from "next/navigation";
import { memo } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import aboutUsSvg from "@/public/common/about-us.svg";
import orderSvg from "@/public/common/order.svg";
import categorySvg from "@/public/common/category.svg";
import shopSvg from "@/public/common/shop.svg";
import homeSvg from "@/public/common/home.svg";
import LogoComp from "../common/LogoComp";
import LogOutModal from "@/app/[locale]/(headerAndFooter)/profile/_component/LogOutModal";
import { useUser } from "@/app/_hooks/user-state";

const MobileCatList = dynamic(() =>
  import("./MobileCatList").then((module) => module.default)
);
const SearchFormContainer = dynamic(() =>
  import(
    "@/app/[locale]/(headerAndFooter)/shop/_component/filterSec/SearchFormContainer"
  ).then((module) => module.default)
);

const HeaderHamberMenu = () => {
  const pathName = usePathname();
  const t = useTranslations("Header");
  const { user: userData } = useUser();
  const menuItems = [
    { name: t("home"), path: "/", svg: homeSvg },
    { name: t("shop"), path: "/shop", svg: shopSvg },
    {
      name: t("categories"),
      path: "/#categories",
      type: 2,
      svg: categorySvg,
    },
    {
      name: t("pricing"),
      path: "/shop/pricing",
      svg: orderSvg,
    },
    { name: t("aboutUs"), path: "#", svg: aboutUsSvg },
  ];

  return (
    <Sheet>
      <SheetTrigger
        className={`relative w-[22px] h-[16px] sm:hidden flex flex-col justify-between`}
      >
        <span className="w-full h-[2px] rounded-full bg-[#0c0c0c]"></span>
        <span className="w-full h-[2px] rounded-full bg-[#0c0c0c]"></span>
        <span className="w-full h-[2px] rounded-full bg-[#0c0c0c]"></span>
      </SheetTrigger>
      <SheetContent
        className="h-full overflow-y-auto px-3 flex flex-col"
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <SheetHeader className="py-4">
          <SheetTitle>
            <LogoComp className="object-contain w-auto h-14 mx-auto" />
          </SheetTitle>
        </SheetHeader>
        <div className="border-t border-[#e9ecef] py-4 flex flex-col gap-4">
          <SearchFormContainer header />
        </div>
        <div className="flex flex-col gap-2">
          {menuItems?.map((menuItem, menuItemIdx) =>
            menuItem?.type === 2 ? (
              <MobileCatList
                key={`menuItemIdx${menuItemIdx}`}
                menuItem={menuItem}
              />
            ) : (
              <SheetClose asChild key={`menuItemIdx${menuItemIdx}`}>
                <Link
                  href={menuItem?.path}
                  className={`py-2 px-4 flex items-center gap-3 font-medium text-base rounded-md  transition-all duration-300 ${
                    pathName === menuItem?.path
                      ? "text-white bg-primary"
                      : " text-[#454545]"
                  }`}
                >
                  <Image
                    src={menuItem?.svg}
                    className="object-contain w-[21px] h-[21px] transition-all duration-300"
                    width={21}
                    height={21}
                    alt="menu icon"
                    style={{
                      filter:
                        pathName === menuItem?.path
                          ? "invert(97%) sepia(4%) saturate(374%) hue-rotate(35deg) brightness(118%) contrast(100%)"
                          : "invert(24%) sepia(1%) saturate(0%) hue-rotate(171deg) brightness(91%) contrast(80%)",
                    }}
                  />
                  <h6>{menuItem?.name}</h6>
                </Link>
              </SheetClose>
            )
          )}
        </div>
        {!!userData?.phone_number ? (
          <LogOutModal className="mt-auto mb-4 flex justify-center items-center gap-3 text-primary leading-6 sm:gap-4 font-medium py-2 px-4 w-full rounded-md border border-primary" />
        ) : (
          <SheetClose asChild>
            <Link
              href="/login"
              className="flex items-center justify-center mb-4 mt-auto gap-2 border border-[#e0e0e2] rounded-lg p-0 px-4 py-2 text-xs font-semibold transition-all hover:shadow duration-300"
            >
              <Image
                src="/common/loginIcon.svg"
                className="object-contain w-[24px] h-[24px]"
                width={24}
                height={24}
                alt="shopping cart"
                style={{
                  filter:
                    "invert(0%) sepia(0%) saturate(4545%) hue-rotate(46deg) brightness(83%) contrast(92%)",
                }}
              />
              {t("login")} | {t("register")}
            </Link>
          </SheetClose>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default memo(HeaderHamberMenu);
