import dynamic from "next/dynamic";
import HomeSliderContainer from "./_component/slider/HomeSliderContainer";

const HomeBanner = dynamic(() =>
  import("./_component/banner/HomeBanner").then((module) => module.default)
);
const CategorySec = dynamic(() =>
  import("./_component/categorySec/CategorySec").then(
    (module) => module.default
  )
);
const SpecialProducts = dynamic(() =>
  import("./_component/specialProducts/SpecialProducts").then(
    (module) => module.default
  )
);
const SocialLinks = dynamic(() =>
  import("./_component/socialLinks/SocialLinks").then(
    (module) => module.default
  )
);

export default function Home() {
  return (
    <main className="container-2xl-w flex flex-col gap-12 lg:gap-[70px]">
      <HomeBanner position="above_sliders" />
      <HomeSliderContainer />
      <HomeBanner position="below_sliders" />
      <CategorySec />
      <HomeBanner position="below_categories" />
      <SocialLinks />
      <SpecialProducts />
      <HomeBanner position="below_suggested_products" />
    </main>
  );
}
