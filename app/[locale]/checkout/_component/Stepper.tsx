import LogoComp from "@/app/_components/common/LogoComp";
import { Link } from "@/i18n.config";
import { CreditCard, Truck, UserCog } from "lucide-react";
import { useTranslations } from "next-intl";

const Stepper = ({ activeStep }: { activeStep: number }) => {
  const t = useTranslations("Checkout");
  const checkoutSteps = [
    {
      title: t("userInfo"),
      svg: <UserCog size={18} className="min-w-fit" />,
      href: "/checkout/user-info",
    },
    {
      title: t("shippingInfo"),
      svg: <Truck size={18} className="min-w-fit" />,
      href: "/checkout/shipping-info",
    },
    {
      title: t("paymentInfo"),
      svg: <CreditCard size={18} className="min-w-fit" />,
      href: "/checkout/payment-info",
    },
  ];
  return (
    <section className="border rounded-md p-2 sm:p-4 flex flex-col items-center gap-5">
      <LogoComp className="w-auto h-16" />
      <div className="w-full flex items-center justify-between sm:gap-4">
        {checkoutSteps?.map((step, stepIdx) => (
          <>
            {stepIdx !== 0 ? (
              <div
                className={`flex-1 min-w-1 h-px sm:h-[2px] transition-colors duration-300 ${
                  activeStep >= stepIdx ? "bg-primary" : "bg-gray-300"
                }`}
              ></div>
            ) : null}
            <Link
              href={step?.href}
              key={`stepIdx${stepIdx}`}
              className={`flex items-center gap-1 sm:gap-2 font-semibold transition-all duration-300 ${
                activeStep === stepIdx
                  ? "text-primary text-sm sm:text-base"
                  : activeStep > stepIdx
                  ? "text-primary opacity-30 text-xs sm:text-sm"
                  : "text-gray-400 pointer-events-none cursor-default text-xs sm:text-sm"
              }`}
            >
              {step?.svg}
              <span className="">{step?.title}</span>
            </Link>
          </>
        ))}
      </div>
    </section>
  );
};

export default Stepper;
