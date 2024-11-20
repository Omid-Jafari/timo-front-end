import Image from "next/image";

const ProductCover = ({ productCover }: { productCover: string }) => {
  if (!productCover) return null;

  return (
    <div className="relative w-full md:w-1/2 aspect-square rounded-lg overflow-hidden">
      <Image
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        src={productCover}
        // alt={productData?.cover_alt}
        alt={"product cover alt"}
        className="object-contain"
        priority
      />
    </div>
  );
};

export default ProductCover;
