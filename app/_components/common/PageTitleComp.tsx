import { ChevronLeft } from "lucide-react";
import { Link } from "@/i18n.config";
import { useTranslations } from "next-intl";

const PageTitleComp = ({
  title,
  className = "",
  extraLinks,
}: {
  title: string;
  className?: string;
  extraLinks?: { title: string; href: string }[];
}) => {
  const t = useTranslations();

  if (!title) return null;

  return (
    <div
      className={`flex items-center flex-col ${className} mb-4 sm:mb-6 md:mb-8 lg:mb-12 w-full overflow-x-hidden px-4 capitalize`}
    >
      <div
        className="absolute w-full h-[202px] sm:h-[222px] md:h-[230px] lg:h-[263px] bg-[#f8f9fa] top-0 left-1/2 -translate-x-1/2 z-20"
        style={{ clipPath: "ellipse(100% 55% at 48% 48%)" }}
      ></div>
      <h1 className="font-semibold text-xl sm:text-3xl line-clamp-1 z-30 mb-4 sm:mb-6 md:mb-8 lg:mb-12 lg:mt-4">
        {title}
      </h1>
      <div className="flex items-center gap-1 sm:gap-2 font-semibold text-sm z-30 bg-white rounded-md border px-4 sm:px-6 py-2 flex-wrap">
        <Link href="/">{t("Header.home")}</Link>
        <ChevronLeft size={16} className="ltr:rotate-180" />
        {extraLinks?.map(
          (exLink: { title: string; href: string }, exLinkIdx: number) => (
            <>
              <Link
                href={exLink?.href}
                key={`exLinkIdx${exLinkIdx}`}
                className="line-clamp-1"
              >
                {exLink?.title}
              </Link>
              <ChevronLeft size={16} className="ltr:rotate-180" />
            </>
          )
        )}
        <span className="text-primary line-clamp-1">{title}</span>
      </div>
    </div>
  );
};

export default PageTitleComp;
