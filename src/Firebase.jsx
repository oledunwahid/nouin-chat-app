// Import functions needed from the SDKs 
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, doc, deleteDoc, updateDoc } from "firebase/firestore";

//  Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgm-CuGm6XBOtKYZv3JUliefJOJ2tKc68",
  authDomain: "nouin-chat.firebaseapp.com",
  projectId: "nouin-chat",
  storageBucket: "nouin-chat.appspot.com",
  messagingSenderId: "343722602807",
  appId: "1:343722602807:web:c81775e0ef9e3ea986eab2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Function to delete a message
export const deleteMessage = async (messageId) => {
  try {
    const messageRef = doc(collection(db, "messages"), messageId);
    await deleteDoc(messageRef);
    console.log('Message deleted successfully.');
  } catch (error) {
    console.error('Error deleting message:', error);
  }
};

// Function to update a message
export const updateMessage = async (messageId, newText) => {
  try {
    const messageRef = doc(collection(db, "messages"), messageId);
    await updateDoc(messageRef, { text: newText });
    console.log('Message updated successfully.');
  } catch (error) {
    console.error('Error updating message:', error);
  }
};