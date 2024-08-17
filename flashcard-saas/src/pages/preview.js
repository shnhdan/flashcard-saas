import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  TextField,
  Button,
  Snackbar,
  Alert,
  IconButton,
  Grid,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import { auth, firestore } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import {
  doc,
  setDoc,
  deleteDoc,
  getDocs,
  collection,
  query,
} from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Preview = () => {
  const [topic, setTopic] = useState("");
  const [details, setDetails] = useState("");
  const [error, setError] = useState("");
  const [flashcards, setFlashcards] = useState([]); // Updated to hold multiple flashcards
  const [userId, setUserId] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        fetchFlashcards(user.uid); // Fetch flashcards on user state change
      } else {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  const addDataToDataBase = async (fcData) => {
    try {
      const docRef = doc(
        firestore,
        "flashcards",
        userId,
        "cards",
        fcData.topic
      );
      await setDoc(docRef, fcData);
      fetchFlashcards(userId); // Refresh the flashcards list
    } catch (error) {
      console.error("Error adding flashcard: ", error);
    }
  };

  const handleGenerateFlashcard = () => {
    if (topic && details) {
      const flashcardData = { topic, details };
      setFlashcards([...flashcards, flashcardData]); // Add new flashcard to state
      setError("");
      addDataToDataBase(flashcardData);
      setShowSnackbar(true);
    } else {
      setError("Please fill in both fields.");
    }
  };

  const handleEditFlashcard = async (id, newDetails) => {
    try {
      const docRef = doc(firestore, "flashcards", userId, "cards", id);
      await setDoc(docRef, { details: newDetails }, { merge: true });
      fetchFlashcards(userId);
    } catch (error) {
      console.error("Error updating flashcard: ", error);
      setError("Failed to update flashcard.");
    }
  };

  const handleDeleteFlashcard = async (id) => {
    try {
      const docRef = doc(firestore, "flashcards", userId, "cards", id);
      await deleteDoc(docRef);
      fetchFlashcards(userId);
    } catch (error) {
      console.error("Error deleting flashcard: ", error);
      setError("Failed to delete flashcard.");
    }
  };

  const fetchFlashcards = async (userId) => {
    const flashcardsCollection = collection(
      firestore,
      "flashcards",
      userId,
      "cards"
    );
    const q = query(flashcardsCollection);
    const querySnapshot = await getDocs(q);
    const cards = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setFlashcards(cards);
  };

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="md" sx={{ pt: 4, pb: 6 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Flashcard Preview
        </Typography>

        {/* Form Section */}
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 4,
            "& .MuiTextField-root": { m: 1, width: "100%" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            label="Enter Topic"
            variant="outlined"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          <TextField
            label="Enter Details"
            variant="outlined"
            multiline
            rows={4}
            value={details}
            onChange={(e) => setDetails(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{
              mt: 2,
              backgroundColor: "#9c27b0",
              color: "white",
              "&:hover": { backgroundColor: "#7b1fa2" },
              width: "fit-content",
            }}
            onClick={handleGenerateFlashcard}
          >
            Generate Flashcard
          </Button>
          {error && (
            <Typography color="error" mt={2}>
              {error}
            </Typography>
          )}
        </Box>

        {/* Flashcard Display Section */}
        <Grid container spacing={1} justifyContent="center">
          {flashcards.map((fc) => (
            <Grid item xs={12} sm={6} md={4} key={fc.id}>
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  border: "2px solid #9c27b0",
                  backgroundColor: "white",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  minHeight: "150px",
                }}
              >
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ textAlign: "center" }}
                >
                  {fc.topic}
                </Typography>
                <Typography
                  variant="body1"
                  gutterBottom
                  sx={{ textAlign: "center" }}
                >
                  {fc.details}
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditFlashcard(fc.id, fc.details)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteFlashcard(fc.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Snackbar for Flashcard Generation */}
        <Snackbar
          open={showSnackbar}
          autoHideDuration={3000}
          onClose={() => setShowSnackbar(false)}
        >
          <Alert
            onClose={() => setShowSnackbar(false)}
            severity="success"
            sx={{ width: "100%" }}
          >
            Flashcard generated! Check it in the dashboard.
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

export default Preview;
