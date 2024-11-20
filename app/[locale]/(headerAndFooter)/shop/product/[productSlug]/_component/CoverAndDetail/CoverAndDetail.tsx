import { SingleProduct } from "@/app/_constant/Product";
import ProductDetail from "./ProductDetail";
import ProductCover from "./ProductCover";

const CoverAndDetail = ({ productData }: { productData: SingleProduct }) => {
  return (
    <div className="flex gap-5 flex-col md:flex-row">
      <ProductCover productCover={productData?.cover} />
      <ProductDetail productData={productData} />
    </div>
  );
};

export default CoverAndDetail;
