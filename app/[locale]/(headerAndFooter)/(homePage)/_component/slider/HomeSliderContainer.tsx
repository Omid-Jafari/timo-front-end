import HomeSlider from "./HomeSlider";
import { getDataSsr } from "@/app/_api/FetchSSR";

const HomeSliderContainer = async () => {
  const sliderData = await getDataSsr(`site-content/home-sliders/`);
  const bannerData = await getDataSsr(
    `site-content/home-banners/?position=next_to_sliders`
  );

  return (
    <section className="grid grid-cols-12 gap-4 md:gap-6">
      <HomeSlider sliderData={sliderData} bannerData={bannerData} />
    </section>
  );
};

export default HomeSliderContainer;
