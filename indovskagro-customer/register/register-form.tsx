import React from "react";
import {
  registerWithEmailAndPassword,
  sendVerificationEmail,
} from "../src/firebase/auth";
import { registerUser } from "../src/firebase/users";

function InitialForm({
  onSubmit,
  errorMessage,
}: {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  errorMessage: string | null | undefined;
}) {
  return (
    <form onSubmit={onSubmit}>
      <h3>Registration Form</h3>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <div className="form-group">
        <input
          type="text"
          placeholder="First Name"
          id="fname"
          className="form-control"
          name="fname"
        />
        <input
          type="text"
          placeholder="Last Name"
          id="lname"
          name="lname"
          className="form-control"
        />
      </div>
      <div className="form-wrapper">
        <input
          type="text"
          placeholder="Email Address"
          id="email"
          name="email"
          className="form-control"
        />
        <i className="zmdi zmdi-email"></i>
      </div>
      <div className="form-wrapper">
        <input
          type="password"
          placeholder="Password"
          id="password"
          autoComplete="new-password"
          className="form-control"
          name="password"
        />
        <i className="zmdi zmdi-lock"></i>
      </div>
      <div className="form-wrapper">
        <input
          type="password"
          placeholder="Confirm Password"
          id="cpassword"
          autoComplete="new-password"
          className="form-control"
          name="cpassword"
        />
        <i className="zmdi zmdi-lock"></i>
      </div>
      <div className="form-wrapper">
        <input
          type="text"
          placeholder="Phone No"
          id="phoneno"
          className="form-control"
          name="phoneno"
        />
        <i className="zmdi zmdi-email"></i>
      </div>
      <div className="form-wrapper">
        <input
          type="text"
          placeholder="Address"
          id="address"
          className="form-control"
          name="address"
        />
        <i className="zmdi zmdi-email"></i>
      </div>
      <button>
        Register
        <i className="zmdi zmdi-arrow-right"></i>
      </button>
    </form>
  );
}

function VerificationForm({
  errorMessage,
}: {
  errorMessage: string | null | undefined;
}) {
  return (
    <>
      <h3>Verification Form</h3>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <div className="form-wrapper">
        An email has been sent to your email address. The email contains a link
        to verify your email address. Click on the link to verify your email
        address. You can login after verifying your email address.
      </div>
    </>
  );
}

export function RegisterForm() {
  const [stepNo, setStepNo] = React.useState<number | null>(null);
  const [error, setError] = React.useState<string | null>();

  React.useEffect(() => {
    // sync stepNo with url search params
    const urlSearchParams = new URLSearchParams(window.location.search);
    const stepNo = urlSearchParams.get("stepNo");
    if (stepNo) {
      setStepNo(Number(stepNo));
    } else {
      setStepNo(0);
    }
  }, []);

  React.useEffect(() => {
    // sync url search params with stepNo
    if (stepNo === null) {
      return;
    }
    const urlSearchParams = new URLSearchParams(window.location.search);
    urlSearchParams.set("stepNo", stepNo.toString());
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${urlSearchParams.toString()}`
    );
  }, [stepNo]);

  const onInitialFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
    setError(null);

    // get values
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log(data);

    // register user

    try {
      const { fname, lname, email, password, cpassword, phoneno, address } =
        data;

      if (password !== cpassword) {
        alert("Password and Confirm Password should be same");
        return;
      }

      const user = await registerWithEmailAndPassword(
        email as string,
        password as string
      );

      if (!user) {
        throw new Error("An unknown error has occurred. Contact support.");
      }

      const userId = await registerUser({
        fname: fname as string,
        lname: lname as string,
        email: email as string,
        phoneNo: phoneno as string,
        address: address as string,
        authId: user.uid,
      });

      console.log(userId);

      // send verification code
      await sendVerificationEmail();

      setStepNo(1);
    } catch (error: any) {
      console.log(error);
      setError(error.message);
    }
  };

  if (stepNo === null) {
    return null;
  }

  return (
    <>
      <div className="image-holder">
        <img src="./assests/images/registration-form-1.jpg" alt="" />
      </div>
      {
        {
          0: (
            <InitialForm onSubmit={onInitialFormSubmit} errorMessage={error} />
          ),
          1: <VerificationForm errorMessage={error} />,
        }[stepNo]
      }
    </>
  );
}
