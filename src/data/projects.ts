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
      "“Turns out, looking for a job can become a full-time job itself.”",
    story:
      "Being a software engineering graduate in 2026 is no joke. After months of adapting my CV for different positions, checking keywords and running ATS tests, I realised I was spending almost as much time preparing applications as actually finding them. So I thought, why not bring everything I kept doing manually into one place? That became my Job Application Quality Checker, a full-stack platform for comparing a CV against a job description, finding skill gaps, checking ATS readiness and generating targeted improvements. Building it taught me how much I enjoy turning problems I face myself into useful products, while experimenting with where AI can genuinely make the experience better.",
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
      "“I looked at Sri Lanka’s ETA website and thought: we can do better.”",
    story:
      "As a Sri Lankan living abroad, seeing some of our official digital experiences still looking like they belonged to another era of the web genuinely disappointed me. Around the same time, I was becoming interested in data and wanted to experiment with Power BI, so I started analysing three years of Sri Lankan tourist arrivals. Somewhere between the data and my frustration with the digital experience, an idea started forming. I obviously couldn’t recreate an official government service, so instead I built the Sri Lanka Travel Explorer & Planner, an interactive way to discover the island and plan a journey around it. It became a project where I could bring together something personal to me with frontend development, design and my growing interest in data.",
    image: "/images/sl-demo.mp4",
    tech: ["React", "TypeScript", "Vite", "FastAPI", "Power BI", "Power Query"],
    github: "https://github.com/kksua/sri-lanka-tourism",
    demo: "https://sri-lanka-tourism-blond.vercel.app/",
  },
  {
    number: "PROJECT 03",
    category: "HEALTHCARE · ML",
    title: "MED'ING HACKATHON",
    headline: "“48 hours. Almost zero sleep. And somehow, third place.”",
    story:
      "MedIngHack was a 48-hour healthcare hackathon organised with my university and the Normandy region, with the challenge brought by Baumann Ed., a Normandy startup working on solutions for people with speech and language difficulties. In France, around 300,000 people live with aphasia, 4 to 6% of children experience learning disorders and waiting times for speech therapists can range from 4 to 18 months. Our team developed a speech-recognition solution using Wav2Vec2, built an API around the model and containerised it with Docker. After two intense days of building and testing, we reached 97.9% precision, 97.5% recall and a 97.4% F1 score, finishing in third place. More than the result, I loved seeing how technology could be applied to a problem where making things a little more accessible could actually matter.",
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
      "“Four strangers, different parts of the world, and three days to build something together.”",
    story:
      "I joined GenAI Academy’s remote Montgomery hackathon and ended up in a team of people from completely different backgrounds who had never worked together before. Within three days, we had to understand the challenge, agree on an idea, divide the work and turn it into a functioning prototype. We created a neighbourhood risk explorer, combining open data with web and social signals to build more meaningful indicators about different areas. The technical challenge was exciting, but my favourite part was seeing how quickly complete strangers could become a team when there was a deadline ticking in the background.",
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
