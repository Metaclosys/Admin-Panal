import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../../api/auth/authOption";
import { apiCall, API_ENDPOINTS } from "../../../../lib/apiClient";
import PackagesFormClient from "../../PackagesFormClient";

const extractLocationId = (location) => {
  if (!location) {
    return null;
  }
  if (typeof location === "string") {
    return location;
  }
  return (
    location._id ??
    location.id ??
    location.locationId ??
    location.value ??
    null
  );
};

export default async function EditPackagePage({ params }) {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    redirect("/");
  }

  const packageId = params?.id ? String(params.id) : null;
  if (!packageId) {
    redirect("/dashboard/packages");
  }

  const accessToken = session.accessToken;

  let locations = [];
  let locationsError = null;

  try {
    const data = await apiCall(API_ENDPOINTS.LOCATIONS.BASE, {
      accessToken,
    });
    const list = Array.isArray(data) ? data : data?.data;
    locations = Array.isArray(list) ? list : [];
  } catch (error) {
    locationsError =
      error instanceof Error ? error.message : "Failed to load locations.";
  }

  let initialPackageData = null;
  let packageError = null;
  let defaultLocationId = null;

  try {
    initialPackageData = await apiCall(
      API_ENDPOINTS.PACKAGES.BY_ID(packageId),
      { accessToken }
    );
    defaultLocationId =
      extractLocationId(initialPackageData?.location) ??
      extractLocationId(initialPackageData?.locationId) ??
      null;
  } catch (error) {
    packageError =
      error instanceof Error ? error.message : "Failed to load package.";
  }

  if (!defaultLocationId && locations.length) {
    defaultLocationId = extractLocationId(locations[0]);
  }

  let initialServices = [];
  let servicesError = null;

  if (defaultLocationId) {
    try {
      const data = await apiCall(
        `${API_ENDPOINTS.SERVICES.BASE}?locationId=${encodeURIComponent(
          defaultLocationId
        )}`,
        { accessToken }
      );
      const list = Array.isArray(data) ? data : data?.data;
      initialServices = Array.isArray(list) ? list : [];
    } catch (error) {
      servicesError =
        error instanceof Error
          ? error.message
          : "Failed to load services for the package location.";
    }
  }

  return (
    <PackagesFormClient
      packageId={packageId}
      allowLocationEdit={false}
      defaultLocationId={defaultLocationId}
      accessToken={accessToken}
      initialLocations={locations}
      initialServices={initialServices}
      initialPackageData={initialPackageData}
      initialErrors={{
        locations: locationsError,
        package: packageError,
        services: servicesError,
      }}
    />
  );
}
