"use client";
import { Button } from "antd";
import Image from "next/image";

function PhotoContent() {
  return (
    <div className="p-6 space-y-8 overflow-y-auto h-[calc(100vh-230px)]">
      <div className="flex flex-col items-center">
        {/* Profile Photo */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200">
            <Image
              src="/placeholder-avatar.jpg"
              alt="Profile"
              width={96}
              height={96}
              className="object-cover"
            />
          </div>
          
          {/* Change Photo Text */}
          <div className="text-center mt-2">
            <p className="font-medium">Change Photo</p>
            <button className="text-blue-500 hover:underline">
              upload
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="fixed bottom-6 right-6">
          <Button type="primary" className="bg-blue-900">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}

export default PhotoContent;
