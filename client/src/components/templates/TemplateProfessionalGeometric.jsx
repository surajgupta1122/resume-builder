import { ProjectList, CertList } from "./ExtraBlocks";
import { hasProjects, hasCerts } from "./resumeHelpers";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  LinkIcon,
  CheckIcon,
} from "@heroicons/react/24/outline";

export default function TemplateProfessionalGeometric({ resumeData: d, large = false }) {
  const nameSize = large ? "text-5xl" : "text-2xl";
  const titleSize = large ? "text-base" : "text-[10px]";
  const headSize = large ? "text-sm" : "text-[10px]";
  const textSize = large ? "text-sm" : "text-[10px]";
  const smallSize = large ? "text-xs" : "text-[9px]";
  const iconSize = large ? "w-4 h-4" : "w-3 h-3";
  const pad = large ? "p-10" : "p-5";
  const space = large ? "space-y-5" : "space-y-3";
  const teal = "#0d7a7a";

  const Section = ({ label, children }) => (
    <div>
      <h2
        className={`${headSize} font-bold uppercase tracking-wider pb-1 mb-3 border-b-2`}
        style={{ color: teal, borderColor: teal }}
      >
        {label}
      </h2>
      {children}
    </div>
  );

  return (
    <div className={`bg-white ${pad} text-slate-900`}>
      <div className="flex gap-5 mb-4">
        <div
          className={`shrink-0 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 font-bold ${
            large ? "w-40 h-40" : "w-20 h-20"
          }`}
        >
          {(d.name || "S").charAt(0)}
        </div>
        <div className="flex-1 pt-2">
          <h1 className={`${nameSize} font-bold leading-tight`}>
            {(d.name || "Your Name").split(" ")[0]}
          </h1>
          <h1 className={`${nameSize} font-bold leading-tight`}>
            {(d.name || "Your Name").split(" ").slice(1).join(" ") || ""}
          </h1>
          <p
            className={`${titleSize} font-semibold tracking-wider mt-2 uppercase`}
            style={{ color: teal }}
          >
            {d.title || "Job Title"}
          </p>
        </div>
      </div>

      <div className="h-1 mb-5" style={{ backgroundColor: teal }} />

      <div className="grid grid-cols-5 gap-5">
        <div className={`col-span-2 ${space}`}>
          <Section label="Contacto">
            <div className={`${smallSize} text-gray-700 space-y-1.5`}>
              {d.email && (
                <p className="flex items-center gap-1.5 truncate">
                  <EnvelopeIcon className={iconSize} />
                  {d.email}
                </p>
              )}
              {d.phone && (
                <p className="flex items-center gap-1.5">
                  <PhoneIcon className={iconSize} />
                  {d.phone}
                </p>
              )}
              {d.location && (
                <p className="flex items-center gap-1.5">
                  <MapPinIcon className={iconSize} />
                  {d.location}
                </p>
              )}
              {d.linkedin && (
                <p className="flex items-center gap-1.5 truncate">
                  <LinkIcon className={iconSize} />
                  {d.linkedin}
                </p>
              )}
              {d.website && (
                <p className="flex items-center gap-1.5 truncate">
                  <LinkIcon className={iconSize} />
                  {d.website}
                </p>
              )}
            </div>
          </Section>

          {d.summary && (
            <Section label="Profile Summary">
              <p className={`${smallSize} text-gray-700 leading-relaxed`}>
                {d.summary}
              </p>
            </Section>
          )}

          {d.skills?.length > 0 && (
            <Section label="Skills">
              <ul className={`${smallSize} text-gray-700 space-y-1`}>
                {d.skills.map((s) => (
                  <li key={s} className="flex items-center gap-1.5">
                    <CheckIcon className={iconSize} style={{ color: teal }} />
                    {s}
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {d.languages?.length > 0 && (
            <Section label="Languages">
              <ul className={`${smallSize} text-gray-700 space-y-1`}>
                {d.languages.map((l) => (
                  <li key={l} className="flex items-center gap-1.5">
                    <CheckIcon className={iconSize} style={{ color: teal }} />
                    {l}
                  </li>
                ))}
              </ul>
            </Section>
          )}
        </div>

        <div className={`col-span-3 ${space}`}>
          {d.experience?.[0]?.jobTitle && (
            <Section label="Professional Experience">
              <div className={large ? "space-y-4" : "space-y-2.5"}>
                {d.experience.map((e, i) => (
                  <div key={i}>
                    <p className={`${textSize} font-bold uppercase`}>
                      {e.company}
                    </p>
                    <p className={`${smallSize} font-semibold text-gray-800`}>
                      {e.jobTitle}
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
            </Section>
          )}

          {d.education?.[0]?.degree && (
            <Section label="Education">
              <div className={large ? "space-y-3" : "space-y-2"}>
                {d.education.map((e, i) => (
                  <div key={i}>
                    <p className={`${textSize} font-bold uppercase`}>
                      {e.degree}
                    </p>
                    <p className={`${smallSize} text-gray-700`}>
                      {e.institute}
                    </p>
                    <p className={`${smallSize} text-gray-500 italic`}>
                      {e.startYear} – {e.passYear}
                    </p>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {hasProjects(d) && (
            <Section label="Projects">
              <ProjectList
                items={d.projects}
                textSize={textSize}
                smallSize={smallSize}
              />
            </Section>
          )}

          {hasCerts(d) && (
            <Section label="Certifications">
              <CertList items={d.certifications} smallSize={smallSize} />
            </Section>
          )}
        </div>
      </div>
    </div>
  );
}