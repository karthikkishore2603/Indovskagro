import { db } from "./index";
import { collection, addDoc, getDocs, where, query, deleteDoc} from "firebase/firestore";

import Collections from "./collections.json";

import { type Cart } from "../types";
import { getProductById } from "./products";

export async function addToCart(
  userId: string,
  productId: string,
  quantity: number
) {
  const cartRef = collection(db, Collections.cart);
  await addDoc(cartRef, {
    userId,
    productId,
    quantity,
  });
}

export async function getCartItems(userId: string): Promise<Cart[]> {
  const cartRef = collection(db, Collections.cart);
  const q = query(cartRef, where("userId", "==", userId));
  const docs = await getDocs(q);
  const ret: Cart[] = [];

  docs.forEach((doc) => {
    const cartItem = doc.data() as Cart;

    // Use the productId as needed

    ret.push(cartItem);
  });

  // console.log(ret)

  await Promise.all(
    ret.map(async (item) => {
      item.product = await getProductById(item.productId);
    })
  );

  return ret;
}

export async function removeCartItem(userId: string, productId: string) {
  const cartRef = collection(db, Collections.cart);
  const q = query(cartRef, where("userId", "==", userId), where("productId", "==", productId));
  const docs = await getDocs(q);
  docs.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });
}