import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/authOption";
import { apiCall, API_ENDPOINTS } from "../../lib/apiClient";
import ServicesClient from "./ServicesClient";

export default async function ServicesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    redirect("/");
  }

  let initialServices = [];
  let initialError = null;

  try {
    const data = await apiCall(API_ENDPOINTS.SERVICES.BASE, {
      accessToken: session.accessToken,
    });
    initialServices = Array.isArray(data) ? data : [];
  } catch (error) {
    initialError =
      error instanceof Error ? error.message : "Failed to load services.";
  }

  return (
    <ServicesClient
      initialServices={initialServices}
      initialError={initialError}
      accessToken={session.accessToken}
    />
  );
}
