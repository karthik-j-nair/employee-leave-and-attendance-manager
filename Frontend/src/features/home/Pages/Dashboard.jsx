import React, { useState } from "react";
import { useAuth } from "../../auth/hooks/useAuth";
import { useHome } from "../hooks/useHome";
import UserAttendanceModal from "../components/UserAttendanceModal";
import {useNavigate} from "react-router";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("adminActiveTab") || "Overview";
  });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Added for mobile menu toggle
  const { user } = useAuth();
  const { employees } = useHome();
  const { pendingLeaves, handleLeaveAction } = useHome();
  const navigate = useNavigate();

  if (user?.role !== "admin") {
    navigate("/login");
  }

  return (
    <div className="flex h-screen bg-linear-to-br from-[#EEF2FF] via-[#F8FAFC] to-[#F3E8FF] font-sans text-slate-800 overflow-hidden relative">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-20 md:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`w-64 bg-white flex flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-30 fixed inset-y-0 left-0 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo Area */}
        <div className="p-6 md:p-8 flex justify-between items-center">
          <div>
            <h1 className="text-[#3730A3] font-bold text-xl tracking-tight">
              ELAMS
            </h1>
            <p className="text-slate-400 text-xs mt-1 font-medium uppercase tracking-wider">
              Admin Console
            </p>
          </div>
          {/* Mobile Close Button */}
          <button
            className="md:hidden text-slate-400 hover:text-slate-600"
            onClick={() => setIsSidebarOpen(false)}
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 mt-4 space-y-2 overflow-y-auto">
          {/* Overview Tab */}
          <button
            onClick={() => {
              setActiveTab("Overview");
              localStorage.setItem("adminActiveTab", "Overview"); // ✅ add
              setIsSidebarOpen(false);
            }}
            className={`w-full flex items-center px-6 md:px-8 py-3 text-sm font-semibold transition-colors relative ${
              activeTab === "Overview"
                ? "text-[#4F46E5]"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Overview
            {/* Active Indicator Pill */}
            {activeTab === "Overview" && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#4F46E5] rounded-l-full" />
            )}
          </button>

          {/* Leave Requests Tab */}
          <button
            onClick={() => {
              setActiveTab("Leave Requests");
              localStorage.setItem("adminActiveTab", "Leave Requests"); // ✅ add
              setIsSidebarOpen(false);
            }}
            className={`w-full flex items-center px-6 md:px-8 py-3 text-sm font-semibold transition-colors relative ${
              activeTab === "Leave Requests"
                ? "text-[#4F46E5]"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Leave Requests
            {activeTab === "Leave Requests" && (
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-[#4F46E5] rounded-l-full" />
            )}
          </button>
        </nav>

        {/* Admin Profile Area */}
        <div className="p-6 md:p-8 flex items-center border-t border-slate-50">
          <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold shadow-sm shrink-0">
            A
          </div>
          <div className="ml-3 overflow-hidden">
            <p className="text-sm font-bold text-slate-800 truncate">
              {user?.username}
            </p>
            <p className="text-xs text-slate-500 truncate">
              System Administrator
            </p>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobile Header Bar */}
        <header className="md:hidden flex items-center justify-between bg-white/80 backdrop-blur-md p-4 shadow-sm z-10">
          <h1 className="text-[#3730A3] font-bold text-lg tracking-tight">
            ELAMS
          </h1>
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-1 text-slate-600 focus:outline-none"
          >
            <svg
              className="w-7 h-7"
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
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-10">
          {activeTab === "Overview" ? (
            <div className="animate-in fade-in duration-500">
              <div className="mb-6 md:mb-8">
                <h2 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
                  Hello, {user?.username}
                </h2>
                <p className="text-slate-500 mt-1 md:mt-2 text-sm md:text-lg">
                  Here is the directory of all employees currently in the
                  system.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {employees?.map((user) => (
                  <UserCard key={user._id} user={user} />
                ))}
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in duration-500">
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900">
                Leave Requests
              </h2>
              <PendingLeaves
                pendingLeaves={pendingLeaves}
                onAction={handleLeaveAction}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function UserCard({ user }) {
  const [selectedUserId, setSelectedUserId] = useState(null);
  return (
    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 md:p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full">
      <div className="flex items-center mb-4 md:mb-5">
        <div className="ml-1 md:ml-4">
          <h3 className="font-bold text-slate-800 text-base md:text-lg leading-tight truncate">
            {user.username}
          </h3>
          <p className="text-xs text-slate-400 font-medium mt-0.5">
            Joined:{" "}
            {user.dateOfJoining ? user.dateOfJoining.split("T")[0] : "N/A"}
          </p>
        </div>
      </div>

      <div className="bg-slate-50/50 rounded-xl p-3 md:p-4 mb-4 md:mb-5 border border-slate-100">
        <p className="text-[10px] md:text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">
          Leaves Remaining
        </p>
        <div className="flex items-baseline">
          <span className="text-xl md:text-2xl font-extrabold text-[#4F46E5]">
            {user.leaveBalance}
          </span>
          <span className="text-xs md:text-sm font-medium text-slate-400 ml-1">
            / 20 Days
          </span>
        </div>
      </div>

      <div className="mt-auto">
        <button
          onClick={() => setSelectedUserId(user._id)}
          className="w-full cursor-pointer bg-[#5E5CE6] hover:bg-[#4F46E5] text-white text-sm md:text-base font-semibold py-2.5 md:py-3 rounded-xl transition-colors shadow-sm shadow-indigo-200 flex items-center justify-center group"
        >
          View Attendance
          <span className="ml-2 opacity-70 group-hover:opacity-100 transition-opacity">
            →
          </span>
        </button>

        {selectedUserId && (
          <UserAttendanceModal
            userId={selectedUserId}
            onClose={() => setSelectedUserId(null)}
          />
        )}
      </div>
    </div>
  );
}

const PendingLeaves = ({ pendingLeaves = [], onAction }) => {
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  if (!pendingLeaves.length) {
    return (
      <p className="text-slate-500 mt-2">No pending requests at this time.</p>
    );
  }

  return (
    <div className="space-y-4 mt-6">
      {pendingLeaves.map((leave) => (
        <div
          key={leave._id}
          className="bg-white rounded-2xl p-5 shadow-sm border flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          {/* LEFT INFO */}
          <div>
            <h3 className="font-bold text-slate-900 text-lg">
              {leave.user.username}
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              {leave.reason || "No reason provided"}
            </p>

            <p className="text-xs text-slate-400 mt-2">
              {formatDate(leave.startDate)} → {formatDate(leave.endDate)}
            </p>

            <p className="text-xs font-semibold text-indigo-600 mt-1">
              {leave.totalDays} day(s)
            </p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => onAction(leave._id, "approved")}
              className="px-4 py-2 text-sm font-semibold rounded-xl bg-emerald-100 cursor-pointer text-emerald-700 hover:bg-emerald-200"
            >
              Approve
            </button>

            <button
              onClick={() => onAction(leave._id, "rejected")}
              className="px-4 py-2 text-sm font-semibold rounded-xl bg-rose-100 cursor-pointer text-rose-700 hover:bg-rose-200"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};
