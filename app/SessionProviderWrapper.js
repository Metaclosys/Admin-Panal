"use client"; // This component is a client component
import { SessionProvider } from "next-auth/react";

export default function SessionProviderWrapper({ children }) {
  return (
    <SessionProvider
      // Force the session to be refreshed on window focus (to keep the session active)
      refetchInterval={5 * 60} // Refetch session every 5 minutes
      refetchOnWindowFocus={true}
    >
      {children}
    </SessionProvider>
  );
}
