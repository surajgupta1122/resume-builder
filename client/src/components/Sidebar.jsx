import { 
  PencilSquareIcon, 
  FolderIcon, 
  RectangleGroupIcon, 
  EyeIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";

export default function Sidebar({ currentPage, setPage }) {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const isAdmin = user && user.role === "admin";

  const items = [
    ...(isAdmin
      ? [{ id: "admin", label: "Admin Dashboard", icon: ShieldCheckIcon }]
      : []),
    { id: "form", label: "Create Resume", icon: PencilSquareIcon },
    { id: "resumes", label: "My Resumes", icon: FolderIcon },
    { id: "template", label: "Templates", icon: RectangleGroupIcon },
    { id: "preview", label: "Preview", icon: EyeIcon },
  ];

  return (
    <aside className="w-64 bg-gray-50/50 border-r border-gray-200 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto flex-shrink-0">
      <nav className="flex flex-col gap-1 p-4">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => setPage(item.id)}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                isActive
                  ? "bg-blue-50 text-blue-700 ring-1 ring-blue-700/10"
                  : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              }`}
            >
              <Icon 
                className={`w-6 h-6 shrink-0 transition-colors ${
                  isActive 
                    ? "text-blue-600" 
                    : "text-gray-400 group-hover:text-gray-600"
                }`} 
              />
              <span>{item.label}</span>
              
              {/* Active Indicator Dot */}
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-600 shadow-sm" />
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}