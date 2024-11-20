import { getFetchData, postFetchData } from "@/app/_api/ApiServise";

export const getOtp = (body: { phone_number: string }) => {
  return postFetchData(`accounts/otp-login/`, body);
};
export const getUserDataFunc = () => {
  return getFetchData(`accounts/user/`);
};
export const verifyOtp = (body: {
  code: number;
  phone_number: string | number;
}) => {
  return postFetchData(`accounts/otp-login/`, body);
};
