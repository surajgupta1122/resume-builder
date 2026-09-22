import { useState } from "react";
import ResumeIcon from "./ResumeIcon";
import resumeIllustration from "../assets/icon.png";
import { API_URL } from "../config";
import { useUI } from "../context/UIContext";

export default function Login({ setUser, setPage }) {
  const { toast } = useUI();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast("Please fill in all fields", "error");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        setUser(data.user);
      } else {
        toast(data.message || "Invalid email or password", "error");
      }
    } catch {
      toast("Server not reachable. Make sure the backend is running.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Side — Branding (desktop only) */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-50 to-indigo-100 flex-col justify-center items-center border-r-2 border-blue-200 rounded-r-3xl">
        <ResumeIcon size={180} />
        <div className="max-w-md text-center mt-6">
          <h1 className="text-3xl lg:text-5xl font-extrabold text-blue-900 mb-3 lg:mb-4">
            Resume Builder
          </h1>
          <p className="text-base lg:text-lg text-gray-700 mb-6 lg:mb-8">
            Create a professional resume that stands out and lands you the job.
          </p>
          <img
            src={resumeIllustration}
            alt="Resume Illustration"
            className="w-48 lg:w-72 h-48 lg:h-72 mx-auto drop-shadow-lg"
          />
        </div>
      </div>

      {/* Right Side — Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-2 md:p-4 bg-white">
        <div className="w-full max-w-md md:max-w-xl px-2 py-6 md:p-12 bg-white rounded-3xl">
          {/* Mobile brand header (only on small screens) */}
          <div className="md:hidden flex flex-col items-center mb-6">
            <ResumeIcon size={100} />
            <h1 className="text-2xl font-extrabold text-blue-900 mt-3">
              Resume Builder
            </h1>
          </div>

          <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-12 text-center">
            Log into Resume Builder
          </h2>

          <form onSubmit={handleLogin} className="space-y-4 md:space-y-5">
            <div>
              <input
                type="email"
                required
                className="w-full px-4 py-3 text-sm md:text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <input
                type="password"
                required
                className="w-full px-4 py-3 text-sm md:text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-200 disabled:opacity-50 text-sm md:text-base"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <div className="flex items-center my-5 md:my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-xs md:text-sm text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <p className="text-center text-xs md:text-sm text-gray-600">
            Don't have an account?{" "}
            <button
              type="button"
              className="text-blue-600 font-semibold cursor-pointer hover:underline bg-transparent border-0"
              onClick={() => setPage("register")}
            >
              Create new account
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}