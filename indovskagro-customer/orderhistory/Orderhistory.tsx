import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

import { auth } from "../src/firebase";
import { getOrdersByUserId } from "../src/firebase/orders";
import { type Order } from "../src/types";

import { useAuthState } from "react-firebase-hooks/auth";

const steps = [
  "Order placed",
  "Order confirmed",
  "Order dispatched",
  "In transit",
  "Delivered",
];

function OrderDisplay({ order }: { order: Order }) {
  return (
    <>
      <Card
        sx={{
          marginBottom: "20px",
          marginLeft: {
            xs: "23px",
            sm: "45px",
            lg: "100px",
          },
          marginRight: {
            xs: "23px",
            sm: "45px",
            lg: "100px",
          },
        }}
      >
        <CardContent>
          <Typography
            component="div"
            variant="h5"
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            Order ID: {order.id}
            <Typography variant="h5" component="div">
              Order Date: {new Date(order.orderedDate).toLocaleDateString()}
            </Typography>
          </Typography>

          <Typography variant="h5" color="text.secondary" component="div">
            Number of items: {order.cartItems.length}
          </Typography>
          <Typography variant="h5" color="text.secondary" component="div">
            Total Amount: {order.totalPrice}
          </Typography>
          <Typography variant="h5" color="text.secondary" component="div">
            Delivery Address: {order.deliveryAddress}
          </Typography>

          <Box sx={{ width: "100%" }}>
            <Stepper
              activeStep={
                steps.indexOf(order.status) === -1
                  ? 0
                  : steps.indexOf(order.status)
              }
              alternativeLabel
            >
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        </CardContent>
      </Card>
    </>
  );
}

export function OrdersHistory() {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [user, loading, error] = useAuthState(auth);

  React.useEffect(() => {
    const a = async () => {
      if (user) {
        const data = await getOrdersByUserId(user.uid);
        setOrders(data);
      }
    };
    a();
  }, [user]);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Some unknown error occurred. Contact support.</h1>;
  }
  if (!user) {
    return <h2>Please login to view your orders</h2>;
  }

  return (
    <>
      {orders.map((order) => {
        return <OrderDisplay order={order} />;
      })}
    </>
  );
}
