"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Order, OrderWithUser, User } from "@/types";
import { Button } from "../ui/button";
import {
  ArrowUpDown,
  CalendarIcon,
  InfoIcon,
  MoreHorizontal,
  NotebookIcon,
} from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
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
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const orderColumns: ColumnDef<OrderWithUser>[] = [
  {
    accessorKey: "orderId",
    header: "Order Id",
  },
  {
    accessorKey: "orderedDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Ordered Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "deliveryAddress",
    header: "Delivery Address",
  },
  {
    accessorKey: "totalPrice",
    header: () => <div className="text-right">Total Price</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("totalPrice"));
      const formatted = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    id: "user",
    accessorKey: "user",
    header: "About User",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <HoverCard>
          <HoverCardTrigger>{`${user.user.fname} ${user.user.lname}`}</HoverCardTrigger>
          <HoverCardContent>
            <div className="flex justify-between space-x-4">
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">{`${user.user.fname} ${user.user.lname}`}</h4>
                <p className="text-sm">
                  Email:{" "}
                  <span className="text-muted-foreground">
                    {user.user.email}
                  </span>
                </p>
                <p className="text-sm">
                  Phone:{" "}
                  <span className="text-muted-foreground">
                    {user.user.phoneNo}
                  </span>
                </p>
                <div className="flex items-center pt-2">
                  <NotebookIcon className="mr-2 h-4 w-4 opacity-70" />{" "}
                  <span className="text-xs text-muted-foreground">
                    {user.user.address}
                  </span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const orderDetails = row.original;

      return (
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">View Info</span>
              <InfoIcon className="h-4 w-4" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Order Details</DrawerTitle>
              <DrawerDescription>
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">
                    Order Id: {orderDetails.orderId}
                  </h3>
                  <div className=" flex flex-row justify-center items-center space-x-1 text-sm">
                    <span>
                      Ordered Date:{" "}
                      {new Date(orderDetails.orderedDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </DrawerDescription>
              <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Product Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead className="text-right">Price</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orderDetails.cartItems.map((cart, index) => {
                      return (
                        <TableRow>
                          <TableCell className="font-medium">
                            {cart.product?.title}
                          </TableCell>
                          <TableCell>{cart.product?.category}</TableCell>
                          <TableCell>{cart.quantity}</TableCell>
                          <TableCell className="text-right">
                            {new Intl.NumberFormat("en-IN", {
                              style: "currency",
                              currency: "INR",
                            }).format(cart.product?.price || 0)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </DrawerHeader>
            <DrawerFooter>
              <DrawerClose>
                <Button className="w-full">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      );
    },
  },
];
