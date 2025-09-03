
// AdminSidebar.jsx
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
  const handleLinkClick = () => {
    if (setSidebarOpen) setSidebarOpen(false);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 bg-white shadow-sm h-screen sticky top-0">
        <div className="p-6">
          <nav className="space-y-2">
  <NavLink
    to="/admin"
    end
    className={({ isActive }) =>
      `flex items-center px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors ${
        isActive ? "text-purple-700 bg-purple-50" : "text-gray-600 hover:bg-gray-100"
      }`
    }
  >
    <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001 1v-6a1 1 0 00-1-1h-2z" />
    </svg>
    Dashboard
  </NavLink>

  <NavLink
    to="/admin/appointments"
    className={({ isActive }) =>
      `flex items-center px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors ${
        isActive ? "text-purple-700 bg-purple-50" : "text-gray-600 hover:bg-gray-100"
      }`
    }
  >
    <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
      <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zM4 8h12v8H4V8z" />
    </svg>
    Appointments
  </NavLink>

  <NavLink
    to="/admin/users"
    className={({ isActive }) =>
      `flex items-center px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors ${
        isActive ? "text-purple-700 bg-purple-50" : "text-gray-600 hover:bg-gray-100"
      }`
    }
  >
    <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
    </svg>
    Users
  </NavLink>

  <NavLink
    to="/admin/serviceOwners"
    className={({ isActive }) =>
      `flex items-center px-4 py-2 hover:bg-gray-50 rounded-lg transition-colors ${
        isActive ? "text-purple-700 bg-purple-50" : "text-gray-600 hover:bg-gray-100"
      }`
    }
  >
    <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
    </svg>
    Service Owners
  </NavLink>
</nav>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={`lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <nav className="space-y-2">
            <Link
              to="/admin"
              onClick={handleLinkClick}
              className="flex items-center px-4 py-2 text-purple-700 bg-purple-50 rounded-lg"
            >
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              Dashboard
            </Link>

            <Link
              to="/admin/appointments"
              onClick={handleLinkClick}
              className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zM4 8h12v8H4V8z" />
              </svg>
              Appointments
            </Link>

            <Link
              to="/admin/users"
              onClick={handleLinkClick}
              className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
              Users
            </Link>

            <Link
              to="/admin/serviceOwners"
              onClick={handleLinkClick}
              className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <svg className="w-5 h-5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
              </svg>
              Service Owners
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
