import { doc, getDoc, runTransaction, setDoc } from "firebase/firestore";
import { db } from "./clientApp";

interface ICollection {
  collectionName: string;
  docId: any;
  errorMsg?: string;
  data: object;
}

interface ISubCollection {
  mainCollectionName: string;
  mainDocId: any;
  subcollectionName: string;
  subId: any;
  subdata: object;
}

export const createDoc = async (collection: ICollection) => {
  const { collectionName, docId, errorMsg, data } = collection;
  const docRef = doc(db, collectionName, docId);
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

export const createDocWithSubCollection = async (
  collection: ICollection,
  subCollection: ISubCollection
) => {
  const { collectionName, docId, errorMsg, data } = collection;
  const { mainCollectionName, mainDocId, subcollectionName, subId, subdata } =
    subCollection;
  const docRef = doc(db, collectionName, docId);

  await runTransaction(db, async (transaction) => {
    const document = await transaction.get(docRef);

    if (document.exists()) {
      throw new Error(errorMsg);
    }
    transaction.set(docRef, data);

    transaction.set(
      doc(db, `${mainCollectionName}/${mainDocId}/${subcollectionName}`, subId),
      subdata
    );
  });
};
