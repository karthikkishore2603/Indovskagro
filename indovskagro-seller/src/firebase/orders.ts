import type { Order, OrderWithUser } from "@/types";

import { db } from "@/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";

import Collections from "@/firebase/collections.json";
import { getUserByAuthId } from "./users";

// get all orders
export async function getOrders(): Promise<OrderWithUser[]> {
  const collectionRef = collection(db, Collections.orders);
  const snapshot = await getDocs(collectionRef);
  const orders: OrderWithUser[] = Promise.all(
    snapshot.docs.map(async (doc) => {
      const user = await getUserByAuthId(doc.data().userId);
      return {
        user: user,
        orderId: doc.id,
        id: doc.id,
        ...doc.data(),
      };
    })
  ) as any;
  return orders;
}

// update order status
export async function updateOrderStatus(
  orderId: string,
  status: string
): Promise<void> {
  const orderRef = doc(db, Collections.orders, orderId);
  await updateDoc(orderRef, {
    status,
  });
}
