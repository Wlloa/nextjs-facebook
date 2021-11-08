import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {
  getDatabase,
  ref,
  push,
  set,
  query,
  equalTo,
  get,
  orderByChild,
} from "firebase/database";
import { Person } from "./models/person";

const firebaseConfig = {
  apiKey: "AIzaSyBHPVvayn6o6bzyG1eNC9r6P4DLhJsb57U",
  authDomain: "next-facebook-7830a.firebaseapp.com",
  projectId: "next-facebook-7830a",
  storageBucket: "next-facebook-7830a.appspot.com",
  messagingSenderId: "892549701956",
  appId: "1:892549701956:web:ce0d133c21d2483230b711",
  measurementId: "G-CGEDJ1BW3J",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase();
const storage = getStorage();

const createUser = async (user: Person): Promise<string> => {
  try {
    const userRef = ref(db, "users");
    const newUserRef = push(userRef);
    await set(newUserRef, user);
    return newUserRef.key;
  } catch (error) {
    throw new Error(
      error.message || "Something went wrong with database write"
    );
  }
};

const getUsers = async (email: string) => {
  const users = await get(
    query(ref(db, "users"), orderByChild("email"), equalTo(email))
  );
  return users.val();
};

export { app, db, storage, createUser, getUsers };
