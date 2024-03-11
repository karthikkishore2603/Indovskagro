import React from "react";

import { Box, Button, Card, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";


export default async function Myaccount() {
  
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
            justifyContent: "center",
            flexDirection: {
              xs: "column",
              sm: "column",
              md: "row",
              lg: "row",
            },
          }}
        >
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            sx={{
              paddingBottom: {
                xs: "20px",
                sm: "20px",
                md: "0px",
                lg: "0px",
              },
              paddingRight: {
                xs: "0px",
                sm: "0px",
                md: "20px",
                lg: "20px",
              },
              width: {
                xs: "400px",
                sm: "525px",
                md: "450px",
                lg: "600px",
              },
            }}
          />
          <TextField
            sx={{
              width: {
                xs: "400px",
                sm: "525px",
                md: "450px",
                lg: "600px",
              },
              paddingRight: {
                xs: "0px",
                sm: "0px",
                md: "20px",
                lg: "20px",
              },
            }}
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
          />
        </Box>

        <Box
          sx={{
            padding: "20px",
            display: "flex",
            justifyContent: "center",
            flexDirection: {
              xs: "column",
              sm: "column",
              md: "row",
              lg: "row",
            },
          }}
        >
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            sx={{
              paddingBottom: {
                xs: "20px",
                sm: "20px",
                md: "0px",
                lg: "0px",
              },
              width: {
                xs: "400px",
                sm: "525px",
                md: "450px",
                lg: "600px",
              },
              paddingRight: {
                xs: "0px",
                sm: "0px",
                md: "20px",
                lg: "20px",
              },
            }}
          />
          <TextField
            id="outlined-basic"
            label="Phone NO"
            variant="outlined"
            sx={{
              width: {
                xs: "400px",
                sm: "525px",
                md: "450px",
                lg: "600px",
              },
              paddingRight: {
                xs: "0px",
                sm: "0px",
                md: "20px",
                lg: "20px",
              },
            }}
          />
        </Box>

        <Box
          sx={{
            padding: "20px",
            display: "flex",
            justifyContent: "center",
            flexDirection: {
              xs: "column",
              sm: "column",
              md: "row",
              lg: "row",
            },
          }}
        >
          <TextField
            id="outlined-basic"
            label="Address"
            variant="outlined"
            sx={{
              width: {
                xs: "400px",
                sm: "525px",
                md: "900px",
                lg: "1200px",
              },
              paddingRight: {
                xs: "0px",
                sm: "0px",
                md: "20px",
                lg: "20px",
              },
            }}
          />
        </Box>

        <Box
          sx={{
            padding: "20px",
            display: "flex",
            justifyContent: "center",
            flexDirection: {
              xs: "column",
              sm: "column",
              md: "row",
              lg: "row",
            },
          }}
        >
          <Button
            id="outlined-basic"
            variant="contained"
            sx={{
              marginBottom: {
                xs: "20px",
                sm: "20px",
                md: "0px",
                lg: "0px",
              },
              marginRight: {
                xs: "0px",
                sm: "0px",
                md: "20px",
                lg: "20px",
              },
              width: {
                xs: "400px",
                sm: "525px",
                md: "450px",
                lg: "580px",
              },
            }}
          >
            Change Password
          </Button>

          <Button
            variant="contained"
            sx={{
              marginRight: {
                xs: "0px",
                sm: "0px",
                md: "20px",
                lg: "20px",
              },
              width: {
                xs: "400px",
                sm: "525px",
                md: "450px",
                lg: "580px",
              },
            }}
          >
            Update
          </Button>
        </Box>
      </Card>
    </>
  );
}
