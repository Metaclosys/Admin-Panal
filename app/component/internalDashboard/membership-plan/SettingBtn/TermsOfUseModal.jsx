import { RxCross2 } from "react-icons/rx";

const TermsOfUseModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[600px] p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-black">
            Terms of Use Text
          </h2>
          <button onClick={onClose} className="p-1">
            <RxCross2 className="text-xl text-black" />
          </button>
        </div>

        <div className="mb-4">
          <div className="flex gap-2 mb-4">
            <button className="p-1 hover:bg-gray-100 rounded">
              <strong className="text-black">B</strong>
            </button>
            <button className="p-1 hover:bg-gray-100 rounded italic">
              <strong className="text-black">I</strong>
            </button>
            <button className="p-1 hover:bg-gray-100 rounded underline">
              <strong className="text-black">U</strong>
            </button>
          </div>

          <textarea
            className="w-full h-40 p-3 border rounded-md text-black"
            placeholder="Write Description..."
          />
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

export default TermsOfUseModal;
