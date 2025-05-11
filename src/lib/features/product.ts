
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { Product, Products, Variant } from "../types";



const initialState:Products = {
  products: [],
  product:  null
  
}



export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers:{
      
      setProduct: (state, action:PayloadAction<Products>) => {
        state.products = action.payload.products
     },
        addProduct: (state, action:PayloadAction<Products>) => {
           state.products =  [action.payload.product, ...state?.products ]
        },
        addVariant: (state, action:PayloadAction<Products>) => {
          const updatedProduct = action.payload.product;
          state.products = state.products.map((product:Product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          );
       },

       editVariant: (state, action:PayloadAction<Products>) => {
        const updatedProduct = action.payload.product;
        const updatedVariant = action.payload.variant;

        console.log(updatedVariant, "updatedVariant")

        const newVariants = updatedProduct.variants.map((variant:Variant) =>
          variant.id === updatedVariant.id ? { ...variant, ...updatedVariant } : variant
        );

        const newProduct = { ...updatedProduct, variants: newVariants };

        console.log(newVariants,newProduct, "The new Data")

      
        state.products = state.products.map((product:Product) =>
          product.id === newProduct.id ? newProduct : product
        );
     },
    }
}) 


export const {setProduct, addProduct, addVariant, editVariant} = productSlice.actions

export const selectUser = (state: RootState) => state.product

export default productSlice.reducer