import { getDataSsr } from "@/app/_api/FetchSSR";
import { Link } from "@/i18n.config";
import Image from "next/image";

type Banner = {
  identifier: string;
  cover: string;
  cover_alt: string;
  mobile_cover: null | string;
  url: string;
  size: string;
  position: string;
};
export type BannerData = {
  count: number;
  num_pages: string;
  next: null;
  previous: null;
  results: Banner[];
};
const HomeBanner = async ({ position }: { position: string }) => {
  const bannerData: BannerData = await getDataSsr(
    `site-content/home-banners/?position=${position}`
  );

  if (bannerData?.count > 0)
    return (
      <section className="grid grid-cols-12 gap-4 md:gap-6">
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
              className="w-full h-auto object-contain rounded-md"
            />
          </Link>
        ))}
      </section>
    );
};

export default HomeBanner;
