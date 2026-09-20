import { createPortal } from "react-dom";
import {
  ArrowLeftIcon,
  CloudArrowUpIcon,
  ArrowDownTrayIcon,
  CheckIcon,
  PrinterIcon,
} from "@heroicons/react/24/outline";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import LivePreview from "./LivePreview";
import { authFetch } from "../api";

export default function Preview({
  resumeData,
  setResumeData,
  template,
  setTemplate,
  setPage,
}) {
  const d = resumeData;

  const downloadPDF = async () => {
    const el = document.getElementById("resume-capture");
    if (!el) return alert("Resume preview not found");

    const canvas = await html2canvas(el, {
      scale: 2,
      backgroundColor: "#ffffff",
      onclone: (doc) => {
        const clone = doc.getElementById("resume-capture");
        clone.style.borderRadius = "0";
        clone.style.boxShadow = "none";
      },
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.95);
    const pdf = new jsPDF("p", "mm", "a4");
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const imgH = (canvas.height * pageW) / canvas.width;

    let heightLeft = imgH;
    let position = 0;
    pdf.addImage(imgData, "JPEG", 0, position, pageW, imgH);
    heightLeft -= pageH;
    while (heightLeft > 0) {
      position -= pageH;
      pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, position, pageW, imgH);
      heightLeft -= pageH;
    }

    pdf.save(`${d.name || "resume"}.pdf`);
  };

  const printPDF = () => {
    const oldTitle = document.title;
    document.title = `${d.name || "resume"} - Resume`;
    window.onafterprint = () => {
      document.title = oldTitle;
      window.onafterprint = null;
    };
    window.print();
  };

  const saveToDB = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return alert("Please login first");

    // Already saved before? Then update it, otherwise create a new one
    const isUpdate = !!d.resume_id;
    const url = isUpdate
      ? `http://localhost:5000/api/resume/${d.resume_id}`
      : "http://localhost:5000/api/resume";

    try {
      const res = await authFetch(url, {
        method: isUpdate ? "PUT" : "POST",
        body: JSON.stringify({
          title: (d.name || "My") + "'s Resume",
          content: JSON.stringify(d),
          template_id: template,
        }),
      });
      const data = await res.json();
      alert(data.message);

      // remember the id, so the next Save updates this same resume
      if (res.ok && data.resume_id)
        setResumeData({ ...d, resume_id: data.resume_id });
    } catch {
      alert("Server not reachable");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-center gap-4 mb-8">
        {[
          { n: 1, label: "Your Details", done: true },
          { n: 2, label: "Choose Template", done: true },
          { n: 3, label: "Preview & Download", active: true },
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

      <div className="flex gap-3 mb-6 flex-wrap">
        <button
          onClick={() => setPage("template")}
          className="bg-white border-2 border-gray-300 text-gray-700 px-5 py-2.5 rounded-xl font-semibold hover:bg-gray-50 transition flex items-center gap-2"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          Back to Templates
        </button>
        <button
          onClick={saveToDB}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-blue-700 transition flex items-center gap-2"
        >
          <CloudArrowUpIcon className="w-5 h-5" />
          Save to Database
        </button>
        <button
          onClick={downloadPDF}
          className="bg-green-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:bg-green-700 transition ml-auto flex items-center gap-2"
        >
          <ArrowDownTrayIcon className="w-5 h-5" />
          Download PDF
        </button>
        <button
          onClick={printPDF}
          className="bg-white border-2 border-green-600 text-green-700 px-5 py-2.5 rounded-xl font-semibold hover:bg-green-50 transition flex items-center gap-2"
        >
          <PrinterIcon className="w-5 h-5" />
          Text PDF (ATS)
        </button>
      </div>

      <LivePreview
        resumeData={resumeData}
        template={template}
        setTemplate={setTemplate}
        setPage={setPage}
        large={true}
      />

      {createPortal(
        <div id="print-root">
          <LivePreview
            resumeData={resumeData}
            template={template}
            large={true}
            bare={true}
          />
        </div>,
        document.body
      )}
    </div>
  );
}