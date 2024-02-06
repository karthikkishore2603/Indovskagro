import type { Product } from "../types";

import { db } from "./index";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

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

export async function getProductById(id: string): Promise<Product> {
  const collectionRef = collection(db, Collections.products);
  const docRef = doc(collectionRef, id);

  const docSnap = await getDoc(docRef);
  return { id: docSnap.id, ...docSnap.data() } as Product;
}
