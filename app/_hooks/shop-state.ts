import { useQuery } from "@tanstack/react-query";
import { getFetchData } from "../_api/ApiServise";

type Shop = {
  default_cover: string;
  fav_icon: string;
  logo: string;
  site_copyright: string;
  site_short_about: string;
  site_title: string;
};

export const useShop = () => {
  const { data: shopData } = useQuery({
    queryKey: ["getShopQuery"],
    queryFn: () => getFetchData("settings/settings/"),
  });

  return { shopData: shopData as Shop };
};
