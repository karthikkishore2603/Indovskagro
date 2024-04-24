import React from "react";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";


export const OrderConfirmForm = () => {
  const [stage, setStage] = React.useState<"phone" | "otp" | "address">(
    "phone"
  );
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        padding: "2rem",
        boxSizing: "border-box",

        form: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        },
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Confirm Order
      </Typography>
      {stage === "phone" ? (
        <>
          <FormContainer
            defaultValues={{ name: "" }}
            onSuccess={(data) => {
              console.log(data);
              setStage("otp");
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
                pb: "2rem",
              }}
            >
              <TextFieldElement
                name="phoneno"
                label="Phone No"
                required
                fullWidth
                validation={{
                  required: "Phone No is required",
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: "Invalid Phone No",
                  },
                }}
              />

              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{
                  ml: 1,
                }}
              >
                Get OTP
              </Button>
            </Box>

            <TextFieldElement
              name="otp"
              label="OTP"
              required
              fullWidth
              sx={{
                paddingBottom: "1rem",
              }}
              validation={{
                required: "OTP is required",
                pattern: {
                  value: /^[0-9]{5}$/,
                  message: "Invalid OTP",
                },
              }}
            />

            <TextFieldElement
              name="customername"
              label="Name"
              required
              fullWidth
              sx={{
                paddingBottom: "1rem",
              }}
              validation={{
                required: "Fill the name",
              }}
            />

            <TextFieldElement
              name="address"
              label="Address"
              required
              fullWidth
              sx={{
                paddingBottom: "1rem",
              }}
              validation={{
                required: "Fill the adress",
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                ml: 1,
              }}
            >
              Confirm Order
            </Button>
          </FormContainer>
        </>
      ) : (
        <></>
      )}
    </Box>
  );
};
