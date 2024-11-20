import PageTitleComp from "@/app/_components/common/PageTitleComp";
import ProfileSidebar from "../_component/ProfileSidebar";
import { useTranslations } from "next-intl";
import OrdersInfo from "./_component/OrdersInfo";

const UserOrderPage = ({
  searchParams: { search, status },
}: {
  searchParams: {
    search: string | undefined;
    status: string | undefined;
  };
}) => {
  const t = useTranslations("User");

  return (
    <main className="flex flex-col gap-2 sm:gap-4 container-2xl-w">
      <PageTitleComp
        extraLinks={[{ title: t("dashboard"), href: "/profile/dashboard" }]}
        title={t("myOrders")}
      />
      <section className="flex flex-col md:flex-row gap-4 w-full">
        <ProfileSidebar />
        <OrdersInfo search={search} status={status} />
      </section>
    </main>
  );
};

export default UserOrderPage;
