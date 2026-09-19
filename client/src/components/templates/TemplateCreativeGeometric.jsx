import { ProjectList, CertList } from "./ExtraBlocks";
import { hasProjects, hasCerts } from "./resumeHelpers";
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";

export default function TemplateCreativeGeometric({ resumeData: d, large = false }) {
  const nameSize = large ? "text-5xl" : "text-2xl";
  const titleSize = large ? "text-lg" : "text-[11px]";
  const headSize = large ? "text-base" : "text-[10px]";
  const textSize = large ? "text-sm" : "text-[10px]";
  const smallSize = large ? "text-xs" : "text-[9px]";
  const pad = large ? "p-10" : "p-5";
  const space = large ? "space-y-5" : "space-y-3";
  const blue = "text-sky-600";
  const blueBg = "bg-sky-500";

  const SectionHead = ({ label }) => (
    <h2
      className={`${headSize} font-bold uppercase tracking-wider ${blue} mb-2`}
    >
      {label}
    </h2>
  );

  const SkillBar = ({ name, pct = 80 }) => (
    <div className="mb-2">
      <p className={`${smallSize} font-medium mb-1`}>{name}</p>
      <div className="h-1.5 bg-gray-200 rounded">
        <div
          className="h-1.5 bg-slate-800 rounded"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );

  return (
    <div className={`bg-white ${pad} text-slate-900 relative overflow-hidden`}>
      {/* Top left dark triangle */}
      <div
        className="absolute top-0 left-0 w-16 h-16 bg-slate-900"
        style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }}
      />

      {/* Top right blue circle photo */}
      <div
        className={`absolute top-2 right-2 rounded-full ${blueBg} p-1.5 flex items-center justify-center`}
        style={{
          width: large ? 130 : 70,
          height: large ? 130 : 70,
        }}
      >
        <div
          className={`w-full h-full rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-bold ${
            large ? "text-2xl" : "text-xs"
          }`}
        >
          {(d.name || "S").charAt(0)}
        </div>
      </div>

      {/* Header */}
      <div className="mb-6 max-w-[62%] mt-4">
        <h1
          className={`${nameSize} font-extrabold leading-tight uppercase ${blue}`}
        >
          {(d.name || "Name Surname").split(" ").slice(0, 2).join(" ")}
        </h1>
        <p
          className={`${titleSize} font-semibold uppercase tracking-widest text-slate-700 mt-1`}
        >
          {d.title || "Job Position"}
        </p>
      </div>

      {/* Body grid */}
      <div className="grid grid-cols-3 gap-6 mt-8">
        {/* LEFT 2 cols */}
        <div className={`col-span-2 ${space}`}>
          {d.summary && (
            <p className={`${smallSize} text-gray-700 leading-relaxed`}>
              {d.summary}
            </p>
          )}

          {d.education?.[0]?.degree && (
            <div>
              <SectionHead label="Education" />
              {d.education.map((e, i) => (
                <div key={i} className="mb-3">
                  <p className={`${textSize} font-bold uppercase`}>
                    {e.degree}
                  </p>
                  <p
                    className={`${smallSize} font-semibold uppercase text-slate-700`}
                  >
                    {e.institute} / {e.startYear}-{e.passYear}
                  </p>
                </div>
              ))}
            </div>
          )}

          {d.experience?.[0]?.jobTitle && (
            <div>
              <SectionHead label="Experience" />
              {d.experience.map((e, i) => (
                <div key={i} className="mb-3">
                  <p className={`${textSize} font-bold uppercase`}>
                    {e.company}
                  </p>
                  <p
                    className={`${smallSize} font-semibold uppercase text-slate-700`}
                  >
                    {e.jobTitle} / {e.startDate}-{e.endDate}
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
            </div>
          )}

          {d.skills?.length > 0 && (
            <div>
              <SectionHead label="Skills" />
              {d.skills.slice(0, 4).map((s, i) => (
                <SkillBar key={i} name={s} pct={90 - i * 12} />
              ))}
            </div>
          )}

          {hasProjects(d) && (
            <div>
              <SectionHead label="Projects" />
              <ProjectList
                items={d.projects}
                textSize={textSize}
                smallSize={smallSize}
              />
            </div>
          )}

          {hasCerts(d) && (
            <div>
              <SectionHead label="Certifications" />
              <CertList items={d.certifications} smallSize={smallSize} />
            </div>
          )}
        </div>

        {/* RIGHT dark column */}
        <div className="bg-slate-900 text-white -m-10 ml-0 p-6 rounded-l-3xl relative">
          {/* Small blue cut top-right */}
          <div className="absolute top-0 right-0 w-12 h-12 bg-sky-500 rounded-bl-3xl" />

          <h2
            className={`${headSize} font-bold uppercase text-white mb-3 mt-8`}
          >
            About Me
          </h2>
          <p className={`${smallSize} leading-relaxed text-gray-300`}>
            {d.summary || "Brief about me paragraph."}
          </p>
        </div>
      </div>

      {/* Bottom contact bar */}
      <div className="mt-8 pt-4 flex justify-between items-center flex-wrap gap-3 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <PhoneIcon className="w-5 h-5 text-sky-600" />
          <div>
            <p className={`${smallSize} font-bold`}>Phone</p>
            <p className={`${smallSize} text-gray-600`}>
              {d.phone || "+1 234 567 89"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <EnvelopeIcon className="w-5 h-5 text-sky-600" />
          <div>
            <p className={`${smallSize} font-bold`}>E-mail</p>
            <p className={`${smallSize} text-gray-600`}>
              {d.email || "email@example.com"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <MapPinIcon className="w-5 h-5 text-sky-600" />
          <div>
            <p className={`${smallSize} font-bold`}>Address</p>
            <p className={`${smallSize} text-gray-600`}>
              {d.location || "Your Address"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}