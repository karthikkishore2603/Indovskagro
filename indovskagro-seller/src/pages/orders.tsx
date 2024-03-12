import React from "react";

import { Layout } from "@/components/layout";
import { OrdersDataTable } from "@/components/orders/data-table";
import { orderColumns } from "@/components/orders/orders-columns";
import { Heading1 } from "@/components/typography/headings";

import { getOrders } from "@/firebase/orders";
import { Order, OrderWithUser } from "@/types";

export default function Orders() {
  const [loading, setLoading] = React.useState(true);
  const [orders, setOrders] = React.useState<OrderWithUser[]>([]);

  React.useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const orders = await getOrders();
        setOrders(orders);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

  return (
    <Layout>
      <Heading1>Orders</Heading1>
      <OrdersDataTable columns={orderColumns} data={orders} />

      {/* show a loading bar */}
      {loading && <div>Loading...</div>}
    </Layout>
  );
}
