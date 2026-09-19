import { ProjectList, CertList } from "./ExtraBlocks";
import { hasProjects, hasCerts } from "./resumeHelpers";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

export default function TemplateMinimalSebastian({
  resumeData: d,
  large = false,
}) {
  const nameSize = large ? "text-4xl" : "text-xl";
  const titleSize = large ? "text-lg" : "text-[11px]";
  const headSize = large ? "text-sm" : "text-[9px]";
  const textSize = large ? "text-base" : "text-[10px]";
  const smallSize = large ? "text-sm" : "text-[9px]";
  const iconSize = large ? "w-4 h-4" : "w-3 h-3";
  const pad = large ? "p-12" : "p-5";
  const space = large ? "space-y-6" : "space-y-3";

  const Section = ({ label, children }) => (
    <div>
      <h2
        className={`${headSize} font-bold text-slate-900 border-b border-gray-400 pb-1 mb-3 tracking-widest`}
      >
        {label}
      </h2>
      {children}
    </div>
  );

  return (
    <div className={`bg-white ${pad} text-slate-900`}>
      <div className="text-center mb-6">
        <h1 className={`${nameSize} font-bold leading-tight`}>
          {(d.name || "Your Name").toUpperCase()}
        </h1>
        <p className={`${titleSize} text-gray-700 mt-1`}>
          {d.title || "Professional Title"}
        </p>

        <div
          className={`${smallSize} text-gray-600 mt-4 flex items-center justify-center gap-4 flex-wrap`}
        >
          <span className="flex items-center gap-1.5">
            <PhoneIcon className={iconSize} />
            {d.phone || "—"}
          </span>
          <span className="text-gray-300">|</span>
          <span className="flex items-center gap-1.5">
            <EnvelopeIcon className={iconSize} />
            {d.email || "—"}
          </span>
          <span className="text-gray-300">|</span>
          <span className="flex items-center gap-1.5">
            <MapPinIcon className={iconSize} />
            {d.location || "—"}
          </span>
        </div>
      </div>

      <div className={space}>
        {d.summary && (
          <Section label="ABOUT ME">
            <p className={`${textSize} text-gray-700 leading-relaxed`}>
              {d.summary}
            </p>
          </Section>
        )}

        {d.education?.[0]?.degree && (
          <Section label="EDUCATION">
            {d.education.map((e, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <p className={`${textSize} font-bold`}>{e.institute}</p>
                  <p className={`${smallSize} text-gray-500`}>
                    {e.startYear}–{e.passYear}
                  </p>
                </div>
                <p className={`${smallSize} font-semibold text-gray-700`}>
                  {e.degree}
                </p>
              </div>
            ))}
          </Section>
        )}

        {d.experience?.[0]?.jobTitle && (
          <Section label="WORK EXPERIENCE">
            {d.experience.map((e, i) => (
              <div key={i} className="mb-4">
                <div className="flex justify-between items-baseline">
                  <p className={`${textSize} font-bold`}>{e.company}</p>
                  <p className={`${smallSize} text-gray-500`}>
                    {e.startDate} – {e.endDate}
                  </p>
                </div>
                <p className={`${smallSize} font-semibold text-gray-700`}>
                  {e.jobTitle}
                </p>
                {e.description && (
                  <p
                    className={`${smallSize} text-gray-700 mt-1 leading-relaxed`}
                  >
                    {e.description}
                  </p>
                )}
              </div>
            ))}
          </Section>
        )}

        {d.skills?.length > 0 && (
          <Section label="SKILLS">
            <ul
              className={`${smallSize} text-gray-700 list-disc list-inside columns-2 gap-4`}
            >
              {d.skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Section>
        )}

        {hasProjects(d) && (
          <Section label="PROJECTS">
            <ProjectList
              items={d.projects}
              textSize={textSize}
              smallSize={smallSize}
            />
          </Section>
        )}

        {hasCerts(d) && (
          <Section label="CERTIFICATIONS">
            <CertList items={d.certifications} smallSize={smallSize} />
          </Section>
        )}
      </div>
    </div>
  );
}