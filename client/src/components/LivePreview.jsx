import { EyeIcon } from "@heroicons/react/24/outline";
import TemplateMinimalMark from "./templates/TemplateMinimalMark";
import TemplateMinimalSebastian from "./templates/TemplateMinimalSebastian";
import TemplateProfessionalIsabel from "./templates/TemplateProfessionalIsabel";
import TemplateProfessionalGeometric from "./templates/TemplateProfessionalGeometric";
import TemplateProfessionalDark from "./templates/TemplateProfessionalDark";
import TemplateCreativeIsabel from "./templates/TemplateCreativeIsabel";
import TemplateCreativeGeometric from "./templates/TemplateCreativeGeometric";
import TemplateCreativeNoel from "./templates/TemplateCreativeNoel";
import TemplateATS from "./templates/TemplateATS";
import TemplateATSPro from "./templates/TemplateATSPro";
import ResumeScale from "./ResumeScale";

export default function LivePreview({
  resumeData,
  template = "minimal-mark",
  large = false,
  bare = false,
  setTemplate,
}) {
  const wrapClass = large ? "w-full" : "sticky top-20 self-start";
  const containerPad = large ? "p-2 md:p-6" : "p-2 md:p-3";
  const cardMin = large ? "md:min-h-[900px]" : "";

  const renderTemplate = () => {
    switch (template) {
      case "minimal-sebastian":
        return (
          <TemplateMinimalSebastian resumeData={resumeData} large={large} />
        );
      case "pro-isabel":
        return (
          <TemplateProfessionalIsabel resumeData={resumeData} large={large} />
        );
      case "pro-geometric":
        return (
          <TemplateProfessionalGeometric
            resumeData={resumeData}
            large={large}
          />
        );
      case "pro-dark":
        return (
          <TemplateProfessionalDark resumeData={resumeData} large={large} />
        );
      case "creative-isabel":
        return (
          <TemplateCreativeIsabel resumeData={resumeData} large={large} />
        );
      case "creative-geometric":
        return (
          <TemplateCreativeGeometric resumeData={resumeData} large={large} />
        );
      case "creative-noel":
        return (
          <TemplateCreativeNoel resumeData={resumeData} large={large} />
        );
      case "ats":
        return <TemplateATS resumeData={resumeData} large={large} />;
      case "ats-pro":
        return <TemplateATSPro resumeData={resumeData} large={large} />;
      case "minimal-mark":
      default:
        return <TemplateMinimalMark resumeData={resumeData} large={large} />;
    }
  };

  // bare = only the resume, no card/border (used for the print copy)
  if (bare) return renderTemplate();

  return (
    <div className={wrapClass}>
      <div
        className={`bg-white rounded-2xl border border-gray-200 shadow-sm ${containerPad}`}
      >
        {!large && (
          <div className="flex items-center justify-between mb-2 md:mb-3">
            <div className="flex items-center gap-2">
              <EyeIcon className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
              <div className="min-w-0">
                <h3 className="font-bold text-gray-900 text-xs md:text-sm truncate">
                  Live Preview
                </h3>
                <p className="text-[10px] md:text-xs text-gray-500 truncate">
                  See how your resume looks in real-time
                </p>
              </div>
            </div>
          </div>
        )}

        <div
          id={large ? "resume-capture" : undefined}
          className={`rounded-xl overflow-hidden shadow-lg bg-white ${cardMin}`}
        >
          {/* Large preview (Preview page): scale down on mobile
              Small preview (Form page): render as-is */}
          {large ? (
            <ResumeScale baseWidth={780}>{renderTemplate()}</ResumeScale>
          ) : (
            renderTemplate()
          )}
        </div>

        {!large && (
          <div className="mt-3 md:mt-4 bg-white rounded-2xl border border-gray-200 p-3 md:p-4 flex items-start gap-2 md:gap-3">
            <span className="text-amber-400 text-base md:text-xl">⭐</span>
            <div className="min-w-0">
              <p className="font-bold text-gray-900 text-xs md:text-sm">
                Looks good!
              </p>
              <p className="text-[10px] md:text-xs text-gray-600 leading-snug">
                Next, choose a template that matches your style.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}