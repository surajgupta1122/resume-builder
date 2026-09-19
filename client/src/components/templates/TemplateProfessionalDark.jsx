import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  GlobeAltIcon,
  LinkIcon,
  BriefcaseIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
  LanguageIcon,
} from "@heroicons/react/24/outline";

export default function TemplateProfessionalDark({ resumeData: d, large = false }) {
  const nameSize = large ? "text-4xl" : "text-xl";
  const titleSize = large ? "text-base" : "text-[10px]";
  const headSize = large ? "text-sm" : "text-[10px]";
  const textSize = large ? "text-sm" : "text-[10px]";
  const smallSize = large ? "text-xs" : "text-[9px]";
  const iconSize = large ? "w-4 h-4" : "w-3 h-3";
  const headPadding = large ? "p-8" : "p-5";
  const spaceY = large ? "space-y-6" : "space-y-4";

  const RightSection = ({ Icon, label, children }) => (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <div
          className={`${
            large ? "w-7 h-7" : "w-5 h-5"
          } bg-slate-900 text-white rounded flex items-center justify-center`}
        >
          <Icon className={iconSize} />
        </div>
        <h2
          className={`${headSize} font-bold uppercase tracking-wider text-slate-900`}
        >
          {label}
        </h2>
      </div>
      <div className={`${smallSize} text-gray-700 relative pl-4`}>
        <div className="absolute left-1 top-2 bottom-2 w-0.5 bg-sky-400/40" />
        {children}
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-3 min-h-full">
      {/* LEFT DARK SIDEBAR */}
      <div
        className={`col-span-1 bg-slate-900 text-white ${headPadding} ${spaceY}`}
      >
        {/* Contact list */}
        <div className={`${smallSize} text-gray-300 space-y-2.5`}>
          {d.email && (
            <p className="flex items-center gap-2 break-all">
              <EnvelopeIcon className={`${iconSize} shrink-0`} />
              {d.email}
            </p>
          )}
          {d.phone && (
            <p className="flex items-center gap-2">
              <PhoneIcon className={`${iconSize} shrink-0`} />
              {d.phone}
            </p>
          )}
          {d.location && (
            <p className="flex items-center gap-2">
              <MapPinIcon className={`${iconSize} shrink-0`} />
              {d.location}
            </p>
          )}
          <p className="flex items-center gap-2">
            <GlobeAltIcon className={`${iconSize} shrink-0`} />
            yoursite.com
          </p>
          <p className="flex items-center gap-2 break-all">
            <LinkIcon className={`${iconSize} shrink-0`} />
            linkedin.com/in/yourname
          </p>
        </div>

        {/* Hard Skills */}
        {d.skills?.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div
                className={`${
                  large ? "w-7 h-7" : "w-5 h-5"
                } bg-white text-slate-900 rounded flex items-center justify-center`}
              >
                <BriefcaseIcon className={iconSize} />
              </div>
              <h2
                className={`${headSize} font-bold uppercase tracking-wider`}
              >
                Hard Skills
              </h2>
            </div>
            <ul className={`${smallSize} text-gray-300 space-y-1`}>
              {d.skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Soft Skills */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div
              className={`${
                large ? "w-7 h-7" : "w-5 h-5"
              } bg-white text-slate-900 rounded flex items-center justify-center`}
            >
              <ShieldCheckIcon className={iconSize} />
            </div>
            <h2 className={`${headSize} font-bold uppercase tracking-wider`}>
              Soft Skills
            </h2>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {["Attention to Detail", "Communication", "Time Management", "Collaboration", "Problem Solving"].map(
              (s) => (
                <span
                  key={s}
                  className={`${smallSize} bg-slate-700 text-gray-200 px-2 py-0.5 rounded`}
                >
                  {s}
                </span>
              )
            )}
          </div>
        </div>

        {/* Languages */}
        {d.languages?.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div
                className={`${
                  large ? "w-7 h-7" : "w-5 h-5"
                } bg-white text-slate-900 rounded flex items-center justify-center`}
              >
                <LanguageIcon className={iconSize} />
              </div>
              <h2 className={`${headSize} font-bold uppercase tracking-wider`}>
                Languages
              </h2>
            </div>
            <div className={`${smallSize} space-y-1.5`}>
              {d.languages.map((l, i) => (
                <div key={l}>
                  <p className="font-semibold text-white">{l}</p>
                  <p className="text-gray-400 italic">
                    {i === 0
                      ? "Native or Bilingual"
                      : i === 1
                      ? "Full Professional"
                      : "Working Proficiency"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* RIGHT WHITE PANEL */}
      <div
        className={`col-span-2 bg-white text-slate-900 ${headPadding} ${spaceY}`}
      >
        {/* Name */}
        <div>
          <h1 className={`${nameSize} font-bold leading-tight`}>
            {d.name || "Your Name"}
          </h1>
          <p className={`${titleSize} text-sky-600 font-medium mt-1`}>
            {d.title || "Target Job Title"}
          </p>
        </div>

        {d.summary && (
          <p className={`${smallSize} text-gray-700 leading-relaxed`}>
            {d.summary}
          </p>
        )}

        {d.experience?.[0]?.jobTitle && (
          <RightSection Icon={BriefcaseIcon} label="Work Experience">
            <div className={large ? "space-y-4" : "space-y-3"}>
              {d.experience.map((e, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-4 top-1.5 w-2 h-2 bg-sky-500 rounded-full" />
                  <p className={`${textSize} font-bold`}>{e.jobTitle}</p>
                  <p className={`${smallSize} text-gray-700`}>
                    {e.company}
                  </p>
                  <p className={`${smallSize} text-sky-500 italic`}>
                    {e.startDate} – {e.endDate}
                  </p>
                  {e.description && (
                    <ul
                      className={`${smallSize} text-gray-700 list-disc list-outside pl-4 space-y-0.5 mt-1`}
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
          </RightSection>
        )}

        <RightSection Icon={ShieldCheckIcon} label="Certificates">
          <div className={`${smallSize} space-y-1.5`}>
            <p>Certification One — Issuer, Year</p>
            <p>Certification Two — Issuer, Year</p>
            <p>Certification Three — Issuer, Year</p>
          </div>
        </RightSection>

        {d.education?.[0]?.degree && (
          <RightSection Icon={AcademicCapIcon} label="Education">
            <div className={large ? "space-y-3" : "space-y-2"}>
              {d.education.map((e, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-4 top-1.5 w-2 h-2 bg-sky-500 rounded-full" />
                  <p className={`${textSize} font-bold`}>{e.degree}</p>
                  <p className={`${smallSize} text-gray-700`}>
                    {e.institute}
                  </p>
                  <p className={`${smallSize} text-sky-500 italic`}>
                    {e.startYear} – {e.passYear}
                  </p>
                </div>
              ))}
            </div>
          </RightSection>
        )}
      </div>
    </div>
  );
}