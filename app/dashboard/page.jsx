import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/authOption";
import DashboardClient from "./DashboardClient";
import ReservationistRedirect from "./ReservationistRedirect";
import { fetchDashboardData } from "./dashboardData";

const normalizeArray = (value) => {
  if (Array.isArray(value)) {
    return value;
  }
  if (value == null) {
    return [];
  }
  return [value];
};

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    redirect("/");
  }

  const accessToken = session.accessToken;
  const roles = normalizeArray(session.user?.roles ?? session.user?.role);
  const assignedLocations = normalizeArray(session.user?.assignedLocations);
  const isReservationist = roles.includes("reservationist");

  if (isReservationist && assignedLocations.length > 0) {
    return (
      <ReservationistRedirect assignedLocations={assignedLocations} />
    );
  }

  let initialData = null;
  let initialError = null;
  let reservationistMessage = undefined;

  if (isReservationist) {
    reservationistMessage =
      "No shops are assigned to your account. Please contact your administrator.";
  } else {
    try {
      initialData = await fetchDashboardData(accessToken);
    } catch (error) {
      initialError =
        error instanceof Error
          ? error.message
          : "Failed to load dashboard data.";
    }
  }

  return (
    <DashboardClient
      initialData={initialData}
      initialError={initialError}
      accessToken={accessToken}
      isReservationist={isReservationist}
      reservationistMessage={reservationistMessage}
    />
  );
}
