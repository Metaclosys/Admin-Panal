const resolveBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_BACKEND_BASE_URL) {
    return process.env.NEXT_PUBLIC_BACKEND_BASE_URL;
  }
  if (process.env.BACKEND_BASE_URL) {
    return process.env.BACKEND_BASE_URL;
  }
  if (process.env.API_BASE_URL_PRO) {
    return process.env.API_BASE_URL_PRO;
  }
  if (process.env.API_BASE_URL_DEV) {
    return process.env.API_BASE_URL_DEV;
  }
  return "http://localhost:3001";
};

export const BACKEND_BASE_URL = resolveBaseUrl();

export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    PROFILE: "/auth/profile",
  },
  BOOKINGS: {
    BASE: "/bookings",
    BY_ID: (id) => `/bookings/${id}`,
    STATUS: (id) => `/bookings/${id}/status`,
    CUSTOMER_UPCOMING: (customerId) =>
      `/bookings/customer/${customerId}/upcoming`,
    CANCEL: (id) => `/bookings/${id}/cancel`,
    RESCHEDULE: (id) => `/bookings/${id}/reschedule`,
    AVAILABILITY: "/bookings/availability",
    BY_ROOM: (roomId) => `/bookings?roomId=${roomId}`,
    BY_SERVICE: (serviceId) => `/bookings?serviceId=${serviceId}`,
  },
  LOCATIONS: {
    BASE: "/locations",
    BY_ID: (id) => `/locations/${id}`,
  },
  CUSTOMERS: {
    BASE: "/customers",
    BY_ID: (id) => `/customers/${id}`,
    SEARCH: "/customers/search",
    SUGGESTIONS: "/customers/suggestions",
    NOTES: (customerId) => `/customers/${customerId}/notes`,
    NOTE_BY_ID: (customerId, noteId) =>
      `/customers/${customerId}/notes/${noteId}`,
  },
  ROOMS: {
    BASE: "/rooms",
    BY_ID: (id) => `/rooms/${id}`,
  },
  EQUIPMENT: {
    BASE: "/equipment",
    BY_ID: (id) => `/equipment/${id}`,
  },
  EMPLOYEES: {
    BASE: "/employees",
    BY_ID: (id) => `/employees/${id}`,
    SCHEDULE: (id) => `/employees/${id}/schedule`,
    PAYROLL: (id) => `/employees/${id}/payroll`,
    PROFILE: "/employees/profile",
  },
  SERVICES: {
    BASE: "/services",
    BY_ID: (id) => `/services/${id}`,
    BY_SHOP: (shopId, active = true) =>
      `/services?shopId=${shopId}${active ? "" : "&active=false"}`,
  },
  SERVICE_ASSIGNMENTS: {
    BASE: "/service-assignments",
    BY_ID: (id) => `/service-assignments/${id}`,
    BY_LOCATION: (locationId, includeInactive = false) =>
      `/service-assignments/location/${locationId}${
        includeInactive ? "?includeInactive=true" : ""
      }`,
  },
  SERVICE_CATEGORIES: {
    BASE: "/service-categories",
    BY_ID: (id) => `/service-categories/${id}`,
    SUBCATEGORIES: (id) => `/service-categories/${id}/subcategories`,
    SUBCATEGORY_BY_ID: (categoryId, subcategoryId) =>
      `/service-categories/${categoryId}/subcategories/${subcategoryId}`,
  },
  PACKAGES: {
    BASE: "/packages",
    BY_ID: (id) => `/packages/${id}`,
  },
  MEMBERSHIP_PLANS: {
    BASE: "/membership-plans",
    BY_ID: (id) => `/membership-plans/${id}`,
    BY_LOCATION: (locationId) => `/membership-plans/location/${locationId}`,
    SETTINGS: {
      BASE: "/membership-plans/settings",
      BY_LOCATION: (locationId) => `/membership-plans/settings/${locationId}`,
    },
  },
  DOCUMENTS: {
    BASE: "/documents",
    BY_ID: (id) => `/documents/${id}`,
    DOWNLOAD: (id) => `/documents/${id}/download`,
    DEACTIVATE: (id) => `/documents/${id}/deactivate`,
  },
  USERS: {
    BASE: "/users",
    BY_ID: (id) => `/users/${id}`,
  },
  GIFT_CERTIFICATES: {
    BASE: "/gift-certificates",
    BY_ID: (id) => `/gift-certificates/${id}`,
    UPDATE_BALANCE: (id) => `/gift-certificates/${id}/balance`,
    UPDATE_EXPIRY: (id) => `/gift-certificates/${id}/expiry`,
    EMAIL: (id) => `/gift-certificates/${id}/email`,
    HISTORY: (id) => `/gift-certificates/${id}/history`,
  },
  REPORTS: {
    BASE: "/reports",
    MEMBERSHIP_CONVERSION: "/reports/membership-conversion",
    ORDERS_BY_LOGIN: "/reports/orders-by-login",
    RESERVATIONS_BY_LOCATION: "/reports/reservations-by-location",
    SALES_BY_DAY: "/reports/sales-by-day",
    TRANSACTIONS: "/reports/transactions",
    GIFT_CERTIFICATE_REDEMPTION: "/reports/gift-certificate-redemption",
    GIFT_CERTIFICATE_USAGE: "/reports/gift-certificate-usage",
    INVENTORY_OVERRIDE: "/reports/inventory-override",
    LIABILITIES: "/reports/liabilities",
    BOOKINGS_BY_LOGIN: "/reports/bookings-by-login",
    CLASS_ATTENDANCE: "/reports/class-attendance",
    REFERRALS_BY_REVENUE: "/reports/referrals/revenue",
    REFERRALS_BY_DATE: "/reports/referrals/date",
    REFERRALS_BY_CODE: "/reports/referrals/code",
    USER_LOGIN_HISTORY: "/reports/user-login-history",
    SPECIAL_CODE_USAGE: "/reports/special-code-usage",
    APPOINTMENT_BOOKINGS_BY_LOGIN: "/reports/appointment-bookings-by-login",
    CUSTOMER_RETENTION: "/reports/customer-retention",
    CUSTOMER_RETENTION_EXPORT: "/reports/customer-retention/export",
  },
  PRODUCTS: {
    BASE: "/products",
    BY_ID: (id) => `/products/${id}`,
    CATEGORIES: "/products/categories/list",
    SUBCATEGORIES: (category) => `/products/subcategories/${category}`,
    STOCK: (id) => `/products/${id}/stock`,
    BRANDS: "/products/brands/list",
    LOW_STOCK: "/products/inventory/low-stock",
  },
};

const parseResponseBody = async (response, { suppressErrorLog = false } = {}) => {
  const contentType = response.headers.get("content-type") || "";
  const isJson = contentType.includes("application/json");
  const isEmptyStatus = response.status === 204 || response.status === 205;

  // 204 / 205 – no content
  if (isEmptyStatus) {
    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }
    return undefined;
  }

  const rawBody = await response.text();

  // If body is empty
  if (!rawBody) {
    if (!response.ok) {
      throw new Error(`API call failed with status ${response.status}`);
    }
    return undefined;
  }

  // Handle error responses
  if (!response.ok) {
    let errorMessage = `API call failed with status ${response.status}`;

    if (isJson) {
      try {
        const errorPayload = JSON.parse(rawBody);
        if (typeof errorPayload?.message === "string") {
          errorMessage = errorPayload.message.trim() || errorMessage;
        }
      } catch {
        // If JSON parsing fails, fall back to raw body
        errorMessage = rawBody;
      }
    } else {
      errorMessage = rawBody;
    }

    if (!suppressErrorLog) {
      console.error(
        "API error response:",
        response.status,
        response.url,
        rawBody
      );
    }

    throw new Error(errorMessage);
  }

  // Successful responses
  if (isJson) {
    try {
      return JSON.parse(rawBody);
    } catch {
      throw new Error("Failed to parse JSON response");
    }
  }

  return rawBody;
};

export const apiCall = async (endpoint, options = {}) => {
  const { accessToken, headers = {}, suppressErrorLog = false, ...rest } = options;
  const mergedHeaders = {
    "Content-Type": "application/json",
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    ...headers,
  };

  let response;
  try {
    response = await fetch(`${BACKEND_BASE_URL}${endpoint}`, {
      ...rest,
      headers: mergedHeaders,
    });
  } catch (error) {
    console.error("Network request failed:", endpoint, error);
    throw new Error(
      "Unable to reach the backend service. Please verify the API server is running."
    );
  }

  return parseResponseBody(response, { suppressErrorLog });
};

export const apiDownload = async (endpoint, options = {}) => {
  const { accessToken, headers = {}, suppressErrorLog = false, ...rest } = options;
  const mergedHeaders = {
    "Content-Type": "application/json",
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    ...headers,
  };

  let response;
  try {
    response = await fetch(`${BACKEND_BASE_URL}${endpoint}`, {
      ...rest,
      headers: mergedHeaders,
    });
  } catch (error) {
    console.error("Network download request failed:", endpoint, error);
    throw new Error(
      "Unable to reach the backend service. Please verify the API server is running."
    );
  }

  if (!response.ok) {
    let errorMessage = "Download failed";
    try {
      const error = await response.json();
      if (error?.message) {
        errorMessage = error.message;
      }
    } catch {
      // ignore JSON parsing errors and keep default message
    }
    if (!suppressErrorLog) {
      console.error("API download error response:", endpoint, errorMessage);
    }
    throw new Error(errorMessage);
  }

  return response.blob();
};
