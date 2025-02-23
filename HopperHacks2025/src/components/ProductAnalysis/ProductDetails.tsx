interface ProductDetailsProps {
  productName: string;
  productBrand: string;
}

export function ProductDetails({
  productName,
  productBrand,
}: ProductDetailsProps) {
  return (
    <section className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-6 shadow-lg transition-colors duration-200">
      <h1 className="text-4xl font-bold text-[#2E7D32] dark:text-[#4CAF50]">
        {productBrand} - {productName}
      </h1>
      <p className="text-[#37474F] dark:text-gray-300 text-xl">
        Product Details
      </p>
      {/* Image placeholder */}
      <div className="mt-6 aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Product Image</p>
      </div>
    </section>
  );
}
