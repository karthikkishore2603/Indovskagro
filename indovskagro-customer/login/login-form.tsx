import React from "react";

import {
  loginWithEmailAndPassword,
  sendVerificationEmail,
} from "../src/firebase/auth";

export function LoginForm() {
  const [error, setError] = React.useState<string | null>(null);
  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();

          console.log(e);
          setError(null);

          // get values
          const formData = new FormData(e.target as HTMLFormElement);
          const data = Object.fromEntries(formData.entries());
          console.log(data);

          // login user

          try {
            const { username, password } = data;

            const user = await loginWithEmailAndPassword(
              username as string,
              password as string
            );

            if (!user) {
              setError("Invalid username or password");
            }

            if (!user.emailVerified) {
              setError("Please verify your email before logging in.");
              await sendVerificationEmail();
              return;
            }

            // redirect to home
            window.location.href = "/";
          } catch (e) {
            console.error(e);
            setError(e.message);
          }
        }}
      >
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="form-group first">
          <label htmlFor="username">Username</label>
          <input
            type="email"
            className="form-control"
            placeholder="your-email@gmail.com"
            id="username"
            name="username"
          />
        </div>
        <div className="form-group last mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Your Password"
            id="password"
            name="password"
          />
        </div>

        <div className="d-flex mb-5 align-items-center">
          <a href="/register/index.html">
            <span className="caption">Register Here</span>
          </a>

          <span className="ml-auto">
            <a href="#" className="forgot-pass">
              Forgot Password
            </a>
          </span>
        </div>

        <input
          type="submit"
          value="Log In"
          className="btn btn-block btn-primary"
        />
      </form>
    </>
  );
}
