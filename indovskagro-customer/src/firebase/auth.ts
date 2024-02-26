import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
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

export async function logout() {
  return auth.signOut();
}

export async function loginWithEmailAndPassword(
  email: string,
  password: string
) {
  const res = await signInWithEmailAndPassword(auth, email, password);
  return res.user;
}
