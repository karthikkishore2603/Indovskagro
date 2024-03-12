import React from "react";

import { Box, Button, Card, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { getUserByAuthId, updateUserDetails } from "../src/firebase/users.ts";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../src/firebase/index.ts";
import { User } from "../src/types.ts";
import { sendPasswordResetEmail } from "firebase/auth";

export default function Myaccount() {
  const [user, loading, error] = useAuthState(auth);
  const [userData, setUserData] = React.useState<User | null>(null);
  const [updateError, setUpdateError] = React.useState("");
  const [formValues, setFormValues] = React.useState<User>({
    fname: "",
    lname: "",
    email: "",
    phoneNo: "",
    address: "",
    authId: "",
  });

  React.useEffect(() => {
    const a = async () => {
      if (user) {
        const data = await getUserByAuthId(user.uid);
        setUserData(data);
        setFormValues(data);
      }
    };
    a();
  }, [user]);

  React.useEffect(() => {
    if (!loading && !user) {
      window.location.href = "/login/index.html";
    }
  }, [user, loading]);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Error</h1>;
  }
  

  return (
    <>
      {updateError && (
        <Typography variant="h6" color="error">
          {updateError}
        </Typography>
      )}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setUpdateError("");
          try {
            if (userData) {
              await updateUserDetails(userData.id!, {
                fname: formValues.fname,
                lname: formValues.lname,
                phoneNo: formValues.phoneNo,
                address: formValues.address,
              });
            }
          } catch (e) {
            console.error(e);
            setUpdateError(e.message);
          }
        }}
      >
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
              id="filled-multiline-static"
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
              value={formValues?.fname}
              onChange={(e) => {
                setFormValues({ ...formValues, fname: e.target.value });
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
              value={formValues?.lname}
              onChange={(e) => {
                setFormValues({ ...formValues, lname: e.target.value });
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
              value={formValues?.email}
              disabled
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
              value={formValues?.phoneNo}
              onChange={(e) => {
                setFormValues({ ...formValues, phoneNo: e.target.value });
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
              value={formValues?.address}
              onChange={(e) => {
                setFormValues({ ...formValues, address: e.target.value });
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
              onClick={async (e) => {
                console.log("yes?");

                console.log("Change Password");

                if (!user?.email) {
                  setUpdateError("Email not found");
                  return;
                }

                try {
                  await sendPasswordResetEmail(auth, user.email);
                  alert("Password reset email sent");
                } catch (e) {
                  setUpdateError(e.message);
                  console.error(e);
                }
                e.preventDefault();
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
              type="submit"
            >
              Update
            </Button>
          </Box>
        </Card>
      </form>
    </>
  );
}
