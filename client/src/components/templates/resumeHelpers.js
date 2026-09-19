// Small helpers used by the templates to decide whether to show the
// Projects / Certifications sections (only when the user filled something).

export const hasProjects = (d) =>
  (d?.projects || []).some((p) => p?.name?.trim());

export const hasCerts = (d) =>
  (d?.certifications || []).some((c) => c?.name?.trim());
