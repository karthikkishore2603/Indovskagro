import type { Product } from "../types";
import { auth } from "../firebase";
import { addToCart } from "../firebase/cart";
import { getCartItems } from "../firebase/cart";

import React from "react";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogTitle from "@mui/material/DialogTitle";
// import { useEffect } from "react";
// import { DialerSip } from "@mui/icons-material";
// import { set } from "firebase/database";

import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export async function addtocart({
  product,
  setOpen,
}: {
  product: Product;
  setOpen: (open: boolean) => void;
}) {
  const user = auth.currentUser;
  setOpen(true);
  // if (!user) {
  //   console.error("User not logged in");
  //   setOpen(true);
  //   return;
  // }
  const userId = await addToCart(user?.uid!, product.id!, 1);

  console.log(userId);

  //selectornnn

  // const [openalert, setOpenalert] = React.useState(false);

  // const handleClick = () => {
  //   setOpenalert(true);
  // };

  // const handleClose = (
  //   event: React.SyntheticEvent | Event,
  //   reason?: string
  // ) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }

  //   setOpenalert(false);
  // };
}

export function ProductComponent({ product }: { product: Product }) {
  const user = auth.currentUser;
  const [open, setOpen] = React.useState(false);
  const [OpenAlready, setOpenAlready] = React.useState(false);
  const [openLogin, setOpenLogin] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    setOpenAlready(false);
    setOpenLogin(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <>
      <div className="col-md-6 col-lg-4 col-xl-3">
        <div className="rounded position-relative fruite-item">
          <a href={`/product/index.html?id=${product.id}`}>
            <div className="fruite-img">
              <img
                src={product.image}
                className="img-fluid w-100 rounded-top"
                alt=""
              />
            </div>

            <div
              className="text-white bg-secondary px-3 py-1 rounded position-absolute"
              style={{
                top: "10px",
                left: "10px",
              }}
            >
              {product.category}
            </div>
          </a>
          <div className="p-4 border border-secondary border-top-0 rounded-bottom">
            <a href={`/product/index.html?id=${product.id}`}>
              <h4>{product.title}</h4>
              <p>{product.description}</p>
            </a>
            <div className="d-flex justify-content-between flex-lg-wrap">
              <p className="text-dark fs-5 fw-bold mb-0">
                {((price: string) => {
                  const amount = parseFloat(price);
                  const formatted = new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(amount);

                  return (
                    <div className="text-right font-medium">{formatted}</div>
                  );
                })(product.price.toString())}
              </p>
              <a
                onClick={async () => {
                  console.log(product.id);
                  console.log(auth.currentUser?.uid);

                  if (!auth.currentUser) {
                    console.log("Please login to add to cart");
                    setOpenLogin(true);
                    return;
                  }

                  await getCartItems(auth.currentUser?.uid!);
                  const cartItems = await getCartItems(auth.currentUser?.uid!);
                  if (cartItems.some((item) => item.productId === product.id)) {
                    console.log("Already in to cart");
                    setOpenAlready(true);
                  } else {
                    await addtocart({ product, setOpen });
                    console.log("Added to cart");

                    <></>;
                  }
                }}
                className="btn border border-secondary rounded-pill px-3 text-primary"
              >
                <i className="fa fa-shopping-bag me-2 text-primary"></i> Add to
                Cart
              </a>
            </div>
          </div>
        </div>
      </div>

      <Snackbar
        open={openLogin}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Please Login to Add to Cart"
        action={action}
      />
      {user && (
        <>
          <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            message="Added to Cart"
            action={action}
          />
          <Snackbar
            open={OpenAlready}
            autoHideDuration={3000}
            onClose={handleClose}
            message="Already in Cart"
            action={action}
          />
        </>
      )}
    </>
  );
}
