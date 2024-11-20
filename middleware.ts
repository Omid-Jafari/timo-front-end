import { NextResponse, type NextRequest } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { locales } from "./i18n.config";

export function middleware(request: NextRequest) {
  // Step 1: Use the incoming request (example)
  // const defaultLocale = request.headers.get("x-your-custom-locale") || "en";
  const userToken = request.cookies.get("token")?.value;

  if (!!userToken) {
    if (request.nextUrl?.pathname.includes(`/login`))
      return NextResponse.redirect(new URL("/profile/dashboard", request.url));
  } else if (
    request.nextUrl.pathname.includes("/profile") ||
    request.nextUrl.pathname.includes("/checkout")
  ) {
    // This logic is only applied to /profile and /checkout
    return NextResponse.redirect(
      new URL(`/login?next=${request.nextUrl.pathname}`, request.url)
    );
  }
  // Step 2: Create and call the next-intl middleware (example)
  const handleI18nRouting = createIntlMiddleware({
    // A list of all locales that are supported
    locales,

    // Used when no locale matches
    defaultLocale: "fa",
    localeDetection: true,
    localePrefix: "as-needed",
  });
  const response = handleI18nRouting(request);

  // Step 3: Alter the response (example)
  // response.headers.set("x-your-custom-locale", defaultLocale);
  response.headers.set("x-pathname", request.nextUrl.pathname);

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
