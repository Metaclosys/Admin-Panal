"use client";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";

export function Options() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("General");

  const categories = [
    { name: "General", id: 1 },
    { name: "bulkCharge", id: 2 },
    { name: "sales", id: 3 },
    { name: "employeeStaff", id: 4 },
    { name: "customer", id: 5 },
    { name: "inventory", id: 6 },
    { name: "accountingAnalysis", id: 7 },
    { name: "archivedReports", id: 8 },
    { name: "exportToolsInternalOnly", id: 9 },
  ];

  const reports = {
    General: [
      {
        id: 1,
        name: "Business Intelligence Dashboard",
        url: "businessIntelligenceDashboard",
      },
    ],

    bulkCharge: [
      {
        id: 1,
        name: "Cancellation Fee Confirmation",
        url: "cancellationFeeConfirmation",
      },
      {
        id: 2,
        name: "Document Approval",
        url: "documentApproval",
      },
      {
        id: 3,
        name: "Membership Charge",
        url: "membershipCharge",
      },
      {
        id: 4,
        name: "Suspended Memberships",
        url: "suspendedMemberships",
      },
    ],

    sales: [
      {
        id: 1,
        name: "Cash Register - End of Day",
        url: "cashRegisterEndofDay",
      },
      {
        id: 2,
        name: "Customer Payment Detail Report",
        url: "customerPaymentDetailReport",
      },
      {
        id: 3,
        name: "Daily Deposits/Sales By Payment Type",
        url: "dailyDepositsSalesByPaymentType",
      },
      {
        id: 4,
        name: "Dashboard",
        url: "dashboard",
      },
      {
        id: 5,
        name: "Enrollment Cancellation",
        url: "enrollmentCancellation",
      },
      {
        id: 6,
        name: "Membership & Series Conversion",
        url: "membershipSeriesConversion",
      },
      {
        id: 7,
        name: "Order Report",
        url: "orderReport",
      },
      {
        id: 8,
        name: "Order Report (Legacy)",
        url: "orderReportLegacy",
      },
      {
        id: 9,
        name: "Override Reasons",
        url: "overrideReasons",
      },
      {
        id: 10,
        name: "Preview Conversion",
        url: "previewConversion",
      },
      {
        id: 11,
        name: "Product Sales",
        url: "productSales",
      },
      {
        id: 12,
        name: "QuickBooks (Cash Accounting)",
        url: "quickBooksCashAccounting",
      },
      {
        id: 13,
        name: "Refund By Day",
        url: "refundByDay",
      },
      {
        id: 14,
        name: "Sales By Day",
        url: "salesByDay",
      },
      {
        id: 15,
        name: "Sales By Room",
        url: "salesByRoom",
      },
      {
        id: 16,
        name: "Sales By Time",
        url: "salesByTime",
      },
      {
        id: 17,
        name: "Service Sales",
        url: "serviceSales",
      },
      {
        id: 18,
        name: "Special Code Usage",
        url: "specialCodeUsage",
      },
      {
        id: 19,
        name: "Visual Dashboard",
        url: "visualDashboard",
      },
    ],

    employeeStaff: [
      {
        id: 1,
        name: "Blackout History",
        url: "blackoutHistory",
      },
      {
        id: 2,
        name: "Customer Retention Dashboard",
        url: "customerRetentionDashboard",
      },
      {
        id: 3,
        name: "Daily Tips Report",
        url: "dailyTipsReport",
      },
      {
        id: 4,
        name: "Employee Daily Tips",
        url: "employeeDailyTips",
      },
      {
        id: 5,
        name: "Employee Time Clock",
        url: "employeeTimeClock",
      },
      {
        id: 6,
        name: "Employee Time-Keeping Report",
        url: "employeeTimeKeepingReport",
      },
      {
        id: 7,
        name: "Payroll",
        url: "payroll",
      },
      {
        id: 8,
        name: "Requested Staff (By Booking)",
        url: "requestedStaffByBooking",
      },
      {
        id: 9,
        name: "Requested Staff (By Search)",
        url: "requestedStaffBySearch",
      },
      {
        id: 10,
        name: "Salon Intelligence Report",
        url: "salonIntelligenceReport",
      },
      {
        id: 11,
        name: "Scheduled History",
        url: "scheduledHistory",
      },
      {
        id: 12,
        name: "Split Staff Tips Checker",
        url: "splitStaffTipsChecker",
      },
      {
        id: 13,
        name: "Staff Customer Service",
        url: "staffCustomerService",
      },
      {
        id: 14,
        name: "Staff Sales",
        url: "staffSales",
      },
      {
        id: 15,
        name: "Staff Sales & Pay",
        url: "staffSalesAndPay",
      },
      {
        id: 16,
        name: "Staff Sales Details",
        url: "staffSalesDetails",
      },
    ],

    customer: [
      {
        id: 1,
        name: "Cancellation Report",
        url: "cancellationReport",
      },
      {
        id: 2,
        name: "Customer Duplicates",
        url: "customerDuplicates",
      },
      {
        id: 3,
        name: "Customer Summary",
        url: "customerSummary",
      },
      {
        id: 4,
        name: "Customers By Day",
        url: "customerByDay",
      },
      {
        id: 5,
        name: "Customers Report with Visit Date",
        url: "customersReportWithVisitDate",
      },
      {
        id: 6,
        name: "Members Report",
        url: "membersReport",
      },
      {
        id: 7,
        name: "Past Due Memberships",
        url: "pastDueMemberships",
      },
    ],

    inventory: [
      {
        id: 1,
        name: "Inventory Override Report",
        url: "inventoryOverrideReport",
      },
      {
        id: 2,
        name: "Inventory Validation Report",
        url: "inventoryValidationReport",
      },
      {
        id: 3,
        name: "Product Usage Report",
        url: "productUsageReport",
      },
      {
        id: 4,
        name: "Take Inventory / Shrinkage Report",
        url: "takeInventoryShrinkageReport",
      },
    ],

    accountingAnalysis: [
      {
        id: 1,
        name: "Conversion Reports",
        url: "conversionReports",
      },
      {
        id: 2,
        name: "Cost of Goods Sold (COGS)",
        url: "costOfGoodsSoldReport",
      },
      {
        id: 3,
        name: "Credit Card Processing Type Report",
        url: "creditCardProcessingTypeReport",
      },
      {
        id: 4,
        name: "GC and Series Balance Report",
        url: "gcAndSeriesBalanceReport",
      },
      {
        id: 5,
        name: "GC and Series Redemption Report",
        url: "gcAndSeriesRedemptionReport",
      },
      {
        id: 6,
        name: "Liabilities Report",
        url: "liabilitiesReport",
      },
      {
        id: 7,
        name: "Series and Membership Expiration Report",
        url: "seriesAndMembershipExpirationReport",
      },
      {
        id: 8,
        name: "SMS Usage Details Report",
        url: "smsUsageDetailsReport",
      },
      {
        id: 9,
        name: "STR Report",
        url: "strReport",
      },
      {
        id: 10,
        name: "Transaction Report",
        url: "transactionReport",
      },
      {
        id: 11,
        name: "Universal Redemption Report",
        url: "universalRedemptionReport",
      },
      {
        id: 12,
        name: "Unpaid Transactions Report By Day",
        url: "unpaidTransactionsReportByDay",
      },
      {
        id: 13,
        name: "User Log-in History",
        url: "userLogInHistory",
      },
      {
        id: 14,
        name: "Utilization Report",
        url: "utilizationReport",
      },
    ],

    archivedReports: [
      {
        id: 1,
        name: "Cash Register - Pay Ins/Pay Out",
        url: "cashRegisterPayInsPayOut",
      },
      {
        id: 2,
        name: "Customer Origin",
        url: "customerOrigin",
      },
      {
        id: 3,
        name: "Customer Referrals",
        url: "customerReferrals",
      },
      {
        id: 4,
        name: "Customer Retention",
        url: "customerRetention",
      },
      {
        id: 5,
        name: "Gift Certificate Liability",
        url: "giftCertificateLiability",
      },
      {
        id: 6,
        name: "Gift Certificate Redemption",
        url: "giftCertificateRedemption",
      },
      {
        id: 7,
        name: "Group Payments Report",
        url: "groupPaymentsReport",
      },
      {
        id: 8,
        name: "Liability Report (Legacy)",
        url: "liabilityReportLegacy",
      },
      {
        id: 9,
        name: "Product Sell Through",
        url: "productSellThrough",
      },
      {
        id: 10,
        name: "QuickBooks Import File",
        url: "quickBooksImportFile",
      },
      {
        id: 11,
        name: "QuickBooks Import File 2",
        url: "quickBooksImportFile2",
      },
      {
        id: 12,
        name: "QuickBooks Import File 3",
        url: "quickBooksImportFile3",
      },
      {
        id: 13,
        name: "QuickBooks Import File 4",
        url: "quickBooksImportFile4",
      },
      {
        id: 14,
        name: "Series Balance Report",
        url: "seriesBalanceReport",
      },
      {
        id: 15,
        name: "Series and Revenue Recognition Report",
        url: "seriesAndRevenueRecognitionReport",
      },
    ],

    exportToolsInternalOnly: [
      {
        id: 1,
        name: "Customer Series Export",
        url: "customerSeriesExport",
      },
      {
        id: 2,
        name: "Customer Export",
        url: "customerExport",
      },
      {
        id: 3,
        name: "Employees Export",
        url: "employeesExport",
      },
      {
        id: 4,
        name: "GC Export",
        url: "gcExport",
      },
      {
        id: 5,
        name: "Historical Transactions Export",
        url: "historicalTransactionsExport",
      },
      {
        id: 6,
        name: "Package Export",
        url: "packageExport",
      },
      {
        id: 7,
        name: "Product Export",
        url: "productExport",
      },
      {
        id: 8,
        name: "Series Export",
        url: "seriesExport",
      },
      {
        id: 9,
        name: "Services Export",
        url: "servicesExport",
      },
    ],
  };

  const handleViewReport = (name, reportName) => {
    // router.push(
    //   `/internalDashboard/reports/allReport/${name
    //     .toLowerCase()
    //     .replace(/\s+/g, "")}/${reportName}`
    // );
    router.push(`/internalDashboard/reports/allReport/${name}/${reportName}`);
  };

  return (
    <div className="flex gap-6">
      {/* Categories Sidebar */}
      <div className="w-64 bg-blue-50 rounded-lg p-4">
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
        <h2 className="text-xl font-semibold mb-4">{selectedCategory}</h2>
        <div className="space-y-3 h-[calc(100vh-240px)] overflow-y-auto">
          {reports[selectedCategory]?.map((report) => (
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
