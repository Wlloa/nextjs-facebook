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
import { IPost } from "./models/post";
import { orderBy } from "@firebase/firestore";

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

const createPost = async (post: IPost): Promise<string> => {
  try {
    const postRef = ref(db, "posts");
    const newPost = push(postRef);
    await set(newPost, post);
    return newPost.key;
  } catch (error) {
    throw new Error(
      error.message || "Something went wrong with database write"
    );
  }
};

const updateUser = async (user: Person): Promise<void> => {
  try {
    const dbRef = ref(db, "users");
    console.log(user);
    const result = await update(dbRef, { [`${user.id}`]: user });
    console.log("update result", result);
  } catch (error) {
    throw new Error(error.message || "Something went wrong updating user");
  }
};

const getUsers = async (email: string) => {
  try {
    const users = await get(
      query(ref(db, "users"), orderByChild("email"), equalTo(email))
    );
    return users.val();
  } catch (error) {
    throw new Error(error.message || "Something went wrong getting user");
  }
};

const getPosts = async (userId: string) => {
  console.log(userId);
  try {
    const posts = await(get(
      query(ref(db, "posts"), orderByChild("user"), equalTo(userId))
    ))
    return posts.val();
  } catch (error) {
    throw new Error(error.message || "Something went wrong getting user");
  }
}

const uploadImage = async (
  image: Blob,
  id: string,
  bucket: string,
  name: string
): Promise<string> => {
  const imageRef = storageRef(storage, `${id}/${bucket}/${name}`);

  const snap = await uploadBytes(imageRef, image);
  const downloadURL = await getDownloadURL(imageRef);
  console.log(snap, downloadURL);
  return downloadURL;
};

const uploadPostImage = async (
  image: any,
  id: string,
  bucket: string,
  name: string
): Promise<string> => {
  const imageRef = storageRef(storage, `${id}/${bucket}/${name}`);

  const snap = await uploadString(imageRef, image, "data_url");
  const downloadURL = await getDownloadURL(imageRef);
  console.log(snap, downloadURL);
  return downloadURL;
};

const downloadImage = async (imageUrl: string): Promise<string> => {
  const bucketUrl = storageRef(storage, imageUrl);
  return await getDownloadURL(bucketUrl);
};

export {
  app,
  db,
  storage,
  createUser,
  getUsers,
  uploadImage,
  updateUser,
  createPost,
  getPosts,
  uploadPostImage
};
