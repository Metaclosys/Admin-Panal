import { FaHandPointRight } from "react-icons/fa";

const statusList = [
  "Client Forms Incomplete",
  "Client Forms Complete",
  "Confirmed",
  "Same-Day Booking",
  "New Customer",
  "Member",
  "Couples Service",
  "Locked",
  "Has Notes",
  "Repeating Service",
  "Group Appointment",
  "Special Request",
  "Has Payment",
  "Has Gift Certificate Payment",
  "Has Series Payment",
  "Has Cart",
  "Partially Paid",
  "Paid",
  "Booked Online",
  "Booked From Facebook",
  "Booked From Twitter",
  "UnPaid(POS/Logs)",
  "Checked In",
  "In Service",
  "Payment Past Due",
  "No Show",
  "Clean Up Time",
  "Paid/Complete",
  "No Staff Preference",
  "Locked To Staff",
  "Staff Requested",
  "Female Staff Preferred",
  "Male Staff Preferred",
  "Service Has Notes",
  "Visiting Member",
  "Shared Membership",
];

const DropdownCards = ({ activeCard, setActiveCard, setShowWalkInForm }) => {
  return (
    <div className="absolute right-6 top-12 z-50 bg-white shadow-lg border border-gray-300 rounded-lg p-4 min-w-[200px]">
      {activeCard === "user" && (
        <div className="text-black">
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Filter Staff:</h3>
            <div className="flex items-center gap-2 mb-2">
              <input type="checkbox" id="selectAll" className="form-checkbox" />
              <label htmlFor="selectAll">Selected</label>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {Array(8)
              .fill("Adrian Rivera")
              .map((name, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={`staff-${index}`}
                    className="form-checkbox"
                  />
                  <label htmlFor={`staff-${index}`}>{name}</label>
                </div>
              ))}
          </div>

          <div className="flex justify-between mt-4">
            <button className="px-4 py-1 border rounded-md hover:bg-gray-100">
              Cancel
            </button>
            <button className="px-4 py-1 bg-blue-900 text-white rounded-md hover:bg-blue-800">
              Show
            </button>
          </div>
        </div>
      )}
      {activeCard === "running" && (
        <div className="text-black">
          <div className="flex flex-col items-center justify-center p-4 gap-2">
            <h3 className="font-semibold text-lg">Walk-ins</h3>
            <button
              onClick={() => {
                setShowWalkInForm(true);
                setActiveCard(null);
              }}
              className="px-4 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800 w-full"
            >
              Manage
            </button>
            <p className="text-gray-600 text-sm text-center mt-2">
              Click Manage above to add a customer to the waitlist
            </p>
          </div>
        </div>
      )}
      {activeCard === "userCheck" && (
        <div className="text-black">
          <h3 className="font-bold mb-2">By Staff per Week</h3>
          {/* Add staff content */}
        </div>
      )}
      {activeCard === "history" && (
        <div className="text-black">
          <h3 className="font-bold mb-2">History</h3>
          {/* Add history content */}
        </div>
      )}
      {activeCard === "save" && (
        <div className="text-black">
          <h3 className="font-bold mb-2">Save Options</h3>
          {/* Add save options */}
        </div>
      )}
      {activeCard === "search" && (
        <div className="text-black">
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 max-h-[400px] overflow-y-auto">
            {statusList.map((status, index) => (
              <div
                key={index}
                className="flex items-center gap-2 hover:bg-gray-100 p-1 rounded cursor-pointer"
              >
                <FaHandPointRight className="text-gray-600 text-sm" />
                <span className="text-sm">{status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownCards;
