import { useEffect, useState } from "react";
import {
  PlusIcon,
  DocumentTextIcon,
  TrashIcon,
  FolderOpenIcon,
} from "@heroicons/react/24/outline";
import { authFetch } from "../api";
import { useUI } from "../context/UIContext";
import { API_URL } from "../config";

export default function MyResumes({
  setPage,
  setResumeData,
  setTemplate,
  onCreateNew,
}) {
  const { toast, confirm } = useUI();
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadResumes = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return setPage("login");

    authFetch(`${API_URL}/api/resumes/${user.id}`)
      .then((r) => r.json())
      .then((data) => {
        setResumes(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        toast("Cannot load resumes. Is backend running?", "error");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadResumes();
  }, []);

  const handleOpen = (resume) => {
    try {
      const parsed = JSON.parse(resume.content);
      setResumeData({ ...parsed, resume_id: resume.resume_id });
      setTemplate(resume.template_id || "minimal-mark");
      setPage("preview");
    } catch {
      toast("Cannot open this resume", "error");
    }
  };

  const handleDelete = async (id) => {
    const ok = await confirm({
      title: "Delete this resume?",
      message: "This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "danger",
    });
    if (!ok) return;

    try {
      const res = await authFetch(`${API_URL}/api/resume/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) return toast("Cannot delete this resume", "error");
      setResumes(resumes.filter((r) => r.resume_id !== id));
      setResumeData((prev) =>
        prev.resume_id === id ? { ...prev, resume_id: null } : prev
      );
      toast("Resume deleted", "success");
    } catch {
      toast("Cannot delete. Is backend running?", "error");
    }
  };

  return (
    <div className="p-3 md:p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between gap-3 mb-5 md:mb-8">
        <div className="min-w-0">
          <h1 className="text-xl md:text-3xl font-bold text-gray-900 truncate">
            My Resumes
          </h1>
          <p className="text-xs md:text-base text-gray-600 mt-0.5 md:mt-1 truncate">
            All your saved resumes in one place
          </p>
        </div>
        <button
          onClick={onCreateNew}
          className="bg-blue-600 text-white px-3 md:px-5 py-2 md:py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center gap-1.5 md:gap-2 text-sm md:text-base shrink-0"
        >
          <PlusIcon className="w-4 h-4 md:w-5 md:h-5" />
          <span className="hidden sm:inline">Create New</span>
          <span className="sm:hidden">New</span>
        </button>
      </div>

      {loading && (
        <div className="text-center py-16 text-gray-500">Loading...</div>
      )}

      {!loading && resumes.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-16 text-center">
          <DocumentTextIcon className="w-12 h-12 md:w-16 md:h-16 text-gray-300 mx-auto mb-3 md:mb-4" />
          <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
            No resumes yet
          </h3>
          <p className="text-sm md:text-base text-gray-600 mb-5 md:mb-6">
            Create your first resume to see it here.
          </p>
          <button
            onClick={onCreateNew}
            className="bg-blue-600 text-white px-5 md:px-6 py-2.5 md:py-3 rounded-xl font-semibold hover:bg-blue-700 transition inline-flex items-center gap-2 text-sm md:text-base"
          >
            <PlusIcon className="w-4 h-4 md:w-5 md:h-5" />
            Create Resume
          </button>
        </div>
      )}

      {!loading && resumes.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
          {resumes.map((r) => {
            let name = "Untitled";
            let title = "";
            let skills = [];
            try {
              const parsed = JSON.parse(r.content);
              name = parsed.name || "Untitled";
              title = parsed.title || "";
              skills = (parsed.skills || []).slice(0, 3);
            } catch {}

            return (
              <div
                key={r.resume_id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition overflow-hidden flex flex-col"
              >
                <div className="bg-slate-900 text-white p-3 md:p-4 flex items-center gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-300 flex items-center justify-center text-slate-700 font-bold text-base md:text-lg shrink-0">
                    {name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold truncate text-sm md:text-base">
                      {name}
                    </p>
                    <p className="text-[11px] md:text-xs text-gray-400 truncate">
                      {title || "No title"}
                    </p>
                  </div>
                </div>

                <div className="p-3 md:p-4 flex-1">
                  <p className="text-[11px] md:text-xs text-gray-500 mb-1 md:mb-2">
                    Created: {new Date(r.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-[11px] md:text-xs text-gray-500 mb-2 md:mb-3 truncate">
                    Template: {r.template_id}
                  </p>

                  {skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-2 md:mb-3">
                      {skills.map((s) => (
                        <span
                          key={s}
                          className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="p-2.5 md:p-3 border-t border-gray-100 flex gap-2">
                  <button
                    onClick={() => handleOpen(r)}
                    className="flex-1 bg-blue-600 text-white text-xs md:text-sm py-2 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-1.5"
                  >
                    <FolderOpenIcon className="w-4 h-4" />
                    Open
                  </button>
                  <button
                    onClick={() => handleDelete(r.resume_id)}
                    className="bg-white border border-red-300 text-red-500 text-xs md:text-sm px-3 py-2 rounded-lg font-semibold hover:bg-red-50 transition flex items-center justify-center"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}