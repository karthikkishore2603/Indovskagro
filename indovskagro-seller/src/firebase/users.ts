import type { User } from "@/types";

import { db } from "@/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  where,
  query,
} from "firebase/firestore";

import Collections from "@/firebase/collections.json";

export async function getUserByAuthId(authId: string): Promise<User> {
  const collectionRef = collection(db, Collections.users);
  const q = query(collectionRef, where("authId", "==", authId));
  const snapshot = await getDocs(q);
  const users: any = snapshot.docs.map((doc) => {
    return {
      userId: doc.id,
      ...doc.data(),
    };
  });
  return users[0];
}
