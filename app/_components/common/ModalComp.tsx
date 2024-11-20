import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/_components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/app/_components/ui/drawer";
import { useMediaQuery } from "@/app/_hooks/useMediaQuery";
import { X } from "lucide-react";
import { ReactNode } from "react";

const ModalComp = ({
  trigger,
  title,
  children,
  open,
  setOpen,
  dialogContentClassName,
}: {
  trigger: ReactNode;
  title: string;
  children: ReactNode;
  open: boolean;
  dialogContentClassName?: string;
  setOpen: (open: boolean) => void;
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
        <DialogTrigger asChild>{trigger}</DialogTrigger>
        <DialogContent className={`max-w-2xl ${dialogContentClassName}`}>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          {children}
        </DialogContent>
      </Dialog>
    );
  }
  return (
    <Drawer open={open} onOpenChange={(open) => setOpen(open)}>
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent className="px-3 sm:px-4 pb-4">
        <DrawerHeader className="px-0">
          <DrawerTitle className="items-center flex justify-between border-b pb-4 font-bold text-base">
            {title}
            <DrawerClose>
              <X size={20} />
            </DrawerClose>
          </DrawerTitle>
        </DrawerHeader>
        {children}
      </DrawerContent>
    </Drawer>
  );
};

export default ModalComp;
