import * as React from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { addProduct, updateProduct } from "@/firebase/products";
import { Product } from "@/types";

const ProductFormSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(5, {
    message: "Description must be at least 5 characters.",
  }),
  mrp: z.coerce.number().min(1, {
    message: "MRP must be at least 1.",
  }),
  price: z.coerce.number().min(1, {
    message: "Price must be at least 1.",
  }),
  stock: z.coerce.number().min(1, {
    message: "Stock must be at least 1.",
  }),
  // image should be a file
  image: z.instanceof(File, {
    message: "Image is required.",
  }),
  category: z.string().min(1, {
    message: "Category is required.",
  }),
});

function ProductForm({
  className,
  setOpen,
  setSubmitCount,
  defaultValues,
  setDefaultValues,
  isEdit,
}: {
  className?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSubmitCount: React.Dispatch<React.SetStateAction<number>>;
  defaultValues: Product | null;
  setDefaultValues: React.Dispatch<React.SetStateAction<Product | null>>;
  isEdit: boolean;
}) {
  const form = useForm<z.infer<typeof ProductFormSchema>>({
    resolver: zodResolver(ProductFormSchema),
    defaultValues: {
      title: defaultValues?.title || "",
      description: defaultValues?.description || "",
      mrp: defaultValues?.mrp || 0,
      price: defaultValues?.price || 0,
      stock: defaultValues?.stock || 0,
      category: defaultValues?.category || "",
      image:
        typeof defaultValues?.image === "string"
          ? undefined
          : defaultValues?.image || undefined,
    },
  });

  async function onSubmit(data: z.infer<typeof ProductFormSchema>) {
    console.log(data.image);
    console.log(data);

    if (!isEdit) {
      try {
        await addProduct(data);
      } catch (error) {
        console.error(error);
        toast.error(
          "Failed to add product. Please try again later or contact support."
        );
        return;
      }
    } else {
      // edit product
      try {
        await updateProduct(defaultValues?.id || "", data);
      } catch (error) {
        console.error(error);
        toast.error(
          "Failed to update product. Please try again later or contact support."
        );
        return;
      }
    }

    setDefaultValues(null);
    setSubmitCount((count) => count + 1);
    setOpen(false);
    toast.success("Product added successfully.");
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn("space-y-6", className)}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4 space-y-0">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the product's title"
                    className={"col-span-3"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4 space-y-0">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the product's description"
                    className={"col-span-3"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4 space-y-0">
                <FormLabel>Category</FormLabel>

                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl className="w-full">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select the product's category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Oil">Oil</SelectItem>
                    <SelectItem value="Fruits">Fruits</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mrp"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4 space-y-0">
                <FormLabel>MRP</FormLabel>
                <FormControl className="w-full">
                  <Input
                    placeholder="Enter the product's MRP"
                    type="number"
                    className={"col-span-3"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4 space-y-0">
                <FormLabel>Price</FormLabel>
                <FormControl className="w-full">
                  <Input
                    placeholder="Enter the product's price"
                    type="number"
                    className={"col-span-3"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4 space-y-0">
                <FormLabel>Stock</FormLabel>
                <FormControl className="w-full">
                  <Input
                    placeholder="Enter the product's stock"
                    type="number"
                    className={"col-span-3"}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="grid grid-cols-4 items-center gap-4 space-y-0">
                <FormLabel>Image</FormLabel>
                <FormControl className="w-full">
                  <Input
                    type="file"
                    className={"col-span-3"}
                    {...field}
                    // value={""}
                    value={undefined}
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0])
                        field.onChange(e.target.files[0]);
                    }}
                    accept="image/*"/>
                  {/* <input
                    type="file"
                    className={"col-span-3"}
                    {...field}
                    // value={""}
                    value={undefined}
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        const file = e.target.files[0];
                        const img = new Image();
                        img.src = URL.createObjectURL(file);
                        img.onload = () => {
                          if (img.width >= 520 && img.height >= 520) {
                            field.onChange(file);
                          } else {
                            alert("Please select an image with size 100px * 100px");
                          }
                        };
                      }
                    }}
                    accept="image/*"
                  /> */}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Save
          </Button>
        </form>
      </Form>
    </>
  );
}

export function ProductFormDialog({
  open,
  setOpen,
  setSubmitCount,
  defaultValues,
  setDefaultValues,
  isEdit = false,
  title = "Add Product",
}: {
  setSubmitCount: React.Dispatch<React.SetStateAction<number>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  defaultValues: Product | null;
  setDefaultValues: React.Dispatch<React.SetStateAction<Product | null>>;
  isEdit?: boolean;
  title?: string;
}) {
  React.useEffect(() => {
    if (!open) setDefaultValues(null);
  }, [open]);

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Add Product</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>
            {isEdit ? `Edit Product: ${defaultValues?.title}` : "Add Product"}
          </DrawerTitle>
          <DrawerDescription>Click save when you're done.</DrawerDescription>
        </DrawerHeader>
        <ProductForm
          className="px-4"
          setOpen={setOpen}
          setSubmitCount={setSubmitCount}
          defaultValues={defaultValues}
          setDefaultValues={setDefaultValues}
          isEdit={isEdit}
        />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
