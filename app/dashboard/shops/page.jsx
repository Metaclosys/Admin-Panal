import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/authOption";
import { apiCall, API_ENDPOINTS } from "../../lib/apiClient";
import ShopsClient from "./ShopsClient";

const normalizeArray = (value) => {
  if (Array.isArray(value)) {
    return value;
  }
  if (value == null) {
    return [];
  }
  return [value];
};

export default async function ShopsPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  const accessToken = session?.accessToken;
  if (!accessToken) {
    redirect("/");
  }

  const roles = normalizeArray(session?.user?.roles ?? session?.user?.role);
  const assignedLocations = normalizeArray(session?.user?.assignedLocations);
  const isReservationist = roles.includes("reservationist");

  let initialError = null;
  let initialShops = [];

  if (isReservationist && assignedLocations.length === 0) {
    initialError =
      "No shops are assigned to your account. Please contact your administrator.";
  } else {
    try {
      const data = await apiCall(API_ENDPOINTS.LOCATIONS.BASE, {
        accessToken,
      });
      initialShops = Array.isArray(data) ? data : [];
      if (isReservationist && initialShops.length === 0) {
        initialError = "No shops are available for your account.";
      }
    } catch (error) {
      initialError =
        error instanceof Error ? error.message : "Failed to load shops";
    }
  }

  return (
    <ShopsClient
      initialShops={initialShops}
      initialError={initialError}
      accessToken={accessToken}
      isReservationist={isReservationist}
      assignedLocations={assignedLocations}
    />
  );
}
