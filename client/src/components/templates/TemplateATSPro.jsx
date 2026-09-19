import { ProjectList, CertList } from "./ExtraBlocks";
import { hasProjects, hasCerts } from "./resumeHelpers";

export default function TemplateATSPro({ resumeData: d, large = false }) {
  const nameSize = large ? "text-4xl" : "text-2xl";
  const titleSize = large ? "text-base" : "text-xs";
  const headSize = large ? "text-sm" : "text-[10px]";
  const textSize = large ? "text-sm" : "text-[10px]";
  const smallSize = large ? "text-sm" : "text-[9px]";
  const pad = large ? "p-14" : "p-6";
  const space = large ? "space-y-6" : "space-y-4";

  const Section = ({ label, children }) => (
    <div>
      <div className="bg-black text-white px-3 py-1.5 mb-3">
        <h2 className={`${headSize} font-bold uppercase tracking-wider`}>
          {label}
        </h2>
      </div>
      {children}
    </div>
  );

  return (
    <div
      className={`bg-white ${pad} text-black`}
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
    >
      <div className="text-center mb-4">
        <h1 className={`${nameSize} font-bold tracking-wide uppercase`}>
          {d.name || "Full Name"}
        </h1>
        <p className={`${titleSize} text-gray-700 mt-1`}>
          {d.title || "Target Job Title"}
        </p>
      </div>

      <div
        className={`bg-black text-white px-4 py-2 mb-4 flex items-center justify-center gap-3 flex-wrap ${smallSize}`}
      >
        {d.location && <span>{d.location}</span>}
        {d.location && d.phone && <span>•</span>}
        {d.phone && <span>{d.phone}</span>}
        {d.phone && d.email && <span>•</span>}
        {d.email && <span>{d.email}</span>}
      </div>

      <div className={space}>
        {d.summary && (
          <div>
            <p className={`${smallSize} leading-relaxed text-justify`}>
              {d.summary}
            </p>
          </div>
        )}

        {d.skills?.length > 0 && (
          <Section label="Key Skills">
            <ul
              className={`${smallSize} list-disc list-outside columns-2 gap-8 pl-5 space-y-1`}
            >
              {d.skills.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </Section>
        )}

        {d.experience?.[0]?.jobTitle && (
          <Section label="Professional Experience">
            <div className={large ? "space-y-5" : "space-y-3"}>
              {d.experience.map((e, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline">
                    <p className={`${textSize} font-bold`}>{e.jobTitle}</p>
                    <p className={`${smallSize} font-semibold`}>
                      {e.startDate}
                      {e.startDate && e.endDate && " – "}
                      {e.endDate}
                    </p>
                  </div>
                  <p className={`${smallSize} font-semibold italic`}>
                    {e.company}
                  </p>
                  {e.description && (
                    <ul
                      className={`${smallSize} list-disc list-outside pl-5 mt-1.5 leading-relaxed`}
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
            <div className={large ? "space-y-4" : "space-y-2"}>
              {d.education.map((e, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline">
                    <p className={`${textSize} font-bold`}>{e.degree}</p>
                    <p className={`${smallSize} font-semibold`}>
                      {e.passYear}
                    </p>
                  </div>
                  <p className={`${smallSize} italic`}>{e.institute}</p>
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
  );
}