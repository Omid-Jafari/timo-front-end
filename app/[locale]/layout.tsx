import "../_assets/globals.css";
import Provider from "../_utils/Provider";
import { Metadata } from "next";
import { unstable_setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider, useMessages } from "next-intl";
import FetchDataProvider from "../_utils/FetchDataProvider";
import { locales } from "@/i18n.config";
import { getDataSsr } from "../_api/FetchSSR";

export async function generateMetadata(): Promise<Metadata> {
  const shopData: {
    site_title: string;
    site_short_about: string;
    site_copyright: string;
    logo: string;
    fav_icon: string;
    default_cover: string;
  } = await getDataSsr(`settings/settings/`);

  return {
    title: `${shopData?.site_title}`,
    description: shopData?.site_short_about,
    icons: { icon: shopData?.fav_icon },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type RootLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export default function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  unstable_setRequestLocale(locale);

  return (
    <html
      lang={locale}
      dir={locale === "fa" ? "rtl" : "ltr"}
      className="rtl:font-yekanBakh ltr:font-nunito"
    >
      <body
        className={`flex min-h-[100dvh] flex-col items-stretch w-full gap-4 sm:gap-6 md:gap-8 rtl:font-yekanBakh ltr:font-nunito`}
        dir={locale === "fa" ? "rtl" : "ltr"}
      >
        <Provider>
          <FetchDataProvider>
            <NextIntlClientProvider locale={locale} messages={useMessages()}>
              {children}
            </NextIntlClientProvider>
          </FetchDataProvider>
        </Provider>
      </body>
    </html>
  );
}
