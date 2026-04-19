import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");
  
  const navigate = useNavigate();
  // Assuming your useAuth hook provides a handleRegister function similar to handleLogin
  const { handleRegister } = useAuth();

  async function submitHandle(e) {
    e.preventDefault();
    
    // Pass the required fields to your register handler
    const result = await handleRegister({
      username,
      email,
      password,
      dateOfJoining
    });

    // Mirroring the login navigation logic
    if (result?.success === "true") {
      navigate("/login");
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans relative flex flex-col justify-center items-center overflow-hidden py-10">
      {/* Background ambient gradient */}
      <div className="absolute top-0 left-0 w-full h-200 bg-[radial-gradient(ellipse_at_top_left,var(--tw-gradient-stops))] from-blue-100/80 via-transparent to-transparent pointer-events-none z-0"></div>

      {/* Brand Header */}
      <div className="relative z-10 flex flex-col items-center mb-8 text-center">
        <h1 className="font-extrabold text-3xl tracking-tight text-slate-900 mt-3 mb-1">
          ELAMS (Mini HR Tool)
        </h1>
      </div>

      {/* Register Card */}
      <div className="relative z-10 bg-white/95 backdrop-blur-sm rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-10 md:p-12 w-full max-w-125 border border-white">
        <div className="mb-8">
          <h2 className="font-bold text-2xl text-slate-900 mb-2">
            Create an Account
          </h2>
          <p className="text-slate-600 text-sm">
            Sign up to get started with your workspace.
          </p>
        </div>

        <form onSubmit={submitHandle} className="space-y-5">
          
          {/* Username Field */}
          <div>
            <label
              htmlFor="username"
              className="block text-[10px] font-bold tracking-wider text-slate-500 mb-1.5 uppercase"
            >
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                id="username"
                name="username"
                required
                placeholder="johndoe"
                className="w-full bg-[#EEF2FF] text-sm text-slate-700 placeholder-slate-400 pl-11 pr-4 py-3.5 rounded-xl border border-[#EEF2FF] focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-[10px] font-bold tracking-wider text-slate-500 mb-1.5 uppercase"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
              </div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
                name="email"
                required
                placeholder="karthik.j@company.com"
                className="w-full bg-[#EEF2FF] text-sm text-slate-700 placeholder-slate-400 pl-11 pr-4 py-3.5 rounded-xl border border-[#EEF2FF] focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label
                htmlFor="password"
                className="block text-[10px] font-bold tracking-wider text-slate-500 uppercase"
              >
                Password
              </label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
              </div>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
                minLength={6}
                placeholder="••••••••"
                className="w-full bg-[#EEF2FF] text-sm text-slate-700 placeholder-slate-400 pl-11 pr-11 py-3.5 rounded-xl border border-[#EEF2FF] focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                    <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                    <line x1="2" y1="2" x2="22" y2="22" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Date of Joining Field */}
          <div>
            <label
              htmlFor="dateOfJoining"
              className="block text-[10px] font-bold tracking-wider text-slate-500 mb-1.5 uppercase"
            >
              Date of Joining
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                  <line x1="16" x2="16" y1="2" y2="6" />
                  <line x1="8" x2="8" y1="2" y2="6" />
                  <line x1="3" x2="21" y1="10" y2="10" />
                </svg>
              </div>
              {/* Note: In some browsers, the native date picker icon might overlap with the padding. 
                  You can hide the native calendar icon in CSS using pseudo-elements if desired, 
                  but type="date" natively handles the calendar popup. */}
              <input
                value={dateOfJoining}
                onChange={(e) => setDateOfJoining(e.target.value)}
                type="date"
                id="dateOfJoining"
                name="dateOfJoining"
                required
                className="w-full bg-[#EEF2FF] text-sm text-slate-700 placeholder-slate-400 pl-11 pr-4 py-3.5 rounded-xl border border-[#EEF2FF] focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
              />
            </div>
          </div>

          {/* Register Button */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full cursor-pointer flex items-center justify-center gap-2 bg-[#3A36DB] hover:bg-[#322bc2] text-white px-7 py-4 rounded-2xl font-semibold transition-all shadow-lg shadow-indigo-200 text-base"
            >
              Create Account
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
          
          <div className="text-center mt-4">
            <p className="text-sm text-slate-600">
              Already have an account?{" "}
              <Link to="/login" className="text-[#3A36DB] font-semibold hover:underline">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;