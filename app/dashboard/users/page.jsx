import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/authOption";
import { apiCall, API_ENDPOINTS } from "../../lib/apiClient";
import UsersClient from "./UsersClient";

export default async function UsersPage() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    redirect("/");
  }

  let initialUsers = [];
  let initialError = null;

  try {
    const data = await apiCall(API_ENDPOINTS.USERS.BASE, {
      accessToken: session.accessToken,
    });
    initialUsers = Array.isArray(data) ? data : [];
  } catch (error) {
    initialError =
      error instanceof Error ? error.message : "Failed to load users.";
  }

  return (
    <UsersClient
      initialUsers={initialUsers}
      initialError={initialError}
      accessToken={session.accessToken}
    />
  );
}
