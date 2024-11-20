"use client";

import * as Yup from "yup";
import { useFormik } from "formik";
import ModalComp from "@/app/_components/common/ModalComp";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import InputComp from "@/app/_components/common/InputComp";
import Loading from "@/app/_components/common/Loading";
import { Edit } from "lucide-react";
import { Address } from "./UserAddress";
import {
  contryOptionsFunc,
  updateUserAddressFunc,
} from "@/app/[locale]/checkout/_api/checkoutApi";
import dynamic from "next/dynamic";

const SelectComp = dynamic(() =>
  import("@/app/_components/common/SelectComp").then((module) => module.default)
);

const EditUserAddress = ({ addressData }: { addressData: Address }) => {
  const queryClient = useQueryClient();
  const t = useTranslations("User");
  const [open, setOpen] = useState(false);
  const persianRegex = /^[^\u0600-\u06FF]+$/;

  const updateUserAddressMutation = useMutation({
    mutationKey: ["updateUserAddressMutation"],
    mutationFn: updateUserAddressFunc,
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
      title: addressData?.title || "",
      country: addressData?.country?.code || "TR",
      country_area: addressData?.city_area || "",
      city: addressData?.city || "",
      city_area: addressData?.city_area || "",
      street_address: addressData?.street_address || "",
      postal_code: addressData?.postal_code || "",
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

    onSubmit: (body) => {
      updateUserAddressMutation.mutate({
        id: addressData?.identifier,
        body: body,
      });
    },
  });

  return (
    <ModalComp
      trigger={
        <button
          className="text-secondary flex items-center gap-1 text-sm font-bold"
          type="button"
        >
          {t("edit")}
          <Edit size={16} />
        </button>
      }
      title={t("editAddress")}
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
          className="disabled:opacity-50 col-span-2 primary-btn ltr:mr-auto rtl:ml-auto px-4 relative overflow-hidden"
          type="submit"
          disabled={updateUserAddressMutation?.isPending || !formik.dirty}
        >
          {updateUserAddressMutation?.isPending ? (
            <div className="w-full flex justify-center items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-30">
              <Loading bg="bg-white" />
            </div>
          ) : null}
          {t("editAddress")}
        </button>
      </form>
    </ModalComp>
  );
};

export default EditUserAddress;
