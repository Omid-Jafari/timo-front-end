import { ReadonlyURLSearchParams } from "next/navigation";

const createQueryString = (
  name: string,
  value: string,
  searchParams: ReadonlyURLSearchParams,
  name2?: string,
  value2?: string,
  name3?: string,
  value3?: string
) => {
  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair

  const params = new URLSearchParams(searchParams.toString());
  params.set(name, value);
  name2 && params.set(name2, value2 || "");
  name3 && params.set(name3, value3 || "");

  return params.toString();
};

export default createQueryString;
