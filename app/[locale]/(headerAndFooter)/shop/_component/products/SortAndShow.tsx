import dynamic from "next/dynamic";
import ShowComp from "./ShowComp";

const MobileFilterMenu = dynamic(() =>
  import("../filterSec/MobileFilterMenu").then((module) => module.default)
);

const SortAndShow = () => {
  return (
    <div className="flex justify-end items-center">
      <div className="lg:hidden block ltr:mr-auto rtl:ml-auto mt-1 sm:mt-0">
        <MobileFilterMenu />
      </div>
      <ShowComp />
    </div>
  );
};

export default SortAndShow;
