import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/authOption";
import { apiCall, API_ENDPOINTS } from "../../lib/apiClient";
import EmployeesClient from "./EmployeesClient";

export default async function EmployeesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    redirect("/");
  }

  let initialEmployees = [];
  let initialError = null;

  try {
    const data = await apiCall(API_ENDPOINTS.EMPLOYEES.BASE, {
      accessToken: session.accessToken,
    });

    initialEmployees = Array.isArray(data)
      ? data
      : Array.isArray(data?.data)
      ? data.data
      : [];
  } catch (error) {
    initialError =
      error instanceof Error ? error.message : "Failed to load employees.";
  }

  return (
    <EmployeesClient
      initialEmployees={initialEmployees}
      initialError={initialError}
      accessToken={session.accessToken}
    />
  );
}

