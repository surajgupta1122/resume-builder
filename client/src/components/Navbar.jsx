import ResumeIcon from "./ResumeIcon";

export default function Navbar({ user, onLogout, setPage }) {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-20">
      {/* Left: Logo + Brand */}
      <div className="flex items-center gap-1 -ml-4">
        <ResumeIcon size={60} plain={true} className="border border-gray-300 rounded-lg" />
        <div>
          <h1 className="font-bold text-gray-900 leading-tight text-xl">
            Resume Builder
          </h1>
          <p className="text-sm text-gray-500 leading-tight">
            Build Your Future
          </p>
        </div>
      </div>

      {/* Right: Help + Avatar + Logout */}
      <div className="flex items-center gap-6">

        <div
          className="w-9 h-9 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold"
          title={user?.name || user?.email || "User"}
        >
          {(user?.name || user?.email || "S").charAt(0).toUpperCase()}
        </div>

        <button
          onClick={onLogout}
          className="bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>

        <button className="text-sm font-medium text-gray-600 hover:text-blue-600 transition">
          Help
        </button>
        
      </div>
    </header>
  );
}