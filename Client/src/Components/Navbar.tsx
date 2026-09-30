import { NavLink} from "react-router";
import { getUser } from "../Services/getUser";
import type { UserNamespace } from "../Types/User";
import {  useState } from "react";

export const Navbar = () => {
    const [user, setUser] = useState<UserNamespace.User | null>(() => {
      const data = getUser();
      return data.id != -1 ? data : null;
    });

  const navItems = [
    { name: "Home", path: "/home" },
    { name: "Upcoming Events", path: "/upcommingevents" },
    { name: "Calendar", path: "/calander" },

    ...(user
      ? [
          { name: "Create Event", path: "/addevent" },
          { name: "Profile", path: "/profile" },
        ]
      : []),
  ];

  function logout() {
    localStorage.removeItem("userData");
    setUser(null);
  }

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="h-16 flex items-center justify-between">

          <div className="text-2xl font-bold text-blue-600">
            Event Management System
          </div>

          <div className="flex items-center gap-8">

            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `font-medium transition-colors ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-500"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            {user ? (
              <button
                onClick={logout}
                className="font-medium text-gray-600 hover:text-red-500 transition-colors"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `font-medium transition-colors ${
                    isActive
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-500"
                  }`
                }
              >
                Login
              </NavLink>
            )}

          </div>
        </div>
      </div>
    </nav>
  );
};