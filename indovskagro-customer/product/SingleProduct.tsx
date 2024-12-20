import React from "react";
import { useQuery } from "@tanstack/react-query";

import type { Product } from "../src/types";
import { getProductById } from "../src/firebase/products";

import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";

import { styled } from "@mui/material/styles";

import { auth } from "../src/firebase";
import { getCartItems } from "../src/firebase/cart";
import { addToCart } from "../src/firebase/cart";
import CloseIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export function SingleProduct() {
  const [productId, setProductId] = React.useState<string>("");
  const user = auth.currentUser;
  const [quantity, setQuantity] = React.useState<number>(0);
  const [openConfirmOrder, setOpenConfirmOrder] = React.useState(false);

  const [openadded, setOpenadded] = React.useState(false);
  const [openAlready, setOpenAlready] = React.useState(false);

  const handleClose = () => {
    setOpenadded(false);
    setOpenAlready(false);
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

  React.useEffect(() => {
    // get productId from URLQuery,  ?id=
    const url = new URL(window.location.href);
    const id = url.searchParams.get("id");
    if (id) {
      setProductId(id);
    } else {
      // redirect to home page
      window.location.href = "/";
    }
  }, []);

  const { isPending, data } = useQuery<Product | null, Error>({
    queryKey: ["products", productId],
    queryFn: async function () {
      if (!productId) return null;
      const products = await getProductById(productId);
      return products;
    },
  });

  const handleDrawerClose = () => {
    setOpenConfirmOrder(false);
  };

  const handleDrawerOpen = () => {
    setOpenConfirmOrder(true);
  };

  if (isPending || !data) return "loading...";

  return (
    <>
      {/* <div className="single-product mt-150 mb-150"> */}
      <div className="container">
        <div className="row">
          <div className="col-md-5">
            <div className="single-product-img">
              <img src={data.image} alt={data.title} />
            </div>
          </div>
          <div className="col-md-7">
            <div className="single-product-content">
              <h3>{data?.title}</h3>
              <p className="single-product-pricing">
                {((price: string) => {
                  const amount = parseFloat(price);
                  const formatted = new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                  }).format(amount);

                  return <div>{formatted}</div>;
                })(data.price.toString())}
              </p>
              <p>{data.description}</p>
              <div className="single-product-form">
                <a
                  className="cart-btn"
                  // onClick={() => {
                  //   setOpenConfirmOrder(true);
                  // }}

                  onClick={async () => {
                    console.log(productId);
                    console.log(auth.currentUser?.uid);

                    await getCartItems(auth.currentUser?.uid!);
                    const cartItems = await getCartItems(
                      auth.currentUser?.uid!
                    );
                    if (
                      cartItems.some((item) => item.productId === productId)
                    ) {
                      console.log("Already in to cart");
                      setOpenAlready(true);
                    } else {
                      await addToCart(user?.uid!, productId!, 1);
                      console.log("Added to cart");
                      setOpenadded(true);
                    }
                  }}
                >
                  <i className="fas fa-shopping-cart"></i> Add to Cart
                </a>
                <p>
                  <strong>Category: </strong> {data.category}
                </p>
              </div>
              <h4>Share:</h4>
              <ul className="product-share">
                <li>
                  <a href="">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="fab fa-twitter"></i>
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="fab fa-google-plus-g"></i>
                  </a>
                </li>
                <li>
                  <a href="">
                    <i className="fab fa-linkedin"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* </div> */}
      <Snackbar
        open={openadded}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Added to Cart"
        action={action}
      />

      <Snackbar
        open={openAlready}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Already in Cart"
        action={action}
      />
    </>
  );
}
