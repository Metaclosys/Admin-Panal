import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../api/auth/authOption";
import { apiCall, API_ENDPOINTS } from "../../../lib/apiClient";
import AddEmployeeClient from "../AddEmployeeClient";

export default async function AddEmployeePage() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    redirect("/");
  }

  let locations = [];
  let services = [];
  let locationsError = null;
  let servicesError = null;

  try {
    const data = await apiCall(API_ENDPOINTS.LOCATIONS.BASE, {
      accessToken: session.accessToken,
    });
    locations = Array.isArray(data) ? data : [];
  } catch (error) {
    locationsError = error instanceof Error ? error.message : "Failed to load locations.";
  }

  try {
    const data = await apiCall(API_ENDPOINTS.SERVICES.BASE, {
      accessToken: session.accessToken,
    });
    services = Array.isArray(data) ? data : [];
  } catch (error) {
    servicesError = error instanceof Error ? error.message : "Failed to load services.";
  }

  return (
    <AddEmployeeClient
      accessToken={session.accessToken}
      locations={locations}
      locationsError={locationsError}
      services={services}
      servicesError={servicesError}
    />
  );
}
