import {
  collection,
  doc,
  getDoc,
  getDocs,
  runTransaction,
  setDoc,
  writeBatch,
} from "firebase/firestore";
import { IoDocument } from "react-icons/io5";
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
  subCollectionName: string;
  subId: any;
  subdata?: object;
}

type ICollection = Omit<IDocument, "docId">;
type ISubCollection = Omit<ISubDocument, "subId">;

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

export const receiveDoc = async (infoDoc: IDocument) => {
  const { collectionName, docId } = infoDoc;

  const docSnap = await getDoc(doc(db, collectionName, docId));
  const document = { ...docSnap.data(), id: docSnap.id };
  return { docSnap, document };
};

export const createDocWithSubCollection = async (
  infoDoc: IDocument,
  subInfoDoc: ISubDocument
) => {
  const { collectionName, docId, errorMsg, data } = infoDoc;
  const { mainCollectionName, mainDocId, subCollectionName, subId, subdata } =
    subInfoDoc;

  const docRef = doc(db, collectionName, docId);

  await runTransaction(db, async (transaction) => {
    const document = await transaction.get(docRef);

    if (document.exists()) {
      throw new Error(errorMsg);
    }
    transaction.set(docRef, data);

    transaction.set(
      doc(db, `${mainCollectionName}/${mainDocId}/${subCollectionName}`, subId),
      subdata
    );
  });
};

export const receiveSubCollection = async (infoCollection: ISubCollection) => {
  const { mainCollectionName, mainDocId, subCollectionName } = infoCollection;

  const documentsSnap = await getDocs(
    collection(db, `${mainCollectionName}/${mainDocId}/${subCollectionName}`)
  );
  const documents = documentsSnap.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return documents;
};

export const createSubDocAndUpdateDoc = async (
  infoDoc: IDocument,
  subInfoDoc: ISubDocument
) => {
  const { collectionName, docId, data } = infoDoc;
  const { mainCollectionName, mainDocId, subCollectionName, subId, subdata } =
    subInfoDoc;

  const batch = writeBatch(db);
  batch.set(
    doc(db, `${mainCollectionName}/${mainDocId}/${subCollectionName}`, subId),
    subdata
  );

  batch.update(doc(db, `${collectionName}`, docId), data);

  await batch.commit();
};

export const deleteSubDocAndUpdateDoc = async (
  infoDoc: IDocument,
  subInfoDoc: ISubDocument
) => {
  const { collectionName, docId, data } = infoDoc;
  const { mainCollectionName, mainDocId, subCollectionName, subId } =
    subInfoDoc;

  const batch = writeBatch(db);

  batch.delete(
    doc(db, `${mainCollectionName}/${mainDocId}/${subCollectionName}`, subId)
  );

  batch.update(doc(db, `${collectionName}`, docId), data);

  await batch.commit();
};
