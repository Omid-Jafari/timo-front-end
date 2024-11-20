"use client";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-creative";
// import required modules
import {
  Navigation,
  Autoplay,
  Pagination,
  EffectCreative,
} from "swiper/modules";
import Image from "next/image";
import { Link } from "@/i18n.config";
import { BannerData } from "../banner/HomeBanner";

type Slider = {
  identifier: string;
  cover: string;
  cover_alt: string;
  mobile_cover: null | string;
  url: string;
};

type SliderData = {
  count: number;
  num_pages: number;
  next: null;
  previous: null;
  results: Slider[];
};
const HomeSlider = ({
  sliderData,
  bannerData,
}: {
  sliderData: SliderData;
  bannerData: BannerData;
}) => {
  return (
    <>
      <div
        className={`homeSlider ${
          bannerData?.count > 0 ? "col-span-9" : "col-span-12"
        }`}
        dir="ltr"
      >
        <Swiper
          modules={[Navigation, Autoplay, Pagination, EffectCreative]}
          slidesPerView={1}
          className="w-full h-full"
          autoplay={{
            delay: 3000,
            pauseOnMouseEnter: true,
            disableOnInteraction: true,
          }}
          pagination={{ clickable: true }}
          effect={"creative"}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: [0, 0, -400],
            },
            next: {
              translate: ["100%", 0, 0],
            },
          }}
          loop
        >
          {sliderData?.results?.map((slider: Slider, sliderIdx: number) => (
            <SwiperSlide key={`sliderIdx${sliderIdx}`}>
              <Link
                data-testid={`sliderLink${sliderIdx}`}
                className="relative w-full h-full"
                href={slider?.url}
              >
                <Image
                  src={slider?.cover}
                  alt={slider?.cover_alt}
                  width={0}
                  height={0}
                  sizes="100vw"
                  priority
                  className="w-full h-auto object-cover rounded-md hidden md:block"
                />
                <Image
                  src={
                    slider?.mobile_cover ? slider?.mobile_cover : slider?.cover
                  }
                  alt={slider?.cover_alt}
                  width={0}
                  height={0}
                  sizes="100vw"
                  priority
                  className="w-full h-auto object-cover rounded-md md:hidden block"
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      {bannerData?.count > 0 ? (
        <div className="col-span-3 grid grid-cols-12 gap-4 md:gap-6">
          {bannerData?.results?.map((banner, bannerIdx) => (
            <Link
              className={`relative h-auto col-span-12 ${
                +banner?.size === 50
                  ? "md:col-span-6"
                  : +banner?.size === 25
                  ? "md:col-span-3"
                  : +banner?.size === 75
                  ? "md:col-span-9"
                  : "md:col-span-12"
              }`}
              href={banner?.url}
              key={`bannerIdx${bannerIdx}`}
            >
              <Image
                src={banner?.cover}
                alt={banner?.cover_alt}
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-auto object-cover rounded-md"
              />
            </Link>
          ))}
        </div>
      ) : null}
    </>
  );
};

export default HomeSlider;
