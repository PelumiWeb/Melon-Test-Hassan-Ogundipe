import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { endpoints } from "@/lib/api/endpoints";
import { useApiMutation } from "@/lib/api/useApi";
import { useAppDispatch } from "@/lib/hook";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { sizes } from "@/lib/costants";
import { addProduct } from "@/lib/features/product";

type Props = {
  openVariantDialog: boolean;
  setOpenVariantDialog: (value:boolean) => void;
  search: string;
  setSearch: (value:string) => void;
  setSelectedSize: (value:string) => void;
};

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "product price is required"),
});
const Header = (props: Props) => {
  const dispatch = useAppDispatch();

  const { mutate } = useApiMutation<any, any>("post", endpoints.addProduct, {
    onSuccess: (data) => {
      console.log("Product created:", data);
      dispatch(
        addProduct({
          product: {
            ...data,
            id: data.id * Math.floor(Math.random() * 50) + 1,
            variants: [],
          },
        })
      );
      props.setOpenVariantDialog(false);
    },
    onError: (data: any) => {
      console.log(data);
      // console.log("User error:", data);
      // const errorMessage = () => toast.error(data?.message);
      // errorMessage();
    },
  });

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
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
      <Dialog
        open={props.openVariantDialog}
        onOpenChange={props.setOpenVariantDialog}>
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

            <Button type="submit" className="w-full">
              Save Product
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <div className="flex items-center justify-between space-x-4">
        <Select onValueChange={(value) => props.setSelectedSize(value)}>
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
          value={props.search}
          onChange={(e) => props.setSearch(e.target.value)}
          className="max-w-sm"
        />
      </div>
    </div>
  );
};

export default Header;
