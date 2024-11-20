import { ProductResponse } from "@/app/_constant/Product";
import { render, screen } from "@testing-library/react";
import ProductsList from "../_component/products/ProductsList";
import { NextIntlClientProvider } from "next-intl";

describe("ProductsList", () => {
  const locale = "fa";
  const messages = require(`../../../../_messages/${locale}.json`);

  it("should return no product found when product respose is empty", () => {
    const productResponse: ProductResponse = {
      count: 0,
      next: "",
      num_pages: 1,
      previous: null,
      results: [],
    };

    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ProductsList cardShow="1" productsData={productResponse} />
      </NextIntlClientProvider>
    );

    expect(screen.getByTestId("noProductFound")).toBeInTheDocument();
  });

  it("should not return pagination component", () => {
    const productResponse: ProductResponse = {
      count: 0,
      next: "",
      num_pages: 1,
      previous: null,
      results: [],
    };

    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <ProductsList cardShow="1" productsData={productResponse} />
      </NextIntlClientProvider>
    );

    expect(
      screen.queryByTestId("productWithPagination")
    ).not.toBeInTheDocument();
  });

  it("should return pagination component when num page is more than 1", () => {
    const productResponse: ProductResponse = {
      count: 0,
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
        <ProductsList cardShow="1" productsData={productResponse} />
      </NextIntlClientProvider>
    );

    expect(screen.queryByTestId("productWithPagination")).toBeInTheDocument();
  });

  it("should return product list when count is more than 0", () => {
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
        <ProductsList cardShow="1" productsData={productResponse} />
      </NextIntlClientProvider>
    );

    expect(screen.queryByTestId("productListContainer")).toBeInTheDocument();
  });

  it("should return link with correct href for each product", () => {
    const productResponse: ProductResponse = {
      count: 1,
      next: "",
      num_pages: 2,
      previous: null,
      results: [
        {
          identifier: "",
          title: "",
          link_title: "iranian-rice",
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
        {
          identifier: "",
          title: "",
          link_title: "iranian-tea",
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
        <ProductsList cardShow="2" productsData={productResponse} />
      </NextIntlClientProvider>
    );
    productResponse?.results.forEach((product) => {
      const card = screen.queryByTestId(product?.link_title);
      expect(card).toBeInTheDocument();
    });
  });
});
