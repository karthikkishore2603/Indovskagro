import React from "react";
import { useQuery } from "@tanstack/react-query";

import type { Product } from "../src/types";
import { getProductById } from "../src/firebase/products";

import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from "@mui/material/Divider";

import { styled } from "@mui/material/styles";

import { OrderConfirmForm } from "./OrderConfirmForm";

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

  const [quantity, setQuantity] = React.useState<number>(0);
  const [openConfirmOrder, setOpenConfirmOrder] = React.useState(false);

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
                <div>
                  <input
                    type="number"
                    placeholder="0"
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(parseInt(e.target.value));
                    }}
                  />
                </div>
                <a
                  className="cart-btn"
                  onClick={() => {
                    setOpenConfirmOrder(true);
                  }}
                >
                  <i className="fas fa-shopping-cart"></i> Buy
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

      <SwipeableDrawer
        anchor="right"
        open={openConfirmOrder}
        onClose={handleDrawerClose}
        onOpen={handleDrawerOpen}
      >
        <Box
          sx={{
            width: {
              xs: "100vw",
              sm: "80vw",
              lg: "35vw",
            },
          }}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              <ChevronRightIcon />
            </IconButton>
          </DrawerHeader>
          <Divider />
          <OrderConfirmForm />
        </Box>
      </SwipeableDrawer>
    </>
  );
}
