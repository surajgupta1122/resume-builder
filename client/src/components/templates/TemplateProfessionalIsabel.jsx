import {
  BriefcaseIcon,
  AcademicCapIcon,
  WrenchScrewdriverIcon,
  ShieldCheckIcon,
  LanguageIcon,
  TrophyIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  LinkIcon,
} from "@heroicons/react/24/outline";

export default function TemplateProfessionalIsabel({ resumeData: d, large = false }) {
  const nameSize = large ? "text-4xl" : "text-xl";
  const titleSize = large ? "text-base" : "text-[10px]";
  const headSize = large ? "text-sm" : "text-[10px]";
  const textSize = large ? "text-sm" : "text-[10px]";
  const smallSize = large ? "text-xs" : "text-[9px]";
  const iconSize = large ? "w-5 h-5" : "w-3.5 h-3.5";
  const headIconBox = large ? "w-9 h-9" : "w-6 h-6";
  const pad = large ? "p-10" : "p-5";
  const space = large ? "space-y-5" : "space-y-3";

  const SectionHead = ({ Icon, label }) => (
    <div className="flex items-center gap-2 mb-3">
      <div
        className={`${headIconBox} border-2 border-slate-900 rounded-md flex items-center justify-center`}
      >
        <Icon className={iconSize} />
      </div>
      <h2
        className={`${headSize} font-bold uppercase tracking-wider text-slate-900`}
      >
        {label}
      </h2>
    </div>
  );

  return (
    <div className={`bg-white ${pad} text-slate-900`}>
      {/* Header: photo left, name + about right */}
      <div className="flex gap-5 mb-5">
        <div
          className={`shrink-0 border-2 border-slate-900 rounded-lg ${
            large ? "w-32 h-32" : "w-16 h-16"
          } bg-gray-200 flex items-center justify-center text-gray-400 font-bold`}
        >
          {(d.name || "A").charAt(0)}
        </div>
        <div className="flex-1">
          <h1 className={`${nameSize} font-bold leading-tight`}>
            {d.name || "Your Name"}
          </h1>
          <p className={`${titleSize} text-gray-500 mt-0.5`}>
            {d.title || "Target Job Title"}
          </p>
          <p className={`${smallSize} text-gray-700 mt-2 leading-relaxed`}>
            {d.summary || "Short professional summary."}
          </p>
        </div>
      </div>

      {/* Black contact bar */}
      <div
        className={`bg-slate-900 text-white rounded-md px-4 py-2.5 mb-6 grid grid-cols-2 gap-x-4 gap-y-1.5 ${smallSize}`}
      >
        <div className="flex items-center gap-2">
          <EnvelopeIcon className={iconSize} />
          <span className="truncate">{d.email || "email@example.com"}</span>
        </div>
        <div className="flex items-center gap-2">
          <PhoneIcon className={iconSize} />
          <span>{d.phone || "+1 234 5555"}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPinIcon className={iconSize} />
          <span>{d.location || "City, Country"}</span>
        </div>
        <div className="flex items-center gap-2">
          <LinkIcon className={iconSize} />
          <span className="truncate">linkedin.com/in/yourname</span>
        </div>
      </div>

      {/* Two-column body */}
      <div className="grid grid-cols-2 gap-6">
        {/* LEFT column */}
        <div className={space}>
          {d.experience?.[0]?.jobTitle && (
            <div>
              <SectionHead Icon={BriefcaseIcon} label="Work Experience" />
              <div className={large ? "space-y-4" : "space-y-2.5"}>
                {d.experience.map((e, i) => (
                  <div key={i}>
                    <p className={`${textSize} font-bold`}>{e.jobTitle}</p>
                    <p className={`${smallSize} text-gray-700`}>
                      {e.company}
                    </p>
                    <p className={`${smallSize} text-gray-500 italic mb-1`}>
                      {e.startDate} – {e.endDate}
                    </p>
                    {e.description && (
                      <ul
                        className={`${smallSize} text-gray-700 list-disc list-outside pl-4 space-y-0.5`}
                      >
                        {e.description
                          .split(/\n|\. /)
                          .filter(Boolean)
                          .map((line, idx) => (
                            <li key={idx}>{line.replace(/^•\s*/, "")}</li>
                          ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {d.education?.[0]?.degree && (
            <div>
              <SectionHead Icon={AcademicCapIcon} label="Education" />
              <div className={large ? "space-y-3" : "space-y-2"}>
                {d.education.map((e, i) => (
                  <div key={i}>
                    <p className={`${textSize} font-bold`}>{e.degree}</p>
                    <p className={`${smallSize} text-gray-700 italic`}>
                      {e.institute}, {e.location || ""}
                    </p>
                    <p className={`${smallSize} text-gray-500 italic`}>
                      {e.startYear} – {e.passYear}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT column */}
        <div className={space}>
          {d.skills?.length > 0 && (
            <div>
              <SectionHead Icon={WrenchScrewdriverIcon} label="General Skills" />
              <ul
                className={`${smallSize} text-gray-700 list-disc list-outside pl-4 columns-2 gap-2 space-y-0.5`}
              >
                {d.skills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <SectionHead Icon={ShieldCheckIcon} label="Certifications & Memberships" />
            <div className={`${smallSize} text-gray-700 space-y-1.5`}>
              <p>Member of the Global CIO Forum (2018 - Present)</p>
              <p>
                <span className="font-semibold">
                  Certified Information Privacy Professional (CIPP)
                </span>
                <br />
                <span className="italic text-gray-500">
                  Issued by the International Association of Privacy
                  Professionals (IAPP)
                </span>
              </p>
              <p>
                <span className="font-semibold">Certified ScrumMaster (CSM)</span>
                <br />
                <span className="italic text-gray-500">Issued by Scrum Alliance</span>
              </p>
            </div>
          </div>

          {d.languages?.length > 0 && (
            <div>
              <SectionHead Icon={LanguageIcon} label="Languages" />
              <div className={`${smallSize} text-gray-700 columns-2 gap-2 space-y-1`}>
                {d.languages.map((l) => (
                  <div key={l}>
                    <p className="font-semibold">{l}</p>
                    <p className="italic text-gray-500">
                      Native or Bilingual Proficiency
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <SectionHead Icon={TrophyIcon} label="Interests" />
            <div className={`${smallSize} text-gray-700 grid grid-cols-2 gap-y-1`}>
              <span>💡 Machine Learning</span>
              <span>♟️ Chess</span>
              <span>🥾 Hiking</span>
              <span>⚡ Renewable Energy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}