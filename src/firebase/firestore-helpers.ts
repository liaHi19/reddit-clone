import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./clientApp";

export const createDoc = async (
  collection: string,
  id: any,
  errorMsg: string = "Something went wrong",
  data: object
) => {
  const docRef = doc(db, collection, id);
  const document = await getDoc(docRef);

  if (document.exists()) {
    throw new Error(errorMsg);
  }
  await setDoc(docRef, data);
};

export const createOrUpdateDoc = async (
  collection: string,
  id: any,
  data: object
) => {
  await setDoc(doc(db, collection, id), data);
};
