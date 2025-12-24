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

const extractServiceId = (params) => {
  if (!params) {
    return null;
  }

  if (typeof URLSearchParams !== "undefined" && params instanceof URLSearchParams) {
    const value = params.get("serviceId");
    return typeof value === "string" && value ? value : null;
  }

  if (typeof params === "object") {
    try {
      if (Object.prototype.hasOwnProperty.call(params, "serviceId")) {
        const candidate = params.serviceId;
        if (typeof candidate === "string") {
          return candidate;
        }
        if (Array.isArray(candidate) && candidate.length > 0) {
          return candidate[0];
        }
      }
      if (typeof candidate === "string") {
        return candidate;
      }
      if (Array.isArray(candidate) && candidate.length > 0) {
        return candidate[0];
      }
    } catch {
      // ignore getter errors
    }
  }

  return null;
};

export default async function AddServicePage(props = {}) {
  const searchParams = props?.searchParams;
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    redirect("/");
  }

  const rawServiceId = extractServiceId(searchParams);

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
