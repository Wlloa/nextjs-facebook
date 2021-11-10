import { initializeApp, getApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  getFirestore,
  addDoc,
  collection,
  query,
  where,
  getDocs,
  DocumentReference,
  QuerySnapshot,
  DocumentData,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHPVvayn6o6bzyG1eNC9r6P4DLhJsb57U",
  authDomain: "next-facebook-7830a.firebaseapp.com",
  projectId: "next-facebook-7830a",
  storageBucket: "next-facebook-7830a.appspot.com",
  messagingSenderId: "892549701956",
  appId: "1:892549701956:web:ce0d133c21d2483230b711",
  measurementId: "G-CGEDJ1BW3J",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

const createDoc = async (
  collectionName: string,
  data: {}
): Promise<DocumentReference<{}>> => {
  let doc;
  try {
    doc = await addDoc(collection(db, collectionName), data);
  } catch (error) {
    console.log(error.message);
    // throw new Error(error.message || "Something went wrong inserting");
  }
  return doc;
};

const readDocs = async (
  collectionName: string,
  email: string
): Promise<QuerySnapshot<DocumentData>> => {
  let docs;
  try {
    const q = query(
      collection(db, collectionName),
      where("email", "==", email)
    );
    docs = await getDocs(q);
  } catch (error) {
      console.log(error.message);
    //throw new Error(error.message || "Something went wrong reading");
  }
  return docs;
};

export { app, storage, db, readDocs, createDoc };
