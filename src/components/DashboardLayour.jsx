/* eslint-disable react/prop-types */
// src/components/DashboardLayout.js

import { Link, useNavigate } from "react-router-dom";

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate();

  // Function to handle logout
  const handleLogout = () => {
    localStorage.removeItem("userData1"); // Remove user data from localStorage
    navigate("/signin"); // Redirect to the signin page
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside className="w-64 h-screen bg-gray-800 text-white">
        <div className="p-4">
          <h2 className="text-lg font-bold">Checklist Web</h2>
        </div>
        <nav className="mt-6">
          <ul>
            <li>
              <Link to="/" className="block p-4 hover:bg-gray-700">
                Home
              </Link>
            </li>
            <li>
              <Link to="/checklist" className="block p-4 hover:bg-gray-700">
                Checklist Master
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block w-full p-4 text-left bg-red-600 hover:bg-red-700 rounded-full mt-10"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-100">{children}</main>
    </div>
  );
};

export default DashboardLayout;
