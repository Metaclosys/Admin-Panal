"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaPlus } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import TermsOfUseModal from "../SettingBtn/TermsOfUseModal";
import CancellationReasonModal from "../SettingBtn/CancellationReasonModal";

function TopSection({ onPlanAdded, onSearch }) {
  const [showSettings, setShowSettings] = useState(false);
  const settingsRef = useRef(null);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [showCancellationModal, setShowCancellationModal] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setShowSettings(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <>
      <div>
        {/* Settings Button and Dropdown */}
        <div className="absolute top-2 right-2" ref={settingsRef}>
          <div className="flex flex-row">
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="absolute top-[-30px] right-2 p-2 hover:bg-gray-100 rounded-md flex items-center gap-2"
            >
              <span className="text-gray-600">Settings</span>
              <IoSettingsSharp className="text-xl text-gray-600" />
            </button>

            {showSettings && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 border">
                <div className="py-1">
                  <button
                    onClick={() => {
                      setShowTermsModal(true);
                      setShowSettings(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Terms of Use Text
                  </button>
                  <button
                    onClick={() => {
                      setShowCancellationModal(true);
                      setShowSettings(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Cancellation Reasons
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Header Section */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-gray-600">
            Membership Plans can be created, updated or deleted.
          </h1>
          <Link href="/dashboard/membership-plan/addMembershipPlans">
            <Button
              icon={<FaPlus />}
              shape="round"
              size="large"
              className="bg-[#0F172A] text-white"
            >
              Create New Membership Plan
            </Button>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Input
              placeholder="Search Membership Plan by Name"
              prefix={<SearchOutlined className="text-gray-400" />}
              onChange={handleSearch}
              className="w-full max-w-md"
              allowClear
            />
          </div>
        </div>
      </div>
      {/* Modals */}
      {showTermsModal && (
        <TermsOfUseModal onClose={() => setShowTermsModal(false)} />
      )}
      {showCancellationModal && (
        <CancellationReasonModal
          onClose={() => setShowCancellationModal(false)}
        />
      )}
    </>
  );
}

export default TopSection;
