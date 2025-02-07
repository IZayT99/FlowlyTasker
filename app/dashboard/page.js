"use client"; // Make sure this is a Client Component

import { useState } from "react"; // Import useState
import Sidebar from "@/components/sidebar"; // Import Sidebar
import Calendar from "@/components/calendar"; // Import Sidebar

export default function Dashboard() {
  const [activePath, setActivePath] = useState("dashboard"); // Default is "dashboard"

  // Render different content based on the active path
  const renderContent = () => {
    switch (activePath) {
      case "dashboard":
        return (
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800">Dashboard Content</h1>
            {/* Add your Dashboard-specific content */}
            <p className="mt-4 text-lg text-gray-600">
              Welcome to your Dashboard! Here you can manage your tasks and track your progress.
            </p>
          </div>
        );
      case "calendar":
        return (
          <div>
            <p className="mt-4 text-lg text-gray-600">
            <Calendar/>
            </p>
          </div>
        );
      case "chart":
        return (
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800">Subscription Content</h1>
            {/* Add your Subscription-specific content */}
            <p className="mt-4 text-lg text-gray-600">
              Manage your subscriptions and billing here.
            </p>
          </div>
        );
      case "askai":
        return (
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800">Settings Content</h1>
            {/* Add your Settings-specific content */}
            <p className="mt-4 text-lg text-gray-600">
              Update your account settings and preferences here.
            </p>
          </div>
        );
      default:
        return (
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800">Page Not Found</h1>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar Component */}
      <Sidebar setActivePath={setActivePath} activePath={activePath} /> {/* Pass activePath and setActivePath */}

      {/* Main Content Area */}
      <main className="flex-1 p-8 pb-24">
        {renderContent()} {/* Dynamically render content based on activePath */}
      </main>
    </div>
  );
}
