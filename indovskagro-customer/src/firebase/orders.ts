import { db } from "./index";
import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  // deleteDoc,
  // updateDoc,
  // onSnapshot,
} from "firebase/firestore";

import Collections from "./collections.json";

import { type Cart, type Order } from "../types";
import { generateRandomOrderId } from "../utils";

async function genOrderId() {
  // use generateRandomOrderId function to generate a random order id
  // if the generated order id already exists, then generate a new one
  // return the generated order id
  const orderRef = collection(db, Collections.orders);
  let orderId = generateRandomOrderId();

  // check if the orderId already exists
  const q = query(orderRef, where("orderId", "==", orderId));
  let docs = await getDocs(q);

  while (docs.size > 0) {
    orderId = generateRandomOrderId();
    const q = query(orderRef, where("orderId", "==", orderId));
    docs = await getDocs(q);
  }

  return orderId;
}

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
  const orderId = await genOrderId();

  const orderRef = collection(db, Collections.orders);
  await addDoc(orderRef, {
    orderId,
    userId,
    cartItems,
    totalPrice,
    deliveryAddress,
    orderedDate: new Date().toISOString(),
    status: "Order placed",
  });
  console.log("Order placed");
}

export async function getOrdersByUserId(userId: string): Promise<Order[]> {
  const orderRef = collection(db, Collections.orders);
  const q = query(orderRef, where("userId", "==", userId));
  const docs = await getDocs(q);
  const ret: Order[] = [];

  docs.forEach((doc) => {
    const order = { ...doc.data() } as Order;
    ret.push(order);
  });

  return ret;
}
