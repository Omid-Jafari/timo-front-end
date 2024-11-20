import { deleteCookie, getCookie } from "cookies-next";
import toast from "react-hot-toast";

const NEXT_LOCALE = getCookie("NEXT_LOCALE");
export const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}${
  NEXT_LOCALE !== "fa" ? `${NEXT_LOCALE}/` : ""
}`;

export const getFetchData = async (path: string, cartId?: string) => {
  const token = getCookie("token");

  let _res = await fetch(`${BASE_URL}${path}`, {
    // cache: "no-store",
    method: "GET",
    headers: {
      Accept: "application/json, text/plain, */*",
      "content-type": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "en-US,en;q=0.9,fa;q=0.8",
      Connection: "keep-alive",
      Host: "https://www.timobio.com/",
      Origin: "https://www.timobio.com/",
      Referer: "https://www.timobio.com/",
      "Sec-Ch-Ua-Mobile": "?0",
      "Sec-Ch-Ua-Platform": "Windows",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "cross-site",
      ...(token && { Authorization: `Token ${token}` }),
      ...(cartId && { "Cart-Identifier": `${cartId}` }),
    },
  });
  const data = await _res.json();
  if (!_res.ok) {
    if (_res?.status === 404) {
      toast.error("404 error");
      throw new Error("404 error");
    } else if (Object.values(data)?.length > 0) {
      Object.values(data)?.map((err: any) => {
        toast.error(err);
        throw new Error(err);
      });
    }
  } else if (_res.ok && _res.status === 200) {
    return data;
  }
};
export const postFetchData = async (
  path: string,
  body: any,
  method = "POST",
  formData = false,
  cartId?: string
) => {
  const token = getCookie("token");
  let _res = await fetch(`${BASE_URL}${path}`, {
    // cache: "no-store",
    method: method,
    headers: {
      Accept: "application/json, text/plain, */*",
      "content-type": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "en-US,en;q=0.9,fa;q=0.8",
      Connection: "keep-alive",
      Host: "https://www.timobio.com/",
      Origin: "https://www.timobio.com/",
      Referer: "https://www.timobio.com/",
      "Sec-Ch-Ua-Mobile": "?0",
      "Sec-Ch-Ua-Platform": "Windows",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "cross-site",
      ...(token && { Authorization: `Token ${token}` }),
      ...(cartId && { "Cart-Identifier": `${cartId}` }),
    },
    body: formData ? body : JSON.stringify(body),
  });
  const data = await _res.json();
  if (!_res.ok) {
    if (_res?.status === 404) {
      toast.error("404 error");
      throw new Error("404 error");
    } else if (Object.values(data)?.length > 0) {
      Object.values(data)?.map((err: any) => {
        toast.error(err);
        throw new Error(err);
      });
    }
  } else if (_res.ok && (_res.status === 200 || _res.status === 201)) {
    return data;
  }
};

export const apiCallDeleteMethod = async (path: any, cartId?: string) => {
  const token = getCookie("token");
  let _res: any = await fetch(`${BASE_URL}${path}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json, text/plain, */*",
      "content-type": "application/json",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "en-US,en;q=0.9,fa;q=0.8",
      Connection: "keep-alive",
      Host: "https://www.timobio.com/",
      Origin: "https://www.timobio.com/",
      Referer: "https://www.timobio.com/",
      "Sec-Ch-Ua-Mobile": "?0",
      "Sec-Ch-Ua-Platform": "Windows",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "cross-site",
      ...(token && { Authorization: `Token ${token}` }),
      ...(cartId && { "Cart-Identifier": `${cartId}` }),
    },
  });
  if (_res.status === 400) {
    toast.error("Error " + _res?.error?.message);
    throw new Error("Error " + _res?.error?.message);
  } else if (_res.status === 401) {
    //some get redirect
  } else if (_res.status === 403) {
    let data = await _res.json();
    toast.success("" + data.message);
    throw new Error("" + _res?.error?.message);
  } else if (_res.status === 404) {
    let data = await _res.json();
    toast.error("Error " + data.message);
    throw new Error("Error " + _res?.error?.message);
  } else if (_res.status === 500) {
    toast.error("Server Error");
    throw new Error("Error " + _res?.error?.message);
  } else if (_res.ok && _res.status === 201) {
    toast.success("Done");
    // return _res;
  } else if (_res.ok && _res.status === 200) {
    toast.success("Done");
    // return _res;
  }
};
const handleUnauthorized = () => {
  deleteCookie("isLoggedIn");
  deleteCookie("token");
  window.location.replace("/login");
};
