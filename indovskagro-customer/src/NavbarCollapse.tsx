import React from "react";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

import Popover from "@mui/material/Popover";
import { Button } from "@mui/material";
import { logout } from "./firebase/auth";

import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import IconButton from "@mui/material/IconButton";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import { CartDisplay } from "../cart/cart";
import { styled } from "@mui/material/styles";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export function BasicPopover() {
  const [user, loading, error] = useAuthState(auth);
  const [anchorEl, setAnchorEl] = React.useState<HTMLAnchorElement | null>(
    null
  );

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  if (loading) {
    return <div></div>;
  }

  if (error) {
    return <div></div>;
  }

  return (
    <div>
      <a
        aria-describedby={id}
        onClick={(e) => {
          if (user) {
            e.preventDefault();
            setAnchorEl(e.currentTarget);
          } else {
          }
        }}
        href="/login/index.html"
      >
        <i className="fas fa-user fa-2x"></i>
      </a>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Button sx={{ p: 2 }}>My Account</Button>
        <br></br>
        <Button 
        sx={{ p: 2 }}
        onClick={async () =>{
          window.location.href = "/orderhistory/index.html";
        }}>My Orders</Button>
        <br></br>
        <Button
          sx={{ p: 2 }}
          onClick={async () => {
            await logout();
            handleClose();
          }}
        >
          Signout
        </Button>
      </Popover>
    </div>
  );
}

export function LoginIcon() {
  return (
    <>
      <BasicPopover />
    </>
  );
}

export function Cart() {
  

  const [openConfirmOrder, setOpenConfirmOrder] = React.useState(false);
  const handleDrawerClose = () => {
    setOpenConfirmOrder(false);
  };

  const handleDrawerOpen = () => {
    setOpenConfirmOrder(true);
  };

  return (
    <>
      <div>
        <a
          className="position-relative me-4 my-auto "
          
          onClick={(e) => {
            setOpenConfirmOrder(true);
          }}
        >
          <i className="fa fa-shopping-bag fa-2x"></i>
        </a>

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
            <CartDisplay />
          </Box>
        </SwipeableDrawer>
      </div>
    </>
  );
}
export default function NavbarCollapse() {
  const [openLogin, setOpenLogin] = React.useState(false);

  const handleClickOpenLogin = () => {
    setOpenLogin(true);
  };

  const handleCloseLogin = () => {
    setOpenLogin(false);
  };

  return (
    <>
      <div className="d-flex m-3 me-0">
        <Cart />
        <LoginIcon />
      </div>
    </>
  );
}
