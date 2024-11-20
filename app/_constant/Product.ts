export type Tag = {
  cover: string;
  cover_alt: string;
  heading: string;
  identifier: string;
  link_title: string;
  title: string;
};
export type Category = {
  cover: string;
  cover_alt: string;
  heading: string;
  identifier: string;
  link_title: string;
  title: string;
};
export type Product = {
  identifier: string;
  title: string;
  link_title: string;
  cover: string;
  discount_active: boolean;
  discount_percent: number;
  gross_price: number;
  net_price: number;
  stock_status: boolean;
  stock_amount: number;
  free_delivery: boolean;
  short_description: string;
  unit: {
    identifier: string;
    title: string;
    plural_title: string;
  };
  categories: [
    {
      identifier: string;
      title: string;
      link_title: string;
      cover: string;
    }
  ];
};
export type ProductResponse = {
  count: number;
  next: string;
  previous: null;
  num_pages: number;
  results: Product[];
};
export type SingleProduct = {
  identifier: string;
  title: string;
  link_title: string;
  cover: string;
  discount_active: boolean;
  discount_percent: number;
  gross_price: number;
  net_price: number;
  stock_status: boolean;
  stock_amount: number;
  free_delivery: boolean;
  short_description: string;
  unit: {
    identifier: string;
    title: string;
    plural_title: string;
  };
  categories: [
    {
      identifier: string;
      title: string;
      link_title: string;
      cover: string;
    }
  ];
  seo_title: string;
  seo_description: string;
  canonical: null;
  index: boolean;
  main_text: null;
  features: [];
  images: [];
};
