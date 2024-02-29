import React from "react";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../src/firebase";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";

import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { useTheme } from "@mui/material/styles";

export function MediaControlCard() {
  const theme = useTheme();
  const [value, setValue] = React.useState<number>(30);

  return (
    <Card sx={{ display: "flex" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "200px",
        }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            OIL
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Mac Miller
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <IconButton
        
            onClick={() => {
              setValue(value - 1);
            }}
          >
            <IndeterminateCheckBoxIcon />
          </IconButton>
          <Typography component="div" variant="h5">
            {value}
          </Typography>
          <IconButton
            onClick={() => {
              setValue(value + 1);
            }}
          >
            <AddBoxIcon />
          </IconButton>
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image="https://ik.imagekit.io/Karthik2612/v0/b/indovskagro.appspot.com/o/product-images%2Fffbf3350-622e-4cb5-a8ec-3bbcf32de35d-oil.jpg?alt=media&token=d8a12d77-f887-4eca-b59d-fa5696cacfb8"
        alt="Live from space album cover"
      />
    </Card>
  );
}

export const OrderConfirmForm = () => {
  const [user, loading, error] = useAuthState(auth);
  const [anchorEl, setAnchorEl] = React.useState<HTMLAnchorElement | null>(
    null
  );

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
        Cart
      </Typography>

      <a
        aria-describedby={id}
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
        }}
      ></a>

      {stage === "phone" ? (
        <>
          {!user && (
            <>
              Please Login to Continue
              <FormContainer>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  href="/login/index.html"
                  sx={{
                    marginTop: "1rem",
                    ml: 1,
                  }}
                >
                  Login
                </Button>
              </FormContainer>
            </>
          )}
          {user && (
            <>
              <FormContainer
                defaultValues={{ name: "" }}
                onSuccess={(data) => {
                  console.log(data);
                  setStage("otp");
                }}
              >
                <MediaControlCard />

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
          )}
        </>
      ) : (
        <></>
      )}
    </Box>
  );
};
