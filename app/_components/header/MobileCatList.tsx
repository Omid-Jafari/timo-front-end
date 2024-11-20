import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/_components/ui/accordion";
import Image from "next/image";
import { Category } from "@/app/_constant/Categories";
import { SheetClose } from "../ui/sheet";
import { Link } from "@/i18n.config";
import { getCategoriesData } from "@/app/[locale]/(headerAndFooter)/shop/_api/productsApi";

const MobileCatList = ({
  menuItem,
}: {
  menuItem: { name: string; path: string; type: number; svg: string };
}) => {
  const category = useSearchParams().get("catLink") || undefined;
  const { data: categoriesData } = useQuery({
    queryKey: ["getCategoriesDataQuery"],
    queryFn: () => getCategoriesData(),
  });
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue={!!category ? "item" : ""}
    >
      <AccordionItem value={`item`}>
        <AccordionTrigger
          className={`py-2 px-4 flex items-center justify-start text-[#454545] gap-3 font-medium text-base rounded-md  transition-all duration-300 [&[data-state=open]]:text-white [&[data-state=open]]:bg-primary [&[data-state=open]>svg]:rotate-180 [&[data-state=open]>img]:invert-[97%] [&[data-state=open]>img]:sepia-[4%] [&[data-state=open]>img]:saturate-[374%] [&[data-state=open]>img]:hue-rotate-[35deg] [&[data-state=open]>img]:brightness-[118%] [&[data-state=open]>img]:contrast-[100%]`}
        >
          <Image
            src={menuItem?.svg}
            className="object-contain w-[21px] h-[21px] transition-all duration-300 invert-[24%] sepia-[1%] saturate-[0%] hue-rotate-[171deg] brightness-[91%] contrast-[80%]"
            width={21}
            height={21}
            alt="menu icon"
          />
          <h6 className="rtl:ml-auto ltr:mr-auto">{menuItem?.name}</h6>
        </AccordionTrigger>
        <AccordionContent className="pt-3">
          <div className="flex flex-col gap-1 overflow-hidden max-h-[40vh] overflow-y-auto">
            {categoriesData?.results?.map(
              (subMenu: Category, subMenuIdx: number) => (
                <SheetClose asChild key={`subMenuIdx${subMenuIdx}`}>
                  <Link
                    className={`transition-colors group/subM px-1 border-b border-[#eee] hover:text-[#212529] ease-in-out duration-200 relative flex items-center gap-1 ${
                      decodeURIComponent(category as string) ===
                      subMenu?.link_title
                        ? "text-[#212529]"
                        : "text-[#62666D]"
                    }`}
                    href={`/shop?catLink=${subMenu?.link_title}`}
                  >
                    <Image
                      src={subMenu?.cover}
                      className="object-contain w-[50px] h-[50px] flex-shrink-0"
                      width={50}
                      height={50}
                      alt={subMenu?.cover_alt}
                    />
                    <span className="">{subMenu?.title}</span>
                    <div
                      className={`group-hover/subM:w-full group-hover/subM:right-0 duration-200 absolute left-0 bottom-0 h-[2px] bg-primary transition-all ease-in-out ${
                        decodeURIComponent(category as string) ===
                        subMenu?.link_title
                          ? "w-full"
                          : "w-0"
                      }`}
                    ></div>
                  </Link>
                </SheetClose>
              )
            )}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default MobileCatList;
