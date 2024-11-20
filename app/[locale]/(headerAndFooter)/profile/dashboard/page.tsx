import PageTitleComp from "@/app/_components/common/PageTitleComp";
import ProfileSidebar from "../_component/ProfileSidebar";
import { useTranslations } from "next-intl";
import PersonalData from "./_component/PersonalData";
import dynamic from "next/dynamic";

const OrdersData = dynamic(() =>
  import("./_component/OrdersData").then((module) => module.default)
);

const Dashboard = () => {
  const t = useTranslations("User");

  return (
    <main className="flex flex-col gap-2 sm:gap-4 container-2xl-w">
      <PageTitleComp title={t("dashboard")} />
      <section className="flex flex-col md:flex-row gap-4 w-full">
        <ProfileSidebar />
        <div className="flex flex-col gap-2 sm:gap-4 flex-1">
          <PersonalData />
          <OrdersData />
        </div>
      </section>
    </main>
  );
};

export default Dashboard;
