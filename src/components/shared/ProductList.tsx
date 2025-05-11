import React from "react";
import { ProductCard } from "./ProductCard";
import { useFilterProduct } from "@/hooks/filterProduct";
import { useAppSelector } from "@/lib/hook";

type Props = {
  search: string;
  selectedSize: string;
};

const ProductList = (props: Props) => {
  const { products } = useAppSelector((data) => data.product);

  // React.useEffect(() => {
  //   if (isSuccess && data) {
  //     console.log(data);
  //     const formattedData = data.map((data: ProductFakerProps) => ({
  //       ...data,
  //       variants: [],
  //     }));
  //     dispatch(setProduct({ products: formattedData }));
  //   }
  // }, [isSuccess, data]);

  const filterProduct: any = useFilterProduct(
    products,
    props.search,
    props.selectedSize
  );

  return (
    <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {filterProduct.length == 0 && (
        <div className="w-full flex items-center justify-center h-[200px]">
          <p>Empty Product, Click add Product to add a product.</p>
        </div>
      )}
      {filterProduct.map((data: any) => (
        <ProductCard {...data} />
      ))}
    </div>
  );
};

export default ProductList;
