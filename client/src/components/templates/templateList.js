import TemplateMinimalMark from "./TemplateMinimalMark";
import TemplateMinimalSebastian from "./TemplateMinimalSebastian";
import TemplateProfessionalIsabel from "./TemplateProfessionalIsabel";
import TemplateProfessionalGeometric from "./TemplateProfessionalGeometric";
import TemplateProfessionalDark from "./TemplateProfessionalDark";
import TemplateCreativeIsabel from "./TemplateCreativeIsabel";
import TemplateCreativeGeometric from "./TemplateCreativeGeometric";
import TemplateCreativeNoel from "./TemplateCreativeNoel";
import TemplateATS from "./TemplateATS";
import TemplateATSPro from "./TemplateATSPro";

export const templateList = [
  {
    id: "minimal-mark",
    name: "Mark Brown",
    category: "minimal",
    categoryLabel: "Minimal",
    description: "Minimal — name left, details right",
    Component: TemplateMinimalMark,
  },
  {
    id: "minimal-sebastian",
    name: "Sebastian Bennett",
    category: "minimal",
    categoryLabel: "Minimal",
    description: "Minimal — centered header",
    Component: TemplateMinimalSebastian,
  },
  {
    id: "pro-isabel",
    name: "Isabel Mercado",
    category: "professional",
    categoryLabel: "Professional",
    description: "Professional — 2-column with black bars",
    Component: TemplateProfessionalIsabel,
  },
  {
    id: "pro-geometric",
    name: "Geometric",
    category: "professional",
    categoryLabel: "Professional",
    description: "Professional — geometric layout",
    Component: TemplateProfessionalGeometric,
  },
  {
    id: "pro-dark",
    name: "Noel Taylor",
    category: "professional",
    categoryLabel: "Professional",
    description: "Professional — dark sidebar with photo",
    Component: TemplateProfessionalDark,
  },
  {
    id: "creative-isabel",
    name: "Creative Isabel",
    category: "creative",
    categoryLabel: "Creative",
    description: "Creative — black pill headers",
    Component: TemplateCreativeIsabel,
  },
  {
    id: "creative-geometric",
    name: "Creative Geometric",
    category: "creative",
    categoryLabel: "Creative",
    description: "Creative — blue and black diagonal",
    Component: TemplateCreativeGeometric,
  },
  {
    id: "creative-noel",
    name: "Creative Noel",
    category: "creative",
    categoryLabel: "Creative",
    description: "Creative — dark sidebar timeline",
    Component: TemplateCreativeNoel,
  },
  {
    id: "ats",
    name: "ATS-Friendly",
    category: "ats",
    categoryLabel: "ATS",
    description: "Plain format for job portals",
    Component: TemplateATS,
  },
  {
    id: "ats-pro",
    name: "ATS Professional",
    category: "ats",
    categoryLabel: "ATS",
    description: "Bold black bar headers",
    Component: TemplateATSPro,
  },
];

export const templateCategories = [
  { id: "all", label: "All Templates", desc: "Browse every style at once" },
  { id: "minimal", label: "Minimal", desc: "Clean, no color, only details" },
  {
    id: "professional",
    label: "Professional",
    desc: "Sidebar and structured layouts",
  },
  { id: "creative", label: "Creative", desc: "Colorful sidebar design" },
  { id: "ats", label: "ATS-Friendly", desc: "Plain format for job portals" },
];