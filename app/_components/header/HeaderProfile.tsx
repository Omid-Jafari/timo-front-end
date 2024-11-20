"use client";

import Image from "next/image";
import { Link } from "@/i18n.config";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ChevronRight, Home, MapPin, ShoppingBag, User } from "lucide-react";
import dynamic from "next/dynamic";
import { useLocale, useTranslations } from "next-intl";
import { useUser } from "@/app/_hooks/user-state";

const LogOutModal = dynamic(() =>
  import(
    "@/app/[locale]/(headerAndFooter)/profile/_component/LogOutModal"
  ).then((module) => module.default)
);

const HeaderProfile = () => {
  const t = useTranslations("");
  const localeActive = useLocale();
  const profileMenu = [
    {
      title: t("User.dashboard"),
      href: "/profile/dashboard",
      icon: <Home size={22} />,
    },
    {
      title: t("User.myOrders"),
      href: "/profile/orders",
      icon: <ShoppingBag size={22} />,
    },
    {
      title: t("User.myAddresses"),
      href: "/profile/address",
      icon: <MapPin size={22} />,
    },
    {
      title: t("User.personalInfo"),
      href: "/profile/user-info",
      icon: <User size={22} />,
    },
  ];
  const { user: userData } = useUser();

  if (!userData?.phone_number)
    return (
      <Link
        href="/login"
        className="flex items-center gap-2 border-[0px] sm:border border-[#e0e0e2] rounded-lg p-0 sm:px-4 sm:py-2 text-xs font-semibold transition-all hover:shadow duration-300"
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
        <span className="hidden sm:block">
          {t("Header.login")} | {t("Header.register")}
        </span>
      </Link>
    );
  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="flex items-center icon_hover_system">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width={24}
          height={24}
          fill="none"
          stroke="#212529"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="feather feather-user"
        >
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
          <circle cx="12" cy="7" r="4"></circle>
        </svg>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-52 sm:w-56 text-[$454545]"
        align={localeActive !== "fa" ? "end" : "start"}
      >
        {userData?.first_name && userData?.last_name ? (
          <>
            <DropdownMenuLabel className="p-0">
              <Link
                href={"/profile/dashboard"}
                className="flex w-full justify-between items-center border-b font-semibold py-4 px-3 hover:bg-[#f0f0f1] rounded text-black"
              >
                {`${userData?.first_name} ${userData?.last_name}`}
                <ChevronRight size={18} className="" />
              </Link>
            </DropdownMenuLabel>
          </>
        ) : null}
        {profileMenu?.map((menu, menuIdx) => (
          <DropdownMenuItem key={`menuIdx${menuIdx}`}>
            <Link
              href={menu?.href}
              className="flex items-center gap-3 text-[#454545] text-xs sm:text-[15px] leading-6 sm:gap-4 font-medium w-full px-3 space-y-3"
            >
              {menu?.icon}
              <span className="border-b pb-3 flex-1">{menu?.title}</span>
            </Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuItem>
          <Link href={"#"}>
            <LogOutModal />
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderProfile;
