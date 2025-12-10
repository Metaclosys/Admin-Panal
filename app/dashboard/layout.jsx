import React from "react";
import { getServerSession } from "next-auth";
import Sidebar from "../component/dashboard/sidebar/sidebar";
import Navbar from "../component/dashboard/navbar/navbar";
import Footer from "../component/shared/footer/footer";
import { authOptions } from "../api/auth/authOption";
import { apiCall, API_ENDPOINTS } from "../lib/apiClient";

export default async function layout({ children }) {
  const session = await getServerSession(authOptions);

  let initialProfile = null;
  try {
    if (session?.accessToken) {
      initialProfile = await apiCall(API_ENDPOINTS.AUTH.PROFILE, {
        accessToken: session.accessToken,
      });
    }
  } catch (error) {
    // Swallow profile errors to avoid crashing the dashboard shell
    console.error("Failed to load profile for sidebar:", error);
  }

  return (
    <div className="flex h-full">
      <Sidebar
        initialProfile={initialProfile}
        accessToken={session?.accessToken ?? null}
      />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto p-4">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
