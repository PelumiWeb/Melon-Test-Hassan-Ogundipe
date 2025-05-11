import type { Product } from "@/lib/types";
import React from "react";

export const useFilterProduct = (products:any, search:string, selectedSize:string) => {

   return React.useMemo(() => {

        const filteredProducts = products.filter((product:Product) => {

            const nameMatch = product.title?.toLowerCase().includes(search.toLowerCase());
            const descriptionMatch = product.description?.toLowerCase().includes(search.toLowerCase());

            const variantMatch = product?.variants?.some(
              (variant) =>
                variant.size.toLowerCase().includes(search?.toLowerCase()) ||
              variant.color.toLowerCase().includes(search?.toLowerCase()) ||
              variant.price.toLowerCase().includes(search?.toLowerCase())
            );
            const variantFilter = product?.variants?.some(
                (variant) => {
                    return variant.size.toLowerCase() ===  selectedSize?.toLowerCase()
                }
              );
            return (nameMatch  || descriptionMatch || variantMatch) && variantFilter;
          });

          console.log(filteredProducts, "from search")
          return filteredProducts
    }, [products, search, selectedSize])
   
}