import { ProjectList, CertList } from "./ExtraBlocks";
import { hasProjects, hasCerts } from "./resumeHelpers";
import {
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  GlobeAltIcon,
  MapPinIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  Cog6ToothIcon,
  LanguageIcon,
  LinkIcon,
  CodeBracketIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

export default function TemplateCreativeNoel({ resumeData: d, large = false }) {
  const nameSize = large ? "text-3xl" : "text-lg";
  const titleSize = large ? "text-base" : "text-[10px]";
  const headSize = large ? "text-base" : "text-[10px]";
  const textSize = large ? "text-sm" : "text-[10px]";
  const smallSize = large ? "text-xs" : "text-[9px]";
  const iconSize = large ? "w-5 h-5" : "w-3.5 h-3.5";
  const headPadding = large ? "p-8" : "p-5";
  const spaceY = large ? "space-y-6" : "space-y-4";

  const SkillBar = ({ name, pct = 70 }) => (
    <div className="mb-2">
      <p className={`${smallSize} mb-1`}>{name}</p>
      <div className="h-1 bg-gray-300 rounded">
        <div
          className="h-1 bg-slate-900 rounded"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );

  const CircleHead = ({ Icon, label }) => (
    <div className="flex items-center gap-2 mb-3">
      <div className="w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center shrink-0">
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
    <div className="grid grid-cols-5 min-h-full">
      <div
        className={`col-span-2 bg-slate-900 text-white ${spaceY} ${headPadding}`}
      >
        <div>
          <h1 className={`${nameSize} font-bold leading-tight uppercase`}>
            {d.name || "Your Name"}
          </h1>
          <p
            className={`${titleSize} text-gray-400 mt-1 uppercase tracking-wider`}
          >
            {d.title || "Your Job Title"}
          </p>
        </div>

        <div
          className={`mx-auto ${
            large ? "w-40 h-40" : "w-20 h-20"
          } rounded-full bg-white/20 flex items-center justify-center border-4 border-white/30`}
        >
          <UserIcon className={large ? "w-20 h-20" : "w-10 h-10"} />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center shrink-0">
              <UserIcon className={iconSize} />
            </div>
            <h2
              className={`${headSize} font-bold uppercase tracking-wider text-white`}
            >
              Contact Me
            </h2>
          </div>
          <div className={`${smallSize} space-y-2 text-gray-300`}>
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
            {d.location && (
              <p className="flex items-center gap-2">
                <MapPinIcon className={`${iconSize} shrink-0`} />
                {d.location}
              </p>
            )}
          </div>
        </div>

        {d.education?.[0]?.degree && (
          <div className="bg-slate-800 rounded-3xl p-4 -mx-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-full bg-white text-slate-900 flex items-center justify-center shrink-0">
                <AcademicCapIcon className={iconSize} />
              </div>
              <h2
                className={`${headSize} font-bold uppercase tracking-wider text-white`}
              >
                Education
              </h2>
            </div>
            <div className="space-y-3">
              {d.education.map((e, i) => (
                <div key={i} className={smallSize}>
                  <p className="font-bold uppercase text-white">
                    {e.institute}
                  </p>
                  <p className="text-gray-400 uppercase">{e.degree}</p>
                  <p className="text-gray-500">
                    {e.startYear} - {e.passYear}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div
        className={`col-span-3 bg-white text-slate-900 ${spaceY} ${headPadding}`}
      >
        {d.summary && (
          <div>
            <CircleHead Icon={UserIcon} label="About Me" />
            <p className={`${smallSize} text-gray-700 leading-relaxed`}>
              {d.summary}
            </p>
          </div>
        )}

        {d.experience?.[0]?.jobTitle && (
          <div>
            <CircleHead Icon={BriefcaseIcon} label="Job Experience" />
            <div className={large ? "space-y-4" : "space-y-3"}>
              {d.experience.map((e, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline">
                    <p className={`${textSize} font-bold uppercase`}>
                      {e.jobTitle}
                    </p>
                    <p className={`${smallSize} font-semibold text-gray-500`}>
                      {e.startDate} - {e.endDate}
                    </p>
                  </div>
                  <p className={`${smallSize} italic text-sky-600`}>
                    {e.company}
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
          </div>
        )}

        {d.skills?.length > 0 && (
          <div>
            <CircleHead Icon={Cog6ToothIcon} label="Skills" />
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              {d.skills.slice(0, 6).map((s, i) => (
                <SkillBar key={i} name={s} pct={90 - i * 8} />
              ))}
            </div>
          </div>
        )}

        {hasProjects(d) && (
          <div>
            <CircleHead Icon={CodeBracketIcon} label="Projects" />
            <ProjectList
              items={d.projects}
              textSize={textSize}
              smallSize={smallSize}
            />
          </div>
        )}

        {hasCerts(d) && (
          <div>
            <CircleHead Icon={ShieldCheckIcon} label="Certifications" />
            <CertList items={d.certifications} smallSize={smallSize} />
          </div>
        )}

        <div className="grid grid-cols-2 gap-6">
          {d.languages?.length > 0 && (
            <div>
              <CircleHead Icon={LanguageIcon} label="Language" />
              <ul className={`${smallSize} list-disc list-inside space-y-1`}>
                {d.languages.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}