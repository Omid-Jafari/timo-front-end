import { Skeleton } from "@/app/_components/ui/skeleton";
import PageTitleSkeleton from "@/app/_components/loadingSkeletons/PageTitleSkeleton";
import CategorySkeleton from "./skeleton/CategorySkeleton";
import ProductSkeleton from "./skeleton/ProductSkeleton";

const ShopLoading = () => {
  return (
    <main className="flex flex-col gap-1 sm:gap-2 container-2xl-w">
      <PageTitleSkeleton />
      <div className="flex gap-3">
        <div className={`relative hidden lg:block mt-[37px] `}>
          <div
            className={`p-4 xl:p-5 border border-[#e9ecef] rounded-2xl flex flex-col gap-4 sticky transition-all ease-in-out duration-300 top-[106px] w-[250px] xl:w-[270px]`}
          >
            <Skeleton className="w-full h-9 rounded-md" />
            <Skeleton className="w-28 h-10 rounded-md" />
            <CategorySkeleton />
          </div>
        </div>
        <div className={`flex-1 flex flex-col gap-2`}>
          <div className="flex items-center gap-2 justify-end">
            <Skeleton className="w-8 h-8 rounded-md" />
            <Skeleton className="w-8 h-8 rounded-md" />
          </div>
          <ProductSkeleton paramCardShow={"0"} />
        </div>
      </div>
    </main>
  );
};

export default ShopLoading;
