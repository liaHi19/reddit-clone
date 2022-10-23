import { doc, getDoc, runTransaction, setDoc } from "firebase/firestore";
import { db } from "./clientApp";

interface IDocument {
  collectionName: string;
  docId: any;
  errorMsg?: string;
  data?: object;
}

interface ISubDocument {
  mainCollectionName: string;
  mainDocId: any;
  subcollectionName: string;
  subId: any;
  subdata: object;
}

export const createDoc = async (infoDoc: IDocument) => {
  const { collectionName, docId, errorMsg, data } = infoDoc;
  const docRef = doc(db, collectionName, docId);
  const document = await getDoc(docRef);

  if (document.exists()) {
    throw new Error(errorMsg);
  }
  await setDoc(docRef, data);
};

export const createOrUpdateDoc = async (infoDoc: IDocument) => {
  const { collectionName, docId, data } = infoDoc;
  await setDoc(doc(db, collectionName, docId), data);
};

export const createDocWithSubCollection = async (
  infoDoc: IDocument,
  subInfoDoc: ISubDocument
) => {
  const { collectionName, docId, errorMsg, data } = infoDoc;
  const { mainCollectionName, mainDocId, subcollectionName, subId, subdata } =
    subInfoDoc;
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

export const receiveDoc = async (infoDoc: IDocument) => {
  const { collectionName, docId } = infoDoc;

  const docSnap = await getDoc(doc(db, collectionName, docId));
  const document = { ...docSnap.data(), id: docSnap.id };
  return { docSnap, document };
};
