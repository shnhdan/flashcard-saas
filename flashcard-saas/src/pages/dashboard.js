import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { auth, firestore } from "../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";

const Dashboard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const router = useRouter();

  const [userId, setUserId] = useState("");

  useEffect(() => {
    const getUserId = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        setUserId(uid);
        fetchFlashcards(uid);
      } else {
        router.push("/login");
      }
    });

    return () => getUserId();
  }, [auth]);

  const fetchFlashcards = async (uid) => {
    try {
      const flashcardsCollection = collection(
        firestore,
        "flashcards",
        uid,
        "cards"
      );
      const flashcardsSnapshot = await getDocs(flashcardsCollection);
      const flashcardsList = flashcardsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFlashcards(flashcardsList);
    } catch (error) {
      console.error("Error fetching flashcards: ", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, "flashcards", userId, "cards", id));
      setFlashcards(flashcards.filter((flashcard) => flashcard.id !== id));
    } catch (error) {
      console.error("Error deleting flashcard: ", error);
    }
  };

  const handleEdit = (flashcard) => {
    router.push({
      pathname: "/preview",
      query: {
        id: flashcard.id,
        topic: flashcard.topic,
        details: flashcard.details,
      },
    });
  };

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="lg" sx={{ pt: 4, pb: 6 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Your Flashcards
        </Typography>
        <Grid container spacing={4}>
          {flashcards.map((flashcard) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={flashcard.id}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: "8px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  backgroundColor: "#f5f5f5",
                  border: "2px solid #9c27b0",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {flashcard.topic}
                </Typography>
                <Typography variant="body1" gutterBottom>
                  {flashcard.details}
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <IconButton
                    color="primary"
                    onClick={() => handleEdit(flashcard)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleDelete(flashcard.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Dashboard;
