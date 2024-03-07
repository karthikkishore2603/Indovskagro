import type { User } from "../types";

import { db } from "./index";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  addDoc,
  where,
  query,
} from "firebase/firestore";

import Collections from "./collections.json";

export async function getUserById(userId: string) {
  const doc1 = await getDoc(doc(db, Collections.users, userId));

  if (doc1.exists()) {
    return doc1.data();
  } else {
    return null;
  }
}

export async function getUserByAuthId(authId: string): Promise<User> {
  const userRef = collection(db, Collections.users);
  const q = query(userRef, where("authId", "==", authId));
  const docs = await getDocs(q);
  const ret: User[] = [];

  docs.forEach((doc) => {
    const user = doc.data() as User;
    ret.push(user);
  });

  return ret[0];
}

export async function registerUser({
  fname,
  lname,
  email,
  phoneNo,
  address,
  authId,
}: User) {
  const docRef = await addDoc(collection(db, Collections.users), {
    fname,
    lname,
    email,
    phoneNo,
    address,
    authId,
  });

  return docRef.id;
}
