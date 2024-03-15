import React from "react";

import { Layout } from "@/components/layout";
import { Heading1 } from "@/components/typography/headings";

import { DataTable } from "@/components/catalogue/products-table";
import { getColumns, products } from "@/components/catalogue/products-columns";
import { ProductFormDialog } from "@/components/catalogue/product-dialog";
import { Skeleton } from "@/components/ui/skeleton";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/firebase/products";
import type { Product } from "@/types";

export default function Catalogue() {
  const [submitCount, setSubmitCount] = React.useState(0);
  const [defaultValues, setDefaultValues] = React.useState<Product | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const { isPending, error, data } = useQuery<Product[], Error>({
    queryKey: ["products", submitCount],
    queryFn: async () => {
      // delay for 1 second to simulate network request
      const response = await getProducts();
      return response;
    },
  });

  const columns = React.useMemo(
    () =>
      getColumns((product) => {
        console.log("yes");
        setDefaultValues(product);
        setIsDialogOpen(true);
      }, setSubmitCount),
    [isDialogOpen, setDefaultValues, setIsDialogOpen]
  );

  return (
    <Layout>
      <Heading1>Catalogue</Heading1>
      <ProductFormDialog
        setSubmitCount={setSubmitCount}
        setOpen={setIsDialogOpen}
        open={isDialogOpen}
        defaultValues={defaultValues}
        setDefaultValues={setDefaultValues}
        isEdit={defaultValues?.title ? true : false}
      />
      <div className="my-2">
        {isPending ? (
          <div>
            <Skeleton className="h-[300px] w-full" />
          </div>
        ) : error ? (
          <div>Error: {error.message}</div>
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </div>
    </Layout>
  );
}
