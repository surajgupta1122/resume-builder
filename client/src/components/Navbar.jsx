import {
  QuestionMarkCircleIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import ResumeIcon from "./ResumeIcon";
import { useUI } from "../context/UIContext";

export default function Navbar({ user, onLogout, setPage }) {
  const { confirm } = useUI();
  const isAdmin = user && user.role === "admin";

  const handleLogoutClick = async () => {
    const ok = await confirm({
      title: "Log out?",
      message: "You will need to log in again to access your resumes.",
      confirmText: "Logout",
      cancelText: "Stay",
      variant: "danger",
    });
    if (ok) onLogout();
  };

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-2 md:px-6 sticky top-0 z-20">
      <div className="flex items-center md:-ml-4 min-w-0">
        <div className="-ml-3 md:ml-0 shrink-0">
          <ResumeIcon
            size={50}
            plain={true}
            className="border border-gray-900"
          />
        </div>
        <div className="min-w-0">
          <h1 className="font-bold leading-tight text-base md:text-lg truncate">
            <span className="text-gray-900">Resume</span>{" "}
            <span className="text-blue-600">Builder</span>
          </h1>
          <p className="text-xs md:text-sm text-gray-500 leading-tight truncate">
            {isAdmin ? "Admin Panel" : "Build Your Future"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-4 shrink-0">
        <button className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-blue-600 transition">
          <QuestionMarkCircleIcon className="w-5 h-5" />
          <span className="hidden sm:inline">Help</span>
        </button>

        <div
          className="w-9 h-9 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0"
          title={user?.name || user?.email || "User"}
        >
          {(user?.name || user?.email || "S").charAt(0).toUpperCase()}
        </div>

        <button
          onClick={handleLogoutClick}
          className="bg-red-500 text-white text-sm font-semibold px-3 md:px-4 py-2 rounded-lg hover:bg-red-600 transition flex items-center gap-1.5"
        >
          <ArrowRightOnRectangleIcon className="w-4 h-4" />
          Logout
        </button>
      </div>
    </header>
  );
}