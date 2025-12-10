import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../api/auth/authOption";
import { apiCall, API_ENDPOINTS } from "../../../lib/apiClient";
import MyProfileClient from "../MyProfileClient";

export default async function MyProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken || !session?.user?.id) {
    redirect("/");
  }

  let initialProfile = null;
  let initialError = null;

  try {
    initialProfile = await apiCall(API_ENDPOINTS.USERS.BY_ID(session.user.id), {
      accessToken: session.accessToken,
    });
  } catch (error) {
    initialError =
      error instanceof Error ? error.message : "Failed to load your profile.";
  }

  return (
    <MyProfileClient
      userId={session.user.id}
      initialProfile={initialProfile}
      initialError={initialError}
      accessToken={session.accessToken}
    />
  );
}
