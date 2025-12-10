import { Button, Select } from "antd";
import React from "react";

function EditBillingCenter() {
  return (
    <>
      <div className="bg-[#87D0FFBF] p-8 rounded-3xl shadow-lg shadow-gray-300">
        <h2 className="text-lg mb-6 text-blue-500">Payment Information</h2>

        <form>
          <div className="mb-4">
            <label className="block mb-2 text-black">Card Number</label>
            <div className="flex gap-4">
              <input
                type="text"
                className="flex-1 p-2 rounded border text-black"
                placeholder="Enter card number"
              />
              <div className="flex gap-2">
                <img
                  src="/images/pngFiles/visa-logo.png"
                  alt="Visa"
                  className="p-2 bg-white rounded-md h-8 w-12"
                />
                <img
                  src="/images/pngFiles/mastercard-logo.png"
                  alt="Mastercard"
                  className="p-2 bg-black rounded-md h-8 w-12"
                />
                <img
                  src="/images/pngFiles/amex-logo.png"
                  alt="American Express"
                  className="p-2 bg-white rounded-md h-8 w-12"
                />
                <img
                  src="/images/pngFiles/unionpay-logo.png"
                  alt="Union Pay"
                  className="p-2 bg-white rounded-md h-8 w-12"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2 text-black">Expires</label>
              <input
                type="text"
                className="w-full p-2 rounded border text-black"
                placeholder="MM / YYYY"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2 text-black">First Name</label>
              <input
                type="text"
                className="w-full p-2 rounded border text-black"
                placeholder="Enter first name"
              />
            </div>
            <div>
              <label className="block mb-2 text-black">Last Name</label>
              <input
                type="text"
                className="w-full p-2 rounded border text-black"
                placeholder="Enter last name"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block mb-2 text-black">Address</label>
              <input
                type="text"
                className="w-full p-2 rounded border text-black"
                placeholder="Enter address"
              />
            </div>
            <div>
              <label className="block mb-2 text-black">City</label>
              <input
                type="text"
                className="w-full p-2 rounded border text-black"
                placeholder="Enter city"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block mb-2 text-black">State</label>
              <Select
                style={{
                  width: "100%",
                }}
                size="large"
                options={[
                  {
                    value: "sanjose",
                    label: "San Jose",
                  },
                  {
                    value: "sanFrancisco",
                    label: "San Francisco",
                  },
                ]}
              />

            </div>
            <div>
              <label className="block mb-2 text-black">Zip</label>
              <input
                type="text"
                className="w-full p-2 rounded border text-black"
                placeholder="Enter zip"
              />
            </div>
            <div>
              <label className="block mb-2 text-black">Country</label>
              <Select
                style={{
                  width: "100%",
                }}
                size="large"
                options={[
                  {
                    value: "sanjose",
                    label: "San Jose",
                  },
                  {
                    value: "sanFrancisco",
                    label: "San Francisco",
                  },
                ]}
              />

            </div>
          </div>

          <div className="mb-6">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="rounded text-black" />
              <span className="text-sm text-black">
                I authorize Booker Software, Inc. to charge this card for my
                monthly fees according to my contract.
              </span>
            </label>
          </div>

          <div className="flex justify-end gap-4">
            <Button shape="round" size="default"  className="bg-sky-100 border border-sky-200 text-black">
              Cancel
            </Button>
            <Button shape="round" size="default" style={{
                width:"80px"
            }} className="bg-slate-900 text-white">
              Save
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditBillingCenter;
