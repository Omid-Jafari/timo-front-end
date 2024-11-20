"use client";

import { Home, MapPin, PenLine, ShoppingBag, User } from "lucide-react";
import { Link, usePathname } from "@/i18n.config";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { useUser } from "@/app/_hooks/user-state";

const LogOutModal = dynamic(() =>
  import("./LogOutModal").then((module) => module.default)
);

const ProfileSidebar = () => {
  const t = useTranslations("User");
  const pathname = usePathname();
  const { user } = useUser();

  const profileMenu = [
    {
      title: t("dashboard"),
      href: "/profile/dashboard",
      icon: <Home size={22} />,
    },
    {
      title: t("myOrders"),
      href: "/profile/orders",
      icon: <ShoppingBag size={22} />,
    },
    {
      title: t("myAddresses"),
      href: "/profile/address",
      icon: <MapPin size={22} />,
    },
    {
      title: t("personalInfo"),
      href: "/profile/user-info",
      icon: <User size={22} />,
    },
  ];

  return (
    <aside className="self-start border rounded-md w-full max-w-full md:max-w-[22%] flex flex-col overflow-hidden">
      <div className="flex gap-4 items-center justify-between border-b py-3 mx-4">
        <div className="flex flex-col">
          <h5 className="font-medium">{`${user?.first_name} ${user?.last_name}`}</h5>
          <span className="text-[#a1a3a8] text-sm font-medium" dir="ltr">
            {user?.phone_number}
          </span>
        </div>
        <Link href="/profile/user-info">
          <PenLine color="#19bfd3" size={20} />
        </Link>
      </div>
      {profileMenu?.map((menu, menuIdx) => (
        <Link
          key={`menuIdx${menuIdx}`}
          href={menu?.href}
          className={`flex items-center gap-3 text-xs sm:text-sm sm:gap-4 font-medium hover:text-red-400 w-full px-4 py-4 relative transition-colors duration-500 ${
            pathname === menu?.href ? "text-primary" : ""
          }`}
        >
          {pathname === menu?.href ? (
            <div className="w-1 rounded-l-[2px] bg-primary absolute ltr:left-0 rtl:right-0 top-1/2 -translate-y-1/2 h-[70%]"></div>
          ) : null}
          {menu?.icon}
          <span>{menu?.title}</span>
          <div className="h-px w-[88%] bg-[#e2e8f0] absolute bottom-0 left-1/2 -translate-x-1/2"></div>
        </Link>
      ))}
      <LogOutModal />
    </aside>
  );
};

export default ProfileSidebar;
