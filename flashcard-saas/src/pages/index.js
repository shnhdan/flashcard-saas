import React from "react";
import { Container, Typography, Button, Grid, Paper, Box } from "@mui/material";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import styles from "../styles/Home.module.css"; // Ensure you have the proper styles in Home.module.css

const Home = () => {
  const router = useRouter();

  const features = [
    {
      title: "AI-Powered Flashcards",
      description: "Generate flashcards using AI for any topic.",
    },
    {
      title: "Custom Decks",
      description: "Create and organize your own flashcard decks.",
    },
    {
      title: "Progress Tracking",
      description: "Track your learning progress over time.",
    },
    {
      title: "Collaborative Learning",
      description: "Share flashcards and learn with friends.",
    },
  ];

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="lg" sx={{ pt: 4, pb: 6 }}>
        <Typography
          variant="h2"
          align="center"
          gutterBottom
          className={styles.title}
        >
          Welcome to FlashFocus
        </Typography>
        <Typography
          variant="h6"
          align="center"
          paragraph
          className={styles.description}
        >
          Create, save, and review flashcards to enhance your learning
          experience.
        </Typography>
        <Box
          sx={{
            maxWidth: "500px", // Limit the max width
            margin: "0 auto", // Center the content
            padding: 2, // Add some padding
            backgroundColor: "#f5f5f5", // Background color for the card
            borderRadius: "8px", // Rounded corners
          }}
          className={styles.card}
        >
          <Typography variant="h5" gutterBottom className={styles.cardTitle}>
            Generate Flashcards
          </Typography>
          <Typography paragraph className={styles.cardContent}>
            Enter a topic and generate flashcards to help you study effectively.
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#9c27b0",
              color: "white",
              "&:hover": { backgroundColor: "#7b1fa2" },
              width: "55%", // Make the button full width of the container
            }}
            onClick={() => router.push("/preview")}
          >
            Get Started
          </Button>
        </Box>

        {/* Features Section */}
        <Typography variant="h4" align="center" gutterBottom sx={{ mt: 4 }}>
          Features
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  textAlign: "center",
                  backgroundColor: "white",
                  border: "2px solid #9c27b0",
                  height: "200px", // Set a fixed height for equal-sized boxes
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6">{feature.title}</Typography>
                <Typography variant="body1" paragraph>
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Pricing Plans Section */}
        <Typography variant="h4" align="center" gutterBottom sx={{ mt: 6 }}>
          Pricing Plans
        </Typography>
        <Grid container spacing={4} justifyContent="center" sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                textAlign: "center",
                backgroundColor: "white",
                border: "2px solid #9c27b0",
              }}
            >
              <Typography variant="h6">Basic Plan</Typography>
              <Typography variant="h4">$5</Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#9c27b0",
                  color: "white",
                  "&:hover": { backgroundColor: "#7b1fa2" },
                  mt: 2,
                }}
                fullWidth
                onClick={() => router.push("/payment")}
              >
                Choose Basic Plan
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                textAlign: "center",
                backgroundColor: "white",
                border: "2px solid #9c27b0",
              }}
            >
              <Typography variant="h6">Premium Plan</Typography>
              <Typography variant="h4">$10</Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#9c27b0",
                  color: "white",
                  "&:hover": { backgroundColor: "#7b1fa2" },
                  mt: 2,
                }}
                fullWidth
                onClick={() => router.push("/payment")}
              >
                Choose Premium Plan
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Home;
