import React from "react";
import { useNavigate } from "react-router";

const LandingPage = () => {

    const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans relative overflow-hidden">
      
      {/* Background ambient gradient to match the top-left glow */}
      <div className="absolute top-0 left-0 w-full h-200 bg-[radial-gradient(ellipse_at_top_left,var(--tw-gradient-stops))] from-blue-100/80 via-transparent to-transparent pointer-events-none z-0"></div>

      {/* Navbar */}
      <header className="relative z-10 flex flex-wrap justify-between items-center px-6 md:px-16 py-6 bg-transparent">
        <h1 className="font-bold text-xl tracking-tight text-slate-900">ELAMS (Mini HR Tool)</h1>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <button onClick={()=>{navigate("/login")}} className="hidden md:block text-sm font-semibold text-[#3A36DB] hover:text-indigo-800 cursor-pointer">
            Login
          </button>
          <button className="hidden md:block bg-[#3A36DB] hover:bg-[#322bc2] text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm cursor-pointer">
            Register
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 px-6 md:px-16 pt-5 pb-5 flex flex-col lg:flex-row items-center gap-12 lg:gap-8 max-w-7xl mx-auto">
        
        {/* Left Content */}
        <div className="flex-1 w-full mt-4">
          <h1 className="text-5xl lg:text-[4rem] font-extrabold leading-[1.05] tracking-tight text-slate-900">
            Simplify Your HR <br />
            Workflow. <br />
            <span className="text-[#3A36DB]">Empower Your <br /> Team.</span>
          </h1>

          <p className="mt-6 text-slate-600 text-lg max-w-md leading-relaxed">
            Effortless leave tracking and real-time attendance monitoring for the modern workforce. Designed with editorial professionalism.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <button onClick={()=>{navigate("/login")}} className="flex items-center justify-center gap-2 bg-[#3A36DB] hover:bg-[#322bc2] text-white px-7 py-3.5 rounded-xl font-medium transition-all shadow-md shadow-indigo-200 cursor-pointer">
              Login
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </button>
            <button className="flex items-center justify-center gap-2 bg-white text-[#3A36DB] font-medium border border-slate-200 shadow-sm px-7 py-3.5 rounded-xl hover:bg-slate-50 transition-all cursor-pointer">
              Register
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            </button>
          </div>
        </div>

        {/* Right Content - Floating Card */}
        <div className="flex-1 w-full relative flex justify-center lg:justify-end">
          {/* Decorative background shape */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-linear-to-br from-indigo-100/50 to-transparent rounded-[3rem] -rotate-3 -z-10"></div>
          
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] p-6 md:p-8 w-full max-w-110 border border-white">
            
            {/* Card Header */}
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-200">
                  {/* Using a placeholder avatar image */}
                  <img src="https://avatars.githubusercontent.com/u/183407127?v=4" alt="Sarah Jenkins" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">Karthik J Nair</h3>
                  <p className="text-xs text-slate-500 font-medium">Jr MERN Stack Developer</p>
                </div>
              </div>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-[#EEF2FF] p-4 rounded-xl">
                <p className="text-[10px] font-bold tracking-wider text-slate-500 mb-1">LEAVE BALANCE</p>
                <p className="font-bold text-2xl text-[#3A36DB]">14 Days</p>
              </div>
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                <p className="text-[10px] font-bold tracking-wider text-slate-500 mb-1">LEAVE STATUS</p>
                <p className="font-bold text-2xl text-slate-800">Pending</p>
              </div>
            </div>

            {/* Recent Activity */}
            <div>
              <h4 className="font-bold text-sm text-slate-800 mb-4">Recent Activity</h4>
              
              <div className="flex flex-col gap-4">
                {/* Activity Item 1 */}
                <div className="flex items-start gap-4">
                  <div className="bg-[#EEF2FF] text-[#3A36DB] p-2.5 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21.5 4c0 0-2 .5-3.5 2L14.5 9.5 6.3 7.7 4.6 9.4l6.6 2.8L7.8 15.6 5 15 4 16l3 3 3 3 1-1-.6-2.8 3.4-3.4 2.8 6.6z"/></svg>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-slate-900">Casual Leave</p>
                    <p className="text-xs text-slate-500 mt-0.5">Approved • Oct 12 - Oct 15</p>
                  </div>
                </div>

                {/* Activity Item 2 */}
                <div className="flex items-start gap-4">
                  <div className="bg-[#EEF2FF] text-[#3A36DB] p-2.5 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-slate-900">Sick Leave</p>
                    <p className="text-xs text-slate-500 mt-0.5">Taken • Sep 04</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 px-6 md:px-10 py-15 bg-transparent text-center max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
          Elevate Your HR Operations
        </h2>
        <p className="text-slate-600 mt-4 max-w-2xl mx-auto text-lg">
          Intuitive tools designed to reduce friction and return time to what matters most: your people.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-14">
          
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] text-left hover:-translate-y-1 transition-transform duration-300">
            <div className="bg-[#EEF2FF] text-[#3A36DB] w-12 h-12 flex items-center justify-center rounded-xl mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/><path d="m9 16 2 2 4-4"/></svg>
            </div>
            <h3 className="font-bold text-xl text-slate-900 mb-3">
              Smart Leave Management
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Auto-calculated balances and instant requests. Empower employees to manage their time off seamlessly while providing managers with clear oversight.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] text-left hover:-translate-y-1 transition-transform duration-300">
            <div className="bg-[#EEF2FF] text-[#3A36DB] w-12 h-12 flex items-center justify-center rounded-xl mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <h3 className="font-bold text-xl text-slate-900 mb-3">
              Daily Attendance Tracking
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              One-click check-ins and detailed history logs. Maintain accurate records with minimal effort, ensuring compliance and transparency.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] text-left hover:-translate-y-1 transition-transform duration-300">
            <div className="bg-[#EEF2FF] text-[#3A36DB] w-12 h-12 flex items-center justify-center rounded-xl mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
            </div>
            <h3 className="font-bold text-xl text-slate-900 mb-3">
              Role-Based Security
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              Secure, distinct access for Employees and Administrators. Protect sensitive data while granting the right permissions to the right people.
            </p>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#F4F7FA] border-t border-slate-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 md:px-16 py-8 flex flex-col md:flex-row justify-between  gap-6 text-xs text-slate-500 font-medium">
          <p className="font-bold text-slate-900 text-sm">ELAMS (Mini HR Tool)</p>
          
          <p>© 2026 The Human Equilibrium. Editorial Professionalism in HR.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;