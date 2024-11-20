export const phonenumberConvertor = (phone = "") =>
  "tel:" + phone?.toString().replace(/\D/g, "");
