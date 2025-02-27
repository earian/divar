'use client'
import { useEffect } from "react";
import { revalidateHome } from "./actions";

export default function RefreshHandler() {
  useEffect(() => {
    const handleBeforeUnload = async () => {
      await revalidateHome();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return null; 
}