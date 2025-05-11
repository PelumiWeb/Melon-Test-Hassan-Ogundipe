export type Variant = {
  id: number;
    size: string;
    color: string;
    price: string;
  };

  export type Product = {
    id: string;
    description: string;
    variants: Variant[];
    title: string;
  };

  export type Products = {
    products?: any;
    product?: any;
    variant?:any;
    productId?:number

  };