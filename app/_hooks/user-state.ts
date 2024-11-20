import { useQuery } from "@tanstack/react-query";
import { getUserDataFunc } from "../[locale]/(headerAndFooter)/login/_api/loginApi";
import { getCookie } from "cookies-next";

export type User = {
  date_joined: string;
  email: string;
  first_name: string;
  identifier: string;
  last_login: string;
  last_name: string;
  phone_number: string;
};

export const useUser = () => {
  const { data: user } = useQuery({
    queryKey: ["getUserDataQuery"],
    queryFn: () => getUserDataFunc(),
    enabled: !!getCookie("token"),
  });

  return { user: user as User };
};
