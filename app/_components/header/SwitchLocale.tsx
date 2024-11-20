"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import Image from "next/image";
import { useTransition } from "react";
import { useLocale } from "next-intl";
import Loading from "../common/Loading";
import { usePathname, useRouter } from "@/i18n.config";
import { getCookie } from "cookies-next";

const SwitchLocale = () => {
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const router = useRouter();
  const localeActive = useLocale();

  return (
    <Select
      defaultValue={localeActive}
      onValueChange={(e) => {
        startTransition(() => {
          router.push(pathname, { locale: e });
        });
      }}
    >
      <SelectTrigger className="relative overflow-hidden" disabled={isPending}>
        {isPending ? (
          <div className="w-full flex justify-center items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-30">
            <Loading bg="bg-primary" />
          </div>
        ) : null}
        <SelectValue />
      </SelectTrigger>
      <SelectContent align={localeActive !== "fa" ? "start" : "end"}>
        <SelectItem value="fa">
          <div className="flex items-center gap-1 justify-between w-full font-medium">
            <span>فارسی</span>
            <Image
              src="https://cdn.timobio.com/static/addon/site/images/country-flags/fa.webp"
              width={17}
              height={13}
              alt="country flag"
            />
          </div>
        </SelectItem>
        <SelectItem value="tr">
          <div className="flex items-center gap-1 justify-between w-full font-medium">
            <span>Türkçe</span>
            <Image
              src="https://cdn.timobio.com/static/addon/site/images/country-flags/tr.webp"
              width={17}
              height={13}
              alt="country flag"
            />
          </div>
        </SelectItem>
        <SelectItem value="en">
          <div className="flex items-center gap-1 justify-between w-full font-medium">
            <span>English</span>
            <Image
              src="https://cdn.timobio.com/static/addon/site/images/country-flags/en.webp"
              width={17}
              height={13}
              alt="country flag"
            />
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  );
};

export default SwitchLocale;
