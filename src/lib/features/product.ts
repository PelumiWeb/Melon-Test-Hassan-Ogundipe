
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import type { Product, Products } from "../types";



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
    }
}) 


export const {setProduct, addProduct, addVariant} = productSlice.actions

export const selectUser = (state: RootState) => state.product

export default productSlice.reducer