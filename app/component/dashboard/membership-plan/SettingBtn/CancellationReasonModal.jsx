import { RxCross2 } from "react-icons/rx";

const CancellationReasonModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[600px] p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-black">
            Cancellation Reason
          </h2>
          <button onClick={onClose} className="p-1">
            <RxCross2 className="text-xl text-black" />
          </button>
        </div>

        <div className="mb-6">
          <p className="mb-4 text-black">
            Enable Membership Cancellation Reasons:
          </p>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="enable"
                value="yes"
                className="text-black"
              />
              <span className="text-black">Yes</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="radio"
                name="enable"
                value="no"
                className="text-black"
              />
              <span className="text-black">No</span>
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-md hover:bg-gray-50 text-black"
          >
            Cancel
          </button>
          <button className="px-4 py-2 bg-[#0F172A] text-white rounded-md hover:bg-[#1c2b4a]">
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CancellationReasonModal;
