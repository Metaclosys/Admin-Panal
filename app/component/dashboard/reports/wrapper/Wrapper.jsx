"use client";
import { FiSearch } from "react-icons/fi";
import Options from "../Options/Options";

function Wrapper() {
    
    return (
      <div className="p-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search For Available Reports"
            className="w-full p-3 pl-10 border rounded-lg text-black"
          />
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
  
        <Options />
      </div>
    );
  };
  
export default Wrapper
