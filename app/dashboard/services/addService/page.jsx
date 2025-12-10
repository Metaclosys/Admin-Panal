import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../api/auth/authOption";
import { apiCall, API_ENDPOINTS } from "../../../lib/apiClient";
import AddServiceClient from "../AddServiceClient";

const normalizeServiceId = (value) => {
  if (!value) {
    return null;
  }

  const decoded = decodeURIComponent(value).trim();
  if (!decoded || decoded === "undefined" || decoded === "null") {
    return null;
  }
  return decoded;
};

export default async function AddServicePage({ searchParams }) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    redirect("/");
  }

  const rawServiceId =
    typeof searchParams?.serviceId === "string"
      ? searchParams.serviceId
      : Array.isArray(searchParams?.serviceId)
      ? searchParams.serviceId[0]
      : null;

  const serviceId = normalizeServiceId(rawServiceId);
  const hasInvalidServiceParam = Boolean(rawServiceId && !serviceId);

  let initialService = null;
  if (serviceId) {
    try {
      initialService = await apiCall(API_ENDPOINTS.SERVICES.BY_ID(serviceId), {
        accessToken: session.accessToken,
      });
    } catch (error) {
      console.error("Failed to load service for editing:", error);
    }
  }

  return (
    <AddServiceClient
      accessToken={session.accessToken}
      serviceId={serviceId}
      initialService={initialService}
      assignedLocations={session.user?.assignedLocations || []}
      hasInvalidServiceParam={hasInvalidServiceParam}
    />
  );
}
