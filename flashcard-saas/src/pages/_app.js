import { ClerkProvider, RedirectToSignIn } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { useEffect } from "react";

const MyApp = ({ Component, pageProps }) => {
  const router = useRouter();
  const frontendApi =
    "pk_test_cmVsYXhpbmctcmF0dGxlci01OC5jbGVyay5hY2NvdW50cy5kZXYk"; // Replace with your actual Frontend API Key

  useEffect(() => {
    // Handle redirects or other side effects if necessary
  }, [router]);

  return (
    <ClerkProvider frontendApi={frontendApi} navigate={(to) => router.push(to)}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default MyApp;
