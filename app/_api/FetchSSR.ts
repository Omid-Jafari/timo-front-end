import { cookies } from "next/headers";

const SERVER_BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
export const getDataSsr = async (path: string, cartId?: string) => {
  const token = cookies()?.get("token")?.value;
  const nextLocale = cookies()?.get("NEXT_LOCALE")?.value || "fa";
  try {
    let _res = await fetch(
      `${SERVER_BASE_URL}${
        `${nextLocale}` !== "fa" ? `${nextLocale}/` : ""
      }${path}`,
      {
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
      }
    );
    if (!_res.ok) {
      // throw new Error("error");
      console.error(
        `error with status code ${_res.status}.And status text=${_res.statusText}`
      );
      return null;
    } else if (_res.ok) {
      const data = await _res.json();
      return data;
    }
  } catch (error) {
    console.error("gettingCatchBlockError", error); // from creation or business logic

    return null;
  }
};
export const postDataSsr = async (path: string, body: any, method = "POST") => {
  const token = cookies()?.get("token")?.value;
  const nextLocale = cookies()?.get("NEXT_LOCALE")?.value || "fa";
  try {
    let _res = await fetch(
      `${SERVER_BASE_URL}${
        `${nextLocale}` !== "fa" ? `${nextLocale}/` : ""
      }${path}`,
      {
        method: method,
        headers: {
          ...(token && { Authorization: `Token ${token}` }),
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
        },
        body: JSON.stringify(body),
      }
    );
    if (!_res.ok) {
      // throw new Error("error");
      console.error(
        `error with status code ${_res.status}.And status text=${_res.statusText}`
      );
      return null;
    } else if (_res.ok) {
      const data = await _res.json();
      return data;
    }
  } catch (error) {
    console.error("gettingCatchBlockError", error); // from creation or business logic

    return null;
  }
};
