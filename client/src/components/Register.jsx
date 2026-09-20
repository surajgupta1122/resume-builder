import { useState } from "react";
import ResumeIcon from "./ResumeIcon";
import resumeIllustration from "../assets/icon.png";
import { isValidEmail } from "../validators";
import { API_URL } from "../config";

export default function Register({ setPage }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please fill in all fields.");
      return;
    }
    if (name.trim().length < 2) {
      alert("Name must be at least 2 characters.");
      return;
    }
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
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
        alert("Registration successful! Please log in.");
        setPage("login");
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch {
      alert("Server not reachable. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-green-50 to-emerald-100 flex-col justify-center items-center px-12 pt-12 border-r-2 border-green-200 rounded-r-3xl">
        <ResumeIcon size={180} theme="green" />
        <div className="max-w-md text-center mt-6">
          <h1 className="text-5xl font-extrabold text-green-900 mb-4">
            Join Us
          </h1>
          <p className="text-lg text-gray-700 mb-8">
            Start building your professional future today. It only takes a
            minute.
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
            Create an Account
          </h2>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <input
                type="text"
                required
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <input
                type="email"
                required
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <input
                type="password"
                required
                className="w-full px-4 py-3 text-lg border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
                placeholder="Create a strong password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-full font-semibold hover:bg-green-700 transition duration-200 disabled:opacity-50"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <p className="text-center text-sm text-gray-600">
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