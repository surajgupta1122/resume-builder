import { useState } from "react";
import ResumeIcon from "./ResumeIcon";
import resumeIllustration from "../assets/icon.png";
import { isValidEmail } from "../validators";
import { API_URL } from "../config";
import { useUI } from "../context/UIContext";

export default function Register({ setPage }) {
  const { toast } = useUI();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast("Please fill in all fields", "error");
      return;
    }
    if (name.trim().length < 2) {
      toast("Name must be at least 2 characters", "error");
      return;
    }
    if (!isValidEmail(email)) {
      toast("Please enter a valid email address", "error");
      return;
    }
    if (password.length < 6) {
      toast("Password must be at least 6 characters", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (res.ok) {
        toast("Registration successful! Please log in.", "success");
        setPage("login");
      } else {
        toast(data.message || "Registration failed", "error");
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
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-green-50 to-emerald-100 flex-col justify-center items-center border-r-2 border-green-200 rounded-r-3xl">
        <ResumeIcon size={180} theme="green" />
        <div className="max-w-md text-center mt-6">
          <h1 className="text-3xl lg:text-5xl font-extrabold text-green-900 mb-3 lg:mb-4">
            Join Us
          </h1>
          <p className="text-base lg:text-lg text-gray-700 mb-6 lg:mb-8">
            Start building your professional future today. It only takes a
            minute.
          </p>
          <img
            src={resumeIllustration}
            alt="Resume Illustration"
            className="w-48 lg:w-72 h-48 lg:h-72 mx-auto drop-shadow-lg"
          />
        </div>
      </div>

      {/* Right Side — Register Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-4 md:p-6 bg-white">
        <div className="w-full max-w-md md:max-w-xl px-2 py-6 md:p-12 bg-white rounded-3xl">
          {/* Mobile brand header (only on small screens) */}
          <div className="md:hidden flex flex-col items-center mb-6">
            <ResumeIcon size={100} theme="green" />
            <h1 className="text-2xl font-extrabold text-green-900 mt-3">
              Join Us
            </h1>
          </div>

          <h2 className="text-xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-12 text-center">
            Create an Account
          </h2>

          <form onSubmit={handleRegister} className="space-y-4 md:space-y-5">
            <div>
              <input
                type="text"
                required
                className="w-full px-4 py-3 text-sm md:text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <input
                type="email"
                required
                className="w-full px-4 py-3 text-sm md:text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <input
                type="password"
                required
                className="w-full px-4 py-3 text-sm md:text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 transition duration-200 disabled:opacity-50 text-sm md:text-base"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <div className="flex items-center my-5 md:my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-xs md:text-sm text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <p className="text-center text-xs md:text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              className="text-green-600 font-semibold cursor-pointer hover:underline bg-transparent border-0"
              onClick={() => setPage("login")}
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}