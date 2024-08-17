import {
  ClerkProvider,
  RedirectToSignIn,
  SignedIn,
  SignedOut,
} from "@clerk/nextjs";

const clerkConfig = {
  frontendApi:
    "process.env.pk_test_cmVsYXhpbmctcmF0dGxlci01OC5jbGVyay5hY2NvdW50cy5kZXYk",
};

export { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut };
