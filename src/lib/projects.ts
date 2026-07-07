export type Project = {
  index: string;
  name: string;
  system: string;
  tagline: string;
  story: string;
  image: string;
  imageAlt: string;
  tech: string[];
  facts: { label: string; value: string }[];
  accent: "ember" | "sage";
};

export const projects: Project[] = [
  {
    index: "01",
    name: "CWBMS",
    system: "CVHAI San Pedro Water Billing System",
    tagline: "Water, billed and paid — securely, online.",
    story:
      "A complete water billing system for CVHAI in Laguna. Residents log in to see their balance and pay online through PayMongo, while admins manage accounts and field readers capture consumption on their side. Because real money moves through it, every layer was built with hardening in mind — and it shipped to production on DigitalOcean, managed by Laravel Forge.",
    image: "/projects/cwbms.webp",
    imageAlt: "CVHAI San Pedro Water Billing System v2.0 login screen beside a resident viewing a payment receipt on a phone.",
    tech: ["Laravel", "Tailwind CSS", "MySQL", "PayMongo", "DigitalOcean", "Laravel Forge", "Mailjet", "UnisMS"],
    facts: [
      { label: "Role", value: "Full-stack developer" },
      { label: "Year", value: "2024" },
      { label: "Deployment", value: "DigitalOcean · Laravel Forge" },
      { label: "Integrations", value: "PayMongo · Mailjet · UnisMS" },
    ],
    accent: "ember",
  },
  {
    index: "02",
    name: "CHO HRIS",
    system: "City Health Office — Human Resources Information System",
    tagline: "Personnel records, held with care.",
    story:
      "An internal HRIS for the City Health Office that stores 201 files and manages permits to leave. Built on Laravel 12 with Inertia React and TypeScript, it ships as a drop-in folder — no virtual host, no service restart. Private files live outside the web root and are served only through permission-checked routes, with server-side pagination and indexed queries keeping every list fast.",
    image: "/projects/hris.webp",
    imageAlt: "City Health Office Parañaque HRIS authorized access sign-in screen beside the health office building.",
    tech: ["Laravel 12", "PHP 8.2", "Inertia.js", "React", "TypeScript", "Vite", "MySQL", "Tailwind CSS"],
    facts: [
      { label: "Role", value: "Full-stack developer" },
      { label: "Year", value: "2025" },
      { label: "Architecture", value: "Drop-in, no vhost" },
      { label: "Security", value: "Permission-checked file routes" },
    ],
    accent: "sage",
  },
  {
    index: "03",
    name: "MRSIA",
    system: "Measles–Rubella Reporting Console 2026",
    tagline: "A campaign, counted in real time.",
    story:
      "A reporting console for the 2026 MR-SIA vaccination campaign. One admin dashboard spans every health center and hospital — managing locations, creating encoder accounts through Supabase Edge Functions, allocating target populations and stock. Encoders submit daily reports that refresh in real time, while the console handles MR, Vitamin A and AD-syringe inventory math, deferral and AEFI capture, and consolidated Excel exports shaped after the official workbook.",
    image: "/projects/mrsia.webp",
    imageAlt: "Measles-Rubella Reporting Console v2.0 sign-in screen for the MR-SIA Campaign 2026.",
    tech: ["React", "Vite", "TypeScript", "Tailwind CSS", "Supabase", "Row Level Security", "Edge Functions", "ExcelJS"],
    facts: [
      { label: "Role", value: "Full-stack developer" },
      { label: "Year", value: "2026" },
      { label: "Backend", value: "Supabase · Edge Functions" },
      { label: "Export", value: "ExcelJS .xlsx" },
    ],
    accent: "ember",
  },
  {
    index: "04",
    name: "CHOIMS",
    system: "City Health Office Inventory Management System",
    tagline: "Every asset, accounted for — across the LAN.",
    story:
      "A full inventory system for the city health department, tracking assets and consumables across the main office and satellite centers over a local network. Transfers move through approval workflows; six role tiers — from GodMode down to Health Center staff — each see a tailored dashboard, with real-time tracking and complete audit trails behind every movement.",
    image: "/projects/choims.webp",
    imageAlt: "PCHIMS v2.2 inventory management system login screen beside the Barangay Don Galo Health Center.",
    tech: ["PHP 8.4", "MySQL", "XAMPP", "HTML", "CSS", "JavaScript"],
    facts: [
      { label: "Role", value: "Full-stack developer" },
      { label: "Year", value: "2025" },
      { label: "Roles", value: "6 role tiers" },
      { label: "Scope", value: "Multi-site LAN" },
    ],
    accent: "sage",
  },
  {
    index: "05",
    name: "QuadShot POS",
    system: "Point-of-Sale for QuadShot Café",
    tagline: "A café, run from one screen.",
    story:
      "A point-of-sale system built for a friend's café — QuadShot. One terminal handles the full menu, order queue, sales reports, expenses, menu and staff management. Built with React and Supabase and deployed on Vercel, it keeps a busy service moving with a clean, tap-friendly interface.",
    image: "/projects/quadshot.webp",
    imageAlt: "QuadShot Café POS terminal showing menu categories, product grid and current order panel.",
    tech: ["React", "JavaScript", "CSS", "Supabase", "Vercel"],
    facts: [
      { label: "Role", value: "Full-stack developer" },
      { label: "Year", value: "2025" },
      { label: "Deployment", value: "Vercel" },
      { label: "Database", value: "Supabase" },
    ],
    accent: "ember",
  },
];
