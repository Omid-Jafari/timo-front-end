import { ProductResponse } from "@/app/_constant/Product";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import PriceTable from "../_component/PriceTable";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

describe("PriceTable", () => {
  const locale = "fa";
  const messages = require(`../../../../../_messages/${locale}.json`);
  const queryClient = new QueryClient();

  it("should return no product found when product respose is empty", () => {
    const productResponse: ProductResponse = {
      count: 0,
      next: "",
      num_pages: 1,
      previous: null,
      results: [],
    };
    // vi.mock("react-router-dom", async () => ({
    //   ...vi.importActual("react-router-dom"), // use actual for all non-hook parts
    //   useSearchParams: () => [new URLSearchParams({ ids: "001,002" })],
    // }));

    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <QueryClientProvider client={queryClient}>
          <PriceTable iniProductData={productResponse} />
        </QueryClientProvider>
      </NextIntlClientProvider>
    );

    expect(screen.getByTestId("noProductPricing")).toBeInTheDocument();
  });

  it("should return product table when count is more than 0", () => {
    const productResponse: ProductResponse = {
      count: 1,
      next: "",
      num_pages: 2,
      previous: null,
      results: [
        {
          identifier: "",
          title: "",
          link_title: "",
          cover: "",
          discount_active: false,
          discount_percent: 0,
          gross_price: 0,
          net_price: 0,
          stock_status: false,
          stock_amount: 0,
          free_delivery: false,
          short_description: "",
          unit: {
            identifier: "",
            title: "",
            plural_title: "",
          },
          categories: [
            {
              identifier: "",
              title: "",
              link_title: "",
              cover: "",
            },
          ],
        },
      ],
    };

    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <QueryClientProvider client={queryClient}>
          <PriceTable iniProductData={productResponse} />
        </QueryClientProvider>
      </NextIntlClientProvider>
    );

    expect(screen.queryByTestId("productpricingListTable")).toBeInTheDocument();
  });
});
