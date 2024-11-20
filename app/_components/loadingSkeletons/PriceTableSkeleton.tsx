import { Skeleton } from "../ui/skeleton";

const PriceTableSkeleton = () => {
  return (
    <div className="flex flex-col bg-gray-500 rounded-md border text-center relative">
      <div
        className={`grid grid-cols-6 gap-px font-bold rounded-t-md overflow-hidden text-sm text-white sticky transition-all ease-in-out duration-300 top-[101px] sm:top-[106px]`}
      >
        <div className="col-span-4 py-2 bg-gray-500 flex items-center justify-center">
          محصول
        </div>
        <div className="py-2 bg-gray-500">قیمت</div>
        <div className="py-2 bg-gray-500">حداقل خرید</div>
      </div>
      <div className="flex flex-col [&>*]:bg-[#e9ecef] [&>*:nth-child(even)_span]:bg-[rgba(0,0,0,0.05)] [&>*:nth-child(odd)_span]:bg-white">
        {Array.from({ length: 50 }, (_, k) => (
          <div
            key={`productIdxSkeleton${k}`}
            className="grid grid-cols-6 gap-px font-semibold"
          >
            <span className="col-span-4 py-2 flex items-center justify-center text-sm sm:text-base">
              <Skeleton className="rounded-md w-56 h-6" />
            </span>
            <div className="flex flex-col gap-px">
              <span className="py-2 px-1 h-full flex items-center justify-center">
                <Skeleton className="rounded-md w-24 h-5" />
              </span>
            </div>
            <div className="flex flex-col gap-px">
              <span className="py-2 px-1 h-full flex items-center justify-center text-[12px] sm:text-sm">
                <Skeleton className="rounded-md w-28 h-5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceTableSkeleton;
