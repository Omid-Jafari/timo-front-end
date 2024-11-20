import { Skeleton } from "@/app/_components/ui/skeleton";

const ProductSkeleton = ({
  paramCardShow = "0",
}: {
  paramCardShow?: string;
}) => {
  const cardShow = paramCardShow;

  return (
    <div
      className={`flex-1 grid gap-2 md:gap-3 ${
        +cardShow === 1
          ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
          : "grid-cols-1 sm:grid-cols-2"
      }`}
    >
      {Array.from({ length: 50 }, (_, k) =>
        +cardShow === 1 ? (
          <div
            className="p-2 md:p-3 border border-[#e9ecef] rounded-md sm:rounded-2xl flex flex-col text-center justify-between items-center gap-2 md:gap-3 hover:shadow-lg transition-all duration-300 bg-white"
            key={`cardProductSkeletonKey${k}`}
          >
            <Skeleton className="w-full aspect-square rounded-md" />
            <Skeleton className="w-full h-7 rounded-md" />
            <Skeleton className="w-5/6 h-[22px] rounded-md" />
            <Skeleton className="w-5/6 h-[22px] rounded-md" />
            <Skeleton className="w-full h-8 sm:h-10 rounded-md" />
          </div>
        ) : (
          <div
            className="p-2 border border-[#e9ecef] rounded-lg sm:rounded-2xl justify-between items-center flex gap-2 hover:shadow-lg transition-all duration-300 bg-white"
            key={`rowProductSkeletonKey${k}`}
          >
            <Skeleton className="w-1/3 aspect-square rounded-md" />
            <div className="flex-1 flex flex-col gap-2 xl:flex-row xl:items-center">
              <div className="flex-1 flex flex-col gap-2">
                <Skeleton className="w-full h-7 rounded-md" />
                <Skeleton className="w-4/5 h-6 rounded-md" />
                <Skeleton className="w-4/5 h-6 rounded-md" />
              </div>
              <Skeleton className="w-[104px] h-8 sm:h-10 rounded-md" />
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default ProductSkeleton;
