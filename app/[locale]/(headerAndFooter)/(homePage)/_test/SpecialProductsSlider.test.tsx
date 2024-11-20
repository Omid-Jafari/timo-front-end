import { render, screen } from "@testing-library/react";
import SpecialProductsSlider from "../_component/specialProducts/SpecialProductsSlider";
import { Product } from "@/app/_constant/Product";
import { NextIntlClientProvider } from "next-intl";

describe("SpecialProducts", () => {
  it("should render empty dom when special data not provided", () => {
    const spData = {
      count: 0,
      next: "",
      previous: null,
      num_pages: 1,
      results: [],
    };

    const { container } = render(
      <SpecialProductsSlider specialProductData={spData} />
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("should show slider when got special products passed to", () => {
    const locale = "fa";
    const messages = require(`../../../../_messages/${locale}.json`);
    const spData = {
      count: 12,
      num_pages: 1,
      next: "",
      previous: null,
      results: [
        {
          identifier: "b53e9788-62f3-47b8-8a3e-69b23641b3c4",
          title: "سفره یک بار مصرف 50 تایی",
          link_title: "disposable-plastic-tablecloth-50-psc",
          cover:
            "https://cdn.timobio.com/media/products/images/b7027B03A-730C-4C98-A376-7C31D1ABFE02.jpeg",
          discount_active: false,
          discount_percent: 0,
          gross_price: 55,
          net_price: 55,
          stock_status: false,
          stock_amount: 0,
          free_delivery: false,
          short_description: "",
          unit: {
            identifier: "d0986975-2c39-4b4d-82eb-2093cd219fb7",
            title: "عدد",
            plural_title: "عدد",
          },
          categories: [
            {
              identifier: "1eec856a-37db-42f5-bb70-ef80d4eaac37",
              title: "لوازم آشپزخانه",
              link_title: "kitchen-appliances",
              cover:
                "https://cdn.timobio.com/media/products/categories/b16572AEA-7BA3-4360-A173-3A4F6F3D7AA0.png",
            },
          ],
        } as Product,
      ],
    };

    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <SpecialProductsSlider specialProductData={spData} />
      </NextIntlClientProvider>
    );

    expect(screen.getByTestId("relatedProductsSlider")).toBeInTheDocument();
  });
});
