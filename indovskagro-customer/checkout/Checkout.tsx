import React from "react";

import { Cart, Product } from "../src/types";
import { getCartItems } from "../src/firebase/cart";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../src/firebase";
import { IconButton, Typography } from "@mui/material";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Box from "@mui/material/Box";
import { removeCartItem } from "../src/firebase/cart";
import { serialize } from "v8";




export function DisplayCartItems({ cart }: { cart: Cart }) {
  const product = cart.product;
  const [value, setValue] = React.useState<number>(cart.quantity);
  const [price, setPrice] = React.useState<number | null>(null);
  const [total, setTotal] = React.useState<number | null>(null);
  React.useEffect(() => {
    if (product) {
      setPrice(product.price);
      setTotal(value * product.price);
    }
  } 
  , [product, value]);

 
  return (
    <>
      <tbody className="align-middle">
        <tr>
          <td className="align-middle">
            <img src={product?.image} alt="" style={{ width: "50px" }} />
            {product?.title}
          </td>
          <td className="align-middle">{product?.price}</td>
          <td className="align-middle">
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton
                onClick={() => {
                  setValue(value - 1);
                }}
              >
                {" "}
                <IndeterminateCheckBoxIcon />{" "}
              </IconButton>{" "}
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
          </td>
          <td className="align-middle">{total}</td>
          <td className="align-middle">
            <button
              className="btn btn-sm btn-primary"
              onClick={() => {
                removeCartItem(cart.userId, cart.productId);
              }}
            >
              <i className="fa fa-times"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </>
  );
}
export function Checkout() {
  const [cartItems, setCartItems] = React.useState<Cart[]>([]);
  const [user, loading, error] = useAuthState(auth);
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

  console.log(cartItems);

  return (
    <>
      <div className="container-fluid pt-5">
        <div className="row px-xl-5">
          <div className="col-lg-8 table-responsive mb-5">
            <table className="table table-bordered text-center mb-0">
              <thead className="bg-secondary text-dark">
                <tr>
                  <th>Products</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              {cartItems.map((cart) => {
                return (
                  <>
                    <DisplayCartItems cart={cart} />
                  </>
                );
              })}
            </table>
            <div
              style={{
                display: "flex",
                justifyContent: "right",
                paddingTop: "20px",
              }}
              className="input-group-append"
            >
              <button className="btn btn-primary">Update Cart</button>
            </div>
          </div>

          <div className="col-lg-4">
            <form className="mb-5" action="">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control p-4"
                  placeholder="Coupon Code"
                />
                <div className="input-group-append">
                  <button className="btn btn-primary">Apply Coupon</button>
                </div>
              </div>
            </form>
            <div className="card border-secondary mb-5">
              <div className="card-header bg-secondary border-0">
                <h4 className="font-weight-semi-bold m-0">Cart Summary</h4>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-3 pt-1">
                  <h6 className="font-weight-medium">Subtotal</h6>
                  <h6 className="font-weight-medium">$150</h6>
                </div>
                <div className="d-flex justify-content-between">
                  <h6 className="font-weight-medium">Shipping</h6>
                  <h6 className="font-weight-medium">$10</h6>
                </div>
              </div>
              <div className="card-footer border-secondary bg-transparent">
                <div className="d-flex justify-content-between mt-2">
                  <h5 className="font-weight-bold">Total</h5>
                  <h5 className="font-weight-bold">$160</h5>
                </div>
                <button className="btn btn-block btn-primary my-3 py-3">
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}