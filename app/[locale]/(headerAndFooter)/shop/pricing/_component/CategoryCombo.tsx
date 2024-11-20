"use client";

import * as React from "react";
import { Check, ChevronsUpDown, Search } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/app/_components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { cn } from "@/app/_lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import createQueryString from "@/app/_utils/createQueryString";
import { Category } from "@/app/_constant/Categories";
import { getCategoriesData } from "../../_api/productsApi";
import { useLocale, useTranslations } from "next-intl";

const CategoryCombo = () => {
  const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [open, setOpen] = React.useState(false);
  const selectedCategory = useSearchParams().get("catLink") || "";
  const [searchInput, setSearchInput] = React.useState("");
  const localeActive = useLocale();
  const { data: categoriesData } = useQuery({
    queryKey: ["getCategoriesDataQuery"],
    queryFn: () => getCategoriesData(),
  });
  const [catOptions, setCatOptions] = React.useState(categoriesData?.results);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          aria-expanded={open}
          className="w-full sm:w-[200px] bg-white hover:bg-accent transition-colors duration-300 flex items-center justify-between border border-[#e4e4e7] rounded-md py-2 px-3"
        >
          {selectedCategory
            ? categoriesData?.results.find(
                (category: Category) =>
                  category?.link_title === selectedCategory
              )?.title
            : t("btn.chooseCat")}
          <ChevronsUpDown className=" h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        align={localeActive !== "fa" ? "end" : "start"}
        className="w-full sm:w-[200px] p-0"
      >
        <Command>
          <div className="flex items-center border-b px-3">
            <input
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              value={searchInput}
              name="searchInput"
              onChange={(e: any) => {
                setSearchInput(e.target?.value);
                if (e.target?.value === "") {
                  setCatOptions(categoriesData?.results);
                } else {
                  setCatOptions(
                    categoriesData?.results?.filter((catOpt: Category) =>
                      catOpt?.title.includes(e.target?.value)
                    )
                  );
                }
              }}
              placeholder={t("btn.searchCat")}
            />
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          </div>
          <CommandEmpty>{t("btn.noCat")}</CommandEmpty>
          <CommandGroup>
            {catOptions?.map((category: Category) => (
              <CommandItem
                key={category?.link_title}
                value={category?.link_title}
                onSelect={(currentValue) => {
                  router.push(
                    "?" +
                      createQueryString(
                        "catLink",
                        currentValue === selectedCategory
                          ? ""
                          : category?.link_title,
                        searchParams
                      )
                  );
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "ml-1 h-5 w-5",
                    selectedCategory === category?.link_title
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {category?.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default CategoryCombo;
