"use client"; // Ensure Sidebar is a Client Component

import { Home, Users, CreditCard, Settings } from "lucide-react";
import ButtonAccount from "@/components/ButtonAccount"; // Import ButtonAccount

const Sidebar = ({ setActivePath, activePath }) => {
  const menuItems = [
    { name: "Dashboard", icon: <Home size={20} />, path: "dashboard" },
    { name: "Calendar", icon: <Users size={20} />, path: "calendar" },
    { name: "Chart", icon: <CreditCard size={20} />, path: "chart" },
    { name: "Ask AI", icon: <Settings size={20} />, path: "askai" },
  ];

  return (
    <aside className="w-64 h-screen bg-gray-900 text-white p-6 flex flex-col">
      <h1 className="text-2xl font-bold text-blue-400 mb-12">FlowlyTasker</h1>

      {/* Account Button */}
      <div className="mb-6">
        <ButtonAccount />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col space-y-6">
        {menuItems.map((item) => (
          <div
            key={item.name}
            className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all duration-200 ${
              activePath === item.path
                ? "bg-blue-600 text-white shadow-xl transform scale-105"
                : "text-gray-300 hover:bg-gray-700 hover:text-white"
            }`}
            onClick={() => setActivePath(item.path)} // Set active path on click
          >
            {item.icon}
            <span className="text-lg font-medium">{item.name}</span>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="mt-auto text-center text-gray-500 text-sm">
        <span>&copy; 2025 FlowlyTasker</span>
      </div>
    </aside>
  );
};

export default Sidebar;
