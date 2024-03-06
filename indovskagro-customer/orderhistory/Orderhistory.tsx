import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";

const steps = [
  "Order placed",
  "Order confirmed",
  "Order dispatched",
  "In transit",
  "Delivered",
];

export function Orderhistory() {
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
            Order ID: 123456
            <Typography variant="h5" component="div">
              Order Date: 12/12/2021
            </Typography>
          </Typography>

          <Typography variant="h5" color="text.secondary" component="div">
            Quantity: 2
          </Typography>
          <Typography variant="h5" color="text.secondary" component="div">
            Total Amount: 2000
          </Typography>
          <Typography variant="h5" color="text.secondary" component="div">
            Delivery Address: 123, ABC, XYZ
          </Typography>

          <Box sx={{ width: "100%" }}>
            <Stepper activeStep={1} alternativeLabel>
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
