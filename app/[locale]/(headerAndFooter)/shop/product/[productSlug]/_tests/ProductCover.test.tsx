import { render, screen } from "@testing-library/react";
import ProductCover from "../_component/CoverAndDetail/ProductCover";

describe("ProductCover", () => {
  it("should render empty dom when images array is empty", () => {
    const { container } = render(
      <ProductCover productCover="" />
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("should render product image", () => {
    const productCover = "https://static.giahine.com/media/products/b____FG4PB52.webp"

    render(<ProductCover productCover={productCover}  />);

    const images = screen.getByRole("img");
    expect(images).toBeInTheDocument()
  });
});
