import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router";
import { useAuth } from "../../auth/hooks/useAuth";
import { useHome } from "../hooks/useHome";
import ApplyLeaveContent from "../components/ApplyLeaveContent";
import EditLeave from "../components/EditLeave";

const HomePage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(() => {
    return localStorage.getItem("activeTab") || "home";
  });
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const {handleLogout} = useHome();

  if (user?.role !== "employee") {
    navigate("/login");
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Navigation Items
  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="7" height="9" x="3" y="3" rx="1" />
          <rect width="7" height="5" x="14" y="3" rx="1" />
          <rect width="7" height="9" x="14" y="12" rx="1" />
          <rect width="7" height="5" x="3" y="16" rx="1" />
        </svg>
      ),
    },

    {
      id: "leave",
      label: "Leave Requests",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
      ),
    },

    {
      id: "attendance",
      label: "Attendance Log",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans flex flex-col md:flex-row">
      {/* --- MOBILE HEADER --- */}
      <div className="md:hidden flex justify-between items-center p-4 bg-white shadow-sm sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <span className="font-bold text-slate-900">ELAMS</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
        >
          {isMobileMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* --- SIDEBAR --- */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-30 w-64 bg-[#F8FAFC] border-r border-slate-200 transform transition-transform duration-300 ease-in-out flex flex-col
        ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:static md:w-72
      `}
      >
        {/* Profile Section */}
        <div className="p-6 pt-10">
          <div className="flex items-center gap-4 mb-8">
            <div>
              <h3 className="font-bold text-slate-900 text-lg">
                  ELAMS
              </h3>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  localStorage.setItem("activeTab", item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  activeTab === item.id
                    ? "bg-white text-[#3A36DB] shadow-sm border border-slate-100"
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="mt-auto p-6 space-y-4">
          <button
            onClick={()=>{handleLogout(); navigate("/login");}}
            className="w-full cursor-pointer flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-800 text-sm font-semibold transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-20 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 p-6 md:p-10 lg:p-12 max-w-7xl relative">
        {/* Background ambient gradient to match theme */}
        <div className="absolute top-0 left-0 w-full h-125 bg-[radial-gradient(ellipse_at_top_left,var(--tw-gradient-stops))] from-blue-50/50 via-transparent to-transparent pointer-events-none z-0"></div>

        <div className="relative z-10">
          {activeTab === "home" && <HomeContent user={user} />}
          {activeTab === "leave" && <LeaveRequestsContent />}
          {activeTab === "attendance" && <AttendanceLogContent />}
        </div>
      </main>
    </div>
  );
};

export default HomePage;

// --- SUB-COMPONENTS (Can be moved to separate files e.g., components/HomeContent.jsx) ---

const HomeContent = ({ user }) => {
  
  const {handleMarkAttendance} = useHome();
  return (
    <div className="animate-in fade-in duration-300">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
          Hello, <span className="uppercase">{user?.username}</span>
        </h1>
        <p className="text-slate-500 mt-1 text-sm md:text-base">
          {user?.role} • Joined{" "}
          {user?.dateOfJoining
            ? new Date(user.dateOfJoining).toLocaleDateString()
            : "N/A"}
        </p>
      </div>

      {/* Top Cards Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Leave Balance Card */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 lg:col-span-2 relative overflow-hidden">
          {/* Decorative subtle gradient */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-indigo-50 to-transparent rounded-full -mr-20 -mt-20 pointer-events-none"></div>

          <div className="relative z-10">
            <div className="flex justify-between items-start mb-6">
              <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">
                Remaining Leave Balance
              </p>
            </div>

            <div className="mb-8 flex items-baseline gap-1">
              <span className="text-5xl md:text-6xl font-bold text-slate-900">
                {user?.leaveBalance ?? 0}
              </span>
              <span className="text-xl md:text-2xl font-bold text-slate-500">
                /20 days
              </span>
            </div>

          </div>
        </div>

        {/* Today's Attendance Card */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-100 lg:col-span-1 flex flex-col">
          <div className="flex justify-between items-start mb-6">
            <p className="text-xs font-bold tracking-wider text-slate-500 uppercase">
              Today's Attendance
            </p>
          </div>

          <div className="bg-amber-50 rounded-2xl p-4 mb-auto border border-amber-100">
            {/* <p className="text-[10px] font-bold tracking-wider text-slate-500 uppercase mb-1">
              Current Status
            </p> */}
            <div className="flex items-center gap-2 text-amber-600 font-bold text-md">
              <div className="w-2 h-2 rounded-full bg-amber-500"></div>
              Mark Your Daily Attendance
            </div>
          </div>

          <button onClick={()=> handleMarkAttendance()} className="w-full mt-6 bg-slate-100 hover:bg-slate-200 text-slate-800 px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <polyline points="16 11 18 13 22 9" />
            </svg>
            Mark Here
          </button>
        </div>
      </div>
    </div>
  );
};

//=========================== Leave Requests Content =========================
const LeaveRequestsContent = () => {
  const [newLeave, setNewLeave] = useState(false);
  const { leaves, handleCancelLeave } = useHome();
  // const [editLeave, setEditLeave] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);

  // Helper function to format dates nicely
  const formatDate = (dateString) => {
    const options = { month: "short", day: "numeric", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Helper to determine badge colors based on status
  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return {
          bg: "bg-emerald-100",
          text: "text-emerald-700",
          border: "bg-emerald-400",
          iconBg: "bg-emerald-50",
          iconText: "text-emerald-600",
        };
      case "rejected":
        return {
          bg: "bg-rose-100",
          text: "text-rose-700",
          border: "bg-rose-400",
          iconBg: "bg-rose-50",
          iconText: "text-rose-600",
        };
      default: // pending
        return {
          bg: "bg-amber-100",
          text: "text-amber-700",
          border: "bg-amber-400",
          iconBg: "bg-amber-50",
          iconText: "text-amber-600",
        };
    }
  };

  return (
    <div className="animate-in fade-in duration-300">
      <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-slate-900">Leave Requests</h1>

        {newLeave && (
          <ApplyLeaveContent
            setNewLeave={setNewLeave}
            onClose={() => setNewLeave(false)}
          />
        )}

        
        {leaves && leaves.length > 0 && (
          <button
            onClick={() => setNewLeave(true)}
            className="bg-[#3A36DB] cursor-pointer hover:bg-[#322bc2] text-white px-5 py-2.5 rounded-xl font-medium transition-colors inline-flex items-center gap-2 text-sm shadow-md shadow-indigo-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            New Request
          </button>
        )}
      </div>

      {!leaves || leaves.length === 0 ? (
        /* --- EMPTY STATE --- */
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 text-center mt-4">
          <div className="bg-[#EEF2FF] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-[#3A36DB]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21.5 4c0 0-2 .5-3.5 2L14.5 9.5 6.3 7.7 4.6 9.4l6.6 2.8L7.8 15.6 5 15 4 16l3 3 3 3 1-1-.6-2.8 3.4-3.4 2.8 6.6z" />
            </svg>
          </div>
          <h3 className="font-bold text-lg text-slate-900 mb-2">
            Manage Your Leaves
          </h3>
          <p className="text-slate-500 max-w-sm mx-auto mb-6">
            View all your past requests, check statuses, or submit a new leave
            application.
          </p>
          <button onClick={()=>setNewLeave(true)} className="bg-[#3A36DB] hover:bg-[#322bc2] text-white px-6 py-3 rounded-xl font-medium transition-colors inline-flex items-center gap-2 text-sm shadow-md shadow-indigo-200">
            New Leave Request
          </button>
        </div>
      ) : (
        /* --- POPULATED LIST STATE --- */
        // Notice we start DIRECTLY with the Fragment '<>' here
        <>
          <div className="space-y-4">
            {leaves.map((leave) => {
              const config = getStatusConfig(leave.status);

              return (
                <div
                  key={leave._id}
                  className="group relative bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4 overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Left Accent Border based on status */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 ${config.border}`}
                  ></div>

                  {/* Main Content Info */}
                  <div className="flex items-start md:items-center gap-4 pl-2">
                    <div
                      className={`p-3 rounded-full shrink-0 ${config.iconBg} ${config.iconText}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect
                          width="18"
                          height="18"
                          x="3"
                          y="4"
                          rx="2"
                          ry="2"
                        />
                        <line x1="16" x2="16" y1="2" y2="6" />
                        <line x1="8" x2="8" y1="2" y2="6" />
                        <line x1="3" x2="21" y1="10" y2="10" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 capitalize text-base">
                        {leave.leaveType} Leave
                      </h3>
                      <p className="text-xs font-medium text-slate-500 mt-1">
                        {formatDate(leave.startDate)}
                        {leave.startDate !== leave.endDate &&
                          ` - ${formatDate(leave.endDate)}`}
                        <span className="mx-1.5">•</span>
                        {leave.totalDays} Day{leave.totalDays > 1 ? "s" : ""}
                      </p>
                      {leave.reason && (
                        <p className="text-sm text-slate-600 mt-1.5 italic">
                          "{leave.reason}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Status Badge & Actions */}
                  <div className="flex items-center justify-between md:justify-end gap-6 pl-14 md:pl-0 w-full md:w-auto mt-2 md:mt-0">
                    <span
                      className={`text-[10px] font-bold px-3 py-1.5 rounded-md uppercase tracking-wider ${config.bg} ${config.text}`}
                    >
                      {leave.status}
                    </span>

                    {/* Edit and Delete Buttons */}
                    <div className="flex items-center gap-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setSelectedLeave(leave)}
                        className="p-2 text-slate-400 hover:text-[#3A36DB] hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                        title="Edit Request"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                        </svg>
                      </button>
                      <button
                        onClick={() =>
                          handleCancelLeave({
                            leaveId: leave._id,
                            cancel: true,
                          })
                        }
                        className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Delete Request"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          <line x1="10" x2="10" y1="11" y2="17" />
                          <line x1="14" x2="14" y1="11" y2="17" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* EditLeave is now safely inside the same Fragment as the list */}
          {selectedLeave && (
            <EditLeave
              onClose={() => setSelectedLeave(null)}
              leaveId={selectedLeave._id}
              {...selectedLeave}
            />
          )}
        </>
      )}
    </div>
  );
};

//=========================== Attendance Log Content =========================
const AttendanceLogContent = () => {
  const { myattendance = [], loading } = useHome();

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="animate-in fade-in duration-300">
      <h1 className="text-3xl font-bold text-slate-900 mb-6 drop-shadow-sm">
        Attendance Log
      </h1>

      {loading ? (
        <div className="flex justify-center items-center py-10">
          <p className="text-slate-500 font-medium animate-pulse">Loading records...</p>
        </div>
      ) : myattendance.length === 0 ? (
        <div className="bg-white/40 backdrop-blur-md border border-white/30 rounded-3xl p-8 shadow-lg text-center">
          <p className="text-slate-600 font-medium">
            No attendance records found.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {myattendance.map((item) => (
            <div
              key={item._id}
              className="bg-white/40 hover:bg-white/60 backdrop-blur-md border border-white/30 rounded-xl p-4 shadow-sm hover:shadow-md flex justify-between items-center transition-all duration-200"
            >
              {/* Date */}
              <p className="font-semibold text-slate-800">
                {formatDate(item.date)}
              </p>

              {/* Status Badge */}
              <span
                className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm ${
                  item.status === "present"
                    ? "bg-emerald-100/80 text-emerald-700 border border-emerald-200/50"
                    : "bg-rose-100/80 text-rose-700 border border-rose-200/50"
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

