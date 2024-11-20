import PageTitleComp from "@/app/_components/common/PageTitleComp";
import { useTranslations } from "next-intl";
import ProfileSidebar from "../../_component/ProfileSidebar";
import SingleOrderFullInfo from "./_component/SingleOrderFullInfo";

type PropsType = { params: { orderId: string } };

const SingleOrderDetailPage = ({ params: { orderId } }: PropsType) => {
  const t = useTranslations("User");

  return (
    <main className="flex flex-col gap-2 sm:gap-4 container-2xl-w">
      <PageTitleComp
        extraLinks={[{ title: t("dashboard"), href: "/profile/dashboard" }]}
        title={t("myOrders")}
      />
      <section className="flex flex-col md:flex-row gap-4 w-full">
        <ProfileSidebar />
        <SingleOrderFullInfo orderId={orderId} />
      </section>
    </main>
  );
};

export default SingleOrderDetailPage;
