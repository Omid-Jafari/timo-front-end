import Image from "next/image";
import { Link } from "@/i18n.config";

const SocialLinks = () => {
  return (
    <section className="flex flex-col md:flex-row gap-4 md:gap-6">
      <Link
        className="relative w-full h-auto"
        href="https://www.instagram.com/timo.market?igsh=OGQ5ZDc2ODk2ZA=="
        target="_blank"
      >
        <Image
          src="https://cdn.timobio.com/media/pages/HomeBanner/cover_en/bINSTAGRAM.jpg"
          alt="instagram image"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto object-cover rounded-md"
        />
      </Link>
      <Link
        className="relative w-full h-auto"
        href="https://t.me/timobio"
        target="_blank"
      >
        <Image
          src="https://cdn.timobio.com/media/pages/HomeBanner/cover_en/bA9C0F066-1955-4FFC-9926-271FDCECF7E2.jpeg"
          alt="telegram image"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto object-cover rounded-md"
        />
      </Link>
    </section>
  );
};

export default SocialLinks;
