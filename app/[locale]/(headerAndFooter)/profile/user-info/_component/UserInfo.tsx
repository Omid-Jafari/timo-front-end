"use client";

import * as Yup from "yup";
import { useFormik } from "formik";
import { changeUserInfoFunc } from "@/app/[locale]/checkout/_api/checkoutApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import InputComp from "@/app/_components/common/InputComp";
import { Mail, User, UserCheck, UserCog } from "lucide-react";
import Loading from "@/app/_components/common/Loading";
import { setCookie } from "cookies-next";
import { useUser } from "@/app/_hooks/user-state";

const UserInfo = () => {
  const persianRegex = /^[^\u0600-\u06FF]+$/;
  const t = useTranslations("User");
  const queryClient = useQueryClient();
  const { user } = useUser();

  const changeUserInfoMutation = useMutation({
    mutationKey: ["changeUserInfoMutation"],
    mutationFn: changeUserInfoFunc,
    onSuccess: (res) => {
      const daysFromNow = new Date();
      daysFromNow.setDate(new Date().getDate() + 7);
      setCookie(
        "full_name",
        `${formik?.values?.first_name} ${formik?.values?.last_name}`,
        {
          expires: daysFromNow,
        }
      );
      queryClient.invalidateQueries({ queryKey: ["getUserDataQuery"] });
    },
    onError: () => {},
  });
  const formik = useFormik({
    initialValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      email: user?.email || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      first_name: Yup.string()
        .required(t("firstnameRequired"))
        .matches(persianRegex, t("farsiLetters")),
      last_name: Yup.string()
        .required(t("lastnameRequired"))
        .matches(persianRegex, t("farsiLetters")),
      email: Yup.string()
        .email(t("emailSchema"))
        .matches(persianRegex, t("farsiLetters")),
    }),

    onSubmit: (data) => {
      changeUserInfoMutation.mutate(data);
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="grid grid-cols-2 gap-5 border p-2 sm:p-4 rounded-md flex-1 sm:self-start"
    >
      <InputComp
        label={t("firstName")}
        name="first_name"
        value={formik.values.first_name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isRequired
        icon={<User size={18} />}
        className="col-span-2 md:col-span-1"
        error={formik.errors.first_name as string}
        hasError={!!formik.errors.first_name && !!formik.touched.first_name}
      />
      <InputComp
        label={t("lastName")}
        name="last_name"
        value={formik.values.last_name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        isRequired
        icon={<UserCheck size={18} />}
        className="col-span-2 md:col-span-1"
        error={formik.errors.last_name as string}
        hasError={!!formik.errors.last_name && !!formik.touched.last_name}
      />
      <InputComp
        label={t("email")}
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        icon={<Mail size={18} />}
        className="col-span-2 md:col-span-2"
        error={formik.errors.email as string}
        hasError={!!formik.errors.email && !!formik.touched.email}
      />
      <button
        className="disabled:opacity-60 primary-btn ltr:mr-auto rtl:ml-auto px-4 relative overflow-hidden"
        type="submit"
        disabled={changeUserInfoMutation?.isPending || !formik.dirty}
      >
        {changeUserInfoMutation?.isPending ? (
          <div className="w-full flex justify-center items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-30">
            <Loading bg="bg-white" />
          </div>
        ) : null}
        {t("saveChanges")}
      </button>
    </form>
  );
};

export default UserInfo;
