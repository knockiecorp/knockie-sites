"use client;";
import Navbar from "@/components/native/Navbar";
import "@/styles/globals.css";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    import("preline");
  }, []);
  return (
    <div>
      <Navbar />
      <Component {...pageProps} />
    </div>
  );
}
