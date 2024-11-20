"use client";

import ModalComp from "@/app/_components/common/ModalComp";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import Loading from "@/app/_components/common/Loading";
import { Address } from "./UserAddress";
import { deleteUserAddressFunc } from "@/app/[locale]/checkout/_api/checkoutApi";

const DeleteUserAddress = ({ addressData }: { addressData: Address }) => {
  const queryClient = useQueryClient();
  const t = useTranslations("User");
  const [open, setOpen] = useState(false);

  const deleteUserAddressMutation = useMutation({
    mutationKey: ["deleteUserAddressMutation"],
    mutationFn: deleteUserAddressFunc,
    onSuccess: (res) => {
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["getUserAddressesQuery"] });
    },
    onError: () => {},
  });

  return (
    <ModalComp
      trigger={
        <button
          className="text-primary flex items-center gap-1 text-sm font-bold"
          type="button"
        >
          {t("delete")}
          <Trash size={16} />
        </button>
      }
      title={t("deleteAddress")}
      open={open}
      setOpen={setOpen}
      dialogContentClassName="!max-w-sm"
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          deleteUserAddressMutation.mutate(addressData?.identifier);
        }}
        className="flex flex-col"
      >
        <p className="py-5">
          {t("deleteAddressConfirm", { addressTitle: addressData?.title })}
        </p>
        <div className="flex justify-start self-start items-center gap-2 mt-4">
          <button
            className="relative overflow-hidden primary-btn px-4 text-xs rounded-lg min-w-fit"
            type="submit"
          >
            {deleteUserAddressMutation?.isPending ? (
              <div className="w-full flex justify-center items-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-black bg-opacity-30">
                <Loading bg="bg-white" />
              </div>
            ) : null}
            {t("confirmBtn")}
          </button>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="transparent-btn px-4 text-xs rounded-lg"
          >
            {t("cancelBtn")}
          </button>
        </div>
      </form>
    </ModalComp>
  );
};

export default DeleteUserAddress;
