import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/_components/ui/drawer";
import { useMediaQuery } from "@/app/_hooks/useMediaQuery";
import { useQueryClient } from "@tanstack/react-query";
import { deleteCookie } from "cookies-next";
import { LogOut, X } from "lucide-react";
import { useTranslations } from "next-intl";

const LogOutModal = ({
  className = "flex items-center gap-3 text-[#454545] text-xs sm:text-[15px] leading-6 sm:gap-4 font-medium pb-4 pt-3 px-3 space-y-3",
}: {
  className?: string;
}) => {
  const queryClient = useQueryClient();
  const t = useTranslations("Logout");
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const logOutFunc = () => {
    deleteCookie("token");
    deleteCookie("cartId");
    queryClient.invalidateQueries({ queryKey: ["getCartDataQuery"] });
    queryClient.invalidateQueries({ queryKey: ["getUserDataQuery"] });
    window.location.replace("/");
  };

  if (isDesktop) {
    return (
      <Dialog>
        <DialogTrigger className={className}>
          <LogOut size={22} />
          {t("logOut")}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("title")}</DialogTitle>
            <DialogDescription className="ltr:text-start rtl:text-right">
              {t("text")}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-3">
            <DialogClose className="transparent-btn px-4 text-xs rounded-lg m-0">
              {t("cancel")}
            </DialogClose>
            <DialogClose
              className="primary-btn px-4 text-xs rounded-lg"
              onClick={logOutFunc}
            >
              {t("logOut")}
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer>
      <DrawerTrigger className={className}>
        <LogOut size={18} />
        {t("logOut")}
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="px-4 pt-4">
          <DrawerTitle className="items-center flex justify-between text-sm border-b pb-4">
            {t("title")}
            <DrawerClose>
              <X size={20} />
            </DrawerClose>
          </DrawerTitle>
          <DrawerDescription className="text-sm rtl:text-right pt-4">
            {t("text")}
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="border-t flex-row">
          <DrawerClose asChild>
            <button
              className="primary-btn px-4 text-xs rounded-lg flex-1"
              onClick={logOutFunc}
            >
              {t("logOut")}
            </button>
          </DrawerClose>
          <DrawerClose className="transparent-btn px-4 text-xs rounded-lg flex-1">
            {t("cancel")}
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default LogOutModal;
