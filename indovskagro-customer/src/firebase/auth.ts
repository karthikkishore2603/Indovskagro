import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "./index";

export async function registerWithEmailAndPassword(
  email: string,
  password: string
) {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const user = userCredential.user;
  return user;
}

export async function getUser() {
  return auth.currentUser;
}

export async function sendVerificationEmail() {
  if (!auth.currentUser) {
    throw new Error("User not found");
  }
  return sendEmailVerification(auth.currentUser);
}
