"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { apiCall, API_ENDPOINTS } from "../../../api/apiContent/apiContent";

const PREBOOKING_STORAGE_KEY = "prebooking:context";

const ensureId = (entity) =>
  entity?._id || entity?.id || entity?.value || entity?.employeeId || null;

const PreBookingPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: session } = useSession();
  const [context, setContext] = useState(null);
  const [services, setServices] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [employeesLoading, setEmployeesLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [locationsLoading, setLocationsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    dayjs().add(4, "week").format("YYYY-MM-DD")
  );
  const [selectedTime, setSelectedTime] = useState("10:00");
  const [selectedServiceId, setSelectedServiceId] = useState("");
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [selectedLocationId, setSelectedLocationId] = useState("");
  const [notes, setNotes] = useState("");
  const [notifyClient, setNotifyClient] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [banner, setBanner] = useState(null);

  const employeesLocationId = context?.locationId || session?.user?.locationId || null;
  const derivedLocationId =
    selectedLocationId ||
    context?.locationId ||
    session?.user?.locationId ||
    "";

  const showBanner = useCallback((type, text) => {
    setBanner({ type, text });
  }, []);

  useEffect(() => {
    let storedContext = null;
    if (typeof window !== "undefined") {
      const raw = window.sessionStorage.getItem(PREBOOKING_STORAGE_KEY);
      if (raw) {
        try {
          storedContext = JSON.parse(raw);
        } catch (error) {
          console.warn("Failed to parse stored pre-booking payload", error);
        }
      }
    }
    const bookingId = searchParams.get("bookingId");
    if (storedContext && (!bookingId || storedContext.bookingId === bookingId)) {
      setContext(storedContext);
      if (storedContext.startTime) {
        const recommended = dayjs(storedContext.startTime).add(4, "week");
        setSelectedDate(recommended.format("YYYY-MM-DD"));
        setSelectedTime(dayjs(storedContext.startTime).format("HH:mm"));
      }
      if (storedContext.serviceId) {
        setSelectedServiceId(storedContext.serviceId);
      }
      if (storedContext.employeeId) {
        setSelectedEmployeeId(storedContext.employeeId);
      }
    } else {
      setContext(null);
    }
  }, [searchParams]);

  useEffect(() => {
    let isMounted = true;
    const fetchServices = async () => {
      if (!session?.accessToken) return;
      setServicesLoading(true);
      try {
        const endpoint = employeesLocationId
          ? API_ENDPOINTS.SERVICES.BY_SHOP(employeesLocationId)
          : API_ENDPOINTS.SERVICES.BASE;
        const data = await apiCall(endpoint, {
          headers: { Authorization: `Bearer ${session.accessToken}` },
        });
        if (!isMounted) return;
        setServices(Array.isArray(data) ? data : []);
      } catch (error) {
        if (isMounted) {
          console.error("Failed to fetch services", error);
          showBanner("error", error?.message || "Unable to load services");
        }
      } finally {
        if (isMounted) {
          setServicesLoading(false);
        }
      }
    };

    fetchServices();
    return () => {
      isMounted = false;
    };
  }, [session?.accessToken, employeesLocationId, showBanner]);

  useEffect(() => {
    let isMounted = true;
    const fetchEmployees = async () => {
      if (!session?.accessToken) return;
      setEmployeesLoading(true);
      try {
        const data = await apiCall(API_ENDPOINTS.EMPLOYEES.BASE, {
          headers: { Authorization: `Bearer ${session.accessToken}` },
        });
        if (!isMounted) return;
        const filtered = Array.isArray(data)
          ? data.filter((emp) => {
              if (!employeesLocationId) return true;
              if (emp.locationId && typeof emp.locationId === "string") {
                return emp.locationId === employeesLocationId;
              }
              if (emp.location && typeof emp.location === "object") {
                return (
                  emp.location?._id === employeesLocationId ||
                  emp.location?.id === employeesLocationId
                );
              }
              if (Array.isArray(emp.locations)) {
                return emp.locations.some(
                  (loc) =>
                    loc === employeesLocationId ||
                    loc?._id === employeesLocationId ||
                    loc?.id === employeesLocationId
                );
              }
              return true;
            })
          : [];
        setEmployees(filtered);
      } catch (error) {
        if (isMounted) {
          console.error("Failed to fetch employees", error);
          showBanner("error", error?.message || "Unable to load employees");
        }
      } finally {
        if (isMounted) {
          setEmployeesLoading(false);
        }
      }
    };

    fetchEmployees();
    return () => {
      isMounted = false;
    };
  }, [session?.accessToken, employeesLocationId, showBanner]);

  useEffect(() => {
    let isMounted = true;
    const fetchLocations = async () => {
      if (!session?.accessToken) return;
      setLocationsLoading(true);
      try {
        const data = await apiCall(API_ENDPOINTS.LOCATIONS.BASE, {
          headers: { Authorization: `Bearer ${session.accessToken}` },
        });
        if (!isMounted) return;
        setLocations(Array.isArray(data) ? data : []);
        if (!selectedLocationId) {
          const prefilled =
            context?.locationId || session?.user?.locationId || "";
          if (prefilled) {
            setSelectedLocationId(prefilled);
          } else if (Array.isArray(data) && data.length) {
            const first = data[0]._id || data[0].id || data[0].locationId;
            if (first) {
              setSelectedLocationId(String(first));
            }
          }
        }
      } catch (error) {
        if (isMounted) {
          console.error("Failed to load locations", error);
          showBanner("error", error?.message || "Unable to load locations");
        }
      } finally {
        if (isMounted) setLocationsLoading(false);
      }
    };
    fetchLocations();
    return () => {
      isMounted = false;
    };
  }, [
    context?.locationId,
    selectedLocationId,
    session?.accessToken,
    session?.user?.locationId,
    showBanner,
  ]);

  const serviceOptions = useMemo(() => {
    if (!context?.serviceId) return services;
    const exists = services.some((service) => ensureId(service) === context.serviceId);
    return exists
      ? services
      : [
          ...services,
          {
            _id: context.serviceId,
            name: context.serviceName,
            duration: context.duration,
            price: context.totalAmount || context.amount || context.price || 0,
          },
        ];
  }, [context, services]);

  const employeeOptions = useMemo(() => {
    if (!context?.employeeId) return employees;
    const exists = employees.some(
      (employee) => ensureId(employee) === context.employeeId
    );
    return exists
      ? employees
      : [
          ...employees,
          {
            _id: context.employeeId,
            firstName: context.employeeName,
          },
        ];
  }, [context, employees]);

  useEffect(() => {
    if (!selectedServiceId && serviceOptions.length) {
      const fallback = ensureId(serviceOptions[0]);
      if (fallback) {
        setSelectedServiceId(fallback);
      }
    }
  }, [selectedServiceId, serviceOptions]);

  useEffect(() => {
    if (!selectedEmployeeId && employeeOptions.length) {
      const fallback = ensureId(employeeOptions[0]);
      if (fallback) {
        setSelectedEmployeeId(fallback);
      }
    }
  }, [selectedEmployeeId, employeeOptions]);

  const selectedService = useMemo(
    () =>
      serviceOptions.find((service) => ensureId(service) === selectedServiceId),
    [serviceOptions, selectedServiceId]
  );

  const selectedEmployee = useMemo(
    () =>
      employeeOptions.find(
        (employee) => ensureId(employee) === selectedEmployeeId
      ),
    [employeeOptions, selectedEmployeeId]
  );

  const estimatedDuration =
    selectedService?.duration || context?.duration || 60;
  const estimatedPrice = Number(
    selectedService?.price ||
      selectedService?.amount ||
      context?.totalAmount ||
      context?.amount ||
      0
  );

  const composedStart = useMemo(() => {
    return dayjs(`${selectedDate}T${selectedTime}`);
  }, [selectedDate, selectedTime]);

  const composedEnd = useMemo(() => {
    return composedStart.add(estimatedDuration, "minute");
  }, [composedStart, estimatedDuration]);

  const canSubmit =
    !!context?.customerId &&
    !!selectedServiceId &&
    !!selectedEmployeeId &&
    !!derivedLocationId &&
    composedStart.isValid();

  const handleSubmit = useCallback(async () => {
    setBanner(null);
    if (!canSubmit) {
      showBanner("error", "Please complete all required selections.");
      return;
    }
    if (!derivedLocationId) {
      showBanner("error", "Location is required to create a booking.");
      return;
    }
    const payload = {
      bookingNumber: `PRE-${Date.now()}`,
      customerId: context.customerId,
      serviceId: selectedServiceId,
      employeeId: selectedEmployeeId,
      startTime: composedStart.toISOString(),
      endTime: composedEnd.toISOString(),
      amount: estimatedPrice,
      locationId: derivedLocationId,
      status: "pending",
      notes: notes
        ? {
            customerNotes: notifyClient ? notes : undefined,
            internalNotes: notifyClient ? undefined : notes,
          }
        : undefined,
    };

    setSubmitting(true);
    try {
      const headers = session?.accessToken
        ? { Authorization: `Bearer ${session.accessToken}` }
        : undefined;
      await apiCall(API_ENDPOINTS.BOOKINGS.BASE, {
        method: "POST",
        headers,
        body: JSON.stringify(payload),
      });
      showBanner("success", "Next appointment created");
      try {
        if (typeof window !== "undefined") {
          window.sessionStorage.removeItem(PREBOOKING_STORAGE_KEY);
        }
      } catch {
        // ignore storage cleanup issues
      }
      const focusParams = new URLSearchParams();
      focusParams.set("focusDate", composedStart.toISOString());
      if (selectedEmployeeId) {
        focusParams.set("focusEmployee", selectedEmployeeId);
      }
      router.push(
        `/internalDashboard/Booking/staff?${focusParams.toString()}`
      );
    } catch (error) {
      console.error("Failed to create pre-booking", error);
      showBanner("error", error?.message || "Unable to create booking");
    } finally {
      setSubmitting(false);
    }
  }, [
    canSubmit,
    composedEnd,
    composedStart,
    context?.customerId,
    estimatedPrice,
    derivedLocationId,
    notifyClient,
    notes,
    router,
    selectedEmployeeId,
    selectedServiceId,
    session?.accessToken,
  ]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
              Pre-book next visit
            </p>
            <h1 className="text-2xl font-semibold text-slate-900">
              {context?.clientName
                ? `Schedule ${context.clientName}'s next appointment`
                : "Schedule the next appointment"}
            </h1>
            <p className="text-sm text-gray-500">
              {context?.serviceName
                ? `Last service: ${context.serviceName}`
                : "Select a service and provider to continue."}
            </p>
          </div>
          <button
            type="button"
            onClick={() => router.push("/internalDashboard/Booking/staff")}
            className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-gray-600 transition hover:border-slate-300 hover:text-gray-900"
          >
            Back to schedule
          </button>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-6xl gap-6 px-6 py-8 lg:grid-cols-[2fr,1fr]">
        {banner ? (
          <div
            className={`lg:col-span-2 rounded-2xl border px-4 py-3 text-sm ${
              banner.type === "error"
                ? "border-rose-200 bg-rose-50 text-rose-800"
                : "border-emerald-200 bg-emerald-50 text-emerald-700"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <p>{banner.text}</p>
              <button
                type="button"
                onClick={() => setBanner(null)}
                className="text-xs uppercase tracking-[0.3em] text-gray-400 hover:text-gray-600"
              >
                Close
              </button>
            </div>
          </div>
        ) : null}
        <div className="space-y-6">
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <header className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                  Choose date & time
                </p>
                <h2 className="text-lg font-semibold text-slate-900">
                  When is the client coming back?
                </h2>
              </div>
            </header>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                Preferred date
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(event) => setSelectedDate(event.target.value)}
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-base text-gray-900 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                Preferred time
                <input
                  type="time"
                  value={selectedTime}
                  onChange={(event) => setSelectedTime(event.target.value)}
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-base text-gray-900 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </label>
            </div>
            <div className="mt-4">
              <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                Location
                <select
                  value={selectedLocationId}
                  onChange={(event) => setSelectedLocationId(event.target.value)}
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-base text-gray-900 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  disabled={locationsLoading}
                >
                  <option value="">Select location</option>
                  {locations.map((location) => {
                    const id =
                      location._id || location.id || location.locationId;
                    if (!id) return null;
                    return (
                      <option key={id} value={id}>
                        {location.name || location.displayName || "Location"}
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>
            <p className="mt-4 text-xs text-gray-500">
              We try to match this slot with the selected provider. Conflicts
              will be checked when saving.
            </p>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <header className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                  Service & provider
                </p>
                <h2 className="text-lg font-semibold text-slate-900">
                  What are we booking?
                </h2>
              </div>
            </header>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                Service
                <select
                  value={selectedServiceId}
                  onChange={(event) => setSelectedServiceId(event.target.value)}
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-base text-gray-900 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select service</option>
                  {serviceOptions.map((service) => {
                    const id = ensureId(service);
                    if (!id) return null;
                    return (
                      <option key={id} value={id}>
                        {service.name || service.title || "Service"}
                      </option>
                    );
                  })}
                </select>
              </label>
              <label className="flex flex-col gap-2 text-sm font-medium text-gray-700">
                Preferred provider
                <select
                  value={selectedEmployeeId}
                  onChange={(event) =>
                    setSelectedEmployeeId(event.target.value)
                  }
                  className="rounded-2xl border border-slate-200 px-4 py-3 text-base text-gray-900 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select employee</option>
                  {employeeOptions.map((employee) => {
                    const id = ensureId(employee);
                    if (!id) return null;
                    const displayName = employee.displayName
                      ? employee.displayName
                      : [employee.firstName, employee.lastName]
                          .filter(Boolean)
                          .join(" ") || employee.email || "Team member";
                    return (
                      <option key={id} value={id}>
                        {displayName}
                      </option>
                    );
                  })}
                </select>
              </label>
            </div>
            <div className="mt-4 rounded-2xl bg-slate-50 p-4 text-sm text-gray-600">
              <p className="font-semibold text-gray-900">Heads up</p>
              <p>
                Duration will default to {estimatedDuration} minutes and price to{" "}
                {estimatedPrice > 0 ? `$${estimatedPrice.toFixed(2)}` : "$0.00"}.
                Adjustments can be made later in the appointment.
              </p>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <header className="mb-4">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                Notes & reminders
              </p>
              <h2 className="text-lg font-semibold text-slate-900">
                Anything we should remember?
              </h2>
            </header>
            <textarea
              rows={4}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              placeholder="Add reminder notes, retail suggestions, or follow-up instructions."
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm text-gray-900 shadow-sm focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-100"
            />
            <label className="mt-4 flex items-center gap-3 text-sm text-gray-700">
              <input
                type="checkbox"
                checked={notifyClient}
                onChange={(event) => setNotifyClient(event.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              Send this note to the client as part of their confirmation
            </label>
          </section>
        </div>

        <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-lg">
          <div className="space-y-4">
              <div className="rounded-2xl bg-slate-50 p-4 text-sm text-gray-600">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                  Client
                </p>
                <p className="mt-1 text-lg font-semibold text-slate-900">
                  {context?.clientName || "Select a booking"}
                </p>
                <p className="text-xs text-gray-500">
                  Booking #{context?.bookingId || "N/A"}
                </p>
                {context?.locationName ? (
                  <p className="text-xs text-gray-500">
                    Location: {context.locationName}
                  </p>
                ) : selectedLocationId ? (
                  <p className="text-xs text-gray-500">
                    Location:{" "}
                    {
                      locations.find((loc) => {
                        const id =
                          loc._id || loc.id || loc.locationId;
                        return String(id) === String(selectedLocationId);
                      })?.name
                    }
                  </p>
                ) : null}
              </div>
            <div className="rounded-2xl border border-dashed border-slate-300 p-4 text-sm text-gray-700">
              <p className="text-xs uppercase tracking-[0.3em] text-gray-400">
                Summary
              </p>
              <ul className="mt-2 space-y-2 text-sm">
                <li>
                  <span className="text-gray-500">Service:</span>{" "}
                  <span className="font-medium text-gray-900">
                    {selectedService?.name ||
                      selectedService?.title ||
                      context?.serviceName ||
                      "Pending selection"}
                  </span>
                </li>
                <li>
                  <span className="text-gray-500">Provider:</span>{" "}
                  <span className="font-medium text-gray-900">
                    {selectedEmployee
                      ? [selectedEmployee.firstName, selectedEmployee.lastName]
                          .filter(Boolean)
                          .join(" ") || selectedEmployee.email
                      : context?.employeeName || "Pending selection"}
                  </span>
                </li>
                <li>
                  <span className="text-gray-500">Scheduled:</span>{" "}
                  <span className="font-medium text-gray-900">
                    {composedStart.isValid()
                      ? composedStart.format("dddd, MMM D [at] h:mm A")
                      : "Select date & time"}
                  </span>
                </li>
                <li>
                  <span className="text-gray-500">Estimated total:</span>{" "}
                  <span className="font-semibold text-gray-900">
                    {estimatedPrice > 0
                      ? `$${estimatedPrice.toFixed(2)}`
                      : "To be calculated"}
                  </span>
                </li>
              </ul>
            </div>
            <button
              type="button"
              disabled={!canSubmit || submitting || servicesLoading || employeesLoading}
              onClick={handleSubmit}
              className="w-full rounded-2xl bg-blue-600 px-4 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Saving..." : "Confirm pre-booking"}
            </button>
            <button
              type="button"
              onClick={() => router.push("/internalDashboard/Booking/staff")}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm font-medium text-gray-600 transition hover:border-slate-300 hover:text-gray-900"
            >
              Cancel
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PreBookingPage;
