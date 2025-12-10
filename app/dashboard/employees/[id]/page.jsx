import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../api/auth/authOption";
import { apiCall, API_ENDPOINTS } from "../../../lib/apiClient";
import EmployeeDetailsClient from "../EmployeeDetailsClient";

export default async function EmployeeDetailsPage({ params }) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    redirect("/");
  }

  const employeeId = params?.id;
  if (!employeeId) {
    redirect("/dashboard/employees");
  }

  let initialEmployee = null;
  let initialError = null;

  try {
    initialEmployee = await apiCall(API_ENDPOINTS.EMPLOYEES.BY_ID(employeeId), {
      accessToken: session.accessToken,
    });
  } catch (error) {
    initialError =
      error instanceof Error ? error.message : "Failed to load employee.";
  }

  return (
    <EmployeeDetailsClient
      employeeId={employeeId}
      initialEmployee={initialEmployee}
      initialError={initialError}
      accessToken={session.accessToken}
    />
  );
}
