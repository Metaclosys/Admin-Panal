import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../api/auth/authOption";
import { apiCall, API_ENDPOINTS } from "../../../lib/apiClient";
import PackagesFormClient from "../PackagesFormClient";

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

const isPromiseLike = (value) =>
  value && typeof value === "object" && typeof value.then === "function";

export default async function AddPackagePage({ searchParams }) {
  const resolvedSearchParams = isPromiseLike(searchParams)
    ? await searchParams
    : searchParams;

  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    redirect("/");
  }

  const accessToken = session.accessToken;
  const packageIdParam =
    typeof resolvedSearchParams?.packageId === "string"
      ? resolvedSearchParams.packageId.trim()
      : null;
  const packageId = packageIdParam || null;

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

  let defaultLocationId = locations.length
    ? extractLocationId(locations[0])
    : null;

  let initialPackageData = null;
  let packageError = null;

  if (packageId) {
    try {
      initialPackageData = await apiCall(
        API_ENDPOINTS.PACKAGES.BY_ID(packageId),
        { accessToken }
      );
      const packageLocation = extractLocationId(
        initialPackageData?.location ?? initialPackageData?.locationId
      );
      if (packageLocation) {
        defaultLocationId = packageLocation;
      }
    } catch (error) {
      packageError =
        error instanceof Error ? error.message : "Failed to load package.";
    }
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
          : "Failed to load services for the default location.";
    }
  }

  return (
    <PackagesFormClient
      packageId={packageId}
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
