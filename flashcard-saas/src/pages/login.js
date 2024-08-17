import React, { useState } from "react";
import { useRouter } from "next/router";
import { TextField, Button, Container, Typography, Box } from "@mui/material";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../lib/firebase"; // Import Firebase auth and Google provider
import Navbar from "../components/Navbar";
import styles from "../styles/Auth.module.css";

const Login = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const signInMethod = emailOrUsername.includes("@")
        ? signInWithEmailAndPassword(auth, emailOrUsername, password)
        : signInWithEmailAndPassword(
            auth,
            `${emailOrUsername}@example.com`,
            password
          );

      await signInMethod;
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <Navbar />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            mt: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">Login</Typography>
          {error && <Typography color="error">{error}</Typography>}
          <form onSubmit={handleLogin} className={styles.form}>
            <TextField
              label="Email or Username"
              type="text"
              value={emailOrUsername}
              onChange={(e) => setEmailOrUsername(e.target.value)}
              fullWidth
              margin="normal"
              required
              name="emailOrUsername"
              autoComplete="username"
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
              name="password"
              autoComplete="current-password"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Login
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleGoogleLogin}
              fullWidth
              sx={{ mt: 2 }}
            >
              Login with Google
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default Login;
