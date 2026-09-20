import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import Register from "./components/Register";
import ResumeForm from "./components/ResumeForm";
import TemplateSelect from "./components/TemplateSelect";
import Preview from "./components/Preview";
import Admin from "./components/Admin";
import MyResumes from "./components/MyResumes";

function safeParse(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    if (!value) return fallback;
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

const emptyResume = {
  name: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  website: "",
  title: "",
  summary: "",
  education: [{ degree: "", institute: "", startYear: "", passYear: "" }],
  experience: [
    {
      jobTitle: "",
      company: "",
      startDate: "",
      endDate: "",
      description: "",
    },
  ],
  projects: [{ name: "", tech: "", link: "", description: "" }],
  skills: [],
  certifications: [{ name: "", issuer: "", year: "" }],
  languages: [],
};

const withDefaults = (data) => ({ ...emptyResume, ...data });

function App() {
  const [user, setUser] = useState(() => safeParse("user", null));
  const [page, setPage] = useState(user ? "form" : "login");
  const [resumeData, setResumeData] = useState(() =>
    withDefaults(safeParse("resumeData", emptyResume))
  );
  const [template, setTemplate] = useState("minimal-mark");

  useEffect(() => {
    if (!user || !user.id) return;
    const key = `resumeData_${user.id}`;
    const saved = safeParse(key, emptyResume);
    setResumeData(withDefaults(saved));
  }, [user]);

  useEffect(() => {
    if (!user || !user.id) return;
    localStorage.setItem(`resumeData_${user.id}`, JSON.stringify(resumeData));
  }, [resumeData, user]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setPage("login");
    setResumeData(emptyResume);
  };

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    localStorage.setItem("user", JSON.stringify(loggedInUser));
    setPage(loggedInUser.role === "admin" ? "admin" : "form");
  };

  if (page === "login" || page === "register") {
    return (
      <div className="min-h-screen bg-white">
        {page === "login" && (
          <Login setUser={handleLoginSuccess} setPage={setPage} />
        )}
        {page === "register" && <Register setPage={setPage} />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={user} onLogout={handleLogout} setPage={setPage} />

      <div className="flex items-start">
        <Sidebar currentPage={page} setPage={setPage} />

        <main className="flex-1 min-w-0">
          {page === "admin" && <Admin setPage={setPage} />}
          {page === "resumes" && (
            <MyResumes setPage={setPage} setResumeData={setResumeData} />
          )}
          {page === "form" && (
            <ResumeForm
              resumeData={resumeData}
              setResumeData={setResumeData}
              setPage={setPage}
              template={template}
              setTemplate={setTemplate}
            />
          )}
          {page === "template" && (
            <TemplateSelect
              template={template}
              setTemplate={setTemplate}
              setPage={setPage}
              resumeData={resumeData}
            />
          )}
          {page === "preview" && (
            <Preview
              resumeData={resumeData}
              template={template}
              setTemplate={setTemplate}
              setPage={setPage}
            />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;