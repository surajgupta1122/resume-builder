import React from "react";

export default function ResumeIcon({
  size = 250,
  theme = "blue",
  plain = false,
  className = "",
}) {
  const gradientClass =
    theme === "green"
      ? "from-green-100 to-emerald-200"
      : "from-blue-200 to-indigo-200";

  return (
    <div
      className={`relative mx-4 resume-wrapper cursor-pointer ${className}`}
      style={{ width: size * 0.6, height: size * 0.7 }}
    >
      {/* 
        This raw CSS block guarantees smooth transitions 
        by completely bypassing Tailwind JIT purging 
      */}
      <style>{`
        .resume-wrapper:hover .animated-bg {
          transform: rotate(0deg) !important;
        }
        .resume-wrapper:hover .animated-fg {
          transform: scale(1.05) !important;
        }
        .animated-bg, .animated-fg {
          transition: transform 0.5s ease-in-out !important;
          will-change: transform;
        }
      `}</style>

      {/* 1. Tilted Background Shadow Box */}
      {!plain && (
        <div
          className={`absolute -inset-2 bg-gradient-to-tr ${gradientClass} rounded-2xl shadow-xl animated-bg`}
          style={{ transform: "rotate(-3deg)" }}
        ></div>
      )}

      {/* 2. Main Document Box */}
      <div
        className="relative w-full h-full rounded-2xl bg-gray-50 shadow-2xl overflow-hidden animated-fg"
        style={{ transform: "scale(1)" }}
      >
        <svg viewBox="8 8 75 85" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Profile Avatar */}
          <rect x="18" y="15" width="20" height="20" rx="3" fill="#E5E7EB" />
          <circle cx="28" cy="22" r="4" fill="#9CA3AF" />
          <path d="M22 32 C22 27 34 27 34 32" fill="#EF4444" />

          {/* CV Text */}
          <text
            x="44"
            y="32"
            fontFamily="Arial, Helvetica, sans-serif"
            fontWeight="bold"
            fontSize="22"
            fill="#1E3A8A"
          >
            CV
          </text>

          {/* Top Lines */}
          <rect x="18" y="45" width="44" height="3" rx="1.5" fill="#9CA3AF" />
          <rect x="18" y="52" width="38" height="3" rx="1.5" fill="#9CA3AF" />

          {/* --- CHECKBOX 1 WITH LINES --- */}
          <g>
            <rect
              x="18"
              y="60"
              width="12"
              height="12"
              rx="2"
              fill="#FFFFFF"
              stroke="#A9C4D9"
              strokeWidth="2.5"
            />
            <path
              d="M 20 65 L 23 70 L 28 60"
              stroke="#A3E635"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect x="35" y="63" width="40" height="3" rx="1.5" fill="#9CA3AF" />
            <rect x="35" y="69" width="30" height="3" rx="1.5" fill="#9CA3AF" />
          </g>

          {/* --- CHECKBOX 2 WITH LINES --- */}
          <g>
            <rect
              x="18"
              y="76"
              width="12"
              height="12"
              rx="2"
              fill="#FFFFFF"
              stroke="#A9C4D9"
              strokeWidth="2.5"
            />
            <path
              d="M 20 82 L 23 86 L 28 76"
              stroke="#A3E635"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <rect x="35" y="79" width="40" height="3" rx="1.5" fill="#9CA3AF" />
            <rect x="35" y="85" width="30" height="3" rx="1.5" fill="#9CA3AF" />
          </g>
        </svg>
      </div>
    </div>
  );
}