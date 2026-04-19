import React, { useState } from "react";
import { useHome } from "../hooks/useHome";

const ApplyLeaveContent = ({ setNewLeave }) => {
  const { handleApplyLeave } = useHome();

  const [formData, setFormData] = useState({
    leaveType: "casual",
    startDate: "",
    endDate: "",
    reason: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleApplyLeave(formData);
    setNewLeave(false);
    
  };

  return (
    <div className="w-full p-3 md:p-6 border-none rounded-4xl bg-zinc-600 absolute top-10 md:left-30 z-10 animate-in fade-in duration-300 max-w-3xl mx-auto">
      {/* Header Area */}
      <div className="mb-8">
        <button
          onClick={() => setNewLeave(false)}
          className="flex items-center gap-2 text-sm font-semibold text-blue-50 hover:underline transition-colors mb-4 cursor-pointer"
        >
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
            <path d="m15 18-6-6 6-6" />
          </svg>
          Back to Leave Requests
        </button>
        <h1 className="text-3xl font-bold text-slate-50">Apply for Leave</h1>
        <p className="text-slate-100 mt-1">
          Submit a new time-off request for manager approval.
        </p>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-10 relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-indigo-50/50 to-transparent rounded-full -mr-20 -mt-20 pointer-events-none"></div>

        <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
          {/* Leave Type Select */}
          <div>
            <label
              htmlFor="leaveType"
              className="block text-[10px] font-bold tracking-wider text-slate-500 mb-1.5 uppercase"
            >
              Leave Type
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#3A36DB]">
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
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                  <path d="m9 16 2 2 4-4" />
                </svg>
              </div>
              <select
                id="leaveType"
                name="leaveType"
                value={formData.leaveType}
                onChange={handleChange}
                required
                className="w-full bg-[#EEF2FF] text-sm font-semibold text-slate-700 pl-11 pr-10 py-3.5 rounded-xl border border-[#EEF2FF] focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all outline-none appearance-none cursor-pointer"
              >
                <option value="casual">Casual Leave</option>
                <option value="sick">Sick Leave</option>
                <option value="earned">Unpaid Leave</option>
              </select>
              {/* Custom dropdown arrow */}
              <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-500">
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
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>

          {/* Date Range Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Start Date */}
            <div>
              <label
                htmlFor="startDate"
                className="block text-[10px] font-bold tracking-wider text-slate-500 mb-1.5 uppercase"
              >
                Start Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  value={formData.startDate}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#EEF2FF] text-sm font-medium text-slate-700 px-4 py-3.5 rounded-xl border border-[#EEF2FF] focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all outline-none cursor-pointer"
                />
              </div>
            </div>

            {/* End Date */}
            <div>
              <label
                htmlFor="endDate"
                className="block text-[10px] font-bold tracking-wider text-slate-500 mb-1.5 uppercase"
              >
                End Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  value={formData.endDate}
                  onChange={handleChange}
                  required
                  min={formData.startDate} // Ensure end date isn't before start date
                  className="w-full bg-[#EEF2FF] text-sm font-medium text-slate-700 px-4 py-3.5 rounded-xl border border-[#EEF2FF] focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all outline-none cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Reason Textarea */}
          <div>
            <label
              htmlFor="reason"
              className="block text-[10px] font-bold tracking-wider text-slate-500 mb-1.5 uppercase"
            >
              Reason / Remarks
            </label>
            <textarea
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Please provide a brief reason for your leave request..."
              rows="4"
              className="w-full bg-[#EEF2FF] text-sm text-slate-700 placeholder-slate-400 p-4 rounded-xl border border-[#EEF2FF] focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all outline-none resize-none"
            ></textarea>
          </div>

          {/* Submit/Cancel Actions */}
          <div className="pt-4 flex flex-col-reverse md:flex-row items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setNewLeave(false)}
              className="w-full md:w-auto px-6 py-3.5 rounded-xl font-semibold text-slate-600 hover:bg-slate-100 transition-colors text-sm cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full md:w-auto flex items-center justify-center gap-2 bg-[#3A36DB] hover:bg-[#322bc2] text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-md shadow-indigo-200 text-sm disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            >
              Submit Request
              {/* {!isSubmitting && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              )} */}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyLeaveContent;
