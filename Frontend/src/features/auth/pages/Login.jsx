import React, { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { handleLogin } = useAuth();

  async function submitHandle(e) {
    e.preventDefault();
    const result = await handleLogin(email, password);

    if(result.role === "admin") {
      navigate("/admin/dashboard");
    }

    if(result.role === "employee") {
      navigate("/home");
    }
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans relative flex flex-col justify-center items-center overflow-hidden">
      {/* Background ambient gradient */}
      <div className="absolute top-0 left-0 w-full h-200 bg-[radial-gradient(ellipse_at_top_left,var(--tw-gradient-stops))] from-blue-100/80 via-transparent to-transparent pointer-events-none z-0"></div>

      {/* Brand Header */}
      <div className="relative z-10 flex flex-col items-center mb-10 text-center">
        <h1 className="font-extrabold text-3xl tracking-tight text-slate-900 mt-3 mb-1">
          ELAMS (Mini HR Tool)
        </h1>
      </div>

      {/* Login Card */}
      <div className="relative z-10 bg-white/95 backdrop-blur-sm rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-10 md:p-12 w-full max-w-125 border border-white">
        <div className="mb-10">
          <h2 className="font-bold text-2xl text-slate-900 mb-2">
            Welcome Back
          </h2>
          <p className="text-slate-600 text-sm">
            Please sign in to continue to your workspace.
          </p>
        </div>

        <form onSubmit={submitHandle} className="space-y-6">
          {/* Email Field */}
          <div>
            <label
              htmlFor="email"
              className="block text-[10px] font-bold tracking-wider text-slate-500 mb-1.5 uppercase"
            >
              Enter Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
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
                placeholder="karthik.j@company.com"
                className="w-full bg-[#EEF2FF] text-sm text-slate-700 placeholder-slate-400 pl-11 pr-4 py-3.5 rounded-xl border border-[#EEF2FF] focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
              />
            </div>
          </div>

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
              {/* Lock Icon */}
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
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
                placeholder="••••••••"
                className="w-full bg-[#EEF2FF] text-sm text-slate-700 placeholder-slate-400 pl-11 pr-11 py-3.5 rounded-xl border border-[#EEF2FF] focus:border-indigo-300 focus:bg-white focus:ring-2 focus:ring-indigo-100 transition-all outline-none"
              />

              {/* Toggle Visibility Button */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  // Open Eye SVG
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
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                ) : (
                  // Closed Eye SVG
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
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
                    <path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
                    <line x1="2" y1="2" x2="22" y2="22" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Sign In Button */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full cursor-pointer flex items-center justify-center gap-2 bg-[#3A36DB] hover:bg-[#322bc2] text-white px-7 py-4 rounded-2xl font-semibold transition-all shadow-lg shadow-indigo-200 text-base"
            >
              Sign In
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
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </button>
          </div>
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-indigo-600 hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
