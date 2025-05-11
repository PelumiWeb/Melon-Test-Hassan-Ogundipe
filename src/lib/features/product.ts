
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
          const { variant, productId } = action.payload;
          const product = state.products.find((p:any) => p.id === productId);
          if (product) {
            product.variants.push(variant);
          }
       },

       editVariant: (state, action:PayloadAction<Products>) => {
        const updatedProduct = action.payload.product;
        const updatedVariant = action.payload.variant;
        const newVariants = updatedProduct.variants.map((variant:Variant) =>
          variant.id === updatedVariant.id ? { ...variant, ...updatedVariant } : variant
        );
        const newProduct = { ...updatedProduct, variants: newVariants };

      
        state.products = state.products.map((product:Product) =>
          product.id === newProduct.id ? newProduct : product
        );
     },
    }
}) 


export const {setProduct, addProduct, addVariant, editVariant} = productSlice.actions

export const selectUser = (state: RootState) => state.product

export default productSlice.reducer