"use client";

import useScrollDirection from "@/app/_hooks/useScrollDirection";
import { memo, ReactNode } from "react";

const FilterSectionContainer = ({
  children,
  mt = "mt-1",
}: {
  children: ReactNode;
  mt?: string;
}) => {
  const scrollDirection = useScrollDirection();

  return (
    <aside className={`relative hidden lg:block ${mt}`}>
      <div
        className={`p-4 xl:p-5 border border-[#e9ecef] rounded-md flex flex-col gap-4 sticky transition-all ease-in-out duration-300 ${
          scrollDirection === "down" ? "top-[62px]" : "top-[106px]"
        }`}
      >
        {children}
      </div>
    </aside>
  );
};

export default memo(FilterSectionContainer);
