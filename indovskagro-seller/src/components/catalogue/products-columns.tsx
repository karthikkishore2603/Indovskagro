import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

import type { Product } from "@/types";

export function getColumns(
  openEditDialog: (product: Product) => void
): ColumnDef<Product>[] {
  return [
    {
      accessorKey: "title",
      header: "Title",
    },
    { accessorKey: "description", header: "Description" },
    {
      accessorKey: "stock",
      header: "Stock",
    },
    {
      accessorKey: "mrp",
      header: () => <div className="text-right">MRP</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("mrp"));
        const formatted = new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(amount);

        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      accessorKey: "price",
      header: () => <div className="text-right">Price</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("price"));
        const formatted = new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
        }).format(amount);

        return <div className="text-right font-medium">{formatted}</div>;
      },
    },

    {
      id: "actions",
      cell: ({ row }) => {
        const product = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(product.id || "");
                  toast("Product ID copied to clipboard");
                }}
              >
                Copy product ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  if (typeof product.image === "string")
                    window.open(product.image, "_blank");
                }}
              >
                View Image
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={async () => {
                  if (!(typeof product.image === "string")) return;
                  let response = await fetch(product.image);
                  let data = await response.blob();

                  // remove everything after `?` in the image URL
                  // then split the string by `.` and get the last element
                  const extension = product.image
                    .split("?")[0]
                    .split(".")
                    .pop();

                  let metadata = {
                    type: `image/${extension}`,
                  };
                  let file = new File([data], `edited.${extension}`, metadata);

                  openEditDialog({
                    ...product,
                    image: file,
                  });
                }}
              >
                Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
}

export const products: Product[] = [
  {
    id: "1",
    title: "Product 1",
    description: "Product 1 description",
    mrp: 100,
    price: 90,
    stock: 100,
    image: "https://via.placeholder.com/150",
  },
  // ...
];
