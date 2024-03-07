import React from "react";
import { Box, Card, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";

export default function Myaccount() {
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
          border: "0.1px solid  #E8E8E8",
          boxShadow: "0.75px 0.75px 0.75px 0.75px",
        }}
      >
        <Box
          sx={{
            padding: "20px",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            sx={{
                paddingRight: "20px",
              width: {
                xs: "23px",
                sm: "45px",
                md: "450px",
                lg: "500px",
              },
            }}
          />
          <TextField
            sx={{              
              width: {
                xs: "23px",
                sm: "45px",
                md: "450px",
                lg: "500px",
              },
            }}
            id="outlined-basic"
            label="First Name"
            variant="outlined"
          />
        </Box>
      </Card>
    </>
  );
}
