import { ProjectList, CertList } from "./ExtraBlocks";
import { hasProjects, hasCerts } from "./resumeHelpers";

export default function TemplateATS({ resumeData: d, large = false }) {
  const nameSize = large ? "text-5xl" : "text-2xl";
  const titleSize = large ? "text-lg" : "text-xs";
  const headSize = large ? "text-base" : "text-[10px]";
  const textSize = large ? "text-sm" : "text-[10px]";
  const smallSize = large ? "text-sm" : "text-[10px]";
  const pad = large ? "p-16" : "p-6";
  const space = large ? "space-y-7" : "space-y-4";

  const Section = ({ label, children }) => (
    <div>
      <h2
        className={`${headSize} font-bold text-slate-900 uppercase tracking-wider pb-1 mb-3 border-b border-gray-400`}
      >
        {label}
      </h2>
      {children}
    </div>
  );

  const contacts = [
    d.phone,
    d.location,
    d.email,
    d.linkedin,
    d.website,
  ].filter(Boolean);

  return (
    <div
      className={`bg-white ${pad} text-slate-900`}
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
    >
      <div className="text-center mb-6">
        <h1
          className={`${nameSize} font-extrabold tracking-wide text-slate-900 uppercase leading-tight`}
        >
          {d.name || "Full Name"}
        </h1>
        <p
          className={`${titleSize} text-gray-600 uppercase tracking-[0.25em] mt-2`}
        >
          {d.title || "Target Job Title"}
        </p>
      </div>

      <div
        className={`${smallSize} text-gray-700 border-y border-gray-400 py-3 mb-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1`}
      >
        {contacts.map((c, i) => (
          <span key={i} className="flex items-center gap-3">
            <span>{c}</span>
            {i < contacts.length - 1 && (
              <span className="text-gray-400">|</span>
            )}
          </span>
        ))}
      </div>

      <div className={space}>
        {d.summary && (
          <Section label="Professional Summary">
            <p className={`${textSize} text-gray-800 leading-relaxed`}>
              {d.summary}
            </p>
          </Section>
        )}

        {d.education?.[0]?.degree && (
          <Section label="Education">
            {d.education.map((e, i) => (
              <p key={i} className={`${textSize} text-gray-800 mb-1`}>
                {[e.degree, e.institute, e.passYear]
                  .filter(Boolean)
                  .join(" | ")}
              </p>
            ))}
          </Section>
        )}

        {d.experience?.[0]?.jobTitle && (
          <Section label="Experience">
            <div className="space-y-4">
              {d.experience.map((e, i) => (
                <div key={i}>
                  <p className={`${textSize} text-gray-800 font-semibold`}>
                    {[e.company, e.jobTitle, e.startDate, e.endDate]
                      .filter(Boolean)
                      .join(" | ")}
                  </p>
                  {e.description && (
                    <p
                      className={`${smallSize} text-gray-700 mt-1 leading-relaxed`}
                    >
                      • {e.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}

        {d.skills?.length > 0 && (
          <Section label="Skills">
            <div className={`${textSize} text-gray-800 space-y-1`}>
              <p>
                <span className="font-semibold">Core: </span>
                {d.skills.slice(0, 4).join(", ") || "—"}
              </p>
              {d.skills.length > 4 && (
                <p>
                  <span className="font-semibold">Tools: </span>
                  {d.skills.slice(4, 8).join(", ")}
                </p>
              )}
              {d.skills.length > 8 && (
                <p>
                  <span className="font-semibold">Methods: </span>
                  {d.skills.slice(8).join(", ")}
                </p>
              )}
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
            <CertList items={d.certifications} smallSize={textSize} />
          </Section>
        )}
      </div>
    </div>
  );
}