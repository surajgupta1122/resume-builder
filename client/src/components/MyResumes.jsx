import { useEffect, useState } from "react";
import {
  PlusIcon,
  DocumentTextIcon,
  TrashIcon,
  FolderOpenIcon,
} from "@heroicons/react/24/outline";

export default function MyResumes({ setPage, setResumeData }) {
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadResumes = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return setPage("login");

    fetch(`http://localhost:5000/api/resumes/${user.id}`)
      .then((r) => r.json())
      .then((data) => {
        setResumes(data);
        setLoading(false);
      })
      .catch(() => {
        alert("Cannot load resumes. Is backend running?");
        setLoading(false);
      });
  };

  useEffect(() => {
    loadResumes();
  }, []);

  const handleOpen = (resume) => {
    try {
      const parsed = JSON.parse(resume.content);
      setResumeData(parsed);
      setPage("preview");
    } catch {
      alert("Cannot open this resume.");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this resume?")) return;
    try {
      await fetch(`http://localhost:5000/api/resume/${id}`, {
        method: "DELETE",
      });
      setResumes(resumes.filter((r) => r.resume_id !== id));
    } catch {
      alert("Cannot delete. Is backend running?");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Resumes</h1>
          <p className="text-gray-600 mt-1">
            All your saved resumes in one place
          </p>
        </div>
        <button
          onClick={() => setPage("form")}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center gap-2"
        >
          <PlusIcon className="w-5 h-5" />
          Create New
        </button>
      </div>

      {loading && (
        <div className="text-center py-16 text-gray-500">Loading...</div>
      )}

      {!loading && resumes.length === 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
          <DocumentTextIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No resumes yet
          </h3>
          <p className="text-gray-600 mb-6">
            Create your first resume to see it here.
          </p>
          <button
            onClick={() => setPage("form")}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition inline-flex items-center gap-2"
          >
            <PlusIcon className="w-5 h-5" />
            Create Resume
          </button>
        </div>
      )}

      {!loading && resumes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
                <div className="bg-slate-900 text-white p-4 flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-slate-700 font-bold text-lg">
                    {name.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold truncate">{name}</p>
                    <p className="text-xs text-gray-400 truncate">
                      {title || "No title"}
                    </p>
                  </div>
                </div>

                <div className="p-4 flex-1">
                  <p className="text-xs text-gray-500 mb-2">
                    Created: {new Date(r.created_at).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    Template: {r.template_id}
                  </p>

                  {skills.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
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

                <div className="p-3 border-t border-gray-100 flex gap-2">
                  <button
                    onClick={() => handleOpen(r)}
                    className="flex-1 bg-blue-600 text-white text-sm py-2 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-1.5"
                  >
                    <FolderOpenIcon className="w-4 h-4" />
                    Open
                  </button>
                  <button
                    onClick={() => handleDelete(r.resume_id)}
                    className="bg-white border border-red-300 text-red-500 text-sm px-3 py-2 rounded-lg font-semibold hover:bg-red-50 transition flex items-center justify-center"
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