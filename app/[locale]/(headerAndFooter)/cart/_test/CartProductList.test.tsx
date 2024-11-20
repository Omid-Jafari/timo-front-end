import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import CartProductList from "../_component/CartProductList";
import { NextIntlClientProvider } from "next-intl";

describe("CartProductList", () => {
  const locale = "fa";
  const messages = require(`../../../../_messages/${locale}.json`);

  it("should return empty cart component when cart is empty", () => {
    const queryClient = new QueryClient();

    queryClient.setQueryData(["getCartDataQuery"], { items: [] });
    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <QueryClientProvider client={queryClient}>
          <CartProductList />
        </QueryClientProvider>
      </NextIntlClientProvider>
    );

    expect(screen.queryByTestId("emptyCartComp")).toBeInTheDocument();
  });

  it("should return cart list when cart is not empty", () => {
    const queryClient = new QueryClient();

    queryClient.setQueryData(["getCartDataQuery"], {
      identifier: "1adf4c8d-061c-4398-a049-fd4da28846fc",
      discount_amount: 0,
      gross_total: 320,
      net_total: 320,
      items_count: 1,
      items: [
        {
          identifier: "78ec710b-a799-4f49-842a-bfe387477f7e",
          product: {
            identifier: "7512fcdb-8fe6-43e9-9607-2e6ce1fc37cc",
            title: "AHMAD AROMATIC CEYLON TEA 500 GR",
            link_title: "ahmad-aromatic-ceylon-tea-500-gr",
            cover:
              "https://cdn.timobio.com/media/products/images/bD8C41C9B-DBAA-4043-808B-947C0BA5C19D.jpeg",
            stock_active: true,
            stock_amount: 14,
            unit: {
              identifier: "d0986975-2c39-4b4d-82eb-2093cd219fb7",
              title: "PIECE",
              plural_title: "ESPIECES",
            },
          },
          quantity: 1,
          gross_price: 320,
          net_price: 320,
          discount: 0,
          discount_amount: 0,
          gross_total: 320,
          net_total: 320,
        },
      ],
    });

    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <QueryClientProvider client={queryClient}>
          <CartProductList />
        </QueryClientProvider>
      </NextIntlClientProvider>
    );

    expect(screen.queryByTestId("cartListComp")).toBeInTheDocument();
  });

  it("should return cart item for each item in cart", () => {
    const queryClient = new QueryClient();
    const cart = {
      identifier: "1adf4c8d-061c-4398-a049-fd4da28846fc",
      discount_amount: 0,
      gross_total: 320,
      net_total: 320,
      items_count: 1,
      items: [
        {
          identifier: "78ec710b-a799-4f49-842a-bfe387477f7e",
          product: {
            identifier: "7512fcdb-8fe6-43e9-9607-2e6ce1fc37cc",
            title: "AHMAD AROMATIC CEYLON TEA 500 GR",
            link_title: "ahmad-aromatic-ceylon-tea-500-gr",
            cover:
              "https://cdn.timobio.com/media/products/images/bD8C41C9B-DBAA-4043-808B-947C0BA5C19D.jpeg",
            stock_active: true,
            stock_amount: 14,
            unit: {
              identifier: "d0986975-2c39-4b4d-82eb-2093cd219fb7",
              title: "PIECE",
              plural_title: "ESPIECES",
            },
          },
          quantity: 1,
          gross_price: 320,
          net_price: 320,
          discount: 0,
          discount_amount: 0,
          gross_total: 320,
          net_total: 320,
        },
      ],
    };

    queryClient.setQueryData(["getCartDataQuery"], cart);

    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <QueryClientProvider client={queryClient}>
          <CartProductList />
        </QueryClientProvider>
      </NextIntlClientProvider>
    );

    cart?.items.forEach((cartItem) => {
      const cartItemContainer = screen.queryByTestId(cartItem?.identifier);
      expect(cartItemContainer).toBeInTheDocument();
    });
  });
});
