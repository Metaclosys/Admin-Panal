import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../api/auth/authOption";
import { apiCall, API_ENDPOINTS } from "../../../lib/apiClient";
import UserDetailsClient from "../UserDetailsClient";

export default async function UserDetailsPage({ params }) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    redirect("/");
  }

  const userId = params?.id;
  if (!userId) {
    redirect("/dashboard/users");
  }

  let initialUser = null;
  let initialError = null;

  try {
    initialUser = await apiCall(API_ENDPOINTS.USERS.BY_ID(userId), {
      accessToken: session.accessToken,
    });
  } catch (error) {
    initialError =
      error instanceof Error ? error.message : "Failed to load user details.";
  }

  return (
    <UserDetailsClient
      userId={userId}
      initialUser={initialUser}
      initialError={initialError}
      accessToken={session.accessToken}
    />
  );
}
