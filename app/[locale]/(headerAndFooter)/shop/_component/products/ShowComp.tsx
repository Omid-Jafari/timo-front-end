"use client";

import createQueryString from "@/app/_utils/createQueryString";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const ShowComp = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const cardShow = useSearchParams().get("cardShow") || "0";
  const changeShow = (value: string) => {
    router.push(
      pathname + "?" + createQueryString("cardShow", value, searchParams)
    );
  };

  return (
    <div className="flex items-center gap-1 ">
      <button
        onClick={() => changeShow("1")}
        className={`w-8 h-8 flex items-center justify-center rounded-md transition-all duration-300 ${
          +cardShow === 1 ? "bg-[#e4000f34] shadow-inner" : ""
        }`}
      >
        <Image
          src="/common/deactiveCardBtn.svg"
          width={22}
          height={22}
          alt=""
          className="transition-all duration-300"
          style={{
            filter:
              +cardShow === 1
                ? `invert(17%) sepia(96%) saturate(4201%) hue-rotate(346deg) brightness(81%) contrast(126%)`
                : `invert(45%) sepia(8%) saturate(14%) hue-rotate(358deg) brightness(100%) contrast(89%)`,
          }}
        />
      </button>
      <button
        onClick={() => changeShow("0")}
        className={`w-8 h-8 flex items-center justify-center rounded-md transition-all duration-300 ${
          +cardShow === 0 ? "bg-[#e4000f34] shadow-inner" : ""
        }`}
      >
        <Image
          src="/common/deactiveRowShow.svg"
          width={18}
          height={18}
          alt=""
          className="transition-all duration-300"
          style={{
            filter:
              +cardShow === 0
                ? `invert(17%) sepia(96%) saturate(4201%) hue-rotate(346deg) brightness(81%) contrast(126%)`
                : `invert(45%) sepia(8%) saturate(14%) hue-rotate(358deg) brightness(100%) contrast(89%)`,
          }}
        />
      </button>
    </div>
  );
};

export default ShowComp;
