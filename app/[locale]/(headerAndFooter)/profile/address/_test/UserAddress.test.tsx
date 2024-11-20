import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen } from "@testing-library/react";
import UserAddress from "../_component/UserAddress";
import { NextIntlClientProvider } from "next-intl";

describe("UserAddresses", () => {
  const queryClient = new QueryClient();
  const locale = "fa";
  const messages = require(`../../../../../_messages/${locale}.json`);

  it("should return no address found when there is no adress saved", () => {
    queryClient.setQueryData(["getUserAddressesQuery"], {
      count: 0,
    });

    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <QueryClientProvider client={queryClient}>
          <UserAddress />
        </QueryClientProvider>
      </NextIntlClientProvider>
    );

    expect(screen.queryByTestId("noAddressFound")).toBeInTheDocument();
  });

  it("should return list of user addresses", () => {
    queryClient.setQueryData(["getUserAddressesQuery"], {
      count: 2,
      num_pages: 1,
      next: null,
      previous: null,
      results: [
        {
          identifier: "2509c96a-81a6-4f54-87cd-277f16b635eb",
          title: "Office",
          country: { code: "TR", name: "Turkey" },
          country_area: "Hola",
          city: "Antalia",
          city_area: "Hola",
          street_address: "Addresse street",
          postal_code: "2727363",
        },
        {
          identifier: "bd12535f-3778-4829-bfd9-4f7654b27238",
          title: "office",
          country: { code: "TR", name: "Turkey" },
          country_area: "Saadi",
          city: "Shiraz",
          city_area: "Saadi",
          street_address: "Un yeki",
          postal_code: "7341153511",
        },
      ],
    });

    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <QueryClientProvider client={queryClient}>
          <UserAddress />
        </QueryClientProvider>
      </NextIntlClientProvider>
    );

    expect(screen.queryByTestId("noAddressFound")).not.toBeInTheDocument();
  });

  it("should return user addresses ic a cart", () => {
    const adressData = {
      count: 2,
      num_pages: 1,
      next: null,
      previous: null,
      results: [
        {
          identifier: "2509c96a-81a6-4f54-87cd-277f16b635eb",
          title: "Office",
          country: { code: "TR", name: "Turkey" },
          country_area: "Hola",
          city: "Antalia",
          city_area: "Hola",
          street_address: "Addresse street",
          postal_code: "2727363",
        },
        {
          identifier: "bd12535f-3778-4829-bfd9-4f7654b27238",
          title: "office",
          country: { code: "TR", name: "Turkey" },
          country_area: "Saadi",
          city: "Shiraz",
          city_area: "Saadi",
          street_address: "Un yeki",
          postal_code: "7341153511",
        },
      ],
    };
    queryClient.setQueryData(["getUserAddressesQuery"], adressData);

    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <QueryClientProvider client={queryClient}>
          <UserAddress />
        </QueryClientProvider>
      </NextIntlClientProvider>
    );

    expect(screen.queryByTestId("noAddressFound")).not.toBeInTheDocument();
    adressData?.results?.forEach((addressItem) => {
      const addressItemContainer = screen.queryByTestId(
        addressItem?.identifier
      );
      expect(addressItemContainer).toBeInTheDocument();
    });
  });
});
