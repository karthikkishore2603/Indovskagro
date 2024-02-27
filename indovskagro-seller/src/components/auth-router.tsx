/* eslint-disable react/prop-types */

import React, { useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext, AuthContextType } from "@/context/auth-context";

export const isRouteAccessible = (
  route: string,
  {
    admin,
  }: {
    admin: boolean;
  }
) => {
  if (!admin) return false;
  return true;
};

const AuthRoute = ({ children }: { children: React.ReactNode }) => {
  const data = useContext<AuthContextType | null>(AuthContext);

  const router = useRouter();

  if (!data) {
    return <>loading</>;
  }
  const { currentUser, userData } = data;

  if (
    currentUser &&
    userData &&
    isRouteAccessible(router.pathname, userData.claims as { admin: boolean })
  ) {
    return <>{children}</>;
  } else {
    router.push("/login");
    return <></>;
  }
};

export default AuthRoute;
