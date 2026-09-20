// Simple validation helpers used by the forms

export const isValidEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((value || "").trim());

// 10 to 15 digits; spaces, dashes, brackets and a leading + are allowed
export const isValidPhone = (value) => {
  const text = (value || "").trim();
  const digits = text.replace(/\D/g, "");
  return (
    /^[+(\d][\d\s\-()]*$/.test(text) && digits.length >= 10 && digits.length <= 15
  );
};

// Returns an object like { email: "message" }. Empty object = no errors.
export function validateResume(data) {
  const errors = {};

  if (!data.name?.trim()) errors.name = "Full name is required";
  else if (data.name.trim().length < 2)
    errors.name = "Name must be at least 2 characters";

  if (!data.email?.trim()) errors.email = "Email is required";
  else if (!isValidEmail(data.email))
    errors.email = "Enter a valid email (example: name@example.com)";

  if (!data.phone?.trim()) errors.phone = "Phone number is required";
  else if (!isValidPhone(data.phone))
    errors.phone = "Enter a valid phone number (10 to 15 digits)";

  if (!data.location?.trim()) errors.location = "Location is required";

  return errors;
}