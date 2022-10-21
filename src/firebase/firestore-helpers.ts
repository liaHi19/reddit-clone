import { doc, getDoc, setDoc } from "firebase/firestore";
import { firestore } from "./clientApp";

export const createDoc = async (
  collection: string,
  id: any,
  errorMsg: string = "Something went wrong",
  data: object
) => {
  const docRef = doc(firestore, collection, id);
  const document = await getDoc(docRef);

  if (document.exists()) {
    throw new Error(errorMsg);
  }
  await setDoc(docRef, data);
};
