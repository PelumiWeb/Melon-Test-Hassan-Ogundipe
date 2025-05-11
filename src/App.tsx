// import { Button } from "@/components/ui/button";
// import {
//   useQuery,
//   useMutation,
//   useQueryClient,
//   QueryClient,
//   QueryClientProvider,
// } from '@tanstack/react-query'
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { ProductCard } from "./components/shared/ProductCard";
import { useAppSelector, useAppDispatch } from "./lib/hook";
import { endpoints } from "./lib/api/endpoints";
import { useApiMutation, useApiQuery } from "./lib/api/useApi";
import { addProduct } from "./lib/features/product";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFilterProduct } from "./hooks/filterProduct";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sizes } from "./lib/costants";

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "product price is required"),
});
// import { useApiQuery } from "./lib/api/useApi";
// import { endpoints } from "./lib/api/endpoints";

// const products = [{ title: "Product Titile"}]

export type ProductFakerProps = {
  id: number;
  category: string;
  title: string;
  price: number;
  description: string;
  image: string;
  variants?: [];
};

function App() {
  const [search, setSearch] = useState("");
  const { products } = useAppSelector((data) => data.product);
  const [openVariantDialog, setOpenVariantDialog] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  const { data } = useApiQuery<any>(["products"], endpoints.product);
  const dispatch = useAppDispatch();

  const filterProduct: any = useFilterProduct(products, search, selectedSize);


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

  const { mutate, isPending } = useApiMutation<any, any>(
    "post",
    endpoints.product,
    {
      onSuccess: (data) => {
        console.log("Product created:", data);
        dispatch(
          addProduct({
            product: { ...data, variants: [] },
          })
        );
        setOpenVariantDialog(false);
      },
      onError: (data: any) => {
        console.log(data);
        // console.log("User error:", data);
        // const errorMessage = () => toast.error(data?.message);
        // errorMessage();
      },
    }
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
  });

  const onSubmit = (data: any) => {
    mutate({
      title: data.name,
      description: data.description,
    });
    reset();
  };

  return (
    <div className="p-4 md:p-8 max-w-screen-xl mx-auto">
      {/* Header: Add Product + Search */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <Dialog open={openVariantDialog} onOpenChange={setOpenVariantDialog}>
          <DialogTrigger asChild>
            <Button>Add Product</Button>
          </DialogTrigger>
          <DialogContent>
            <h2 className="text-lg font-semibold mb-4">Add New Product</h2>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Input
                  placeholder="Product Name (e.g. Sneakers)"
                  {...register("name")}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  placeholder="Product Description Black and Yellow Bag"
                  {...register("description")}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* <div>
                <Input
                  placeholder="Product Name (e.g. Sneakers)"
                  {...register("price")}
                />
                {errors.name && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.price.message}
                  </p>
                )} */}
              {/* </div> */}

              <Button type="submit" onLoad={isPending} className="w-full">
                Save Product
              </Button>
            </form>
          </DialogContent>
        </Dialog>
        <div className="flex items-center justify-between space-x-4">
          <Select onValueChange={(value) => setSelectedSize(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Size" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sizes</SelectLabel>
                {sizes.map((size: string) => (
                  <SelectItem value={size}>{size}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
        </div>
      </div>

      {/* Placeholder for Product Cards */}
      {data && (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {/* Map through products here and render ProductCard components */}
          {/* <ProductCard product={product} /> */}
          {/* <div className="border rounded-xl p-4 shadow-sm">
          <h3 className="text-lg font-medium mb-2">Shirt</h3>
          <p className="text-sm text-muted-foreground">Variants:</p>
          <ul className="text-sm space-y-1 mt-2">
            <li className="flex justify-between">
              Size: M | Red | ₦5,000 <Button variant="link">Edit</Button>
            </li>
            <li className="flex justify-between">
              Size: L | Blue | ₦6,000 <Button variant="link">Edit</Button>
            </li>
          </ul>
          <Button variant="outline" className="mt-4 w-full">
            Add Variant
          </Button>
        </div> */}
          {filterProduct.map((data: any) => (
            <ProductCard {...data} />
          ))}

          {/* Repeat similar cards or make this a reusable ProductCard component */}
        </div>
      )}
    </div>
  );
}

export default App;
