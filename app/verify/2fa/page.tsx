"use client";
import { Suspense } from "react";
import { ScaleLoader } from "react-spinners";
import VeryfiPage from "./verify_page";

export default function VerifyPage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background p-4">
      <Suspense fallback={<ScaleLoader color="#36d7b7" />}>
        <VeryfiPage />
      </Suspense>
    </main>
  );
}