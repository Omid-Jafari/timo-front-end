"use client";

import TitleComp from "@/app/_components/common/TitleComp";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n.config";
import {
  Calendar,
  LogIn,
  Mail,
  Phone,
  SquarePen,
  User,
  UserCheck,
} from "lucide-react";
import { useUser } from "@/app/_hooks/user-state";

const PersonalData = () => {
  const t = useTranslations("User");
  const { user } = useUser();

  return (
    <div className="flex flex-col border p-2 sm:p-4 gap-3 rounded-md">
      <div className="flex justify-between items-center">
        <TitleComp title={t("personalData")} smaller />
        <Link
          href="/profile/user-info"
          className="flex items-center gap-1 text-primary font-bold text-sm"
        >
          {t("edit")}
          <SquarePen size={14} />
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-5 mt-5">
        <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
          <div className="flex items-center gap-1 text-slate-400 text-sm">
            <User size={16} />
            {t("firstName")}
          </div>
          <div className="bg-[#f8f9fa] rounded-md py-2 px-4 text-[15px]">
            {user?.first_name}
          </div>
        </div>
        <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
          <div className="flex items-center gap-1 text-slate-400 text-sm">
            <UserCheck size={16} />
            {t("lastName")}
          </div>
          <div className="bg-[#f8f9fa] rounded-md py-2 px-4 text-[15px]">
            {user?.last_name}
          </div>
        </div>
        <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
          <div className="flex items-center gap-1 text-slate-400 text-sm">
            <Phone size={16} />
            {t("phoneNumber")}
          </div>
          <div className="bg-[#f8f9fa] rounded-md py-2 px-4 text-[15px]">
            {user?.phone_number}
          </div>
        </div>
        <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
          <div className="flex items-center gap-1 text-slate-400 text-sm">
            <Mail size={16} />
            {t("email")}
          </div>
          <div className="bg-[#f8f9fa] rounded-md py-2 px-4 text-[15px]">
            {user?.email}
          </div>
        </div>
        <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
          <div className="flex items-center gap-1 text-slate-400 text-sm">
            <Calendar size={16} />
            {t("joinedDate")}
          </div>
          <div className="bg-[#f8f9fa] rounded-md py-2 px-4 text-[15px]">
            {new Date(user?.date_joined).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </div>
        </div>
        {user?.last_login ? (
          <div className="flex flex-col gap-2 col-span-2 md:col-span-1">
            <div className="flex items-center gap-1 text-slate-400 text-sm">
              <LogIn size={16} />
              {t("lastLogin")}
            </div>
            <div className="bg-[#f8f9fa] rounded-md py-2 px-4 text-[15px]">
              {new Date(user?.last_login).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
              })}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default PersonalData;
