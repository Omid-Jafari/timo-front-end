import PageTitleComp from "@/app/_components/common/PageTitleComp";
import ProfileSidebar from "../_component/ProfileSidebar";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getDataSsr } from "@/app/_api/FetchSSR";
import UserAddress from "./_component/UserAddress";
import { getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";

const AddNewAddress = dynamic(() =>
  import("./_component/AddNewAddress").then((module) => module.default)
);

const UserAddressPage = async () => {
  const t = await getTranslations("User");
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["getUserAddressesQuery"],
    queryFn: () => getDataSsr(`accounts/addresses/`),
  });

  return (
    <main className="flex flex-col gap-2 sm:gap-4 container-2xl-w">
      <PageTitleComp
        extraLinks={[{ title: t("dashboard"), href: "/profile/dashboard" }]}
        title={t("myAddresses")}
      />
      <section className="flex flex-col md:flex-row gap-4 w-full">
        <ProfileSidebar />
        <div className="flex-1 border rounded-md p-2 sm:p-4 flex flex-col gap-3 sm:gap-10">
          <div className="flex md:items-center justify-end flex-col md:flex-row gap-4 items-start">
            <AddNewAddress user />
          </div>
          <HydrationBoundary state={dehydrate(queryClient)}>
            <UserAddress />
          </HydrationBoundary>
        </div>
      </section>
    </main>
  );
};

export default UserAddressPage;
