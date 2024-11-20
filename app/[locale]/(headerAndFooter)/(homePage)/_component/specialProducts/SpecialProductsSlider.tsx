"use client";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";

// import required modules
import { FreeMode, Navigation, Pagination, Autoplay } from "swiper/modules";
import { Product, ProductResponse } from "@/app/_constant/Product";
import CardShowProduct from "../../../shop/_component/products/CardShowProduct";

const SpecialProductsSlider = ({
  specialProductData,
}: {
  specialProductData: ProductResponse;
}) => {
  if (specialProductData?.results.length === 0) return null;

  return (
    <Swiper
      modules={[FreeMode, Navigation, Pagination, Autoplay]}
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
          slidesPerView: 5,
        },
      }}
      className="w-full !pb-6 sm:!pb-8"
      autoplay={{
        delay: 3000,
        pauseOnMouseEnter: true,
        disableOnInteraction: true,
      }}
      pagination={{ clickable: true }}
      spaceBetween={8}
      loop
      data-testid="relatedProductsSlider"
    >
      {specialProductData?.results
        ?.slice(0, 9)
        ?.map((specialProduct: Product, specialProductIdx: number) => (
          <SwiperSlide
            key={`specialProductIdx${specialProductIdx}`}
            className={`!h-auto`}
          >
            <CardShowProduct product={specialProduct} />
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default SpecialProductsSlider;
