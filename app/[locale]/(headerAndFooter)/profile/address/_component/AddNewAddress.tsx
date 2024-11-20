"use client";

import * as Yup from "yup";
import { useFormik } from "formik";
import ModalComp from "@/app/_components/common/ModalComp";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import InputComp from "@/app/_components/common/InputComp";
import Loading from "@/app/_components/common/Loading";
import { MapPin, Plus } from "lucide-react";
import {
  addUserAddressFunc,
  contryOptionsFunc,
} from "@/app/[locale]/checkout/_api/checkoutApi";
import dynamic from "next/dynamic";

const SelectComp = dynamic(() =>
  import("@/app/_components/common/SelectComp").then((module) => module.default)
);

const AddNewAddress = ({ user = false }: { user?: boolean }) => {
  const queryClient = useQueryClient();
  const t = useTranslations("User");
  const [open, setOpen] = useState(false);
  const persianRegex = /^[^\u0600-\u06FF]+$/;

  const changeUserAddressMutation = useMutation({
    mutationKey: ["changeUserAddressMutation"],
    mutationFn: addUserAddressFunc,
    onSuccess: (res) => {
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["getUserAddressesQuery"] });
    },
    onError: () => {},
  });
  const { data: countryOptionsData, isPending } = useQuery({
    queryKey: ["countryOptionsDataQuery"],
    queryFn: () => contryOptionsFunc(),
  });
  const countryOptions: { display_name: string; value: string }[] =
    countryOptionsData?.actions?.POST?.country?.choices;

  const formik = useFormik({
    initialValues: {
      title: "",
      country: countryOptions?.length > 0 ? countryOptions[0]?.value : "TR",
      country_area: "",
      city: "",
      city_area: "",
      street_address: "",
      postal_code: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string()
        .required(t("titleRequired"))
        .matches(persianRegex, t("farsiLetters")),
      country: Yup.string()
        .required(t("countryRequired"))
        .matches(persianRegex, t("farsiLetters")),
      country_area: Yup.string().matches(persianRegex, t("farsiLetters")),
      city: Yup.string()
        .required(t("cityRequired"))
        .matches(persianRegex, t("farsiLetters")),
      city_area: Yup.string().matches(persianRegex, t("farsiLetters")),
      street_address: Yup.string()
        .required(t("street_addressRequired"))
        .matches(persianRegex, t("farsiLetters")),
      postal_code: Yup.string()
        .matches(persianRegex, t("farsiLetters"))
        .max(20, t("postaCodeMaxLength")),
    }),

    onSubmit: (data) => {
      changeUserAddressMutation.mutate(data);
    },
  });

  return (
    <ModalComp
      trigger={
        user ? (
          <button
            className="primary-btn px-4 flex items-center gap-1"
            type="button"
          >
            {t("addNewAddress")}
            <MapPin size={20} />
          </button>
        ) : (
          <button
            className="relative col-span-2 md:col-span-1 text-center py-8 px-4 rounded-md flex flex-col gap-2 items-center border opacity-70"
            type="button"
          >
            <Plus size={20} />
            {t("addNewAddress")}
          </button>
        )
      }
      title={t("addNewAddress")}
      open={open}
      setOpen={setOpen}
    >
      <form
        onSubmit={formik.handleSubmit}
        className="grid grid-cols-2 gap-3 sm:gap-5 w-full max-h-[70vh] overflow-y-auto"
      >
        <InputComp
          label={t("title")}
          name="title"
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isRequired
          className="col-span-2 md:col-span-1"
          error={formik.errors.title as string}
          hasError={!!formik.errors.title && !!formik.touched.title}
        />

        <SelectComp
          options={countryOptions}
          label={t("country")}
          defaultValue={formik.values.country}
          onValueChange={(e: string) => formik.setFieldValue("country", e)}
          isRequired
          className="col-span-2 md:col-span-1"
          error={formik.errors.country as string}
          hasError={!!formik.errors.country && !!formik.touched.country}
          isPending={isPending}
        />
        <InputComp
          label={t("country_area")}
          name="country_area"
          value={formik.values.country_area}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-2 md:col-span-1"
          error={formik.errors.country_area as string}
          hasError={
            !!formik.errors.country_area && !!formik.touched.country_area
          }
        />
        <InputComp
          label={t("city")}
          name="city"
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isRequired
          className="col-span-2 md:col-span-1"
          error={formik.errors.city as string}
          hasError={!!formik.errors.city && !!formik.touched.city}
        />
        <InputComp
          label={t("city_area")}
          name="city_area"
          value={formik.values.city_area}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-2 md:col-span-1"
          error={formik.errors.city_area as string}
          hasError={!!formik.errors.city_area && !!formik.touched.city_area}
        />
        <InputComp
          label={t("street_address")}
          name="street_address"
          value={formik.values.street_address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          isRequired
          className="col-span-2 md:col-span-1"
          error={formik.errors.street_address as string}
          hasError={
            !!formik.errors.street_address && !!formik.touched.street_address
          }
        />
        <InputComp
          label={t("postal_code")}
          name="postal_code"
          value={formik.values.postal_code}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="col-span-2 md:col-span-1"
          error={formik.errors.postal_code as string}
          hasError={!!formik.errors.postal_code && !!formik.touched.postal_code}
        />
        <button
          className="col-span-2 primary-btn ltr:mr-auto rtl:ml-auto px-4 relative overflow-hidden"
          type="submit"
          disabled={changeUserAddressMutation?.isPending}
        >
          {changeUserAddressMutation?.isPending ? (
            <div className="w-full flex justify-center items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-30">
              <Loading bg="bg-white" />
            </div>
          ) : null}
          {t("addNewAddress")}
        </button>
      </form>
    </ModalComp>
  );
};

export default AddNewAddress;
