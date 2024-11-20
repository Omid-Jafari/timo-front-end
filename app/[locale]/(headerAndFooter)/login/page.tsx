import LogoComp from "@/app/_components/common/LogoComp";
import LoginWithOtp from "./_component/LoginWithOtp";

const Login = () => {
  return (
    <div className="min-h-[70dvh] flex justify-center items-center bg-[url(/login/shape01.png)] bg-no-repeat bg-auto">
      <div className="border border-[#e9ecef] rounded-2xl p-6 flex flex-col gap-5 w-[400px] bg-white">
        <LogoComp className="w-20 h-14 mx-auto object-contain" />
        <LoginWithOtp />
      </div>
    </div>
  );
};

export default Login;
