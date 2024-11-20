import HeaderMenu from "./HeaderMenu";
import LogoComp from "../common/LogoComp";
import dynamic from "next/dynamic";
import { memo } from "react";

const HeaderCart = dynamic(
  () => import("./headerCart/HeaderCart").then((module) => module.default),
  { ssr: false }
);
const HeaderHamberMenu = dynamic(
  () => import("./HeaderHamberMenu").then((module) => module.default),
  { ssr: false }
);
const HeaderProfile = dynamic(
  () => import("./HeaderProfile").then((module) => module.default),
  { ssr: false }
);
const SwitchLocale = dynamic(
  () => import("./SwitchLocale").then((module) => module.default),
  { ssr: false }
);
const HeaderSearchInp = dynamic(
  () => import("./HeaderSearchInp").then((module) => module.default),
  { ssr: false }
);

const Header = () => {
  return (
    <header className="flex flex-col gap-2 mx-auto w-full pt-2 sm:pt-3 px-2 sm:px-3 md:px-4 lg:px-5 xl:px-4 shadow-[0_1px_0_rgba(0,0,0,.14),0_2px_0_rgba(0,0,0,.05)] sticky top-0 bg-white z-40">
      <div className="flex items-center gap-3 container-4xl-w">
        <LogoComp className="object-contain w-[66px] h-[45px]" />
        <SwitchLocale />
        <HeaderSearchInp className="hidden sm:flex min-w-[40%] lg:min-w-[600px]" />
        <div className="flex items-center gap-2 sm:gap-4 rtl:mr-auto ltr:ml-auto">
          <HeaderProfile />
          <div className="h-6 sm:h-8 w-px bg-[#e0e0e2]"></div>
          <HeaderCart />
          <div className="h-6 sm:h-8 sm:hidden w-px bg-[#e0e0e2]"></div>
          <HeaderHamberMenu />
        </div>
      </div>
      <HeaderMenu />
    </header>
  );
};

export default memo(Header);
