import React from "react";
import Sidebar from "../component/internalDashboard/sidebar/sidebar";
import Navbar from "../component/internalDashboard/navbar/navbar";
import Footer from "../component/shared/footer/footer";
function layout({ children }) {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 overflow-auto p-4">{children}</main>
        <Footer />
      </div>
    </div>
  );
}

export default layout;
