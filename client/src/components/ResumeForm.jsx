import { useState } from "react";
import {
  UserIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  WrenchScrewdriverIcon,
  PlusIcon,
  XMarkIcon,
  LightBulbIcon,
  ArrowRightIcon,
  EyeIcon,
} from "@heroicons/react/24/outline";
import LivePreview from "./LivePreview";

export default function ResumeForm({
  resumeData,
  setResumeData,
  setPage,
  template = "minimal-mark",
  setTemplate,
}) {
  const [skillInput, setSkillInput] = useState("");

  const update = (field, value) => {
    setResumeData({ ...resumeData, [field]: value });
  };

  const addSkill = (e) => {
    if (e.key === "Enter" || e.type === "click") {
      e.preventDefault();
      const s = skillInput.trim();
      if (!s) return;
      if (resumeData.skills.includes(s)) return setSkillInput("");
      update("skills", [...resumeData.skills, s]);
      setSkillInput("");
    }
  };
  const removeSkill = (skill) =>
    update("skills", resumeData.skills.filter((s) => s !== skill));

  const updateEducation = (i, field, value) => {
    const arr = [...resumeData.education];
    arr[i] = { ...arr[i], [field]: value };
    update("education", arr);
  };
  const addEducation = () =>
    update("education", [
      ...resumeData.education,
      { degree: "", institute: "", startYear: "", passYear: "" },
    ]);
  const removeEducation = (i) =>
    update("education", resumeData.education.filter((_, idx) => idx !== i));

  const updateExperience = (i, field, value) => {
    const arr = [...resumeData.experience];
    arr[i] = { ...arr[i], [field]: value };
    update("experience", arr);
  };
  const addExperience = () =>
    update("experience", [
      ...resumeData.experience,
      {
        jobTitle: "",
        company: "",
        startDate: "",
        endDate: "",
        description: "",
      },
    ]);
  const removeExperience = (i) =>
    update("experience", resumeData.experience.filter((_, idx) => idx !== i));

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      {/* Stepper */}
      <div className="flex items-start justify-between mb-8 gap-6 flex-wrap">
        <div className="flex items-center gap-4">
          {[
            { n: 1, label: "Your Details" },
            { n: 2, label: "Choose Template" },
            { n: 3, label: "Preview & Download" },
          ].map((s, i) => (
            <div key={s.n} className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${
                    s.n === 1
                      ? "bg-blue-600 text-white"
                      : "bg-white border-2 border-gray-300 text-gray-500"
                  }`}
                >
                  {s.n}
                </div>
                <span
                  className={`text-xs mt-1 font-medium ${
                    s.n === 1 ? "text-blue-700" : "text-gray-500"
                  }`}
                >
                  {s.label}
                </span>
              </div>
              {i < 2 && <div className="w-16 h-px bg-gray-300 mb-5"></div>}
            </div>
          ))}
        </div>

        <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 flex items-start gap-3 max-w-md">
          <LightBulbIcon className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-xs text-blue-800 leading-snug">
            Keep your information concise and professional.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3 space-y-5">
          <Card
            Icon={UserIcon}
            title="Personal Information"
            subtitle="Let's start with your basic details"
            badge="Step 1 of 3"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Field label="Full Name" required>
                <input
                  className={inputClass}
                  value={resumeData.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="Suraj Gupta"
                />
              </Field>
              <Field label="Email" required>
                <input
                  className={inputClass}
                  value={resumeData.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="suraj@example.com"
                />
              </Field>
              <Field label="Phone" required>
                <input
                  className={inputClass}
                  value={resumeData.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="+91 98765 43210"
                />
              </Field>
              <Field label="Location" required>
                <input
                  className={inputClass}
                  value={resumeData.location}
                  onChange={(e) => update("location", e.target.value)}
                  placeholder="Delhi, India"
                />
              </Field>
              <div className="md:col-span-2">
                <Field label="Professional Title">
                  <input
                    className={inputClass}
                    value={resumeData.title}
                    onChange={(e) => update("title", e.target.value)}
                    placeholder="Full Stack Developer"
                  />
                </Field>
              </div>
              <div className="md:col-span-2">
                <Field label="Summary">
                  <textarea
                    rows="3"
                    className={inputClass + " resize-none"}
                    value={resumeData.summary}
                    onChange={(e) => update("summary", e.target.value)}
                    placeholder="Short professional summary..."
                  />
                </Field>
              </div>
            </div>
          </Card>

          <Card
            Icon={AcademicCapIcon}
            title="Education"
            subtitle="Add your educational background"
          >
            <div className="space-y-4">
              {resumeData.education.map((edu, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl relative"
                >
                  {resumeData.education.length > 1 && (
                    <button
                      onClick={() => removeEducation(i)}
                      className="absolute top-2 right-2 text-red-400 hover:text-red-600"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  )}
                  <Field label="Degree / Course">
                    <input
                      className={inputClass}
                      value={edu.degree}
                      onChange={(e) =>
                        updateEducation(i, "degree", e.target.value)
                      }
                      placeholder="BCA"
                    />
                  </Field>
                  <Field label="Institute / School">
                    <input
                      className={inputClass}
                      value={edu.institute}
                      onChange={(e) =>
                        updateEducation(i, "institute", e.target.value)
                      }
                      placeholder="IGNOU"
                    />
                  </Field>
                  <Field label="Start Year">
                    <input
                      className={inputClass}
                      value={edu.startYear}
                      onChange={(e) =>
                        updateEducation(i, "startYear", e.target.value)
                      }
                      placeholder="2023"
                    />
                  </Field>
                  <Field label="Passing Year">
                    <input
                      className={inputClass}
                      value={edu.passYear}
                      onChange={(e) =>
                        updateEducation(i, "passYear", e.target.value)
                      }
                      placeholder="2026"
                    />
                  </Field>
                </div>
              ))}
              <button
                onClick={addEducation}
                className="w-full border-2 border-dashed border-blue-300 text-blue-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-50 transition flex items-center justify-center gap-2"
              >
                <PlusIcon className="w-5 h-5" />
                Add Another Education
              </button>
            </div>
          </Card>

          <Card
            Icon={BriefcaseIcon}
            title="Experience"
            subtitle="Add your work experience (if any)"
          >
            <div className="space-y-4">
              {resumeData.experience.map((exp, i) => (
                <div
                  key={i}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl relative"
                >
                  {resumeData.experience.length > 1 && (
                    <button
                      onClick={() => removeExperience(i)}
                      className="absolute top-2 right-2 text-red-400 hover:text-red-600"
                    >
                      <XMarkIcon className="w-5 h-5" />
                    </button>
                  )}
                  <Field label="Job Title">
                    <input
                      className={inputClass}
                      value={exp.jobTitle}
                      onChange={(e) =>
                        updateExperience(i, "jobTitle", e.target.value)
                      }
                      placeholder="Web Developer Intern"
                    />
                  </Field>
                  <Field label="Company Name">
                    <input
                      className={inputClass}
                      value={exp.company}
                      onChange={(e) =>
                        updateExperience(i, "company", e.target.value)
                      }
                      placeholder="ABC Technologies"
                    />
                  </Field>
                  <Field label="Start Date">
                    <input
                      className={inputClass}
                      value={exp.startDate}
                      onChange={(e) =>
                        updateExperience(i, "startDate", e.target.value)
                      }
                      placeholder="Jan 2024"
                    />
                  </Field>
                  <Field label="End Date">
                    <input
                      className={inputClass}
                      value={exp.endDate}
                      onChange={(e) =>
                        updateExperience(i, "endDate", e.target.value)
                      }
                      placeholder="Present"
                    />
                  </Field>
                  <div className="md:col-span-2">
                    <Field label="Description">
                      <textarea
                        rows="2"
                        className={inputClass + " resize-none"}
                        value={exp.description}
                        onChange={(e) =>
                          updateExperience(i, "description", e.target.value)
                        }
                        placeholder="What did you work on?"
                      />
                    </Field>
                  </div>
                </div>
              ))}
              <button
                onClick={addExperience}
                className="w-full border-2 border-dashed border-blue-300 text-blue-600 py-2.5 rounded-xl text-sm font-semibold hover:bg-blue-50 transition flex items-center justify-center gap-2"
              >
                <PlusIcon className="w-5 h-5" />
                Add Experience
              </button>
            </div>
          </Card>

          <Card
            Icon={WrenchScrewdriverIcon}
            title="Skills"
            subtitle="Add your key skills"
          >
            <div className="flex gap-2">
              <input
                className={inputClass + " flex-1"}
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={addSkill}
                placeholder="Type a skill and press Enter..."
              />
              <button
                onClick={addSkill}
                className="bg-blue-600 text-white px-5 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center gap-1.5"
              >
                <PlusIcon className="w-5 h-5" />
                Add
              </button>
            </div>

            {resumeData.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {resumeData.skills.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-medium"
                  >
                    {s}
                    <button
                      onClick={() => removeSkill(s)}
                      className="text-blue-500 hover:text-red-500"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </Card>

          <div className="flex gap-4 pt-2">
            <button
              onClick={() => setPage("preview")}
              className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2"
            >
              <EyeIcon className="w-5 h-5" />
              Skip to Preview
            </button>
            <button
              onClick={() => setPage("template")}
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 shadow-md transition flex items-center justify-center gap-2"
            >
              Next: Choose Template
              <ArrowRightIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-2">
          <LivePreview
            resumeData={resumeData}
            template={template}
            setTemplate={setTemplate}
            setPage={setPage}
          />
        </div>
      </div>
    </div>
  );
}

/* Helpers */
const inputClass =
  "w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white";

function Field({ label, required, children }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}

function Card({ Icon, title, subtitle, badge, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-11 h-11 bg-blue-100 text-blue-700 rounded-xl flex items-center justify-center">
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h2 className="font-bold text-gray-900 text-base">{title}</h2>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
        {badge && (
          <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full">
            {badge}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}