"use client";

import { useSession, signIn } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "./globals.css";

export default function Component() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [status, router]);

  if (status === "loading") {
    return <div className="w-screen h-screen flex items-center justify-center bg-gray-900 text-white">Loading...</div>;
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center">
        {session ? (
          <>
           <div>Looding...</div>
          </>
        ) : (
          <>
            <p className="mb-4 text-lg">Not signed in</p>
            <button 
              onClick={() => signIn("github")} 
              className="px-4 py-2 bg-blue-500 rounded-md hover:bg-blue-600 transition"
            >
              Sign in using GitHub
            </button>
          </>
        )}
      </div>
    </div>
  );
}
