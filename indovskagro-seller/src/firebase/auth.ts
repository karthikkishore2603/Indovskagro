import { auth } from "./index";

import { type User } from "firebase/auth";

export async function getUser(): Promise<User | null> {
  const user = auth.currentUser;

  if (user) {
    return user;
  }
  return null;
}
