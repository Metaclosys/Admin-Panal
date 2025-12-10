const WalkInForm = ({ onCancel }) => {
  return (
    <div className="text-black p-6">
      <h3 className="font-semibold text-xl mb-6">Add Walk-In</h3>

      <div className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Category*</label>
            <select className="w-full border border-gray-300 rounded p-2 text-gray-500">
              <option value="">- Select Category -</option>
              {/* Add your categories here */}
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Service*</label>
            <select className="w-full border border-gray-300 rounded p-2 text-gray-500">
              <option value="">- Select Category first -</option>
              {/* Add your services here */}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Staff*</label>
          <select className="w-full border border-gray-300 rounded p-2 text-gray-500">
            <option value="">Anyone</option>
            {/* Add your staff members here */}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Name*</label>
            <input
              type="text"
              placeholder="Full Name"
              className="w-full border border-gray-300 rounded p-2 text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Email*</label>
            <input
              type="email"
              placeholder="Enter Email"
              className="w-full border border-gray-300 rounded p-2 text-gray-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Gender*</label>
            <select className="w-full border border-gray-300 rounded p-2 text-gray-500">
              <option value="">Not Specified</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm mb-1">Country*</label>
            <select className="w-full border border-gray-300 rounded p-2 text-gray-500">
              <option value="US">United States</option>
              {/* Add more countries */}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Contact*</label>
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full border border-gray-300 rounded p-2 text-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Description</label>
          <textarea
            rows="4"
            className="w-full border border-gray-300 rounded p-2 text-gray-500 resize-none"
          ></textarea>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-gray-700"
          >
            Cancel
          </button>
          <button className="px-6 py-2 bg-blue-900 text-white rounded-md hover:bg-blue-800">
            Add to Waitlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalkInForm;
