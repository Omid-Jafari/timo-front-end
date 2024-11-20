import AddToCartBtn from "@/app/[locale]/(headerAndFooter)/shop/_component/products/AddToCartBtn";
import { Product } from "@/app/_constant/Product";
import { Cart } from "@/app/_hooks/cart-state";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";

describe("AddToCartBtn", () => {
  const outOfStockProduct: Product = {
    identifier: "5175af09-4372-4433-80ae-2cf2055261b1",
    title: "cihan ceylon fragrant tea 400 gr",
    link_title: "cihan-ceylon-fragrant-tea-400-gr",
    cover:
      "https://cdn.timobio.com/media/products/images/b7E89F075-F822-42CA-8093-008A894C1B7A.jpeg",
    discount_active: false,
    discount_percent: 0,
    gross_price: 300,
    net_price: 300,
    stock_status: false,
    stock_amount: 0,
    free_delivery: false,
    short_description: "",
    unit: {
      identifier: "d0986975-2c39-4b4d-82eb-2093cd219fb7",
      title: "PIECE",
      plural_title: "ESPIECES",
    },
    categories: [
      {
        identifier: "aab0738b-6ad6-4e48-851a-e50bf64ebc7d",
        title: "TEA",
        link_title: "tea",
        cover: "https://cdn.timobio.com/media/products/categories/bchai.webp",
      },
    ],
  };
  const inStockProduct: Product = {
    identifier: "5175af09-4372-4433-80ae-2cf2055261b1",
    title: "cihan ceylon fragrant tea 400 gr",
    link_title: "cihan-ceylon-fragrant-tea-400-gr",
    cover:
      "https://cdn.timobio.com/media/products/images/b7E89F075-F822-42CA-8093-008A894C1B7A.jpeg",
    discount_active: false,
    discount_percent: 0,
    gross_price: 300,
    net_price: 300,
    stock_status: true,
    stock_amount: 10,
    free_delivery: false,
    short_description: "",
    unit: {
      identifier: "d0986975-2c39-4b4d-82eb-2093cd219fb7",
      title: "PIECE",
      plural_title: "ESPIECES",
    },
    categories: [
      {
        identifier: "aab0738b-6ad6-4e48-851a-e50bf64ebc7d",
        title: "TEA",
        link_title: "tea",
        cover: "https://cdn.timobio.com/media/products/categories/bchai.webp",
      },
    ],
  };

  it("should return out of stock span when product is out of stock", () => {
    const queryClient = new QueryClient();
    const locale = "fa";
    const messages = require(`../../_messages/${locale}.json`);

    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <QueryClientProvider client={queryClient}>
          <AddToCartBtn btnText={"add"} product={outOfStockProduct} />
        </QueryClientProvider>
      </NextIntlClientProvider>
    );

    const span = screen.queryByTestId("outOfStock");
    expect(span).toBeInTheDocument();
  });

  it("should return add to cart btn when product is not in the cart", () => {
    const queryClient = new QueryClient();
    const locale = "fa";
    const messages = require(`../../_messages/${locale}.json`);
    queryClient.setQueryData(["getCartDataQuery"], {
      identifier: "",
      discount_amount: "",
      gross_total: "",
      net_total: "",
      items_count: 0,
      items: [],
    });

    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <QueryClientProvider client={queryClient}>
          <AddToCartBtn btnText={"add"} product={inStockProduct} />
        </QueryClientProvider>
      </NextIntlClientProvider>
    );

    const btn = screen.queryByTestId("addToCartBtn");
    expect(btn).toBeInTheDocument();
  });

  it("should return change product count when product is in cart", () => {
    const queryClient = new QueryClient();
    const locale = "fa";
    const messages = require(`../../_messages/${locale}.json`);

    queryClient.setQueryData(["getCartDataQuery"], {
      identifier: "",
      discount_amount: "",
      gross_total: "",
      net_total: "",
      items_count: 0,
      items: [
        {
          identifier: "",
          cart: {
            identifier: "",
            discount_amount: "",
            gross_total: "",
            net_total: "",
          },
          product: {
            identifier: "5175af09-4372-4433-80ae-2cf2055261b1",
            title: "",
            link_title: "",
            cover: "",
            unit: {
              identifier: "",
              title: "",
              plural_title: "",
            },
          },
          quantity: 1,
          gross_price: "",
          net_price: "",
          discount: "",
          discount_amount: "",
          gross_total: "",
          net_total: "",
        },
      ],
    } as Cart);

    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <QueryClientProvider client={queryClient}>
          <AddToCartBtn btnText={"add"} product={inStockProduct} />
        </QueryClientProvider>
      </NextIntlClientProvider>
    );

    const input = screen.queryByTestId("changeCountInput");
    expect(input).toBeInTheDocument();
  });
});
