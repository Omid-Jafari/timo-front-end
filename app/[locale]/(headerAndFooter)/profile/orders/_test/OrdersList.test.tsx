import { render, screen } from "@testing-library/react";
import OrdersList from "../_component/OrdersList";
import { NextIntlClientProvider } from "next-intl";
import { OrdersData } from "../_constant/orders";

describe("OrdersList", () => {
  const locale = "fa";
  const messages = require(`../../../../../_messages/${locale}.json`);

  it("should return no order found div", () => {
    const orderData = { count: 0, results: [], num_pages: 1 };

    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <OrdersList ordersData={orderData} />
      </NextIntlClientProvider>
    );

    expect(screen.queryByTestId("noOrder")).toBeInTheDocument();
  });

  it("should return orders list", () => {
    const orderData: OrdersData = {
      count: 43,
      num_pages: 1,
      results: [
        {
          identifier: "121a09b3-ddfa-4725-97e8-93aba0c075a5",
          ref_id: 17754,
          origin: "checkout",
          payment_method: "digital",
          humanized_payment_method: "digital",
          status: "unpaid",
          humanized_status: "unpaid",
          gross_total: "320.00",
          net_total: "450.5",
          discount_amount: "0.00",
          created_at: "2024-07-23T12:03:08.601029+03:00",
          modified_at: "2024-07-23T12:03:08.677261+03:00",
          user: {
            identifier: "23d883bb-ca80-4783-8776-e7444d0b4005",
            phone_number: "+989380963031",
            first_name: "Omid",
            last_name: "Jafari",
            email: "omidjafari@gmail.com",
          },
          delivery_method: {
            identifier: "28e77aa2-69ba-4fa8-afa3-c4619a85e40f",
            title: "Cargo",
            icon: "https://cdn.timobio.com/media/shipping/delivery-method/icon/bdelivery-truck.png",
          },
        },
      ],
    };

    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <OrdersList ordersData={orderData} />
      </NextIntlClientProvider>
    );

    expect(screen.queryByTestId("noOrder")).not.toBeInTheDocument();
    orderData?.results.forEach((oData) => {
      const oDataDiv = screen.queryByTestId(oData?.identifier);
      expect(oDataDiv).toBeInTheDocument();
    });
  });
});
