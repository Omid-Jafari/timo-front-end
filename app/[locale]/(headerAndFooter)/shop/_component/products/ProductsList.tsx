import { Product, ProductResponse } from "@/app/_constant/Product";
import dynamic from "next/dynamic";
import RowShowProduct from "./RowShowProduct";
import NoProductFound from "./NoProductFound";

const CardShowProduct = dynamic(() =>
  import("./CardShowProduct").then((module) => module.default)
);
const ProductPagination = dynamic(() =>
  import("./ProductPagination").then((module) => module.default)
);

const ProductsList = ({
  productsData,
  cardShow,
}: {
  productsData: ProductResponse;
  cardShow: string;
}) => {
  return productsData?.results?.length === 0 ? (
    <NoProductFound />
  ) : (
    <>
      <div
        className={`grid gap-2 md:gap-3 ${
          +cardShow === 1
            ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
            : "grid-cols-1 sm:grid-cols-2"
        }`}
        data-testid={`productListContainer`}
      >
        {productsData?.results?.map((product: Product, productIdx: number) =>
          +cardShow === 1 ? (
            <CardShowProduct
              product={product}
              key={`cardShowProductIdx${productIdx}`}
            />
          ) : (
            <RowShowProduct
              product={product}
              key={`rowShowProductIdx${productIdx}`}
            />
          )
        )}
      </div>
      {+productsData?.num_pages > 1 ? (
        <div
          className="w-full flex overflow-hidden"
          data-testid={`productWithPagination`}
        >
          <ProductPagination pagesCount={+productsData?.num_pages} />
        </div>
      ) : null}
    </>
  );
};

export default ProductsList;
