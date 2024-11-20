import { Skeleton } from "@/app/_components/ui/skeleton";
import SingleProductSkeleton from "./_component/SingleProductSkeleton";
import PageTitleSkeleton from "@/app/_components/loadingSkeletons/PageTitleSkeleton";
import CategorySkeleton from "../../_component/skeleton/CategorySkeleton";

const Loading = () => {
  return (
    <main className="flex flex-col gap-1 sm:gap-2 container-2xl-w">
      <PageTitleSkeleton />
      <div className="flex gap-3">
        <div className={`relative hidden lg:block mt-1 `}>
          <div
            className={`p-4 xl:p-5 border border-[#e9ecef] rounded-2xl flex flex-col gap-4 sticky transition-all ease-in-out duration-300 top-[106px] w-[250px] xl:w-[270px]`}
          >
            <Skeleton className="w-full h-9 rounded-md" />
            <Skeleton className="w-28 h-10 rounded-md" />
            <CategorySkeleton />
          </div>
        </div>
        <div
          className={`p-3 sm:p-4 xl:p-5 flex-1 flex flex-col gap-6 border border-[#e9ecef] rounded-md mt-1 w-1/2`}
        >
          <SingleProductSkeleton />
          <hr className="border-[#e9ecef] border-2 rounded-full opacity-25" />
        </div>
      </div>
    </main>
  );
};

export default Loading;
