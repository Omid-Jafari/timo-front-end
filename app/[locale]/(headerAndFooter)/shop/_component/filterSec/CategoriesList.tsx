"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategoriesData } from "../../_api/productsApi";
import SingleCategory from "./SingleCategory";
import { Category } from "@/app/_constant/Categories";
import { memo } from "react";

const CategoriesList = () => {
  const { data: categoriesData } = useQuery({
    queryKey: ["getCategoriesDataQuery"],
    queryFn: () => getCategoriesData(),
  });

  if (categoriesData?.results?.length === 0) return null;

  return (
    <div className="flex flex-col gap-3 max-h-[50vh] overflow-y-auto">
      {categoriesData?.results?.map(
        (singleCategory: Category, categoryIdx: number) => (
          <SingleCategory
            key={`categoryIdx${categoryIdx}`}
            singleCategory={singleCategory}
          />
        )
      )}
    </div>
  );
};

export default memo(CategoriesList);
