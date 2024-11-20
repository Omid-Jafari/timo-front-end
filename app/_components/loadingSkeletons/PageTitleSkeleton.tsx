import { Skeleton } from "../ui/skeleton";

const PageTitleSkeleton = () => {
  return (
    <div className={`flex items-center flex-col mb-4 sm:mb-6 md:mb-8`}>
      <div
        className="absolute w-full h-[202px] sm:h-[222px] md:h-[230px] lg:h-[263px] bg-[#f8f9fa] top-0 left-1/2 -translate-x-1/2 z-20"
        style={{ clipPath: "ellipse(100% 55% at 48% 48%)" }}
      ></div>

      <Skeleton className="z-30 mb-4 sm:mb-6 md:mb-8 lg:mb-12 lg:mt-4 w-36 h-10 rounded-md" />
      <div className="flex items-center gap-1 sm:gap-2 font-semibold text-sm z-30 bg-white rounded-md border px-6 py-2">
        <Skeleton className="z-30 w-40 h-7 rounded-md" />
      </div>
    </div>
  );
};

export default PageTitleSkeleton;
