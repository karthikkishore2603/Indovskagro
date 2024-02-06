import type { Product } from "../types";

import { db } from "./index";
import { collection, getDocs } from "firebase/firestore";

import Collections from "./collections.json";

export async function getProducts(): Promise<Product[]> {
  const collectionRef = collection(db, Collections.products);
  const snapshot = await getDocs(collectionRef);
  const products: any = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return products;
}
