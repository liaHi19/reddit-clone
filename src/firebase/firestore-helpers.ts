import { log } from "console";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  runTransaction,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadString,
} from "firebase/storage";
import { db, storage } from "./clientApp";

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

interface ISelection {
  docField: string;
  condition: "==" | "!=";
  comparedField: string;
}

interface ISort {
  sortedField: string;
  order: "desc" | "asc";
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

export const receiveDoc = async (infoDoc: IDocument) => {
  const { collectionName, docId } = infoDoc;

  const docSnap = await getDoc(doc(db, collectionName, docId));
  const document = { ...docSnap.data(), id: docSnap.id };
  return { docSnap, document };
};

export const receiveDocsWithQueryAndSort = async (
  infoCollection: ICollection,
  selection: ISelection,
  sort: ISort
) => {
  const { collectionName } = infoCollection;
  const { docField, condition, comparedField } = selection;
  const { sortedField, order } = sort;

  const docQuery = query(
    collection(db, collectionName),
    where(docField, condition, comparedField),
    orderBy(sortedField, order)
  );

  const documentsSnap = await getDocs(docQuery);
  const documents = documentsSnap.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  console.log(documents);

  return documents;
};

// subcollections

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

// storage
export const createDocAndSaveFile = async (
  collectionInfo: ICollection,
  file: string,
  fileName: string
) => {
  const { collectionName, data } = collectionInfo;
  const docRef = await addDoc(collection(db, collectionName), data);

  if (file) {
    const imageRef = ref(storage, `${collectionName}/${docRef.id}/image`);
    await uploadString(imageRef, file, "data_url");
    const downloadURL = await getDownloadURL(imageRef);

    await updateDoc(docRef, {
      [fileName]: downloadURL,
    });
  }
};

export const deleteDocAndDeleteFile = async (
  infoDoc: IDocument,
  file: string
) => {
  const { collectionName, docId } = infoDoc;
  if (file) {
    const fileRef = ref(storage, `${collectionName}/${docId}/image`);
    await deleteObject(fileRef);
  }
  const docRef = doc(db, collectionName, docId);
  await deleteDoc(docRef);
};

export const updateDocAndSaveFile = async (
  infoDoc: IDocument,
  file: string,
  fileName: string
) => {
  const { collectionName, docId } = infoDoc;
  if (file) {
    const imageRef = ref(storage, `${collectionName}/${docId}/image`);
    await uploadString(imageRef, file, "data_url");
    const downloadURL = await getDownloadURL(imageRef);
    await updateDoc(doc(db, collectionName, docId), {
      [fileName]: downloadURL,
    });

    return downloadURL;
  }
};
