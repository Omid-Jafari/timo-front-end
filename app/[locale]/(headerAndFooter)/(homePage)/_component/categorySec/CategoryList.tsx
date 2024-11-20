"use client";

import { Category } from "@/app/_constant/Categories";
import Image from "next/image";
import { Link } from "@/i18n.config";
import { useQuery } from "@tanstack/react-query";
import { getCategoriesData } from "../../../shop/_api/productsApi";

const CategoryList = () => {
  const { data: catData } = useQuery({
    queryKey: ["getCategoriesDataQuery"],
    queryFn: () => getCategoriesData(),
  });

  if (catData?.results?.length === 0) return null;

  return (
    <div className="flex justify-center flex-wrap gap-x-4 sm:gap-x-6">
      {catData?.results?.map((cat: Category, catIdx: number) => (
        <Link
          key={`catIdx${catIdx}`}
          className={`group flex-[0_0_calc(50%-20px)] sm:flex-[0_0_calc(25%-24px)] md:flex-[0_0_calc(16.66%-24px)] flex flex-col items-center`}
          href={`/shop?catLink=${cat?.link_title}`}
        >
          <div className="relative w-full aspect-square group-hover:scale-105 transition-all duration-300">
            <Image
              src={cat?.cover}
              className="object-contain w-full h-full"
              width={0}
              height={0}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
              alt={cat?.cover_alt}
            />
          </div>
          <strong className="font-semibold text-base z-10">{cat?.title}</strong>
        </Link>
      ))}
    </div>
  );
};

export default CategoryList;
