"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation"; // Import useRouter
import { redirect } from "next/navigation";


export default function SignIn() {
  const router = useRouter(); // Create a router instance

  const handleSignIn = async (provider) => {
    const result = await signIn(provider); // disable auto-redirect from NextAuth

    if (result?.error) {
      console.error("Sign-in failed", result.error);
    } else {
      // After successful login, redirect to the dashboard
      return redirect("/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4 mx-auto">Sign in</h1>
      <button
        onClick={() => handleSignIn("google")}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Sign in with Google
      </button>
    </div>
  );
}
