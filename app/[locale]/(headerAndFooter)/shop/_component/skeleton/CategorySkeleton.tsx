import { Skeleton } from "@/app/_components/ui/skeleton";

const CategorySkeleton = () => {
  return (
    <div className="flex flex-col gap-3 max-h-[50vh] overflow-y-auto">
      {Array.from({ length: 33 }, (_, k) => (
        <div
          key={`caregorySkeletonKey${k}`}
          className={`px-1 xl:pl-4 pb-1 border-b border-[#eee] flex items-center gap-2`}
        >
          <Skeleton className="w-[65px] h-[65px] rounded-full" />
          <Skeleton className="flex-1 h-6 rounded-md" />
        </div>
      ))}
    </div>
  );
};

export default CategorySkeleton;
