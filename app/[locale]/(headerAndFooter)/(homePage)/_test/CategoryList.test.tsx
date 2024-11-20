import { render, screen } from "@testing-library/react";
import CategoryList from "../_component/categorySec/CategoryList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NextIntlClientProvider } from "next-intl";

describe("CategoryList", () => {
  it("should return null if cat list in empty", () => {
    const queryClient = new QueryClient();

    queryClient.setQueryData(["getCategoriesDataQuery"], { results: [] });
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <CategoryList />
      </QueryClientProvider>
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("should return list of categories when data provided", () => {
    const queryClient = new QueryClient();
    const locale = "fa";
    const messages = require(`../../../../_messages/${locale}.json`);
    const catList = [
      {
        cover: "https://cdn.timobio.com/media/products/categories/bchai.webp",
        identifier: "aab0738b-6ad6-4e48-851a-e50bf64ebc7d",
        link_title: "tea",
        title: "چای",
      },
      {
        cover:
          "https://cdn.timobio.com/media/products/categories/bzaferan.webp",
        identifier: "45398b9c-d197-4780-bf8c-15048769fd23",
        link_title: "saffron",
        title: "زعفران",
      },
    ];
    queryClient.setQueryData(["getCategoriesDataQuery"], {
      results: catList,
    });

    render(
      <NextIntlClientProvider locale={locale} messages={messages}>
        <QueryClientProvider client={queryClient}>
          <CategoryList />
        </QueryClientProvider>
      </NextIntlClientProvider>
    );

    catList.forEach((catItem) => {
      const link = screen.getByRole("link", { name: catItem?.title });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute(
        "href",
        `/${locale}/shop?catLink=${catItem?.link_title}`
      );
    });
  });
});
