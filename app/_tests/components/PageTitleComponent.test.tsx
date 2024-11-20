import PageTitleComp from "@/app/_components/common/PageTitleComp";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";

describe("PageHeaderAndTitle", () => {
  const locale = "fa";
  const messages = require(`../../_messages/${locale}.json`);

  it("should return empty dom when there is no title", () => {
    const { container } = render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <PageTitleComp title="" />
      </NextIntlClientProvider>
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("should return list of anchor tags when extra links have been passed to.", () => {
    const extraLinks = [
      { title: "فروشگاه", href: "/shop" },
      { title: "نوشیدنی ها", href: "/shop?catLink=drinks" },
      { title: "لبنیات", href: "/shop?catLink=dairy" },
    ];

    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <PageTitleComp title="دوغ" extraLinks={extraLinks} />
      </NextIntlClientProvider>
    );

    extraLinks.forEach((exLinks) => {
      const link = screen.getByRole("link", { name: exLinks?.title });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", `/${locale}${exLinks?.href}`);
    });
  });
});
