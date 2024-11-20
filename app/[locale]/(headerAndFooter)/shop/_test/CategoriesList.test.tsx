import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CategoriesList from "../_component/filterSec/CategoriesList";

describe("CategoryList", () => {
  it("should return null if cat list in empty", () => {
    const queryClient = new QueryClient();

    queryClient.setQueryData(["getCategoriesDataQuery"], { results: [] });
    const { container } = render(
      <QueryClientProvider client={queryClient}>
        <CategoriesList />
      </QueryClientProvider>
    );

    expect(container).toBeEmptyDOMElement();
  });
});
