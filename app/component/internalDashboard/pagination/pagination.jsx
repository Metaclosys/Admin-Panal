import React from "react";

function Pagination() {
  return (
    <div className="flex bg-[var(--bg)] justify-between items-center p-4 border-t">
      <div className="text-sm text-gray-600">Showing 1 - 8 results of 298</div>
      <div className="flex gap-2">
        <button className="px-3 py-1 bg-gray-600 border rounded-md">
          {"<"}
        </button>
        <button className="px-3 py-1 bg-gray-100 text-black border rounded-md">
          01
        </button>
        <button className="px-3 py-1 bg-gray-600 border rounded-md">
          {">"}
        </button>
      </div>
    </div>
  );
}

export default Pagination;
