import { useState } from "react";
import ResumeIcon from "./ResumeIcon";
import resumeIllustration from "../assets/icon.png";
import { API_URL } from "../config";

export default function Login({ setUser, setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields.");
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
        alert(data.message || "Invalid email or password.");
      }
    } catch {
      alert("Server not reachable. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-50 to-indigo-100 flex-col justify-center items-center px-12 pt-12 border-r-2 border-blue-200 rounded-r-3xl">
        <ResumeIcon size={180} />
        <div className="max-w-md text-center mt-6">
          <h1 className="text-5xl font-extrabold text-blue-900 mb-4">
            Resume Builder
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Create a professional resume that stands out and lands you the job.
          </p>
          <img
            src={resumeIllustration}
            alt="Resume Illustration"
            className="w-72 h-72 mx-auto drop-shadow-lg"
          />
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-6 bg-white">
        <div className="w-full max-w-xl p-12 bg-white rounded-3xl">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            Log into Resume Builder
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <input
                type="email"
                required
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <input
                type="password"
                required
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-full font-semibold hover:bg-blue-700 transition duration-200 disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <p className="text-center text-sm text-gray-600">
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