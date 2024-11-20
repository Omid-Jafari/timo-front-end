"use client";

import { Link, usePathname } from "@/i18n.config";
import { Trash2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { Category } from "@/app/_constant/Categories";
import { getCategoriesData } from "../../_api/productsApi";
import { useTranslations } from "next-intl";

const SelectedFilterSec = ({
  className = "justify-between items-center ",
}: {
  className?: string;
}) => {
  const pathName = usePathname();
  const t = useTranslations("btn");
  const search = useSearchParams().get("search") || undefined;
  const category = useSearchParams().get("catLink") || undefined;
  const FilterList: string[] = [];

  const { data: categoriesData } = useQuery({
    queryKey: ["getCategoriesDataQuery"],
    queryFn: () => getCategoriesData(),
  });

  if (category) {
    FilterList.push(
      categoriesData?.results?.find((catData: Category) => {
        return catData?.link_title === decodeURIComponent(category as string);
      })?.title
    );
  }
  if (search) {
    FilterList.push(search);
  }

  return (
    <div
      className={`flex transition-all duration-1000 -my-1 ${className} ${
        FilterList?.length > 0 ? "max-h-28 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <p className="text-black font-medium">{FilterList?.join(" / ")}</p>
      <Link
        href={`${
          pathName === "/shop/pricing" ? "/shop/pricing" : "/shop"
        }?search=`}
        className="flex items-center gap-1 text-red-500 font-medium py-2"
      >
        <Trash2 className="w-5 h-5" />
        {t("resetFilters")}
      </Link>
    </div>
  );
};

export default SelectedFilterSec;
