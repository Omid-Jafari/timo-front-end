"use client";

import createQueryString from "@/app/_utils/createQueryString";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import Loading from "../common/Loading";

const HeaderSearchInp = ({ className }: { className: string }) => {
  const [searchState, setSearchState] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("Header");
  const [isPending, startTransition] = useTransition();

  const onChange = (e: any) => {
    setSearchState(e.target?.value);
  };
  const onSubmit = (e: any) => {
    e?.preventDefault();
    startTransition(() =>
      router.push(
        "/shop?" +
          createQueryString("search", searchState, searchParams, "page", "1"),
        { scroll: false }
      )
    );
  };

  return (
    <form
      onSubmit={onSubmit}
      className={`bg-[#f0f0f1] rounded-lg p-2 items-center gap-2 ${className} relative overflow-hidden`}
    >
      {isPending ? (
        <div className="w-full flex justify-center items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-30">
          <Loading bg="bg-primary" />
        </div>
      ) : null}
      <button type="submit">
        <Image
          src="/common/searchIcon.svg"
          className="object-contain w-[24px] h-[24px]"
          width={0}
          height={0}
          alt="logo"
          style={{
            filter:
              "invert(52%) sepia(4%) saturate(522%) hue-rotate(177deg) brightness(99%) contrast(87%)",
          }}
        />
      </button>
      <input
        value={searchState}
        onChange={onChange}
        type="text"
        className="placeholder:text-[#81858B] appearance-none bg-inherit outline-none flex-1 text-xs"
        placeholder={t("search")}
      />
    </form>
  );
};

export default HeaderSearchInp;
