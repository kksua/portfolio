export type ExperienceItem = {
  company: string;
  role: string;
  city: string;
  year: string;
  points: string[];
};

export const experience: ExperienceItem[] = [
  {
    company: "RIVIÈRE YUAN",
    role: "Full-Stack & GenAI Intern",
    city: "Paris, France",
    year: "Jun 2025 - Oct 2025",
    points: [
      "Migrated multi-year WordPress data to Supabase with Python scripts, resolving duplicate, incomplete and obsolete records.",
      "Built and iterated on user-facing, data-driven features with React, TypeScript, Node.js, REST APIs and PostgreSQL across frontend and backend layers.",
      "Designed API-driven workflows and streamlined user enrolment processes, reducing selected administrative work by up to 85%.",
      "Improved the user experience and performance of content access through cursor-based PostgreSQL pagination, reducing transferred data per request by about 70%.",
      "Built a RAG document-analysis workflow that reduced manual review time by about 60%.",
    ],
  },
  {
    company: "ART & SCIENCE NODE",
    role: "Web development Intern",
    city: "Berlin, Germany",
    year: "Jul 2024 - Sept 2024",
    points: [
      "Developed and launched a European project website using HTML, CSS, JavaScript and WordPress within eight weeks.",
      "Integrated two interactive 3D models using Three.js and optimised website performance.",
      "Contributed to a Python Processing animation for the project’s visual communication.",
      "Collaborated with stakeholders and mentored two junior interns, supporting delivery and review of their work.",
    ],
  },
];
