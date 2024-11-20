import SearchFormContainer from "../../_component/filterSec/SearchFormContainer";
import CategoryCombo from "./CategoryCombo";

const PriceListFilterSec = () => {
  return (
    <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center justify-between ">
      <CategoryCombo />
      <SearchFormContainer />
    </div>
  );
};

export default PriceListFilterSec;
