import { useEffect, useState } from "react";
import {
  PlusIcon,
  DocumentTextIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { authFetch } from "../api";
import { useUI } from "../context/UIContext";
import { templateList } from "./templates/templateList";
import TemplateMinimalMark from "./templates/TemplateMinimalMark";

export default function MyResumes({
  setPage,
  resumeData,
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

    authFetch(`http://localhost:5000/api/resumes/${user.id}`)
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

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    const ok = await confirm({
      title: "Delete this resume?",
      message: "This action cannot be undone.",
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "danger",
    });
    if (!ok) return;

    try {
      const res = await authFetch(`http://localhost:5000/api/resume/${id}`, {
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
    <div className="p-3 md:p-6 max-w-6xl mx-auto">
      {/* Header */}
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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {resumes.map((r) => {
            let parsed = {};
            try {
              parsed = JSON.parse(r.content);
            } catch {}

            const name = parsed.name || "Untitled";
            const templateInfo = templateList.find(
              (t) => t.id === r.template_id
            );
            const categoryLabel = templateInfo?.categoryLabel || "Minimal";
            const Comp = templateInfo?.Component || TemplateMinimalMark;
            const isSelected = resumeData?.resume_id === r.resume_id;

            return (
              <div
                key={r.resume_id}
                onClick={() => handleOpen(r)}
                className={`group relative bg-white rounded-2xl border-2 overflow-hidden cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  isSelected
                    ? "border-blue-600 ring-2 ring-blue-100"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {/* Mini resume preview */}
                <div className="relative aspect-[8.5/11] overflow-hidden bg-white">
                  <div
                    className="absolute top-0 left-0 origin-top-left pointer-events-none"
                    style={{
                      width: "300%",
                      height: "300%",
                      transform: "scale(0.3333)",
                    }}
                  >
                    <Comp resumeData={parsed} large={true} />
                  </div>

                  {/* Selected checkmark */}
                  {isSelected && (
                    <div className="absolute top-2 right-2 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center shadow-md z-10">
                      <svg
                        className="w-4 h-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Delete button */}
                  <button
                    onClick={(e) => handleDelete(e, r.resume_id)}
                    className="absolute top-1.5 left-1.5 w-7 h-7 rounded-full bg-white/95 text-red-500 hover:bg-red-500 hover:text-white transition flex items-center justify-center shadow-md z-20 opacity-0 group-hover:opacity-100 md:opacity-0"
                    style={{ opacity: 1 }}
                    title="Delete resume"
                  >
                    <TrashIcon className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Name + category */}
                <div className="p-2.5 border-t border-gray-100 bg-white">
                  <p className="font-bold text-gray-900 text-xs md:text-sm truncate">
                    {name}
                  </p>
                  <p className="text-[10px] md:text-xs text-gray-500 mt-0.5 truncate">
                    {categoryLabel}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}