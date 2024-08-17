import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
} from "@mui/material";
import { useRouter } from "next/router";
import { useUser, useClerk } from "@clerk/nextjs";

const Navbar = () => {
  const { user } = useUser(); // Get the current user from Clerk
  const { signOut } = useClerk(); // Get Clerk instance to call sign out
  const router = useRouter();

  console.log("User:", user); // Debugging log to check user state

  const handleSignOut = async () => {
    try {
      await signOut(); // Use Clerk's sign out method
      router.push("/"); // Redirect to home page after signing out
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Container
          maxWidth="lg"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h6"
            component="button"
            onClick={() => router.push("/")}
            sx={{
              background: "transparent",
              border: "none",
              color: "white",
              cursor: "pointer",
              fontSize: "1.5rem",
            }}
          >
            FlashFocus
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                backgroundColor: "#9c27b0",
                "&:hover": { backgroundColor: "#7b1fa2" },
              }}
              onClick={() => router.push("/dashboard")}
            >
              Dashboard
            </Button>
            {!user ? (
              <>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    backgroundColor: "#9c27b0",
                    "&:hover": { backgroundColor: "#7b1fa2" },
                  }}
                  onClick={() => router.push("/login")}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    backgroundColor: "#9c27b0",
                    "&:hover": { backgroundColor: "#7b1fa2" },
                  }}
                  onClick={() => router.push("/signup")}
                >
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                <Typography variant="h6" sx={{ color: "white", mr: 2 }}>
                  {user.firstName || user.emailAddress}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    backgroundColor: "#9c27b0",
                    "&:hover": { backgroundColor: "#7b1fa2" },
                  }}
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              </>
            )}
          </Box>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
