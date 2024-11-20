"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import searchIcon from "@/public/common/searchIcon.svg";
import createQueryString from "@/app/_utils/createQueryString";
import { useTranslations } from "use-intl";

const SearchFormContainer = ({ header = false }: { header?: boolean }) => {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = useSearchParams().get("search") || "";
  const [searchState, setSearchState] = useState(search);
  const [touched, setTouched] = useState(false);

  const onSubmit = (e: any) => {
    e?.preventDefault();

    router.push(
      header
        ? "/shop?" +
            createQueryString("search", searchState, searchParams, "page", "1")
        : "?" +
            createQueryString("search", searchState, searchParams, "page", "1"),
      { scroll: false }
    );
  };

  useEffect(() => {
    const delaySearchFn = setTimeout(() => {
      touched &&
        router.push(
          header
            ? "/shop?" +
                createQueryString(
                  "search",
                  searchState,
                  searchParams,
                  "page",
                  "1"
                )
            : "?" +
                createQueryString(
                  "search",
                  searchState,
                  searchParams,
                  "page",
                  "1"
                ),
          { scroll: false }
        );
    }, 750);

    return () => clearTimeout(delaySearchFn);
  }, [header, router, searchParams, searchState, touched]);

  const onChange = (e: any) => {
    setTouched(true);
    setSearchState(e.target?.value);
    // setTimeout(() => {
    //   router.push(
    //     "?" +
    //       createQueryString(
    //         "search",
    //         e?.target?.value,
    //         searchParams,
    //         "page",
    //         "1"
    //       ),
    //     { scroll: false }
    //   );
    // }, 750);
  };

  useEffect(() => {
    setSearchState(search);

    return () => setSearchState("");
  }, [search]);

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3 ">
      <div className="relative w-full">
        <input
          type="text"
          name="search"
          placeholder={t("Header.search")}
          value={searchState}
          onChange={onChange}
          className={`border border-[#e9ecef] w-full rounded-md p-2 outline-none focus:border-primary transition-all duration-300 relative text-sm`}
        />
        <button
          className=" absolute top-1/2 -translate-y-1/2 ltr:right-[4%] rtl:left-[4%]"
          type="submit"
        >
          <Image
            src={searchIcon}
            className="object-contain w-[18px] h-[18px]"
            width={18}
            height={18}
            alt="search icon"
            style={{
              filter:
                "invert(16%) sepia(12%) saturate(342%) hue-rotate(163deg) brightness(99%) contrast(90%)",
            }}
          />
        </button>
      </div>
    </form>
  );
};

export default SearchFormContainer;
