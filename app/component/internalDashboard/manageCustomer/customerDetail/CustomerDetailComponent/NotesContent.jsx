"use client";
import { Input, Button } from "antd";

function NotesContent() {
  return (
    <div className="p-6 space-y-8 overflow-y-auto h-[calc(100vh-230px)]">
      {/* Allergies Section */}
      <div>
        <div className="bg-blue-500 text-white px-4 py-2 font-medium">
          ALLERGIES
        </div>
        <div className="mt-4">
          <div className="flex gap-2 mb-2">
            <button className="font-bold">B</button>
            <button className="italic">I</button>
            <button className="underline">U</button>
          </div>
          <Input.TextArea
            rows={4}
            className="w-full resize-none"
          />
          <div className="flex justify-end mt-2">
            <Button
              type="primary"
              className="bg-blue-900 hover:bg-blue-800"
            >
              Save
            </Button>
          </div>
        </div>
      </div>

      {/* Medications/Formulas Section */}
      <div>
        <div className="bg-blue-500 text-white px-4 py-2 font-medium">
          MEDICATIONS/FORMULAS
        </div>
        <div className="mt-4">
          <div className="flex gap-2 mb-2">
            <button className="font-bold">B</button>
            <button className="italic">I</button>
            <button className="underline">U</button>
          </div>
          <Input.TextArea
            rows={4}
            className="w-full resize-none"
          />
          <div className="flex justify-end mt-2">
            <Button
              type="primary"
              className="bg-blue-900 hover:bg-blue-800"
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotesContent;
