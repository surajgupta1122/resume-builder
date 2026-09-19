import { ProjectList, CertList } from "./ExtraBlocks";
import { hasProjects, hasCerts } from "./resumeHelpers";
import {
  UserIcon,
  AcademicCapIcon,
  PhoneIcon,
  BriefcaseIcon,
  Cog6ToothIcon,
  MapPinIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  LinkIcon,
  CodeBracketIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

export default function TemplateCreativeIsabel({ resumeData: d, large = false }) {
  const nameSize = large ? "text-4xl" : "text-xl";
  const titleSize = large ? "text-base" : "text-[10px]";
  const headSize = large ? "text-sm" : "text-[10px]";
  const textSize = large ? "text-sm" : "text-[10px]";
  const smallSize = large ? "text-xs" : "text-[9px]";
  const iconSize = large ? "w-4 h-4" : "w-3.5 h-3.5";
  const pad = large ? "p-10" : "p-5";
  const space = large ? "space-y-6" : "space-y-4";

  const SectionHead = ({ Icon, label }) => (
    <div className="bg-slate-900 text-white rounded-l-full rounded-r-md px-4 py-2 flex items-center gap-2 mb-3">
      <Icon className={iconSize} />
      <h2 className={`${headSize} font-bold uppercase tracking-wider`}>
        {label}
      </h2>
    </div>
  );

  const skillDots = (rating = 4) => (
    <div className="flex gap-0.5 mt-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={`${
            large ? "w-2.5 h-2.5" : "w-2 h-2"
          } rounded-full ${i <= rating ? "bg-slate-800" : "bg-gray-300"}`}
        />
      ))}
    </div>
  );

  return (
    <div className={`bg-white ${pad} text-slate-900`}>
      <div className="grid grid-cols-2 gap-6 mb-6">
        <div>
          <div
            className={`bg-gray-200 rounded-md mb-4 flex items-center justify-center text-gray-400 ${
              large ? "w-40 h-40" : "w-20 h-20"
            }`}
          >
            <UserIcon className={large ? "w-16 h-16" : "w-8 h-8"} />
          </div>
          <h1
            className={`${nameSize} font-extrabold leading-tight uppercase tracking-tight`}
          >
            {(d.name || "Your Name").split(" ")[0]}
          </h1>
          <h1
            className={`${nameSize} font-extrabold leading-tight uppercase tracking-tight`}
          >
            {(d.name || "Your Name").split(" ").slice(1).join(" ") || ""}
          </h1>
          <p className={`${titleSize} italic mt-2 text-slate-700 uppercase`}>
            {d.title || "Your Job Title"}
          </p>
        </div>

        <div>
          <SectionHead Icon={UserIcon} label="About Me" />
          <p className={`${smallSize} text-gray-700 leading-relaxed`}>
            {d.summary || "Short professional summary goes here."}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className={space}>
          <div>
            <SectionHead Icon={PhoneIcon} label="Contact" />
            <div className={`${smallSize} space-y-2 text-gray-700`}>
              {d.location && (
                <p className="flex items-center gap-2">
                  <MapPinIcon className={`${iconSize} shrink-0`} />
                  {d.location}
                </p>
              )}
              {d.phone && (
                <p className="flex items-center gap-2">
                  <PhoneIcon className={`${iconSize} shrink-0`} />
                  {d.phone}
                </p>
              )}
              {d.website && (
                <p className="flex items-center gap-2 break-all">
                  <GlobeAltIcon className={`${iconSize} shrink-0`} />
                  {d.website}
                </p>
              )}
              {d.linkedin && (
                <p className="flex items-center gap-2 break-all">
                  <LinkIcon className={`${iconSize} shrink-0`} />
                  {d.linkedin}
                </p>
              )}
              {d.email && (
                <p className="flex items-center gap-2 truncate">
                  <EnvelopeIcon className={`${iconSize} shrink-0`} />
                  {d.email}
                </p>
              )}
            </div>
          </div>

          {d.skills?.length > 0 && (
            <div>
              <SectionHead Icon={Cog6ToothIcon} label="Skills" />
              <div>
                {d.skills.slice(0, 5).map((s, i) => (
                  <div key={i} className="mb-3">
                    <p className={`${smallSize} font-medium`}>{s}</p>
                    {skillDots(5 - i)}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className={space}>
          {d.education?.[0]?.degree && (
            <div>
              <SectionHead Icon={AcademicCapIcon} label="Education" />
              <div className="relative pl-4">
                <div className="absolute left-1 top-1 bottom-1 w-0.5 bg-slate-800" />
                {d.education.map((e, i) => (
                  <div key={i} className="relative mb-4">
                    <div className="absolute -left-3 top-1.5 w-2 h-2 bg-slate-800 rounded-full" />
                    <p className={`${smallSize} font-bold`}>{e.degree}</p>
                    <p className={`${smallSize} text-gray-700 italic`}>
                      {e.institute}
                    </p>
                    <p className={`${smallSize} text-gray-500`}>
                      {e.startYear} - {e.passYear}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {d.experience?.[0]?.jobTitle && (
            <div>
              <SectionHead Icon={BriefcaseIcon} label="Work Experience" />
              <div className="relative pl-4">
                <div className="absolute left-1 top-1 bottom-1 w-0.5 bg-slate-800" />
                {d.experience.map((e, i) => (
                  <div key={i} className="relative mb-4">
                    <div className="absolute -left-3 top-1.5 w-2 h-2 bg-slate-800 rounded-full" />
                    <p className={`${smallSize} font-bold`}>{e.company}</p>
                    <p className={`${smallSize} text-gray-800 font-medium`}>
                      {e.jobTitle}
                    </p>
                    <p className={`${smallSize} text-gray-500`}>
                      {e.startDate} - {e.endDate}
                    </p>
                    {e.description && (
                      <ul
                        className={`${smallSize} text-gray-700 list-disc list-outside pl-4 mt-1 space-y-0.5`}
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

          {hasProjects(d) && (
            <div>
              <SectionHead Icon={CodeBracketIcon} label="Projects" />
              <ProjectList
                items={d.projects}
                textSize={textSize}
                smallSize={smallSize}
              />
            </div>
          )}

          {hasCerts(d) && (
            <div>
              <SectionHead Icon={ShieldCheckIcon} label="Certifications" />
              <CertList items={d.certifications} smallSize={smallSize} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}