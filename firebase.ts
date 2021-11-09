import { initializeApp } from "firebase/app";
import {
  getDownloadURL,
  getStorage,
  ref as storageRef,
  uploadString,
  uploadBytes,
} from "firebase/storage";
import {
  getDatabase,
  ref,
  push,
  set,
  query,
  equalTo,
  get,
  orderByChild,
  update,
} from "firebase/database";
import { Person } from "./models/person";
import formidable from "formidable";
import fs from "fs";

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
const storage = getStorage(app);

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

const updateUser = async (user: Person): Promise<void> => {
  const dbRef = ref(db, "users");
  console.log(user);
  const result = await update(dbRef, { [`${user.id}`]: user });
  console.log("update result", result);
};

const getUsers = async (email: string) => {
  const users = await get(
    query(ref(db, "users"), orderByChild("email"), equalTo(email))
  );
  return users.val();
};

const uploadImage = async (image, id): Promise<string> => {
  const imageRef = storageRef(storage, `profiles/${id}/image`);

  console.log(image);
  const snap = await uploadBytes(imageRef, image);
  //console.log(snap);
  const downloadURL = await getDownloadURL(imageRef);
  console.log(snap, downloadURL);
  return downloadURL;
};

const downloadImage = async (imageUrl: string): Promise<string> => {
  const bucketUrl = storageRef(storage, imageUrl);
  return await getDownloadURL(bucketUrl);
};

export { app, db, storage, createUser, getUsers, uploadImage, updateUser };
