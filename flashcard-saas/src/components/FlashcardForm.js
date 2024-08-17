import React, { useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import { generateFlashcard, saveFlashcard } from "../lib/flashcards";

const FlashcardForm = () => {
  // State for topic input and generated flashcard content
  const [topic, setTopic] = useState("");
  const [flashcard, setFlashcard] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Validate topic input before generating flashcard
    if (!topic.trim()) {
      alert("Please enter a topic");
      return;
    }

    // Generate flashcard content based on the topic
    const generatedFlashcard = await generateFlashcard(topic);

    // Update state with the generated flashcard
    setFlashcard(generatedFlashcard);

    // Save the generated flashcard to Firebase
    await saveFlashcard({ topic, content: generatedFlashcard });

    // Optionally clear the input after submission
    setTopic("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        "& .MuiTextField-root": { m: 1, width: "100%" },
        "& .MuiButton-root": { m: 2 },
      }}
    >
      <Typography variant="h4" component="h1" gutterBottom>
        Generate a Flashcard
      </Typography>

      <TextField
        label="Enter Topic"
        variant="outlined"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        required // Ensures that the field cannot be left empty
      />

      <Button variant="contained" color="primary" type="submit">
        Generate Flashcard
      </Button>

      {flashcard && (
        <Box
          sx={{
            mt: 4,
            p: 3,
            border: "1px solid #ccc",
            borderRadius: "8px",
            width: "100%",
            textAlign: "center",
            backgroundColor: "#f5f5f5",
          }}
        >
          <Typography variant="h6" component="h2">
            Generated Flashcard
          </Typography>
          <Typography variant="body1">{flashcard}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default FlashcardForm;
