import { db } from "./index";
import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  deleteDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

import Collections from "./collections.json";

import { type Cart } from "../types";

// orders structure
// - userId
// - all products details with quantity and price
// - totalPrice
// - delivery address
// - orderedDate

export async function placeOrder(
  userId: string,
  cartItems: Cart[],
  totalPrice: number,
  deliveryAddress: string
) {
  const orderRef = collection(db, Collections.orders);
  await addDoc(orderRef, {
    userId,
    cartItems,
    totalPrice,
    deliveryAddress,
    orderedDate: new Date().toISOString(),
  });
  console.log("Order placed");
}

export async function getOrdersByUserId(userId: string): Promise<Cart[]> {
  const orderRef = collection(db, Collections.orders);
  const q = query(orderRef, where("userId", "==", userId));
  const docs = await getDocs(q);
  const ret: Cart[] = [];

  docs.forEach((doc) => {
    const order = doc.data() as Cart;
    ret.push(order);
  });

  return ret;
}

export async function getAllOrders(): Promise<Cart[]> {
  const orderRef = collection(db, Collections.orders);
  const docs = await getDocs(orderRef);
  const ret: Cart[] = [];

  docs.forEach((doc) => {
    const order = doc.data() as Cart;
    ret.push(order);
  });

  return ret;
}
