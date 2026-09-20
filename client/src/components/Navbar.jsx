import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
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
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center gap-1 -ml-4">
        <ResumeIcon size={60} plain={true} className="border border-gray-900" />
        <div>
          <h1 className="font-bold text-gray-900 leading-tight text-base">
            Resume Builder
          </h1>
          <p className="text-xs text-gray-500 leading-tight">
            {isAdmin ? "Admin Panel" : "Build Your Future"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-blue-600 transition">
          <QuestionMarkCircleIcon className="w-5 h-5" />
          Help
        </button>

        <div
          className="w-9 h-9 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold"
          title={user?.name || user?.email || "User"}
        >
          {(user?.name || user?.email || "S").charAt(0).toUpperCase()}
        </div>

        <button
          onClick={handleLogoutClick}
          className="bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </header>
  );
}