import { useEffect, useState } from "react";
import { fetchFlashcards } from "../lib/flashcards";

const FlashcardList = () => {
  const [flashcards, setFlashcards] = useState([]);

  useEffect(() => {
    const getFlashcards = async () => {
      const cards = await fetchFlashcards();
      setFlashcards(cards);
    };
    getFlashcards();
  }, []);

  return (
    <div>
      {flashcards.map((flashcard, index) => (
        <div key={index}>
          <h3>{flashcard.topic}</h3>
          <p>{flashcard.content}</p>
        </div>
      ))}
    </div>
  );
};

export default FlashcardList;
