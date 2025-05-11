import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sizes } from "@/lib/costants";
import { Controller } from "react-hook-form";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppDispatch } from "@/lib/hook";
import type { Variant } from "@/lib/types";
import { editVariant } from "@/lib/features/product";

const variantSchema = z.object({
  size: z.string().min(1, "Size is required"),
  color: z.string().min(1, "Color is required"),
  price: z.string().min(1, "Price is required"),
});

type Props = {
  data: any;
  variant: Variant;
};

const EditVariantDialog = (props: Props) => {
  const [editVariantDialog, setEditVariantDialog] = React.useState(false);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<VariantFormValues>({
    resolver: zodResolver(variantSchema),
  });
  type VariantFormValues = z.infer<typeof variantSchema>;

  const onVariantEditSubmit = (variant: VariantFormValues) => {
    dispatch(
      editVariant({
        product: props.data,
        variant: { id: props.variant.id, ...variant },
      })
    );
    setEditVariantDialog(false);
    reset();
  };

  return (
    <Dialog open={editVariantDialog} onOpenChange={setEditVariantDialog}>
      <DialogTrigger asChild>
        <Button variant="link" className="cursor-pointer">
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <h2 className="text-lg font-semibold mb-0 mt-4">Edit Variant</h2>
        <form
          className="space-y-4"
          onSubmit={handleSubmit(onVariantEditSubmit)}>
          <Controller
            control={control}
            name="size"
            render={({ field }) => (
              <div>
                <Label>Size</Label>
                <Select onValueChange={field.onChange} value={field.value}>
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
          <div>
            <Label>Color</Label>
            <Input
              placeholder={props?.variant?.color || "e.g. M"}
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
              placeholder={props?.variant?.price || "e.g. M"}
              {...register("price")}
            />
            {errors.price && (
              <p className="text-sm text-red-500 mt-1">
                {errors.price.message}
              </p>
            )}
          </div>
          <Button type="submit" className="w-full">
            Edit Variant
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditVariantDialog;
