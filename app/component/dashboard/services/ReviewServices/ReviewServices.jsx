"use client";
import { FaEdit } from "react-icons/fa";
import { Button } from "antd";

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
  employeeInfo: {
    emp1: "Adrian Rivera",
    emp2: "Alain Mirzai",
    emp3: "Alexander Castellanos",
    emp4: "Jerry kelly",
  },
};

function ReviewServices() {
  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div>
          <div className="text-sm text-gray-800">Service info</div>
          <div className="text-xl font-bold text-black">
            {serviceDetail.name}
          </div>
          <div className="text-sm text-gray-500">
            All details related to shop will be mentioned here.
          </div>
        </div>
        <Button
          onClick={() => setShowEditShop(true)}
          className="bg-[#0F172A] text-white"
          size="large"
          shape="default"
          icon={<FaEdit />}
        >
          Edit Details
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Shop Details Card */}
        <div className="bg-white rounded-lg p-4 border-2 border-gray-300">
          <h2 className="font-bold mb-4 text-black border-b pb-2">
            Service info
          </h2>
          <div className="space-y-3">
            <div>
              <div className="text-black">{serviceDetail.name}</div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div className="text-sm font-semibold text-black">Category</div>
              <div className="text-black">{serviceDetail.category}</div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div className="text-sm font-semibold text-black">
                Subcategory:
              </div>
              <div className="text-black">{serviceDetail.subCategory}</div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div className="text-sm font-semibold text-black">Brand:</div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div className="text-sm font-semibold text-black">Add-No:</div>
              <div className="text-black">{serviceDetail.addIn}</div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div className="text-sm font-semibold text-black">SKU:</div>
              <div className="text-black">{serviceDetail.sKU}</div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div className="text-sm font-semibold text-black">Barcode:</div>
              <div className="text-black">{serviceDetail.barcode}</div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div className="text-sm font-semibold text-black">Active:</div>
              <div className="text-black">{serviceDetail.active}</div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div className="text-sm font-semibold text-black">
                Show in Online Menu:
              </div>
              <div className="text-black">{serviceDetail.onlineMenu}</div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div className="text-sm font-semibold text-black">
                Menu Groups:
              </div>
              <div className="text-black">{serviceDetail.menu}</div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div className="text-sm font-semibold text-black">
                Days/Times for Booking Online:
              </div>
              <div className="text-black">{serviceDetail.times}</div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div className="text-sm font-semibold text-black">
                Avalible in Advance:
              </div>
              <div className="text-black">{serviceDetail.availableAdvance}</div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div className="text-sm font-semibold text-black">
                Requires Two Staff Members:
              </div>
              <div className="text-black">
                {serviceDetail.requiresTwoStaffMembers}
              </div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div className="text-sm font-semibold text-black">Staff Fee:</div>
              <div className="text-black">{serviceDetail.staffFee}</div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div className="text-sm font-semibold text-black">Add On:</div>
              <div className="text-black">{serviceDetail.addOn}</div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div className="text-sm font-semibold text-black">
                Couples Service:
              </div>
              <div className="text-black">{serviceDetail.couplesService}</div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div className="text-sm font-semibold text-black">Price:</div>
              <div className="text-black">{serviceDetail.price}</div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div className="text-sm font-semibold text-black">Duration:</div>
              <div className="text-black">{serviceDetail.duration}</div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div className="text-sm font-semibold text-black">Cleanup:</div>
              <div className="text-black">{serviceDetail.cleanup}</div>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div className="text-sm font-semibold text-black">
                Do not require staff on availability search:
              </div>
              <div className="text-black">
                {serviceDetail.availabilitySearch}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border-2 border-gray-300">
            <h2 className="font-bold mb-4 text-black border-b pb-2">
              Employee info
            </h2>
            <div className="space-y-3">
              <div>
                <div className="text-black">
                  {serviceDetail.employeeInfo.emp1}
                </div>
              </div>
              <div>
                <div className="text-black">
                  {serviceDetail.employeeInfo.emp2}
                </div>
              </div>
              <div>
                <div className="text-black">
                  {serviceDetail.employeeInfo.emp3}
                </div>
              </div>
              <div>
                <div className="text-black">
                  {serviceDetail.employeeInfo.emp4}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 border-2 border-gray-300">
            <h2 className="font-bold mb-4 text-black border-b pb-2">
              Room Info
            </h2>
            <div className="space-y-3">
              <div>
                <div className="text-black">Main</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border-2 border-gray-300">
            <h2 className="font-bold mb-4 text-black border-b pb-2">
              Products
            </h2>
            <div className="space-y-3">
              <div>
                <div className="text-sm font-semibold text-black">
                  Product Cost per Service:
                </div>
              </div>
              <div className="flex flex-row items-center gap-3">
                <div className="text-sm font-semibold text-black">
                  Product Used:
                </div>
                <div className="text-black">None</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border-2 border-gray-300">
            <h2 className="font-bold mb-4 text-black border-b pb-2">
              Documents
            </h2>
            <div className="space-y-3">
              <div>
                <div className="text-black">Currently no Documents</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border-2 border-gray-300">
            <h2 className="font-bold mb-4 text-black border-b pb-2">Add-On</h2>
            <div className="space-y-3">
              <div>
                <div className="text-black">None</div>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border-2 border-gray-300">
            <h2 className="font-bold mb-4 text-black border-b pb-2">
              Equipment
            </h2>
            <div className="space-y-3">
              <div>
                <div className="text-black">Requires Equipment</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReviewServices;
