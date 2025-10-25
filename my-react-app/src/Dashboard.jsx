import React from "react";
import { useLogin } from "./LoginContext";
import { useNavigate } from "react-router-dom";
import UsersManager from "./UsersManager";
import NotesManager from "./NotesManager";
import AnalyticsCard from "./AnalyticsCard";
import WeatherCard from "./WeatherCard";

export default function Dashboard() {
  const { logout } = useLogin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">لوحة القيادة</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          تسجيل الخروج
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        <UsersManager />
        <NotesManager />
        <AnalyticsCard />
        <WeatherCard />
      </div>
    </div>
  );
} 