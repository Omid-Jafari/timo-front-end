import PageTitleComp from "@/app/_components/common/PageTitleComp";
import ProfileSidebar from "../_component/ProfileSidebar";
import { useTranslations } from "next-intl";
import UserInfo from "./_component/UserInfo";

const UserInfoPage = () => {
  const t = useTranslations("User");

  return (
    <main className="flex flex-col gap-2 sm:gap-4 container-2xl-w">
      <PageTitleComp
        extraLinks={[{ title: t("dashboard"), href: "/profile/dashboard" }]}
        title={t("personalInfo")}
      />
      <section className="flex flex-col md:flex-row gap-4 w-full">
        <ProfileSidebar />
        <UserInfo />
      </section>
    </main>
  );
};

export default UserInfoPage;
