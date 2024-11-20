"use client";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import required modules
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { Product } from "@/app/_constant/Product";
import CardShowProduct from "../../../../_component/products/CardShowProduct";
import { getRelatedProducts } from "../../../../_api/productsApi";

const RelativeProductsSlider = () => {
  const { productSlug } = useParams();

  const { data } = useQuery({
    queryKey: ["getRelateProductsQuery", productSlug],
    queryFn: () => getRelatedProducts(productSlug as string),
  });
  const relateProductsData = data?.results;

  return (
    <Swiper
      modules={[Navigation, Autoplay, Pagination]}
      breakpoints={{
        300: {
          slidesPerView: 2,
        },
        450: {
          slidesPerView: 2,
        },
        576: {
          slidesPerView: 3,
        },
        740: {
          slidesPerView: 3,
        },
        1054: {
          slidesPerView: 4,
        },
        1280: {
          slidesPerView: 4,
        },
      }}
      className="w-full !pb-10 sm:!pb-12"
      autoplay={{
        delay: 3000,
        pauseOnMouseEnter: true,
        disableOnInteraction: true,
      }}
      pagination={{ clickable: true }}
      spaceBetween={8}
    >
      {relateProductsData
        ?.slice(0, 12)
        ?.map((relatedProduct: Product, relatedProductIdx: number) => (
          <SwiperSlide
            key={`relatedProductIdx${relatedProductIdx}`}
            className={`!h-auto`}
          >
            <CardShowProduct product={relatedProduct} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default RelativeProductsSlider;
