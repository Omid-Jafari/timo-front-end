import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/_components/ui/drawer";
import FilterSec from "./FilterSec";
import Image from "next/image";
import { useTranslations } from "next-intl";

const MobileFilterMenu = () => {
  const t = useTranslations("Product");

  return (
    <Drawer>
      <DrawerTrigger className="flex items-center gap-2 font-semibold rounded-full border px-3 py-2 text-[#767676]">
        {t("filter")}
        <Image
          src="/common/filterIcon.svg"
          className="object-contain"
          width={20}
          height={20}
          alt="shopping cart"
          style={{
            filter: `invert(45%) sepia(8%) saturate(14%) hue-rotate(358deg) brightness(100%) contrast(89%)`,
          }}
        />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{t("filterTitle")}</DrawerTitle>
        </DrawerHeader>
        <div className="p-2 flex flex-col gap-4">
          <FilterSec />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileFilterMenu;
