export type Order = {
  identifier: string;
  ref_id: number;
  origin: string;
  payment_method: string;
  humanized_payment_method: string;
  delivery_method: {
    identifier: string;
    title: string;
    icon: string;
  };
  status: string;
  humanized_status: string;
  gross_total: string;
  net_total: string;
  discount_amount: string;
  created_at: string;
  modified_at: string;
  user: {
    identifier: string;
    phone_number: string;
    first_name: string;
    last_name: string;
    email: string;
  };
};
export type SingleOrderData = {
  identifier: string;
  ref_id: number;
  origin: string;
  payment_method: string;
  humanized_payment_method: string;
  delivery_method: {
    identifier: string;
    title: string;
    icon: string;
  };
  status: string;
  humanized_status: string;
  gross_total: string;
  net_total: string;
  discount_amount: string;
  created_at: string;
  modified_at: string;
  delivery_cost: string;
  delivery_payment: string;
  shipping_address: {
    identifier: string;
    title: string;
    country: {
      code: string;
      name: string;
    };
    country_area: string;
    city: string;
    city_area: string;
    street_address: string;
    postal_code: string;
  };
  billing_address: {
    identifier: string;
    title: string;
    country: {
      code: string;
      name: string;
    };
    country_area: string;
    city: string;
    city_area: string;
    street_address: string;
    postal_code: string;
  };
  items: [
    {
      identifier: string;
      quantity: 1;
      gross_price: string;
      net_price: string;
      gross_total: string;
      net_total: string;
      discount: string;
      discount_amount: string;
      product: {
        identifier: string;
        title: string;
        link_title: string;
        cover: string;
        unit: {
          identifier: string;
          title: string;
          plural_title: string;
        };
      };
    }
  ];
};
export type OrdersData = {
  count: number;
  num_pages: number;
  results: Order[];
};
