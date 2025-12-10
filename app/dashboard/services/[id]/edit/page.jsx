import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../api/auth/authOption";
import { apiCall, API_ENDPOINTS } from "../../../../lib/apiClient";
import AddServiceClient from "../../AddServiceClient";

export default async function EditServicePage({ params }) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    redirect("/");
  }

  const serviceId = params?.id;
  if (!serviceId) {
    redirect("/dashboard/services");
  }

  let initialService = null;
  try {
    initialService = await apiCall(API_ENDPOINTS.SERVICES.BY_ID(serviceId), {
      accessToken: session.accessToken,
    });
  } catch (error) {
    console.error("Failed to load service for editing:", error);
  }

  return (
    <AddServiceClient
      accessToken={session.accessToken}
      serviceId={serviceId}
      initialService={initialService}
      assignedLocations={session.user?.assignedLocations || []}
      hasInvalidServiceParam={false}
    />
  );
}
