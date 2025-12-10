"use client";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";

function Options() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("Accounting");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { name: "Accounting", id: 1 },
    { name: "Marketing", id: 2 },
    { name: "Administration", id: 3 },
    { name: "ByLocation", id: 4 },
  ];

  const reports = {
    Accounting: [
      {
        id: 1,
        name: "Appointment Bookings by Login",
        url: "appointment_booking_by_login",
      },
      {
        id: 2,
        name: "Class Attendance Report",
        url: "class_attendance_report",
      },
      { id: 3, name: "Dashboard", url: "dashboard" },
      {
        id: 4,
        name: "Gift Certificate Redemption",
        url: "gift_certificate_redemption",
      },
      { id: 5, name: "Gift Certificate Usage", url: "gift_certificate_usage" },
      {
        id: 6,
        name: "Inventory Override Report",
        url: "inventory_override_report",
      },
      { id: 7, name: "Liabilities Report", url: "liabilities_report" },
      {
        id: 8,
        name: "Membership & Series Conversion",
        url: "membership_series_conversion",
      },
      {
        id: 9,
        name: "New Reservations Detail By Location",
        url: "new_reservations_detail_by_location",
      },
      { id: 10, name: "Orders By Login", url: "orders_by_login" },
      { id: 11, name: "Orders Report", url: "orders_report" },
      { id: 12, name: "Orders Report V2", url: "orders_report_v2" },
      { id: 13, name: "Payroll", url: "payroll" },
      {
        id: 14,
        name: "Reservations by Brand Users",
        url: "reservations_by_brand_users",
      },
      { id: 15, name: "Sales by Day", url: "sales_by_day" },
      { id: 16, name: "Sales by Location", url: "sales_by_location" },
      {
        id: 17,
        name: "Services by Category by Appointment Date",
        url: "services_by_category_by_appointment_date",
      },
      { id: 18, name: "Transaction Report", url: "transaction_report" },
      {
        id: 19,
        name: "Unpaid Appointments Report",
        url: "unpaid_appointments_report",
      },
    ],
    Marketing: [
      {
        id: 1,
        name: "Conversion Report",
        url: "conversion_report",
      },
      {
        id: 2,
        name: "Customer Origin Report",
        url: "customer_origin_report",
      },
      {
        id: 3,
        name: "Customer Retention Dashboard",
        url: "customer_retention_dashboard",
      },
      {
        id: 4,
        name: "Enrollment Cancellation",
        url: "enrollment_cancellation",
      },
      { id: 5, name: "Member Check-in", url: "member_check_in" },
      {
        id: 6,
        name: "Preview Conversion",
        url: "preview_conversion",
      },
      {
        id: 7,
        name: "Referral Report by Appointment Date",
        url: "referral_report_by_appointment_date",
      },

      //
      // referral report bt revernue date and service and products
      //

      {
        id: 8,
        name: "Referral Report Per Revenue Date",
        url: "referral_report_per_revenue_date",
      },
      {
        id: 9,
        name: "Services and Products",
        url: "services_and_products",
      },
      { id: 10, name: "Special Code Usage", url: "special_code_usage" },
    ],
    Administration: [
      {
        id: 1,
        name: "User Log-in History",
        url: "user_log_in_history",
      },
    ],
    ByLocation: [
      {
        id: 1,
        name: "Gents Barber - San Francisco",
        url: "gents_barber_san_francisco",
      },
      {
        id: 2,
        name: "Gents Barber - San Jose",
        url: "gents_barber_san_jose",
      },
    ],
  };
  // const handleViewReport = (name, reportName) => {
  //   // Convert report name to URL-friendly format
  //   const urlPath = reportName.toLowerCase().replace(/\s+/g, "_");
  //   router.push(`/dashboard/reports/${name}/${urlPath}`);
  // };
  const handleViewReport = (category, reportName) => {
    router.push(`/dashboard/reports/${category}/${reportName}`);
  };

  const filteredReports = reports[selectedCategory]?.filter(report => 
    report.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex gap-6">
      {/* Categories Sidebar */}
      <div className="w-64 bg-blue-50 rounded-lg p-4">
        <p className="text-sm text-gray-500 mb-2">
          Type the name of the report you would like to find in the search or
          select a category.
        </p>
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => setSelectedCategory(category.name)}
            className={`flex justify-between items-center p-3 rounded-lg cursor-pointer ${
              selectedCategory === category.name
                ? "text-blue-500"
                : "text-gray-700"
            }`}
          >
            <span>{category.name}</span>
            <IoIosArrowForward />
          </div>
        ))}
      </div>

      {/* Reports List */}
      <div className="flex-1 bg-white rounded-lg p-6">
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-3 pl-10 border rounded-lg text-black"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <h2 className="text-xl font-semibold mb-4">{selectedCategory}</h2>
        <div className="space-y-3 h-[calc(100vh-240px)] overflow-y-auto">
          {filteredReports?.map((report) => (
            <div
              key={report.id}
              className="flex justify-between text-black items-center p-4 border rounded-lg hover:bg-gray-50"
            >
              <span>{report.name}</span>
              <button
                className="text-blue-500"
                onClick={() => handleViewReport(selectedCategory, report.url)}
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Options;

