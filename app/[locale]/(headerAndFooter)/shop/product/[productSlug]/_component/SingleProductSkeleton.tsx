import { Skeleton } from "@/app/_components/ui/skeleton";

const SingleProductSkeleton = () => {
  return (
    <div className="flex gap-5 flex-col md:flex-row">
      <Skeleton className="w-full md:w-1/2 aspect-square rounded-md" />
      <div className="flex flex-col gap-4 sm:gap-6 justify-center flex-1">
        <Skeleton className="w-52 h-7 rounded-md" />
        <Skeleton className="w-52 h-6 rounded-md" />
        <Skeleton className="w-48 h-5 rounded-md" />
        <Skeleton className="w-48 h-10 rounded-md" />
        <Skeleton className="w-48 h-5 rounded-md" />
        <Skeleton className="w-48 h-5 rounded-md" />
        <hr className="border-[#e9ecef] border-2 rounded-full opacity-25" />
        <div className="flex items-center justify-between">
          <Skeleton className="w-24 h-7 rounded-md" />
          <Skeleton className="w-20 h-6 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default SingleProductSkeleton;
