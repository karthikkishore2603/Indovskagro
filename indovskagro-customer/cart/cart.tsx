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

import DeleteIcon from "@mui/icons-material/Delete";
import { useTheme } from "@mui/material/styles";

import { addToCart } from "../src/firebase/cart";
import { getCartItems } from "../src/firebase/cart";
import { removeCartItem } from "../src/firebase/cart";

import { Cart, Product } from "../src/types";

export function MediaControlCard({ cart }: { cart: Cart }) {
  const theme = useTheme();
  const [value, setValue] = React.useState<number>(cart.quantity);
  const product = cart.product;

  if (!product) return;

  return (
    <Card sx={{ display: "flex", marginBottom: "20px" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: {
            xs: "50vw",
            sm: "45vw",
            lg: "20vw",
          },
        }}
      >
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {product.title}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            {product.description}
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

          <IconButton 
          onClick={() => {
            removeCartItem(cart.userId, cart.productId);
          }}>
            <DeleteIcon />
          </IconButton>


        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={product.image}
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
  const [cartItems, setCartItems] = React.useState<Cart[]>([]);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [stage, setStage] = React.useState<"phone" | "otp" | "address">(
    "phone"
  );

  React.useEffect(() => {
    const a = async () => {
      if (user) {
        console.log("cart display");
        const items = await getCartItems(user.uid);
        setCartItems(items);
        console.log("display");
      }
    };
    a();
  }, [user]);

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
                {cartItems.map((cart) => {
                  return <MediaControlCard cart={cart} />;
                })}

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