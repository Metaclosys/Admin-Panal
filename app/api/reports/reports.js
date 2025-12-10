import { BACKEND_API, getFullUrl } from "../apiContent/apiContent";

const authHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
});

export const reportsApi = {
  // Membership Conversion Report
  getMembershipConversion: async (month, year, token) => {
    try {
      const url = getFullUrl(BACKEND_API.REPORTS.MEMBERSHIP_CONVERSION);
      const response = await fetch(`${url}?month=${month}&year=${year}`, {
        headers: authHeaders(token),
      });
      return await response.json();
    } catch (error) {
      console.error("Error fetching membership conversion report:", error);
      throw error;
    }
  },

  // Orders By Login Report
  getOrdersByLogin: async (startDate, endDate, token) => {
    try {
      const url = getFullUrl(BACKEND_API.REPORTS.ORDERS_BY_LOGIN);
      const response = await fetch(
        `${url}?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: authHeaders(token),
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching orders by login report:", error);
      throw error;
    }
  },

  // Reservations By Location Report
  getReservationsByLocation: async (startDate, endDate, token) => {
    try {
      const url = getFullUrl(BACKEND_API.REPORTS.RESERVATIONS_BY_LOCATION);
      const response = await fetch(
        `${url}?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: authHeaders(token),
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching reservations by location report:", error);
      throw error;
    }
  },

  // Sales By Day Report
  getSalesByDay: async (startDate, endDate, token) => {
    try {
      const url = getFullUrl(BACKEND_API.REPORTS.SALES_BY_DAY);
      const response = await fetch(
        `${url}?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: authHeaders(token),
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching sales by day report:", error);
      throw error;
    }
  },

  // Transaction Report
  getTransactionReport: async (startDate, endDate, locationId, token) => {
    try {
      const url = getFullUrl(BACKEND_API.REPORTS.TRANSACTIONS);
      const params = new URLSearchParams({ startDate, endDate });
      if (locationId) params.append("locationId", locationId);
      const response = await fetch(`${url}?${params}`, {
        headers: authHeaders(token),
      });
      return await response.json();
    } catch (error) {
      console.error("Error fetching transaction report:", error);
      throw error;
    }
  },

  // Gift Certificate Reports
  getGiftCertificateRedemption: async (startDate, endDate, token) => {
    try {
      const url = getFullUrl(BACKEND_API.REPORTS.GIFT_CERTIFICATE_REDEMPTION);
      const response = await fetch(
        `${url}?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: authHeaders(token),
        }
      );
      return await response.json();
    } catch (error) {
      console.error(
        "Error fetching gift certificate redemption report:",
        error
      );
      throw error;
    }
  },

  getGiftCertificateUsage: async (startDate, endDate, token) => {
    try {
      const url = getFullUrl(BACKEND_API.REPORTS.GIFT_CERTIFICATE_USAGE);
      const response = await fetch(
        `${url}?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: authHeaders(token),
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching gift certificate usage report:", error);
      throw error;
    }
  },

  // Inventory Override Report
  getInventoryOverride: async (startDate, endDate, token) => {
    try {
      const url = getFullUrl(BACKEND_API.REPORTS.INVENTORY_OVERRIDE);
      const response = await fetch(
        `${url}?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: authHeaders(token),
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching inventory override report:", error);
      throw error;
    }
  },

  // Liabilities Report
  getLiabilitiesReport: async (startDate, endDate, token) => {
    try {
      const url = getFullUrl(BACKEND_API.REPORTS.LIABILITIES);
      const response = await fetch(
        `${url}?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: authHeaders(token),
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching liabilities report:", error);
      throw error;
    }
  },

  // Bookings By Login Report
  getBookingsByLogin: async (startDate, endDate, token) => {
    try {
      const url = getFullUrl(BACKEND_API.REPORTS.BOOKINGS_BY_LOGIN);
      const response = await fetch(
        `${url}?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: authHeaders(token),
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching bookings by login report:", error);
      throw error;
    }
  },

  // Class Attendance Report
  getClassAttendance: async (startDate, endDate, token) => {
    try {
      const url = getFullUrl(BACKEND_API.REPORTS.CLASS_ATTENDANCE);
      const response = await fetch(
        `${url}?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: authHeaders(token),
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching class attendance report:", error);
      throw error;
    }
  },

  // Referral Reports
  getReferralReportByRevenue: async (startDate, endDate, token) => {
    try {
      const url = getFullUrl(BACKEND_API.REPORTS.REFERRALS_BY_REVENUE);
      const response = await fetch(
        `${url}?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: authHeaders(token),
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching referral by revenue report:", error);
      throw error;
    }
  },

  getReferralReportByDate: async (startDate, endDate, token) => {
    try {
      const url = getFullUrl(BACKEND_API.REPORTS.REFERRALS_BY_DATE);
      const response = await fetch(
        `${url}?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: authHeaders(token),
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching referral by date report:", error);
      throw error;
    }
  },

  getReferralReportByCode: async (startDate, endDate, referralCode, token) => {
    try {
      const url = getFullUrl(BACKEND_API.REPORTS.REFERRALS_BY_CODE);
      const response = await fetch(
        `${url}?startDate=${startDate}&endDate=${endDate}&referralCode=${referralCode}`,
        {
          headers: authHeaders(token),
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching referral by code report:", error);
      throw error;
    }
  },

  // User Login History Report
  getUserLoginHistory: async (startDate, endDate, token) => {
    try {
      const url = getFullUrl(BACKEND_API.REPORTS.USER_LOGIN_HISTORY);
      const response = await fetch(
        `${url}?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: authHeaders(token),
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching user login history report:", error);
      throw error;
    }
  },

  // Special Code Usage Report
  getSpecialCodeUsage: async (startDate, endDate, token) => {
    try {
      const url = getFullUrl(BACKEND_API.REPORTS.SPECIAL_CODE_USAGE);
      const response = await fetch(
        `${url}?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: authHeaders(token),
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching special code usage report:", error);
      throw error;
    }
  },

  // Appointment Booking By Login Report
  getAppointmentBookingByLogin: async (
    startDate,
    endDate,
    employeeId,
    token
  ) => {
    try {
      console.log("Starting appointment booking by login fetch...");
      const url = getFullUrl(BACKEND_API.REPORTS.APPOINTMENT_BOOKINGS_BY_LOGIN);
      console.log("Base URL:", url);

      const params = new URLSearchParams({ startDate, endDate });
      if (employeeId) {
        params.append("employeeId", employeeId);
      }

      console.log("Request parameters:", params.toString());
      console.log("Full URL:", `${url}?${params.toString()}`);
      console.log("Token present:", !!token);

      const response = await fetch(`${url}?${params}`, {
        headers: authHeaders(token),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error Response:", errorText);
        throw new Error(
          `Failed to fetch appointment booking data: ${errorText}`
        );
      }

      const data = await response.json();
      console.log("API Response Data:", data);
      return data;
    } catch (error) {
      console.error("Error in getAppointmentBookingByLogin:", error);
      throw error;
    }
  },

  // Orders Report
  getOrdersReport: async (startDate, endDate, locationId, token) => {
    try {
      const url = getFullUrl(BACKEND_API.REPORTS.ORDERS_REPORT);
      const params = new URLSearchParams({ startDate, endDate });
      if (locationId) params.append("locationId", locationId);
      const response = await fetch(`${url}?${params}`, {
        headers: authHeaders(token),
      });
      return await response.json();
    } catch (error) {
      console.error("Error fetching orders report:", error);
      throw error;
    }
  },

  // Orders Report V2
  getOrdersReportV2: async (startDate, endDate, locationId, token) => {
    try {
      const url = getFullUrl(BACKEND_API.REPORTS.ORDERS_REPORT_V2);
      const params = new URLSearchParams({ startDate, endDate });
      if (locationId) params.append("locationId", locationId);
      const response = await fetch(`${url}?${params}`, {
        headers: authHeaders(token),
      });
      return await response.json();
    } catch (error) {
      console.error("Error fetching orders report v2:", error);
      throw error;
    }
  },

  // Payroll Report
  getPayrollReport: async (startDate, endDate, employeeId, token) => {
    try {
      const url = getFullUrl(BACKEND_API.REPORTS.PAYROLL);
      const params = new URLSearchParams({ startDate, endDate });
      if (employeeId) params.append("employeeId", employeeId);
      const response = await fetch(`${url}?${params}`, {
        headers: authHeaders(token),
      });
      return await response.json();
    } catch (error) {
      console.error("Error fetching payroll report:", error);
      throw error;
    }
  },

  // Sales By Location Report
  getSalesByLocation: async (startDate, endDate, token) => {
    try {
      const url = getFullUrl(BACKEND_API.REPORTS.SALES_BY_LOCATION);
      const response = await fetch(
        `${url}?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: authHeaders(token),
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching sales by location report:", error);
      throw error;
    }
  },

  // Services By Category Report
  getServicesByCategory: async (startDate, endDate, categoryId, token) => {
    try {
      const url = getFullUrl(BACKEND_API.REPORTS.SERVICES_BY_CATEGORY);
      const params = new URLSearchParams({ startDate, endDate });
      if (categoryId) params.append("categoryId", categoryId);
      const response = await fetch(`${url}?${params}`, {
        headers: authHeaders(token),
      });
      return await response.json();
    } catch (error) {
      console.error("Error fetching services by category report:", error);
      throw error;
    }
  },

  // Unpaid Appointments Report
  getUnpaidAppointments: async (startDate, endDate, locationId, token) => {
    try {
      const url = getFullUrl(BACKEND_API.REPORTS.UNPAID_APPOINTMENTS);
      const params = new URLSearchParams({ startDate, endDate });
      if (locationId) params.append("locationId", locationId);
      const response = await fetch(`${url}?${params}`, {
        headers: authHeaders(token),
      });
      return await response.json();
    } catch (error) {
      console.error("Error fetching unpaid appointments report:", error);
      throw error;
    }
  },

  // Customer Origin Report
  getCustomerOrigin: async (startDate, endDate, token) => {
    try {
      const url = getFullUrl(BACKEND_API.REPORTS.CUSTOMER_ORIGIN);
      const response = await fetch(
        `${url}?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: authHeaders(token),
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching customer origin report:", error);
      throw error;
    }
  },

  // Customer Retention Dashboard
  getCustomerRetention: async (startDate, endDate, token) => {
    try {
      const url = getFullUrl(BACKEND_API.REPORTS.CUSTOMER_RETENTION);
      const response = await fetch(
        `${url}?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: authHeaders(token),
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching customer retention report:", error);
      throw error;
    }
  },

  // Enrollment Cancellation Report
  getEnrollmentCancellation: async (startDate, endDate, token) => {
    try {
      const url = getFullUrl(BACKEND_API.REPORTS.ENROLLMENT_CANCELLATION);
      const response = await fetch(
        `${url}?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: authHeaders(token),
        }
      );
      return await response.json();
    } catch (error) {
      console.error("Error fetching enrollment cancellation report:", error);
      throw error;
    }
  },

  // Member Check-in Report
  getMemberCheckIn: async (startDate, endDate, locationId, token) => {
    try {
      const url = getFullUrl(BACKEND_API.REPORTS.MEMBER_CHECK_IN);
      const params = new URLSearchParams({ startDate, endDate });
      if (locationId) params.append("locationId", locationId);
      const response = await fetch(`${url}?${params}`, {
        headers: authHeaders(token),
      });
      return await response.json();
    } catch (error) {
      console.error("Error fetching member check-in report:", error);
      throw error;
    }
  },
};
