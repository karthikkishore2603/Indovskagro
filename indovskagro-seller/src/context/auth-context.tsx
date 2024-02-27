/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { type User, onAuthStateChanged } from "firebase/auth";

export interface AuthContextType {
  currentUser: User | null;
  userData: {
    userId: string;
    claims: Record<string, unknown>;
  } | null;
}

export const AuthContext = React.createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<{
    userId: string;
    claims: Record<string, unknown>;
  } | null>({
    userId: "",
    claims: {},
  });

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const idToken = await user.getIdTokenResult();
        console.log(await user.getIdTokenResult());
        const claims = idToken.claims;
        console.log(claims);
        const requiredData = {
          userId: user.uid,
          claims,
        };
        setUserData(requiredData);
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    // Todo: Add a loading component
    return <></>;
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
