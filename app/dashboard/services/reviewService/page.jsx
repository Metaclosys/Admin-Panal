import ReviewServices from "../../../component/dashboard/services/ReviewServices/ReviewServices";

const serviceDetail = {
  name: "Beard Trim with Razor Line-Up",
  category: "Men's Grooming",
  subCategory: "Beard Trim",
  addIn: "No",
  sKU: "Beard Trim with Razor Line-Up",
  barcode: "9",
  active: "Yes",
  onlineMenu: "Bookable Online",
  menu: "Men's Grooming",
  times: "All Available Days/Times",
  availableAdvance: "3 months",
  requiresTwoStaffMembers: "No",
  staffFee: "none",
  addOn: "No",
  couplesService: "No",
  price: "$75.00",
  duration: "30 minutes",
  cleanup: "0",
  availabilitySearch: "No",
  employeeInfo: [
    "Adrian Rivera",
    "Alain Mirzai",
    "Alexander Castellanos",
    "Jerry Kelly",
  ],
  room: "Main",
  productUsed: "None",
  documents: "Currently no Documents",
  addOns: "None",
  equipment: "Requires Equipment",
};
export default function ServiceReview() {
  return (
    <div className="p-4">
      <ReviewServices details={serviceDetail} />
    </div>
  );
}
