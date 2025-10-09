import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/common/Navbar";
import OwnerSidebar from "../components/OwnerSidebar";
import { Outlet } from "react-router-dom";

const ServiceOwnerLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <Navbar />

      <div className="flex">
        {/* Mobile sidebar overlay */}
        {/* On mobile, when the sidebar slides open, this overlay dims the background and closes the sidebar if you click outside it. */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black bg-opacity-25 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <OwnerSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content */}
        <div className="flex-1 min-w-0 p-4 lg:p-6">
          {/* Mobile menu button */}
          <button
            className="lg:hidden mb-4 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
            onClick={() => setSidebarOpen(true)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <Outlet />
        </div>
      </div>
    </>
  );
};

export default ServiceOwnerLayout;
