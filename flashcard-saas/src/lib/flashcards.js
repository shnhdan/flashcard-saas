import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDY3G6Ta7Y_w5fWhjesEwOacZ3OPFEj7CA",
  authDomain: "flashcardsaas-6eef3.firebaseapp.com",
  projectId: "flashcardsaas-6eef3",
  storageBucket: "flashcardsaas-6eef3.appspot.com",
  messagingSenderId: "38571675381",
  appId: "1:38571675381:web:6a06e9a066735919d1bfbc",
  measurementId: "G-T8Z2VYZBXN",
};

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const generateFlashcard = async (topic) => {
  // This is a placeholder function; replace it with your AI generation logic
  return Flashcard`content for topic: ${topic};`;
};

export const saveFlashcard = async ({ topic, content }) => {
  try {
    // Add the flashcard to the Firestore 'flashcards' collection
    await addDoc(collection(db, "flashcards"), {
      topic,
      content,
      createdAt: new Date(),
    });
    console.log("Flashcard saved successfully!");
  } catch (error) {
    console.error("Error saving flashcard: ", error);
  }
};
