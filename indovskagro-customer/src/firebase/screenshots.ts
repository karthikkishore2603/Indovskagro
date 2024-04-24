import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { v4 as uuid } from "uuid";

import Collections from "./collections.json";
import { storage } from "./index";

export async function uploadImageToStorage(image: File): Promise<string> {
  const fileName = `${Collections.screenshotFolder}/${uuid()}-${image.name}`;
  const storageRef = ref(storage, fileName);
  const uploadedImage = await uploadBytes(storageRef, image);

  console.log("Image uploaded");
  const imageUrl = await getDownloadURL(uploadedImage.ref);

  return imageUrl;
}
