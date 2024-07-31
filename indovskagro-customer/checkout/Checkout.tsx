import React from "react";

import { Cart } from "../src/types";
import { getCartItems } from "../src/firebase/cart";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../src/firebase";
import { Button, IconButton, Typography } from "@mui/material";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Box from "@mui/material/Box";
import {
  removeCartItem,
  updateCartItem,
  clearCart,
} from "../src/firebase/cart";
import { getUserByAuthId } from "../src/firebase/users";
import { placeOrder } from "../src/firebase/orders";
import { serialize } from "v8";

import { Dialog } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogContentText } from "@mui/material";
import { text } from "stream/consumers";
import SendWhatsappMessage from "../whatsappmessage/sendmsg";
import { UploadScreenshot } from "./UploadScreenshot";

export function DisplayCartItems({
  cart,
  setCartItems,
}: {
  cart: Cart;
  setCartItems: React.Dispatch<React.SetStateAction<Cart[]>>;
}) {
  const product = cart.product;
  const [value, setValue] = React.useState<number>(cart.quantity);
  const [total, setTotal] = React.useState<number | null>(null);
  React.useEffect(() => {
    if (product) {
      setTotal(value * product.price);
    }
  }, [product, value, cart]);

  React.useEffect(() => {
    const a = async () => {
      await updateCartItem(cart.userId, cart.productId, value);

      setCartItems((prev) => {
        const newCart = prev.map((item) => {
          if (item.productId === cart.productId) {
            item.quantity = value;
          }
          return item;
        });
        return newCart;
      });
    };
    a();
  }, [value]);

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
          </td>
          <td className="align-middle">{total}</td>
          <td className="align-middle">
            <button
              className="btn btn-sm btn-primary"
              onClick={async () => {
                await removeCartItem(cart.userId, cart.productId);
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
  const [screenshotUrl, setScreenshotUrl] = React.useState<string>("");

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    const a = async () => {
      if (user) {
        console.log("cart display");
        const items = await getCartItems(user.uid);
        setCartItems(items);
      }
    };
    a();
  }, [user]);
  const totalPrice = React.useMemo(() => {
    return cartItems.reduce((acc, item) => {
      return acc + item!.product!.price * item.quantity;
    }, 0);
  }, [cartItems]);

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
                    <DisplayCartItems cart={cart} setCartItems={setCartItems} />
                  </>
                );
              })}
            </table>
            <div
              style={{
                display: "flex",
                justifyContent: "left",
                paddingTop: "15px",
                flexDirection: "column",
              }}
              className="input-group-append"
            >
              <p
                style={{
                  fontSize: "19px",
                }}
              >
                Make the payment to the below account. And Upload the
                screenshot.
              </p>
              <div>
                <p>Account NO: 7485967485964</p>
                <p>Bank Name: Canara Bank</p>
                <p>IFSC Code: CNRB0007485</p>
                <p>Branch: Bangalore</p>
              </div>
              <UploadScreenshot
                screenshotUrl={screenshotUrl}
                setScreenshotUrl={setScreenshotUrl}
              />
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card border-secondary mb-5">
              <div className="card-header bg-secondary border-0">
                <h4 className="font-weight-semi-bold m-0">Cart Summary</h4>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-3 pt-1">
                  <h6 className="font-weight-medium">Subtotal</h6>
                  <h6 className="font-weight-medium">{totalPrice}</h6>
                </div>
              </div>
              <div className="card-body">
                <div className="d-flex justify-content-between mb-3 pt-1">
                  <h6 className="font-weight-medium">Shipping</h6>
                  <h6 className="font-weight-medium">50</h6>
                </div>
              </div>
              <div className="card-footer border-secondary bg-transparent">
                <div className="d-flex justify-content-between mt-2">
                  <h5 className="font-weight-bold">Total</h5>
                  <h5 className="font-weight-bold">{totalPrice}</h5>
                </div>

                <button
                  className="btn btn-block btn-primary my-3 py-3"
                  onClick={async (e) => {
                    setOpen(true);
                  }}
                >
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog
        open={open}
        onClose={() => {
          console.log("closed");
        }}
        onClick={handleClose}
      >
        <DialogTitle id="alert-dialog-title" sx={{ textAlign: "center" }}>
          {"Confirm Order?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {cartItems.map((item) => {
              return (
                <div style={{ fontSize: "16px" }}>
                  {item.product?.title} - {item.quantity}
                </div>
              );
            })}
          </DialogContentText>
        </DialogContent>
        <Button
          onClick={async (e) => {
            e.preventDefault();
            if (!user) {
              return;
            }

            if (screenshotUrl === "") {
              alert("Please upload the payment proof");
              return;
            }

            try {
              const nUser = await getUserByAuthId(user.uid);
              const address = nUser.address;

              const res = await placeOrder(
                user.uid,
                cartItems,
                totalPrice,
                address,
                screenshotUrl
              );
              const fname = nUser.fname;
              const phoneno = nUser.phoneNo;
              const orderID = "123456";
              await clearCart(user.uid);
              SendWhatsappMessage(fname, phoneno, orderID);
              console.log("Order placed", "msg sent  to whatsapp");
              window.location.href = "/";
            } catch (e) {
              console.error(e);
            }
          }}
        >
          Conform Order
        </Button>
      </Dialog>
    </>
  );
}
