import { useEffect, useState } from "react";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  withCredentials: true,
});

export default function UserAttendanceModal({ userId, onClose }) {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await api.get(`/attendance/all-attendance/${userId}`);
        setAttendance(res.data.attendance);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchAttendance();
  }, [userId]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm py-2">
      
      {/* Modal */}
      <div className="attendance bg-white w-full h-[80%] max-w-lg mx-4 rounded-2xl shadow-xl p-6 relative animate-in fade-in zoom-in-95 overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-slate-900">
            Attendance
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 cursor-pointer hover:text-slate-700 text-lg"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <p className="text-center text-slate-500">Loading...</p>
        ) : attendance.length === 0 ? (
          <p className="text-center text-slate-500">
            No attendance found
          </p>
        ) : (
          <div className="space-y-3 max-h-100 overflow-y-auto">
            {attendance.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border"
              >
                {/* Date */}
                <span className="font-medium text-slate-800">
                  {formatDate(item.date)}
                </span>

                {/* Status */}
                <span
                  className={`px-3 py-1 text-xs font-bold rounded-lg ${
                    item.status === "present"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-rose-100 text-rose-700"
                  }`}
                >
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}