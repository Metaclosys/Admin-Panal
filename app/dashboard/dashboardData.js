import { API_ENDPOINTS, apiCall } from "../lib/apiClient";

export async function fetchDashboardData(accessToken) {
  const [employeesData, servicesData, shopsData, bookingsData] =
    await Promise.all([
      apiCall(API_ENDPOINTS.EMPLOYEES.BASE, { accessToken }),
      apiCall(API_ENDPOINTS.SERVICES.BASE, { accessToken }),
      apiCall(API_ENDPOINTS.LOCATIONS.BASE, { accessToken }),
      apiCall(API_ENDPOINTS.BOOKINGS.BASE, { accessToken }),
    ]);

  return {
    employees: employeesData,
    services: servicesData,
    shops: shopsData,
    bookings: bookingsData,
  };
}
