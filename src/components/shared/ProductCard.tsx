import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import type { ProductFakerProps } from "@/App";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/lib/hook";
import { addVariant } from "@/lib/features/product";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sizes } from "@/lib/costants";
import { Controller } from "react-hook-form";

const variantSchema = z.object({
  size: z.string().min(1, "Size is required"),
  color: z.string().min(1, "Color is required"),
  price: z.string().min(1, "Price is required"),
});

type VariantFormValues = z.infer<typeof variantSchema>;

export function ProductCard(data: ProductFakerProps) {
  const [openVariantDialog, setOpenVariantDialog] = React.useState(false);
  const dispatch = useAppDispatch();
  const [editVariantDialog, setEditVariantDialog] = React.useState(false);

  console.log(data);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<VariantFormValues>({
    resolver: zodResolver(variantSchema),
  });

  const onVariantSubmit = (variants: VariantFormValues) => {
    console.log("Variant submitted:", data);
    reset();
    dispatch(
      addVariant({
        product: { ...data, variants: [...(data.variants || []), variants] },
      })
    );

    setOpenVariantDialog(false);
  };
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="leading-[25px] h-[50px]">{data.title}</CardTitle>
        <CardDescription className="mt-4 h-[50px]">
          {data.description?.slice(0, 100) + "...."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Variants */}
        {data?.variants && (
          <div className="mt-2">
            <p className="text-sm text-muted-foreground">Variants:</p>
            {data?.variants?.map((data: any) => (
              <ul className="text-sm space-y-1 mt-2">
                <li className="flex justify-between items-center">
                  Size: {data?.size} | {data?.color} | ₦{data?.price}{" "}
                  <Dialog
                    open={editVariantDialog}
                    onOpenChange={setEditVariantDialog}>
                    <DialogTrigger asChild>
                      <Button variant="link" className="cursor-pointer">
                        Edit
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <h2 className="text-lg font-semibold mb-0 mt-4">
                        Edit Variant
                      </h2>
                      <form
                        className="space-y-4"
                        onSubmit={handleSubmit(onVariantSubmit)}>
                        <div>
                          <Label>Size</Label>
                          <Input
                            placeholder={data?.size || "e.g. M"}
                            {...register("size")}
                          />
                          {errors.size && (
                            <p className="text-sm text-red-500 mt-1">
                              {errors.size.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label>Color</Label>
                          <Input
                            placeholder={data?.color || "e.g. M"}
                            {...register("color")}
                          />
                          {errors.color && (
                            <p className="text-sm text-red-500 mt-1">
                              {errors.color.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <Label>Price</Label>
                          <Input
                            placeholder={data?.price || "e.g. M"}
                            {...register("price")}
                          />
                          {errors.price && (
                            <p className="text-sm text-red-500 mt-1">
                              {errors.price.message}
                            </p>
                          )}
                        </div>
                        <Button type="submit" className="w-full">
                          Save Variant
                        </Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                </li>
                {/* <li className="flex justify-between">
                  Size: L | Blue | ₦6,000 <Button variant="link">Edit</Button>
                </li> */}
              </ul>
            ))}
          </div>
        )}

        {/* Variants  */}
        <Dialog open={openVariantDialog} onOpenChange={setOpenVariantDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" className="mt-4 w-full">
              Add Variant
            </Button>
          </DialogTrigger>
          <DialogContent>
            <h2 className="text-lg font-semibold mb-0 mt-4">Add Variant</h2>
            <form
              className="space-y-4"
              onSubmit={handleSubmit(onVariantSubmit)}>
              <div>
                {/* <Label>Size</Label>
                <Select {...register("size")}>
                  <SelectTrigger className="w-full">
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
                {/* <Input placeholder="e.g. M" {...register("size")} /> */}
                {/* {errors.size && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.size.message}
                  </p>
                )} */}
                <Controller
                  control={control}
                  name="size"
                  render={({ field }) => (
                    <div>
                      <Label>Size</Label>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select size" />
                        </SelectTrigger>
                        <SelectContent>
                          {sizes.map((size: string) => (
                            <SelectItem value={size}>{size}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.size && (
                        <p className="text-sm text-red-500 mt-1">
                          {errors.size.message}
                        </p>
                      )}
                    </div>
                  )}
                />
              </div>
              <div>
                <Label>Color</Label>
                <Input placeholder="e.g. Red" {...register("color")} />
                {errors.color && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.color.message}
                  </p>
                )}
              </div>
              <div>
                <Label>Price</Label>
                <Input placeholder="e.g. ₦5000" {...register("price")} />
                {errors.price && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>
              <Button type="submit" className="w-full">
                Save Variant
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>

      <CardFooter className="flex justify-between">
        {/* <Button variant="outline" className="mt-4 w-full">
          Add Variant
        </Button> */}
      </CardFooter>
    </Card>
  );
}
