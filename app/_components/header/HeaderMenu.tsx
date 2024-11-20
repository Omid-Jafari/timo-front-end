"use client";

import useScrollDirection from "@/app/_hooks/useScrollDirection";
import Image from "next/image";
import { Link, usePathname } from "@/i18n.config";
import { useSearchParams } from "next/navigation";
import HeaderSearchInp from "./HeaderSearchInp";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@/app/_constant/Categories";
import HeaderPhone from "./HeaderPhone";
import { useTranslations } from "next-intl";
import { getCategoriesData } from "@/app/[locale]/(headerAndFooter)/shop/_api/productsApi";

const HeaderMenu = () => {
  const pathName = usePathname();
  const category = useSearchParams().get("catLink") || undefined;
  const scrollDirection = useScrollDirection();
  const t = useTranslations("Header");
  const menuItems = [
    { name: t("home"), path: "/", svg: "/common/home.svg" },
    { name: t("shop"), path: "/shop", svg: "/common/shop.svg" },
    {
      name: t("categories"),
      path: "/#categories",
      type: 2,
      svg: "/common/category.svg",
    },
    {
      name: t("pricing"),
      path: "/shop/pricing",
      svg: "/common/order.svg",
    },
    { name: t("aboutUs"), path: "#", svg: "/common/about-us.svg" },
  ];

  const { data: categoriesData } = useQuery({
    queryKey: ["getCategoriesDataQuery"],
    queryFn: () => getCategoriesData(),
  });

  return (
    <div
      className={`flex items-center justify-between transition-all ease-in-out duration-300 container-4xl-w  ${
        scrollDirection === "down"
          ? "max-h-0 pointer-events-none opacity-0"
          : "max-h-[50px] pointer-events-auto opacity-100"
      }`}
    >
      <HeaderSearchInp className="sm:hidden flex w-full mt-1 mb-2" />
      <div className="hidden sm:flex items-center gap-3 md:gap-5 text-sm font-medium pt-3">
        {menuItems?.map((menuItem, menuItemIdx) => (
          <div
            key={`menuItemIdx${menuItemIdx}`}
            className="relative group pb-3"
          >
            <Link
              className={`transition-colors hover:text-[#2d2e48] ease-in-out duration-200 pb-3 ${
                pathName === menuItem?.path
                  ? "text-[#2d2e48]"
                  : "text-[#62666D]"
              }`}
              href={menuItem?.path}
            >
              {menuItem?.name}
              <div
                className={`group-hover:w-full group-hover:right-0 duration-200 absolute left-0 bottom-0 w-0 h-[2px] bg-primary transition-all ease-in-out ${
                  pathName === menuItem?.path ? "w-full" : ""
                }`}
              ></div>
            </Link>
            {menuItem?.type === 2 ? (
              <div className="bg-white opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto absolute trl:right-0 ltr:left-0 top-full shadow-md z-50 flex flex-col gap-1 w-[200px] rounded-md overflow-hidden transition-all duration-500 pt-1 max-h-96 overflow-y-auto">
                {categoriesData?.results?.map(
                  (subMenu: Category, subMenuIdx: number) => (
                    <Link
                      className={`transition-colors group/subM px-1 border-b border-[#eee] hover:text-[#212529] ease-in-out duration-200 relative flex items-center gap-1 ${
                        category === subMenu?.link_title
                          ? "text-[#212529]"
                          : "text-[#62666D]"
                      }`}
                      href={`/shop?catLink=${subMenu?.link_title}`}
                      key={`subMenuIdx${subMenuIdx}`}
                    >
                      <Image
                        src={subMenu?.cover}
                        className="object-contain w-[50px] h-[50px] flex-shrink-0"
                        width={50}
                        height={50}
                        alt={subMenu?.cover_alt}
                      />
                      <span className="">{subMenu?.title}</span>
                      <div
                        className={`group-hover/subM:w-full group-hover/subM:right-0 duration-200 absolute left-0 bottom-0 h-[2px] bg-primary transition-all ease-in-out ${
                          category === subMenu?.link_title ? "w-full" : "w-0"
                        }`}
                      ></div>
                    </Link>
                  )
                )}
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <HeaderPhone />
    </div>
  );
};

export default HeaderMenu;
