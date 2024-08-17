// src/context/FlashcardContext.js
import { createContext, useState, useContext } from "react";

const FlashcardContext = createContext();

export const FlashcardProvider = ({ children }) => {
  const [flashcards, setFlashcards] = useState([]);

  const addFlashcard = (flashcard) => {
    setFlashcards([...flashcards, flashcard]);
  };

  return (
    <FlashcardContext.Provider value={{ flashcards, addFlashcard }}>
      {children}
    </FlashcardContext.Provider>
  );
};

export const useFlashcards = () => useContext(FlashcardContext);
