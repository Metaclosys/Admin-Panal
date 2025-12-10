"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dayjs from "dayjs";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import BookingHeader from "../../../component/internalDashboard/booking/header/bookingHeader";
import BookingFilters from "../../../component/internalDashboard/booking/filters/BookingFilters";
import { apiCall, API_ENDPOINTS } from "../../../api/apiContent/apiContent";
import { message } from "antd";
import { loadStripe } from "@stripe/stripe-js";

const ROW_HEIGHT = 64;
const DEFAULT_START_HOUR = 8;
const DEFAULT_END_HOUR = 18;
const BOOKING_STATUSES = ["pending", "confirmed", "cancelled", "completed"];
const PREBOOKING_STORAGE_KEY = "prebooking:context";

let stripePromise = null;
const getStripe = () => {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!publishableKey) return null;
  if (!stripePromise) {
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
};

const formatCurrency = (value) => {
  if (typeof value !== "number") return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);
};

const resolveAmount = (...values) => {
  for (const candidate of values) {
    if (candidate === undefined || candidate === null) continue;
    const numeric =
      typeof candidate === "number" ? candidate : Number(candidate);
    if (!Number.isNaN(numeric)) {
      return numeric;
    }
  }
  return 0;
};

const getEmployeeId = (employee) => {
  if (!employee) return null;
  if (typeof employee === "string") return employee;
  return (
    employee._id ||
    employee.id ||
    employee.employeeId ||
    employee.value ||
    null
  );
};

const getEmployeeDisplayName = (employee) => {
  if (!employee) return "Unknown";
  if (employee.displayName) return employee.displayName;
  const composed = [employee.firstName, employee.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();
  if (composed) return composed;
  return employee.email || employee.name || "Unnamed Staff";
};

const normalizeBooking = (booking) => {
  if (!booking) return null;

  const employeeEntity =
    typeof booking.employeeId === "object"
      ? booking.employeeId
      : booking.employee || booking.staff || null;

  const employeeIdentifier =
    typeof booking.employeeId === "string"
      ? booking.employeeId
      : employeeEntity?._id ||
        employeeEntity?.id ||
        employeeEntity?.employeeId ||
        null;

  const employeeName =
    [employeeEntity?.firstName, employeeEntity?.lastName]
      .filter(Boolean)
      .join(" ")
      .trim() ||
    employeeEntity?.name ||
    booking.employeeName ||
    "Unassigned";

  const serviceEntity = booking.serviceId || booking.service || {};
  const customerEntity = booking.customerId || booking.customer || {};
  const locationEntity = booking.locationId || booking.location || {};
  const serviceIdentifier =
    typeof booking.serviceId === "string"
      ? booking.serviceId
      : serviceEntity?._id || serviceEntity?.id || serviceEntity?.serviceId || null;
  const customerIdentifier =
    typeof booking.customerId === "string"
      ? booking.customerId
      : customerEntity?._id ||
        customerEntity?.id ||
        customerEntity?.customerId ||
        null;
  const locationIdentifier =
    typeof booking.locationId === "string"
      ? booking.locationId
      : locationEntity?._id || locationEntity?.id || null;

  const start = booking.startTime || booking.date || booking.start;
  if (!start) return null;

  const end = booking.endTime || booking.end;
  const duration =
    booking.duration ||
    serviceEntity.duration ||
    (end ? dayjs(end).diff(dayjs(start), "minute") : null) ||
    60;
  const normalizedEnd =
    end || dayjs(start).add(duration, "minute").toISOString();

  const clientName =
    [customerEntity.firstName, customerEntity.lastName]
      .filter(Boolean)
      .join(" ")
      .trim() ||
    customerEntity.email ||
    booking.clientName ||
    "Client";

  const totalAmountValue = resolveAmount(
    booking.totalAmount,
    booking.amount,
    booking.price,
    serviceEntity.price
  );
  const priceValue = resolveAmount(
    booking.price,
    serviceEntity.price,
    booking.amount,
    booking.totalAmount
  );
  const amountValue = resolveAmount(
    booking.amount,
    booking.price,
    serviceEntity.price,
    booking.totalAmount
  );

  return {
    id: booking._id || booking.id || booking.bookingId || start,
    serviceId: serviceIdentifier,
    customerId: customerIdentifier,
    locationId: locationIdentifier,
    locationName:
      locationEntity?.name ||
      booking.locationName ||
      booking.location?.name ||
      null,
    employeeId: employeeIdentifier,
    employeeName,
    startTime: start,
    endTime: normalizedEnd,
    duration,
    serviceName:
      serviceEntity.name || booking.title || booking.serviceName || "Service",
    clientName,
    status: booking.status || "pending",
    price: priceValue,
    amount: amountValue,
    totalAmount: totalAmountValue,
  };
};

const getStatusClasses = (status) => {
  const normalized = (status || "").toLowerCase();
  if (normalized === "completed") return "bg-emerald-100 text-emerald-800 border-emerald-200";
  if (normalized === "cancelled") return "bg-rose-100 text-rose-800 border-rose-200";
  return "bg-sky-100 text-sky-900 border-sky-200";
};

const StaffDirectoryPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [view, setView] = useState("week");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [bookingsError, setBookingsError] = useState(null);
  const [draggedBooking, setDraggedBooking] = useState(null);
  const [savingBookingId, setSavingBookingId] = useState(null);
  const columnRefs = useRef(new Map());
  const [statusMenuBooking, setStatusMenuBooking] = useState(null);
  const [statusMenuPosition, setStatusMenuPosition] = useState({ x: 0, y: 0 });
  const statusMenuRef = useRef(null);
  const [detailsBooking, setDetailsBooking] = useState(null);
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [membershipChoice, setMembershipChoice] = useState(null);
  const [focusApplied, setFocusApplied] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const locationId = session?.user?.locationId;
  const locationName = session?.user?.locationName;

  useEffect(() => {
    const fetchEmployees = async () => {
      if (!session?.accessToken) return;
      setLoading(true);
      setError(null);
      try {
        const data = await apiCall(API_ENDPOINTS.EMPLOYEES.BASE, {
          headers: { Authorization: `Bearer ${session.accessToken}` },
        });

        const filtered = Array.isArray(data)
          ? data.filter((emp) => {
              if (!locationId) return true;
              if (emp.locationId && typeof emp.locationId === "string") {
                return emp.locationId === locationId;
              }
              if (emp.location && typeof emp.location === "object") {
                return (
                  emp.location?._id === locationId ||
                  emp.location?.id === locationId
                );
              }
              if (Array.isArray(emp.locations)) {
                return emp.locations.some(
                  (loc) =>
                    loc === locationId ||
                    loc?._id === locationId ||
                    loc?.id === locationId
                );
              }
              return true;
            })
          : [];

        setEmployees(filtered);
      } catch (err) {
        console.error("Failed to load employees", err);
        setError(err?.message || "Unable to load employees");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [session?.accessToken, locationId]);

  const isDayView = view === "day";
  const isWeekView = view === "week";
  const isMonthView = view === "month";

  const registerColumnRef = useCallback((key, node) => {
    if (!node) {
      columnRefs.current.delete(key);
    } else {
      columnRefs.current.set(key, node);
    }
  }, []);

  useEffect(() => {
    if (!statusMenuBooking) return;
    const handleClick = (event) => {
      if (
        statusMenuRef.current &&
        !statusMenuRef.current.contains(event.target)
      ) {
        setStatusMenuBooking(null);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [statusMenuBooking]);

  useEffect(() => {
    if (!detailsBooking || products.length || productsLoading) return;
    let active = true;

    const fetchProducts = async () => {
      try {
        setProductsLoading(true);
        setProductsError(null);
        const data = await apiCall(API_ENDPOINTS.PRODUCTS.BASE);
        if (!active) return;
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!active) return;
        console.error("Failed to load products", err);
        setProductsError(err?.message || "Unable to load products");
      } finally {
        if (active) {
          setProductsLoading(false);
        }
      }
    };

    fetchProducts();
    return () => {
      active = false;
    };
  }, [detailsBooking, products.length, productsLoading]);

  const rangeLabel = useMemo(() => {
    if (view === "day") {
      return selectedDate.format("dddd, MMMM D");
    }
    if (view === "month") {
      return selectedDate.format("MMMM YYYY");
    }
    const start = selectedDate.startOf("week");
    const end = selectedDate.endOf("week");
    return `${start.format("MMM D")} - ${end.format("MMM D")}`;
  }, [selectedDate, view]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!session?.accessToken) return;
      setBookingsLoading(true);
      setBookingsError(null);
      try {
        const params = new URLSearchParams();
        const isValidObjectId = (value) =>
          typeof value === "string" && /^[a-fA-F0-9]{24}$/.test(value);

        if (isValidObjectId(locationId)) {
          params.append("locationId", locationId);
        }

        const viewUnit =
          view === "month" ? "month" : view === "week" ? "week" : "day";
        const startOfRange = selectedDate.startOf(viewUnit).toISOString();
        const endOfRange = selectedDate.endOf(viewUnit).toISOString();
        params.append("startDate", startOfRange);
        params.append("endDate", endOfRange);

        const endpoint =
          params.toString().length > 0
            ? `${API_ENDPOINTS.BOOKINGS.BASE}?${params.toString()}`
            : API_ENDPOINTS.BOOKINGS.BASE;

        const data = await apiCall(endpoint, {
          headers: { Authorization: `Bearer ${session.accessToken}` },
        });

        const normalized = Array.isArray(data)
          ? data
              .map((booking) => normalizeBooking(booking))
              .filter(Boolean)
          : [];

        setBookings(normalized);
      } catch (err) {
        console.error("Failed to load bookings", err);
        setBookings([]);
        setBookingsError(err?.message || "Unable to load bookings");
      } finally {
        setBookingsLoading(false);
      }
    };

    fetchBookings();
  }, [session?.accessToken, selectedDate, view, locationId]);

  useEffect(() => {
    if (!searchParams || focusApplied) return;
    const focusDateParam = searchParams.get("focusDate");
    const focusEmployeeParam = searchParams.get("focusEmployee");
    let applied = false;

    if (focusDateParam) {
      const parsed = dayjs(focusDateParam);
      if (parsed.isValid()) {
        setSelectedDate(parsed);
        setView("day");
        applied = true;
      }
    }

    if (focusEmployeeParam) {
      setSelectedEmployee(focusEmployeeParam);
      applied = true;
    }

    if (applied) {
      setFocusApplied(true);
      router.replace("/internalDashboard/Booking/staff", { scroll: false });
    }
  }, [focusApplied, router, searchParams, setSelectedDate, setView, setSelectedEmployee]);

  const bookingsByEmployee = useMemo(() => {
    const map = new Map();
    bookings.forEach((booking) => {
      const key = booking.employeeId ? String(booking.employeeId) : "unassigned";
      if (!map.has(key)) {
        map.set(key, []);
      }
      map.get(key).push(booking);
    });
    map.forEach((items) =>
      items.sort(
        (a, b) => dayjs(a.startTime).valueOf() - dayjs(b.startTime).valueOf()
      )
    );
    return map;
  }, [bookings]);

  const scheduleEmployees = useMemo(() => {
    const base = employees;
    const seen = new Set(base.map((emp) => String(getEmployeeId(emp))));
    const extras = [];

    bookings.forEach((booking) => {
      if (!booking.employeeId) return;
      const key = String(booking.employeeId);
      if (seen.has(key)) return;
      seen.add(key);
      extras.push({
        _id: key,
        firstName: booking.employeeName,
      });
    });

    const unassigned = bookingsByEmployee.has("unassigned")
      ? [
          {
            _id: "unassigned",
            firstName: "Unassigned",
            lastName: "Bookings",
            isPlaceholder: true,
          },
        ]
      : [];

    return [...base, ...extras, ...unassigned];
  }, [employees, bookings, bookingsByEmployee]);

  const timeScale = useMemo(() => {
    let startHour = DEFAULT_START_HOUR;
    let endHour = DEFAULT_END_HOUR;

    if (bookings.length) {
      bookings.forEach((booking) => {
        const startMoment = dayjs(booking.startTime);
        if (!startMoment.isValid()) return;
        const endMoment = booking.endTime
          ? dayjs(booking.endTime)
          : startMoment.add(booking.duration || 60, "minute");
        startHour = Math.min(startHour, Math.floor(startMoment.hour()));
        const endFloat = endMoment.hour() + endMoment.minute() / 60;
        endHour = Math.max(endHour, Math.ceil(endFloat));
      });
    }

    const labels = [];
    for (let hour = startHour; hour <= endHour; hour += 1) {
      labels.push({
        hour,
        label: dayjs().startOf("day").add(hour, "hour").format("h A"),
      });
    }

    return { labels, startHour };
  }, [bookings]);

  const timelineHeight = timeScale.labels.length * ROW_HEIGHT || ROW_HEIGHT;

  const getOffsetMinutes = (isoString) => {
    const reference = dayjs(isoString);
    if (!reference.isValid()) return 0;
    return (
      (reference.hour() - timeScale.startHour) * 60 + reference.minute()
    );
  };

  const formatRangeLabel = (booking) => {
    const start = dayjs(booking.startTime);
    const endMoment = dayjs(booking.endTime);
    const end = endMoment.isValid()
      ? endMoment
      : start.add(booking.duration || 60, "minute");
    return `${start.format("h:mm A")} - ${end.format("h:mm A")}`;
  };

  const weekDays = useMemo(() => {
    if (!isWeekView) return [];
    const startOfWeek = selectedDate.startOf("week");
    return Array.from({ length: 7 }, (_, index) =>
      startOfWeek.add(index, "day")
    );
  }, [isWeekView, selectedDate]);

  const monthDays = useMemo(() => {
    if (!isMonthView) return [];
    const startOfMonth = selectedDate.startOf("month");
    const totalDays = startOfMonth.daysInMonth();
    return Array.from({ length: totalDays }, (_, index) =>
      startOfMonth.add(index, "day")
    );
  }, [isMonthView, selectedDate]);

  const weeklyCounts = useMemo(() => {
    if (!isWeekView) return new Map();
    const map = new Map();
    bookings.forEach((booking) => {
      const employeeKey = booking.employeeId
        ? String(booking.employeeId)
        : "unassigned";
      const dayKey = dayjs(booking.startTime).isValid()
        ? dayjs(booking.startTime).startOf("day").format("YYYY-MM-DD")
        : null;
      if (!dayKey) return;
      if (!map.has(employeeKey)) {
        map.set(employeeKey, new Map());
      }
      const dayMap = map.get(employeeKey);
      dayMap.set(dayKey, (dayMap.get(dayKey) || 0) + 1);
    });
    return map;
  }, [bookings, isWeekView]);

  const monthlyBookings = useMemo(() => {
    if (!isMonthView) return new Map();
    const map = new Map();
    bookings.forEach((booking) => {
      const employeeKey = booking.employeeId
        ? String(booking.employeeId)
        : "unassigned";
      const dayMoment = dayjs(booking.startTime);
      if (!dayMoment.isValid()) return;
      const dayKey = dayMoment.startOf("day").format("YYYY-MM-DD");
      if (!map.has(employeeKey)) {
        map.set(employeeKey, new Map());
      }
      const dayMap = map.get(employeeKey);
      if (!dayMap.has(dayKey)) {
        dayMap.set(dayKey, []);
      }
      dayMap.get(dayKey).push(booking);
    });
    return map;
  }, [bookings, isMonthView]);

  const productsSubtotal = useMemo(
    () =>
      selectedProducts.reduce(
        (sum, product) => sum + (product.price || 0),
        0
      ),
    [selectedProducts]
  );

  const hasActiveMembership = useMemo(() => {
    if (!detailsBooking?.customerMembershipStatus) return false;
    const status = String(detailsBooking.customerMembershipStatus).toLowerCase();
    return ["active", "current", "enabled"].includes(status);
  }, [detailsBooking?.customerMembershipStatus]);

  const toggleProductSelection = useCallback((product) => {
    if (!product) return;
    const productId = product._id || product.id || product.productId;
    if (!productId) return;
    const productPrice = resolveAmount(
      product.price,
      product.salePrice,
      product.amount
    );
    const productName =
      product.name || product.title || product.productName || "Product";

    setSelectedProducts((current) => {
      const exists = current.find((item) => item.id === productId);
      if (exists) {
        return current.filter((item) => item.id !== productId);
      }
      return [
        ...current,
        {
          id: productId,
          name: productName,
          price: productPrice,
        },
      ];
    });
  }, []);

  const toggleMembershipChoice = useCallback(() => {
    const desiredChoice = hasActiveMembership ? "renew" : "buy";
    setMembershipChoice((current) =>
      current === desiredChoice ? null : desiredChoice
    );
  }, [hasActiveMembership]);

  const handlePreBooking = useCallback(() => {
    if (!detailsBooking) return;
    const payload = {
      bookingId: detailsBooking.id,
      clientName: detailsBooking.clientName,
      customerId: detailsBooking.customerId,
      employeeId: detailsBooking.employeeId,
      employeeName: detailsBooking.employeeName,
      serviceId: detailsBooking.serviceId,
      serviceName: detailsBooking.serviceName,
      totalAmount: detailsBooking.totalAmount,
      amount: detailsBooking.amount,
      price: detailsBooking.price,
      duration: detailsBooking.duration,
      startTime: detailsBooking.startTime,
      locationId: detailsBooking.locationId || locationId,
      locationName: detailsBooking.locationName || locationName,
    };
    try {
      if (typeof window !== "undefined") {
        window.sessionStorage.setItem(
          PREBOOKING_STORAGE_KEY,
          JSON.stringify(payload)
        );
      }
    } catch (err) {
      console.warn("Unable to persist pre-booking payload", err);
    }
    const params = new URLSearchParams();
    if (detailsBooking.id) {
      params.set("bookingId", detailsBooking.id);
    }
    router.push(
      `/internalDashboard/Booking/pre-book${
        params.toString() ? `?${params.toString()}` : ""
      }`
    );
  }, [detailsBooking, locationId, locationName, router]);

  const handleCheckout = useCallback(async () => {
    if (!detailsBooking) return;
    if (typeof window === "undefined") {
      message.error("Checkout is only available in the browser.");
      return;
    }

    const stripeInstancePromise = getStripe();
    if (!stripeInstancePromise) {
      message.error("Stripe publishable key is not configured.");
      return;
    }

    const billableItems = [];
    const serviceAmount = resolveAmount(
      detailsBooking.totalAmount,
      detailsBooking.amount,
      detailsBooking.price
    );

    if (serviceAmount > 0) {
      billableItems.push({
        name: detailsBooking.serviceName || "Service",
        amount: serviceAmount,
        currency: "usd",
        quantity: 1,
        description: `Booking ${detailsBooking.id}`,
      });
    }

    selectedProducts.forEach((product) => {
      if (product.price > 0) {
        billableItems.push({
          name: product.name,
          amount: product.price,
          currency: "usd",
          quantity: 1,
        });
      }
    });

    if (!billableItems.length) {
      message.warning("Add at least one billable item before checking out.");
      return;
    }

    const metadata = {
      bookingId: detailsBooking.id,
      customerId: detailsBooking.customerId,
      employeeId: detailsBooking.employeeId,
      locationId: detailsBooking.locationId || locationId,
      membershipChoice: membershipChoice || "none",
    };

    if (selectedProducts.length) {
      metadata.productIds = selectedProducts.map((product) => product.id).join(",");
    }

    setCheckoutLoading(true);
    try {
      const payload = {
        bookingId: detailsBooking.id,
        employeeId: detailsBooking.employeeId,
        locationId: detailsBooking.locationId || locationId,
        membershipChoice,
        customer: {
          id: detailsBooking.customerId,
          name: detailsBooking.clientName,
        },
        lineItems: billableItems,
        metadata,
        successUrl: `${window.location.origin}/internalDashboard/Booking/staff?checkout=success`,
        cancelUrl: `${window.location.origin}/internalDashboard/Booking/staff?checkout=cancel`,
      };

      const response = await fetch("/api/payments/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => ({}));
        throw new Error(
          errorPayload.error || "Unable to start the checkout session."
        );
      }

      const data = await response.json();
      const stripe = await stripeInstancePromise;

      if (!stripe) {
        throw new Error("Unable to initialize Stripe.");
      }

      const { error } = await stripe.redirectToCheckout({
        sessionId: data.sessionId,
      });

      if (error) {
        throw new Error(error.message || "Stripe redirect failed.");
      }
    } catch (error) {
      console.error("Checkout failed", error);
      message.error(error?.message || "Unable to start checkout.");
    } finally {
      setCheckoutLoading(false);
    }
  }, [
    detailsBooking,
    locationId,
    membershipChoice,
    selectedProducts,
  ]);

  const openStatusMenu = useCallback((event, booking) => {
    event.preventDefault();
    event.stopPropagation();
    const rect = event.currentTarget.getBoundingClientRect();
    const offsetX = rect.left + rect.width / 2;
    const offsetY = rect.top + rect.height + 8;
    const viewportWidth =
      typeof window !== "undefined" ? window.innerWidth : offsetX;
    const clampedX = Math.min(
      Math.max(offsetX, 8),
      viewportWidth - 220
    );
    setStatusMenuPosition({ x: clampedX, y: Math.max(offsetY, 8) });
    setStatusMenuBooking(booking);
  }, []);

  const openDetailsDrawer = useCallback((booking) => {
    if (!booking) return;
    setDetailsBooking(booking);
    setSelectedProducts([]);
    setMembershipChoice(null);
  }, []);

  const closeDetailsDrawer = useCallback(() => {
    setDetailsBooking(null);
    setSelectedProducts([]);
    setMembershipChoice(null);
  }, []);

  const computeDropMoment = useCallback(
    (clientY, employeeKey) => {
      const columnNode = columnRefs.current.get(employeeKey);
      if (!columnNode || !isDayView || !draggedBooking) return null;
      const rect = columnNode.getBoundingClientRect();
      const relativeY = clientY - rect.top;
      const clampedY = Math.min(Math.max(relativeY, 0), rect.height);
      const minutesFromStart = (clampedY / ROW_HEIGHT) * 60;
      const earliestMinutes = timeScale.startHour * 60;
      const availableMinutes = Math.max(
        timeScale.labels.length * 60 - (draggedBooking.duration || 60),
        0
      );
      const clampedMinutes = Math.min(
        Math.max(minutesFromStart, 0),
        availableMinutes
      );
      const snappedMinutes = Math.round(clampedMinutes / 5) * 5;
      const totalMinutes = earliestMinutes + snappedMinutes;
      return dayjs(selectedDate).startOf("day").add(totalMinutes, "minute");
    },
    [draggedBooking, isDayView, selectedDate, timeScale]
  );

  const handleDragStart = useCallback(
    (event, booking) => {
      if (!isDayView) return;
      event.dataTransfer.effectAllowed = "move";
      try {
        event.dataTransfer.setData("text/plain", booking.id);
      } catch {
        // ignore browsers that disallow programmatic setData
      }
      setDraggedBooking(booking);
    },
    [isDayView]
  );

  const handleDragEnd = useCallback(() => {
    setDraggedBooking(null);
  }, []);

  const handleDragOver = useCallback(
    (event) => {
      if (!isDayView || !draggedBooking) return;
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    },
    [draggedBooking, isDayView]
  );

  const persistBookingMove = useCallback(
    async (booking, targetEmployeeKey, startMoment) => {
      const normalizedEmployeeId =
        targetEmployeeKey === "unassigned" ? null : targetEmployeeKey;
      const endMoment = startMoment.add(booking.duration || 60, "minute");
      const originalEmployeeKey = booking.employeeId
        ? String(booking.employeeId)
        : null;
      const timeChanged = !dayjs(booking.startTime).isSame(startMoment);
      const employeeChanged = originalEmployeeKey !== normalizedEmployeeId;

      if (!timeChanged && !employeeChanged) return;

      setSavingBookingId(booking.id);
      try {
        if (timeChanged) {
          await apiCall(API_ENDPOINTS.BOOKINGS.BY_ID(booking.id), {
            method: "PUT",
            body: JSON.stringify({
              startTime: startMoment.toISOString(),
              endTime: endMoment.toISOString(),
            }),
          });
        }

        if (employeeChanged) {
          await apiCall(API_ENDPOINTS.BOOKINGS.BY_ID(booking.id), {
            method: "PUT",
            body: JSON.stringify({
              employeeId: normalizedEmployeeId,
            }),
          });
        }

        const targetEmployee = scheduleEmployees.find((employee) => {
          const key = getEmployeeId(employee) || "unassigned";
          return key === targetEmployeeKey;
        });

        const updatedBooking = {
          ...booking,
          employeeId: normalizedEmployeeId,
          employeeName:
            normalizedEmployeeId === null
              ? "Unassigned"
              : targetEmployee
              ? getEmployeeDisplayName(targetEmployee)
              : booking.employeeName,
          startTime: startMoment.toISOString(),
          endTime: endMoment.toISOString(),
        };

        setBookings((current) =>
          current.map((item) => (item.id === booking.id ? updatedBooking : item))
        );
        if (detailsBooking?.id === booking.id) {
          setDetailsBooking(updatedBooking);
        }
        message.success("Booking updated");
      } catch (err) {
        console.error("Failed to move booking", err);
        message.error(err?.message || "Unable to update booking");
      } finally {
        setSavingBookingId(null);
      }
    },
    [scheduleEmployees, detailsBooking]
  );

  const handleDrop = useCallback(
    (event, employeeKey) => {
      if (!isDayView || !draggedBooking) return;
      event.preventDefault();
      const normalizedKey = employeeKey || "unassigned";
      const newStartMoment = computeDropMoment(event.clientY, normalizedKey);
      const originalKey = draggedBooking.employeeId
        ? String(draggedBooking.employeeId)
        : "unassigned";
      setDraggedBooking(null);
      if (!newStartMoment) return;
      const sameEmployee = originalKey === normalizedKey;
      const sameTime = dayjs(draggedBooking.startTime).isSame(newStartMoment);
      if (sameEmployee && sameTime) return;
      persistBookingMove(draggedBooking, normalizedKey, newStartMoment);
    },
    [computeDropMoment, draggedBooking, isDayView, persistBookingMove]
  );

  const handleStatusUpdate = useCallback(
    async (booking, nextStatus) => {
      if (booking.status === nextStatus) {
        setStatusMenuBooking(null);
        return;
      }
      setSavingBookingId(booking.id);
      try {
        await apiCall(API_ENDPOINTS.BOOKINGS.STATUS(booking.id), {
          method: "PATCH",
          body: JSON.stringify({ status: nextStatus }),
        });
        const updatedBooking = { ...booking, status: nextStatus };
        setBookings((current) =>
          current.map((item) =>
            item.id === booking.id ? updatedBooking : item
          )
        );
        message.success("Status updated");
        setStatusMenuBooking(null);
        if (nextStatus === "completed") {
          openDetailsDrawer(updatedBooking);
        }
      } catch (err) {
        console.error("Failed to update booking status", err);
        message.error(err?.message || "Unable to update status");
      } finally {
        setSavingBookingId(null);
      }
    },
    [openDetailsDrawer]
  );

  return (
    <>
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="p-4 border-b bg-white">
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-600">
            Gents Barber - {locationName || "Loading..."}
          </p>
        </div>

        <BookingHeader
          selectedEmployee={selectedEmployee}
          setSelectedEmployee={setSelectedEmployee}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          view={view}
          setView={setView}
        />
      </div>

      <div className="p-4">
        <BookingFilters
          defaultView="employees"
          onFilterChange={() => {}}
          onViewChange={(value) => {
            if (value === "rooms" || value === "services") {
              router.push("/internalDashboard/Booking/calendar");
            }
          }}
        />

        <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                Staff directory
              </p>
              <h2 className="text-xl font-semibold text-gray-900">
                Employees at this location
              </h2>
              <p className="text-sm text-gray-500">{rangeLabel}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">
                {employees.length} team member{employees.length === 1 ? "" : "s"}
              </p>
              {bookingsLoading ? (
                <p className="text-xs text-slate-400">Loading schedule...</p>
              ) : null}
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {loading && (
              <div className="py-8 text-center text-gray-500">
                Loading team members...
              </div>
            )}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
                {error}
              </div>
            )}
            {bookingsError && !bookingsLoading && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-amber-800">
                {bookingsError}
              </div>
            )}
            {!loading && !error && scheduleEmployees.length === 0 && (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-gray-500">
                No employees are associated with this location yet.
              </div>
            )}
            {!loading && !error && scheduleEmployees.length > 0 && (
              <div className="overflow-x-auto">
                <div className="min-w-full rounded-2xl border border-slate-200 bg-white">
                  {isDayView ? (
                    <div className="flex">
                      <div className="w-24 border-r border-slate-200 bg-slate-50">
                        <div className="h-16 border-b border-slate-200 flex items-center justify-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Time
                        </div>
                        {timeScale.labels.map((slot) => (
                          <div
                            key={slot.hour}
                            className="flex h-[64px] items-center justify-center text-xs text-gray-500 border-b border-slate-100"
                          >
                            {slot.label}
                          </div>
                        ))}
                      </div>
                      <div className="flex-1 overflow-x-auto">
                        <div className="flex min-w-[240px]">
                          {scheduleEmployees.map((employee) => {
                            const employeeKey = getEmployeeId(employee) || "unassigned";
                            const columnBookings =
                              bookingsByEmployee.get(employeeKey) ||
                              (employeeKey === "unassigned"
                                ? bookingsByEmployee.get("unassigned")
                                : []) ||
                              [];
                            return (
                              <div
                                key={employeeKey}
                                className="min-w-[220px] flex-1 border-r border-slate-200 last:border-r-0"
                              >
                                <div className="h-16 border-b border-slate-200 bg-white px-4 py-3">
                                  <p className="text-sm font-semibold text-gray-900">
                                    {employee.isPlaceholder
                                      ? `${employee.firstName} ${employee.lastName || ""}`.trim()
                                      : getEmployeeDisplayName(employee)}
                                  </p>
                                  {employee.email ? (
                                    <p className="text-xs text-gray-500">
                                      {employee.email}
                                    </p>
                                  ) : null}
                                </div>
                                <div
                                  className="relative bg-white"
                                  style={{ height: timelineHeight }}
                                  ref={(node) => registerColumnRef(employeeKey, node)}
                                  onDragOver={handleDragOver}
                                  onDrop={(event) => handleDrop(event, employeeKey)}
                                >
                                  {timeScale.labels.map((slot) => (
                                    <div
                                      key={`${employeeKey}-${slot.hour}`}
                                      className="border-b border-slate-100"
                                      style={{ height: ROW_HEIGHT }}
                                    />
                                  ))}
                                  {columnBookings.map((booking) => {
                                    const minutesFromStart = Math.max(
                                      0,
                                      getOffsetMinutes(booking.startTime)
                                    );
                                    const blockTop =
                                      (minutesFromStart / 60) * ROW_HEIGHT;
                                    const blockHeight = Math.max(
                                      ((booking.duration || 60) / 60) * ROW_HEIGHT,
                                      28
                                    );
                                    return (
                                      <div
                                        key={booking.id}
                                      className={`absolute left-2 right-2 rounded-xl border px-3 py-2 text-xs shadow-sm ${getStatusClasses(
                                        booking.status
                                      )} ${
                                          draggedBooking?.id === booking.id
                                            ? "opacity-60"
                                            : ""
                                        } ${
                                          savingBookingId === booking.id
                                            ? "opacity-50 pointer-events-none"
                                            : ""
                                        }`}
                                      style={{
                                        top: blockTop,
                                        height: blockHeight,
                                      }}
                                      draggable={isDayView && savingBookingId !== booking.id}
                                      onDragStart={(event) =>
                                        handleDragStart(event, booking)
                                      }
                                      onDragEnd={handleDragEnd}
                                      onClick={(event) =>
                                        openStatusMenu(event, booking)
                                      }
                                    >
                                        <p className="font-semibold truncate">
                                          {booking.serviceName}
                                        </p>
                                        <p className="text-[11px] truncate">
                                          {booking.clientName}
                                        </p>
                                        <p className="text-[11px] opacity-80">
                                          {formatRangeLabel(booking)}
                                        </p>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : isWeekView ? (
                    <div className="flex">
                      <div className="w-32 border-r border-slate-200 bg-slate-50">
                        <div className="h-16 border-b border-slate-200 flex items-center justify-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Day
                        </div>
                        {weekDays.map((day) => (
                          <div
                            key={day.format("YYYY-MM-DD")}
                            className="h-[64px] border-b border-slate-100 flex flex-col items-center justify-center text-xs text-gray-600"
                          >
                            <span className="text-sm font-semibold text-gray-900">
                              {day.format("ddd")}
                            </span>
                            <span>{day.format("MMM D")}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex-1 overflow-x-auto">
                        <div className="flex min-w-[240px]">
                          {scheduleEmployees.map((employee) => {
                            const employeeKey = getEmployeeId(employee) || "unassigned";
                            const countMap = weeklyCounts.get(employeeKey) || new Map();
                            return (
                              <div
                                key={`${employeeKey}-week`}
                                className="min-w-[220px] flex-1 border-r border-slate-200 last:border-r-0"
                              >
                                <div className="h-16 border-b border-slate-200 bg-white px-4 py-3">
                                  <p className="text-sm font-semibold text-gray-900">
                                    {employee.isPlaceholder
                                      ? `${employee.firstName} ${employee.lastName || ""}`.trim()
                                      : getEmployeeDisplayName(employee)}
                                  </p>
                                  {employee.email ? (
                                    <p className="text-xs text-gray-500">
                                      {employee.email}
                                    </p>
                                  ) : null}
                                </div>
                                {weekDays.map((day) => {
                                  const dayKey = day.format("YYYY-MM-DD");
                                  const count = countMap.get(dayKey) || 0;
                                  return (
                                    <div
                                      key={`${employeeKey}-${dayKey}`}
                                      className="h-[64px] border-b border-slate-100 flex flex-col items-center justify-center"
                                    >
                                      <span className="text-base font-semibold text-gray-900">
                                        {count}
                                      </span>
                                      <span className="text-xs text-gray-500">
                                        {count === 1 ? "booking" : "bookings"}
                                      </span>
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : isMonthView ? (
                    <div className="flex">
                      <div className="w-32 border-r border-slate-200 bg-slate-50">
                        <div className="h-16 border-b border-slate-200 flex items-center justify-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                          Date
                        </div>
                        {monthDays.map((day) => (
                          <div
                            key={`month-label-${day.format("YYYY-MM-DD")}`}
                            className="h-[72px] border-b border-slate-100 flex flex-col items-center justify-center text-xs text-gray-600"
                          >
                            <span className="text-sm font-semibold text-gray-900">
                              {day.format("ddd")}
                            </span>
                            <span>{day.format("MMM D")}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex-1 overflow-x-auto">
                        <div className="flex min-w-[240px]">
                          {scheduleEmployees.map((employee) => {
                            const employeeKey = getEmployeeId(employee) || "unassigned";
                            const dayMap = monthlyBookings.get(employeeKey) || new Map();
                            return (
                              <div
                                key={`${employeeKey}-month`}
                                className="min-w-[220px] flex-1 border-r border-slate-200 last:border-r-0"
                              >
                                <div className="h-16 border-b border-slate-200 bg-white px-4 py-3">
                                  <p className="text-sm font-semibold text-gray-900">
                                    {employee.isPlaceholder
                                      ? `${employee.firstName} ${employee.lastName || ""}`.trim()
                                      : getEmployeeDisplayName(employee)}
                                  </p>
                                  {employee.email ? (
                                    <p className="text-xs text-gray-500">
                                      {employee.email}
                                    </p>
                                  ) : null}
                                </div>
                                {monthDays.map((day) => {
                                  const dayKey = day.format("YYYY-MM-DD");
                                  const dayBookings = dayMap.get(dayKey) || [];
                                  return (
                                    <div
                                      key={`${employeeKey}-${dayKey}-month`}
                                      className="min-h-[72px] border-b border-slate-100 px-4 py-2"
                                    >
                                      {dayBookings.length ? (
                                        <ul className="space-y-1 text-xs text-gray-700">
                                          {dayBookings.map((booking) => (
                                            <li
                                              key={`${booking.id}-${dayKey}`}
                                              className="rounded-lg border border-slate-100 bg-slate-50 px-2 py-1 cursor-pointer transition hover:border-blue-200 hover:bg-blue-50"
                                              onClick={(event) =>
                                                openStatusMenu(event, booking)
                                              }
                                            >
                                              <p className="font-semibold text-gray-900 truncate">
                                                {booking.serviceName}
                                              </p>
                                              <p className="text-[11px] text-gray-500 truncate">
                                                {dayjs(booking.startTime).format("h:mm A")}  -  {booking.clientName}
                                              </p>
                                            </li>
                                          ))}
                                        </ul>
                                      ) : (
                                        <p className="text-xs text-gray-400 text-center">
                                          No bookings
                                        </p>
                                      )}
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-8 text-center text-sm text-gray-500">
                      Switch to Day, Week, or Month view to see staff schedules.
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
    {statusMenuBooking ? (
      <div className="fixed inset-0 z-50 pointer-events-none">
        <div
          ref={statusMenuRef}
          className="pointer-events-auto w-56 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl"
          style={{
            left: statusMenuPosition.x,
            top: statusMenuPosition.y,
            position: "fixed",
          }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                Update status
              </p>
              <p className="text-sm font-semibold text-gray-900">
                {statusMenuBooking.serviceName}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setStatusMenuBooking(null)}
              className="rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
            >
              <span className="sr-only">Close</span>
              &times;
            </button>
          </div>
          <ul className="mt-3 space-y-2">
            {BOOKING_STATUSES.map((status) => {
              const isActive = statusMenuBooking.status === status;
              return (
                <li key={status}>
                  <button
                    type="button"
                    onClick={() => handleStatusUpdate(statusMenuBooking, status)}
                    disabled={savingBookingId === statusMenuBooking.id}
                    className={`w-full rounded-xl border px-3 py-2 text-sm capitalize transition ${
                      isActive
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-slate-200 text-gray-700 hover:border-blue-200 hover:bg-blue-50"
                    } ${
                      savingBookingId === statusMenuBooking.id
                        ? "opacity-60"
                        : ""
                    }`}
                  >
                    {status}
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="mt-4 border-t border-slate-200 pt-3">
            <button
              type="button"
              onClick={() => {
                setStatusMenuBooking(null);
                openDetailsDrawer(statusMenuBooking);
              }}
              className="w-full rounded-xl bg-slate-900 px-3 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-slate-800"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    ) : null}

    <div
      className={`fixed inset-y-0 right-0 z-40 w-full max-w-md transform bg-white shadow-2xl transition-transform duration-300 ${detailsBooking ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
              Booking details
            </p>
            <p className="text-lg font-semibold text-gray-900">
              {detailsBooking?.serviceName || "Select a booking"}
            </p>
          </div>
          <button
            type="button"
            onClick={closeDetailsDrawer}
            className="rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <span className="sr-only">Close panel</span>
            &times;
          </button>
        </div>
        {detailsBooking ? (
          <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
            <section>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                Client
              </p>
              <p className="mt-1 text-base font-semibold text-gray-900">
                {detailsBooking.clientName || "N/A"}
              </p>
            </section>
            <section>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                Specialist
              </p>
              <p className="mt-1 text-base text-gray-900">
                {detailsBooking.employeeName || "Unassigned"}
              </p>
            </section>
            <section>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                Appointment
              </p>
              <p className="mt-1 text-base font-semibold text-gray-900">
                {dayjs(detailsBooking.startTime).format("dddd, MMM D")}
              </p>
              <p className="text-sm text-gray-600">
                {dayjs(detailsBooking.startTime).format("h:mm A")} -{" "}
                {dayjs(detailsBooking.endTime).format("h:mm A")}
              </p>
              <p className="text-sm text-gray-500">
                Status:{" "}
                <span className="font-medium capitalize">
                  {detailsBooking.status}
                </span>
              </p>
            </section>
            {detailsBooking.guestCount ||
            detailsBooking.partySize ||
            detailsBooking.guests ? (
              <section>
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                  Guests
                </p>
                <p className="mt-1 text-base text-gray-900">
                  {detailsBooking.guestCount ??
                    detailsBooking.partySize ??
                    detailsBooking.guests}
                </p>
              </section>
            ) : null}
            <section>
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                Total
              </p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">
                {formatCurrency(
                  detailsBooking.totalAmount ??
                    detailsBooking.amount ??
                    detailsBooking.price ??
                    0
                )}
              </p>
            </section>

            <section className="rounded-2xl border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                    Products
                  </p>
                  <p className="text-sm text-gray-600">
                    Add retail items to this ticket.
                  </p>
                </div>
                {selectedProducts.length ? (
                  <span className="text-sm font-semibold text-blue-600">
                    {formatCurrency(productsSubtotal)}
                  </span>
                ) : null}
              </div>
              {productsLoading ? (
                <div className="mt-4 text-center text-sm text-gray-500">
                  Loading products...
                </div>
              ) : productsError ? (
                <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-700">
                  {productsError}
                </div>
              ) : products.length ? (
                <div className="mt-3 flex gap-3 overflow-x-auto pb-2">
                  {products.map((product) => {
                    const productId = product._id || product.id || product.productId;
                    if (!productId) return null;
                    const isSelected = selectedProducts.some(
                      (item) => item.id === productId
                    );
                    return (
                      <button
                        type="button"
                        key={productId}
                        onClick={() => toggleProductSelection(product)}
                        className={`min-w-[140px] rounded-2xl border px-4 py-3 text-left text-sm transition ${
                          isSelected
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-slate-200 text-gray-700 hover:border-blue-200 hover:bg-blue-50"
                        }`}
                      >
                        <p className="font-semibold truncate">
                          {product.name || product.title || "Product"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatCurrency(
                            resolveAmount(
                              product.price,
                              product.salePrice,
                              product.amount
                            )
                          )}
                        </p>
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="mt-4 text-xs text-gray-500">
                  No products available to suggest right now.
                </p>
              )}
              <p className="mt-2 text-xs text-gray-500">
                {selectedProducts.length
                  ? `Added ${selectedProducts.length} product${
                      selectedProducts.length === 1 ? "" : "s"
                    } to checkout.`
                  : "No products selected yet."}
              </p>
            </section>

            <section className="rounded-2xl border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                    Membership
                  </p>
                  <p className="text-sm text-gray-600">
                    {hasActiveMembership
                      ? "Customer already has a membership. Offer to renew."
                      : "Customer is not a member yet. Invite them to join."}
                  </p>
                </div>
                {membershipChoice ? (
                  <span className="text-xs font-semibold uppercase text-blue-600">
                    {membershipChoice === "renew" ? "Renew selected" : "Add to ticket"}
                  </span>
                ) : null}
              </div>
              <button
                type="button"
                onClick={toggleMembershipChoice}
                className={`mt-4 w-full rounded-2xl border px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] transition ${
                  membershipChoice
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-slate-200 text-gray-700 hover:border-blue-200 hover:bg-blue-50"
                }`}
              >
                {hasActiveMembership ? "Renew membership" : "Add membership"}
              </button>
              {membershipChoice ? (
                <p className="mt-2 text-xs text-blue-600">
                  {membershipChoice === "renew"
                    ? "Renewal will be added during checkout."
                    : "Membership sale will be added during checkout."}
                </p>
              ) : null}
            </section>
          </div>
        ) : (
          <div className="flex flex-1 items-center justify-center px-6 text-sm text-gray-500">
            Select a booking to see details.
          </div>
        )}
        <div className="border-t border-slate-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              disabled={!detailsBooking}
              onClick={handlePreBooking}
              className="flex-1 rounded-2xl border border-slate-300 px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-gray-700 transition hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              
              Pre Booking
            </button>
            <button
              type="button"
              disabled={!detailsBooking}
              className="flex-1 rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
              onClick={handleCheckout}
            >
              {checkoutLoading ? "Redirecting..." : "Check out"}
            </button>
          </div>
        </div>
      </div>
    </div>
    {detailsBooking ? (
      <button
        type="button"
        className="fixed inset-0 z-30 bg-black/30"
        onClick={closeDetailsDrawer}
      >
        <span className="sr-only">Close details overlay</span>
      </button>
    ) : null}

    </>
  );
};

export default StaffDirectoryPage;
