import type { Product } from "@/types";

import { db, storage } from "@/firebase";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { v4 as uuid } from "uuid";

import Collections from "@/firebase/collections.json";

async function uploadImageToStorage(image: File): Promise<string> {
  const fileName = `${Collections.productImageFolder}/${uuid()}-${image.name}`;
  const storageRef = ref(storage, fileName);
  const uploadedImage = await uploadBytes(storageRef, image);

  console.log("Image uploaded");
  const imageUrl = (await getDownloadURL(uploadedImage.ref)).replace(
    "https://firebasestorage.googleapis.com",
    "https://ik.imagekit.io/Karthik2612"
  );

  return imageUrl;
}

export async function addProduct(product: Product) {
  if (typeof product.image === "string") {
    throw new Error("Image is already uploaded");
  }

  // upload product.image to storage
  const imageUrl = await uploadImageToStorage(product.image);

  const collectionRef = collection(db, Collections.products);
  await addDoc(collectionRef, { ...product, image: imageUrl });
}

export async function getProducts(): Promise<Product[]> {
  const collectionRef = collection(db, Collections.products);
  const snapshot = await getDocs(collectionRef);
  const products: any = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return products;
}

export async function updateProduct(id: string, product: Product) {
  if (typeof product.image === "string") {
    throw new Error("Image is already uploaded");
  }

  // upload product.image to storage
  const imageUrl = await uploadImageToStorage(product.image);

  const docRef = doc(collection(db, Collections.products), id);
  await updateDoc(docRef, {
    ...product,
    image: imageUrl,
  });
}

export async function deleteProduct(id: string) {
  const docRef = doc(collection(db, Collections.products), id);
  await deleteDoc(docRef);
}
