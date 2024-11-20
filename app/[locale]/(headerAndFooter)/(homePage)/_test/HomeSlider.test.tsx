import { render, screen } from "@testing-library/react";
import HomeSlider from "../_component/slider/HomeSlider";
import { BannerData } from "../_component/banner/HomeBanner";
import { NextIntlClientProvider } from "next-intl";

describe("Banner", () => {
  it("should not return link when no image provided", () => {
    const locale = "fa";
    const messages = require(`../../../../_messages/${locale}.json`);
    const sliderData = {
      count: 1,
      num_pages: 1,
      next: null,
      previous: null,
      results: [
        {
          identifier: "fecee491-35c4-418a-ab68-3539501acfb4",
          cover:
            "https://cdn.timobio.com/media/sliders/home-slider/cover-fa/b6D6DCA67-CFCC-4088-B52C-4484046F0F35.jpeg",
          cover_alt: "تیمو مارکت",
          mobile_cover: null,
          url: "https://www.timobio.com/shop",
        },
      ],
    };
    const bannerData: BannerData = {
      count: 2,
      num_pages: "1",
      next: null,
      previous: null,
      results: [
        {
          identifier: "24ef7f4a-849d-48c5-a00f-639c474a03ab",
          cover:
            "https://cdn.timobio.com/media/banners/home-banner/cover-fa/bsaffronfa-min.jpeg",
          cover_alt: "زعفران",
          mobile_cover: null,
          url: "https://www.timobio.com/shop?catLink=saffron",
          size: "100",
          position: "below_sliders",
        },
        {
          identifier: "3db3e812-5c57-46f1-90f8-ac19bd0f55f2",
          cover:
            "https://cdn.timobio.com/media/banners/home-banner/cover-fa/bricefa-min.jpeg",
          cover_alt: "برنج",
          mobile_cover: null,
          url: "https://www.timobio.com/shop?catLink=rice",
          size: "100",
          position: "below_sliders",
        },
      ],
    };

    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <HomeSlider sliderData={sliderData} bannerData={bannerData} />
      </NextIntlClientProvider>
    );

    const link = screen.getByTestId("sliderLink0");
    expect(link).toBeInTheDocument();
  });
});
