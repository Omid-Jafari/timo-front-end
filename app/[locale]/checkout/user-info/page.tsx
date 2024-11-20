import Stepper from "../_component/Stepper";
import UserInfoForm from "./_component/UserInfoForm";
import dynamic from "next/dynamic";
const CheckoutCartContainer = dynamic(() =>
  import("../_component/CheckoutCartContainer").then((module) => module.default)
);

const UserInfo = () => {
  return (
    <main className="p-3 sm:p-5 flex flex-col gap-4 container-2xl-w ">
      <Stepper activeStep={0} />
      <div className="flex gap-4">
        <CheckoutCartContainer />
        <UserInfoForm />
      </div>
    </main>
  );
};

export default UserInfo;
