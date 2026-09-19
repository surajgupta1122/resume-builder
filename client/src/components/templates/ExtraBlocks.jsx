// Shared pieces used by every template to print the Projects and
// Certifications that the user typed in the form (no hard-coded text).

export function ProjectList({ items = [], textSize = "", smallSize = "" }) {
  return (
    <div className="space-y-2">
      {items
        .filter((p) => p?.name?.trim())
        .map((p, i) => (
          <div key={i}>
            <p className={`${textSize} font-bold`}>
              {p.name}
              {p.tech && (
                <span className="font-normal text-gray-500"> | {p.tech}</span>
              )}
            </p>
            {p.description && (
              <p className={`${smallSize} text-gray-700 leading-relaxed`}>
                {p.description}
              </p>
            )}
            {p.link && (
              <p className={`${smallSize} text-gray-500 break-all`}>{p.link}</p>
            )}
          </div>
        ))}
    </div>
  );
}

export function CertList({ items = [], smallSize = "" }) {
  return (
    <div className="space-y-1">
      {items
        .filter((c) => c?.name?.trim())
        .map((c, i) => (
          <p key={i} className={`${smallSize} text-gray-700`}>
            <span className="font-semibold">{c.name}</span>
            {(c.issuer || c.year) && (
              <span> — {[c.issuer, c.year].filter(Boolean).join(", ")}</span>
            )}
          </p>
        ))}
    </div>
  );
}
