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

export default function LivePreview({
  resumeData,
  template = "minimal-mark",
  large = false,
  setTemplate,
}) {
  const wrapClass = large ? "w-full" : "sticky top-20 self-start";
  const containerPad = large ? "p-6" : "p-3";
  const cardMin = large ? "min-h-[900px]" : "";

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

  return (
    <div className={wrapClass}>
      <div
        className={`bg-white rounded-2xl border border-gray-200 shadow-sm ${containerPad}`}
      >
        {!large && (
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <EyeIcon className="w-5 h-5 text-blue-600" />
              <div>
                <h3 className="font-bold text-gray-900 text-sm">
                  Live Preview
                </h3>
                <p className="text-xs text-gray-500">
                  See how your resume looks in real-time
                </p>
              </div>
            </div>
          </div>
        )}

        <div
          className={`rounded-xl overflow-hidden shadow-lg bg-white ${cardMin}`}
        >
          {renderTemplate()}
        </div>

        {!large && (
          <div className="mt-4 bg-white rounded-2xl border border-gray-200 p-4 flex items-start gap-3">
            <span className="text-amber-400 text-xl">⭐</span>
            <div>
              <p className="font-bold text-gray-900 text-sm">Looks good!</p>
              <p className="text-xs text-gray-600">
                Next, choose a template that matches your style.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}