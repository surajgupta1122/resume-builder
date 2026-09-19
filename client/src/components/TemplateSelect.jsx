import { useState } from "react";
import {
  Squares2X2Icon,
  SparklesIcon,
  BriefcaseIcon,
  PaintBrushIcon,
  DocumentCheckIcon,
  CheckIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { templateList, templateCategories } from "./templates/templateList";
import { demoData } from "./templates/demoData";

export default function TemplateSelect({
  template,
  setTemplate,
  setPage,
  resumeData,
}) {
  const [filter, setFilter] = useState("all");
  const [zoomId, setZoomId] = useState(null);

  const categoryIcons = {
    all: { Icon: Squares2X2Icon, bg: "bg-indigo-100", color: "text-indigo-600" },
    minimal: { Icon: SparklesIcon, bg: "bg-gray-100", color: "text-gray-700" },
    professional: { Icon: BriefcaseIcon, bg: "bg-blue-100", color: "text-blue-600" },
    creative: { Icon: PaintBrushIcon, bg: "bg-emerald-100", color: "text-emerald-600" },
    ats: { Icon: DocumentCheckIcon, bg: "bg-amber-100", color: "text-amber-600" },
  };

  const templates = templateList;
  const categories = templateCategories;

  const filtered =
    filter === "all"
      ? templates
      : templates.filter((t) => t.category === filter);

  const zoomedTemplate = templates.find((t) => t.id === zoomId);

  const headerTitle =
    filter === "all"
      ? "Choose a Category"
      : categories.find((c) => c.id === filter)?.label + " Templates";

  const headerSubtitle =
    filter === "all"
      ? "Pick the style that matches your personality."
      : "Click any template to zoom and choose it.";

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      {/* Stepper */}
      <div className="flex items-center justify-center gap-4 mb-8">
        {[
          { n: 1, label: "Your Details", done: true },
          { n: 2, label: "Choose Template", active: true },
          { n: 3, label: "Preview & Download" },
        ].map((s, i) => (
          <div key={s.n} className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${
                  s.active
                    ? "bg-blue-600 text-white"
                    : s.done
                    ? "bg-green-500 text-white"
                    : "bg-white border-2 border-gray-300 text-gray-500"
                }`}
              >
                {s.done && !s.active ? <CheckIcon className="w-4 h-4" /> : s.n}
              </div>
              <span
                className={`text-xs mt-1 font-medium ${
                  s.active ? "text-blue-700" : "text-gray-500"
                }`}
              >
                {s.label}
              </span>
            </div>
            {i < 2 && <div className="w-16 h-px bg-gray-300 mb-5"></div>}
          </div>
        ))}
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {headerTitle}
        </h1>
        <p className="text-gray-600">{headerSubtitle}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* LEFT: Category cards */}
        <div className="lg:col-span-2 space-y-3">
          {categories.map((c) => {
            const isActive = filter === c.id;
            const { Icon, bg, color } = categoryIcons[c.id] || {};
            const count =
              c.id === "all"
                ? templates.length
                : templates.filter((t) => t.category === c.id).length;

            return (
              <div
                key={c.id}
                onClick={() => setFilter(c.id)}
                className={`bg-white rounded-2xl border-2 p-4 cursor-pointer transition-all hover:shadow-md flex items-center gap-4 ${
                  isActive
                    ? "border-blue-600 shadow-lg ring-2 ring-blue-100"
                    : "border-gray-200"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${bg}`}
                >
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-gray-900 text-sm">
                    {c.label}
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">{c.desc}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`text-xs font-semibold px-2 py-0.5 rounded ${
                      isActive
                        ? "bg-blue-100 text-blue-700"
                        : "bg-gray-100 text-gray-500"
                    }`}
                  >
                    {count}
                  </span>
                  <ArrowRightIcon className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT: Gallery grid */}
        <div className="lg:col-span-3">
          {filtered.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center">
              <p className="text-gray-500">No templates in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5">
              {filtered.map((t) => {
                const isSelected = template === t.id;
                const Comp = t.Component;

                return (
                  <div
                    key={t.id}
                    onClick={() => setZoomId(t.id)}
                    className={`group cursor-pointer rounded-2xl overflow-hidden bg-white border-2 transition-all duration-200 ${
                      isSelected
                        ? "border-blue-600 shadow-lg ring-2 ring-blue-100"
                        : "border-gray-200 hover:shadow-lg hover:border-gray-300"
                    }`}
                  >
                    <div className="relative aspect-[8.5/11] overflow-hidden bg-white">
                      <div
                        className="absolute top-0 left-0 origin-top-left pointer-events-none"
                        style={{
                          width: "300%",
                          height: "300%",
                          transform: "scale(0.3333)",
                        }}
                      >
                        <Comp resumeData={demoData} large={true} />
                      </div>

                      {isSelected && (
                        <div className="absolute top-2 right-2 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center shadow-md z-10">
                          <CheckIcon className="w-4 h-4 text-white" />
                        </div>
                      )}

                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center z-10">
                        <span className="opacity-0 group-hover:opacity-100 bg-white text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow transition">
                          Click to zoom
                        </span>
                      </div>
                    </div>

                    <div className="p-3 border-t border-gray-100">
                      <h3 className="font-bold text-gray-900 text-sm truncate">
                        {t.name}
                      </h3>
                      <p className="text-xs text-gray-500 mt-0.5">
                        {t.categoryLabel}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Bottom buttons */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={() => setPage("form")}
          className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Form
        </button>
        <button
          onClick={() => setPage("preview")}
          className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 shadow-md transition flex items-center justify-center gap-2"
        >
          Next: Preview & Download
          <ArrowRightIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Zoom Modal */}
      {zoomId && zoomedTemplate && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
          onClick={() => setZoomId(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-200 shrink-0">
              <button
                onClick={() => setZoomId(null)}
                className="flex items-center gap-2 text-gray-700 hover:text-gray-900 font-medium text-sm"
              >
                <ArrowLeftIcon className="w-5 h-5" />
                Back
              </button>

              <div className="text-center">
                <h3 className="font-bold text-gray-900">
                  {zoomedTemplate.name}
                </h3>
                <p className="text-xs text-gray-500">
                  {zoomedTemplate.categoryLabel}
                </p>
              </div>

              <button
                onClick={() => setZoomId(null)}
                className="w-9 h-9 rounded-lg hover:bg-gray-100 flex items-center justify-center transition"
              >
                <XMarkIcon className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
              <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-3xl mx-auto">
                <zoomedTemplate.Component resumeData={demoData} large={true} />
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 flex gap-3 shrink-0">
              <button
                onClick={() => setZoomId(null)}
                className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-2.5 rounded-xl font-semibold hover:bg-gray-50 transition text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setTemplate(zoomId);
                  setZoomId(null);
                }}
                className="flex-1 bg-blue-600 text-white py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition text-sm"
              >
                Use This Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}