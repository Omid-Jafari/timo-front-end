const priceComma = (price: number) => {
  return price?.toLocaleString("tr-TR", {
    style: "currency",
    currency: "TRY",
    minimumFractionDigits: 2,
  });
};
export default priceComma;
