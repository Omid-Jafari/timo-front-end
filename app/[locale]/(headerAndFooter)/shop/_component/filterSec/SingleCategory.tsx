import { Category } from "@/app/_constant/Categories";
import Image from "next/image";
import { Link } from "@/i18n.config";
import { useSearchParams } from "next/navigation";
import createQueryString from "@/app/_utils/createQueryString";

const SingleCategory = ({ singleCategory }: { singleCategory: Category }) => {
  const searchParams = useSearchParams();
  const category = searchParams.get("catLink");

  return (
    <Link
      onClick={() =>
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        })
      }
      className={`transition-colors group/subM px-1 xl:pl-4 border-b border-[#eee] hover:text-[#7b7b7b] ease-in-out duration-300 relative flex items-center gap-2 font-semibold ${
        decodeURIComponent(category as string) === singleCategory?.link_title
          ? "text-[#7b7b7b]"
          : "text-black"
      }`}
      href={`/shop?${createQueryString(
        "catLink",
        singleCategory?.link_title,
        searchParams,
        "page",
        "1"
      )}`}
    >
      <Image
        src={singleCategory?.cover}
        className="object-contain w-[50px] sm:w-[65px] h-[50px] sm:h-[65px] flex-shrink-0"
        width={65}
        height={65}
        sizes="33vw"
        alt={singleCategory?.cover_alt}
      />
      <span className="">{singleCategory?.title}</span>
      <div
        className={`group-hover/subM:w-full group-hover/subM:right-0 duration-200 absolute left-0 bottom-0 h-[2px] bg-primary transition-all ease-in-out ${
          decodeURIComponent(category as string) === singleCategory?.link_title
            ? "w-full"
            : "w-0"
        }`}
      ></div>
    </Link>
  );
};

export default SingleCategory;
