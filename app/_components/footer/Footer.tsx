import dynamic from "next/dynamic";
import SiteShortAbout from "./SiteShortAbout";
import FooterFeatures from "./FooterFeatures";
import { memo } from "react";

const LogoComp = dynamic(() =>
  import("../common/LogoComp").then((module) => module.default)
);
const FooterContacts = dynamic(() =>
  import("./FooterContacts").then((module) => module.default)
);
const FooterCopright = dynamic(() =>
  import("./FooterCopright").then((module) => module.default)
);
const FooterQuickAccess = dynamic(() =>
  import("./FooterQuickAccess").then((module) => module.default)
);

const Footer = () => {
  return (
    <footer className="bg-[#f8f9fa] py-5 px-4 lg:px-8 xl:px-12 lg:pt-12 text-[#8492a6] lg:mt-10">
      <div className="container-4xl-w flex flex-col gap-7">
        <div className="flex flex-wrap lg:flex-nowrap justify-between gap-y-8 gap-x-5 lg:gap-x-8 xl:gap-10">
          <div className="flex flex-col gap-5 md:max-w-[330px] lg:mt-[-23px]">
            <LogoComp className="object-contain w-[104px] h-[70px]" />
            <SiteShortAbout />
          </div>
          <div className="w-full h-px bg-[#283453] md:hidden"></div>
          <FooterQuickAccess />
          <div className="w-full h-px bg-[#283453] md:hidden"></div>
          <FooterContacts />
        </div>
        <div className="w-full h-px bg-[#283453]"></div>
        <FooterFeatures />
        <div className="w-full h-px bg-[#283453]"></div>
        <FooterCopright />
      </div>
    </footer>
  );
};

export default memo(Footer);
