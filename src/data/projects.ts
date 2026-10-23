export type Project = {
  number: string;
  category: string;
  title: string;
  headline: string;
  story: string;
  image: string;
  tech: string[];
  github: string;
  demo?: string;
};

export const projects: Project[] = [
  {
    number: "PROJECT 01",
    category: "PRODUCT · AI",
    title: "JOB APPLICATION ANALYSER",
    headline:
      "Helping job seekers turn repeated CV checks into one application review",
    story:
      "After months of tailoring my CV, I built a full-stack tool for job seekers repeating the same application checks. The first version combines CV-to-role comparison, skill gaps, ATS-readiness checks and AI suggestions in one review. Bringing these tasks together gave the product a clear focus: reducing the effort of preparing each application. The live demo shows the workflow; time saved and application outcomes still need validation with other users.",
    image: "/images/joblyst.mp4",
    tech: [
      "Python",
      "React",
      "TypeScript",
      "FastAPI",
      "OpenAI",
      "Pydantic",
      "Pytest",
      "GitHub Actions",
    ],
    github: "https://github.com/kksua/job-application-quality-checker",
    demo: "https://joblyst-ai.vercel.app/",
  },
  {
    number: "PROJECT 02",
    category: "TRAVEL · DATA",
    title: "SRI LANKA TRAVEL EXPLORER",
    headline:
      "Helping visitors explore Sri Lanka through travel planning and tourism data",
    story:
      "As a Sri Lankan living abroad, I wanted to make discovering the island and planning a trip more approachable. I analysed three years of tourist arrivals with Power BI and Power Query, then built an interactive Travel Explorer & Planner. I focused on independent travel discovery rather than recreating the government ETA service. The result is a working demo that brought together frontend design and data exploration; its impact on trip planning still needs user testing.",
    image: "/images/sl-demo.mp4",
    tech: ["React", "TypeScript", "Vite", "FastAPI", "Power BI", "Power Query"],
    github: "https://github.com/kksua/sri-lanka-tourism",
    demo: "https://sri-lanka-tourism-blond.vercel.app/",
  },
  {
    number: "PROJECT 03",
    category: "HEALTHCARE · ML",
    title: "MED'ING HACKATHON",
    headline:
      "A speech-recognition prototype delivered in 48 hours and awarded third place",
    story:
      "In a 48-hour healthcare hackathon, our team tackled a challenge from Baumann Ed. supporting people with speech and language difficulties. I researched scoring algorithms and developed the website. Together, we delivered a Wav2Vec2 speech-recognition prototype with an API and Docker packaging, keeping the scope manageable within two days. We finished third with reported precision of 97.9%, recall of 97.5% and an F1 score of 97.4%. The experience taught me to balance rapid delivery with clear limits on what prototype results demonstrate.",
    image: "/images/hedinghack.mp4",
    tech: [
      "Python",
      "Wav2Vec2",
      "Docker",
      "API Development",
      "Machine Learning",
    ],
    github: "https://github.com/",
    demo: "https://example.com/",
  },
  {
    number: "PROJECT 04",
    category: "HACKATHON · DATA",
    title: "MONTGOMERY RISK EXPLORER",
    headline:
      "Combining neighbourhood data into a risk-explorer prototype in three days",
    story:
      "At GenAI Academy’s remote Montgomery hackathon, our team had three days to help people make sense of scattered neighbourhood information. I worked across the frontend and backend of a risk explorer combining open data with web and social signals. We chose a prototype focused on neighbourhood indicators to keep the idea deliverable within the deadline. The result was a working live demo and a lesson in coordinating a newly formed remote team. Data coverage, indicator accuracy and usefulness still need validation.",
    image: "/images/montgomery.mp4",
    tech: [
      "JavaScript",
      "Turf.js",
      "Open Data",
      "Bright Data",
      "REST API",
      "Gemini AI",
    ],
    github: "https://github.com/",
    demo: "https://citypulse.abacusai.app/",
  },
];
