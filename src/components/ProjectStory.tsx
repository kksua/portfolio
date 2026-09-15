import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Project } from "../data/projects";

type ProjectStoryProps = {
  project: Project;
  reverse?: boolean;
};

function splitStoryIntoColumns(story: string): [string, string] {
  const trimmed = story.trim();

  if (!trimmed) {
    return ["", ""];
  }

  const midpoint = Math.floor(trimmed.length / 2);
  const lastSpaceBefore = trimmed.lastIndexOf(" ", midpoint);
  const firstSpaceAfter = trimmed.indexOf(" ", midpoint + 1);

  let splitIndex = midpoint;

  if (lastSpaceBefore !== -1 && firstSpaceAfter !== -1) {
    splitIndex =
      midpoint - lastSpaceBefore < firstSpaceAfter - midpoint
        ? lastSpaceBefore
        : firstSpaceAfter;
  } else if (lastSpaceBefore !== -1) {
    splitIndex = lastSpaceBefore;
  } else if (firstSpaceAfter !== -1) {
    splitIndex = firstSpaceAfter;
  }

  while (splitIndex > 0 && trimmed[splitIndex] !== " ") {
    splitIndex -= 1;
  }

  const firstColumn = trimmed.slice(0, splitIndex).trimEnd();
  const secondColumn = trimmed.slice(splitIndex).trimStart();

  return [firstColumn, secondColumn];
}

export function ProjectStory({ project }: ProjectStoryProps) {
  const isVideo = project.image.toLowerCase().endsWith(".mp4");

  const [storyFirstColumn, storySecondColumn] = splitStoryIntoColumns(
    project.story,
  );

  /*
   * VIDEO POSITIONING
   *
   * Joblyst + Montgomery:
   * Headline -> Video -> Story -> Tech -> Buttons
   *
   * Sri Lanka + Med'Ing:
   * Headline -> Story -> Tech -> Video -> Buttons
   */

  const videoAfterHeadline =
    project.title === "JOB APPLICATION ANALYSER" ||
    project.title === "MONTGOMERY RISK EXPLORER";

  const videoAfterTech =
    project.title === "SRI LANKA TRAVEL EXPLORER" ||
    project.title === "MED'ING HACKATHON";

  /*
   * Montgomery only shows Live Demo.
   * Med'Ing currently shows no buttons.
   * Joblyst + Sri Lanka show GitHub and Live Demo when available.
   */

  const isMontgomery = project.title === "MONTGOMERY RISK EXPLORER";
  const isMeding = project.title === "MED'ING HACKATHON";

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="space-y-6 border-t border-ink pt-8"
    >
      {/* TITLE + HEADLINE */}
      <div>
        <h3 className="font-sans text-[1.1rem] font-bold uppercase tracking-[0.08em] text-ink md:text-[1.3rem]">
          {project.title}
        </h3>

        <p className="mt-4 text-[0.88rem] uppercase tracking-[0.08em] text-muted">
          {project.headline}
        </p>
      </div>

      {/* VIDEO AFTER HEADLINE:
          JOB APPLICATION ANALYSER + MONTGOMERY */}
      {videoAfterHeadline && isVideo ? (
        <div className="flex w-full items-center justify-center overflow-hidden border border-ink bg-paper">
          <video
            src={project.image}
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="auto"
            className="h-[220px] w-full object-cover md:h-[360px]"
            aria-label={project.title}
            onContextMenu={(event) => event.preventDefault()}
          />
        </div>
      ) : null}

      {/* STORY */}
      <div className="grid gap-5 text-justify text-[1rem] leading-relaxed text-ink md:grid-cols-2">
        <p className="mb-0">{storyFirstColumn}</p>
        <p className="mb-0">{storySecondColumn}</p>
      </div>

      {/* TECH STACK */}
      <div className="font-sans text-[0.62rem] uppercase tracking-[0.18rem] text-muted">
        {project.tech.join(" , ")}
      </div>

      {/* VIDEO AFTER TECH:
          SRI LANKA + MED'ING */}
      {videoAfterTech && isVideo ? (
        <div className="flex w-full items-center justify-center overflow-hidden border border-ink bg-paper">
          <video
            src={project.image}
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="auto"
            className="h-[220px] w-full object-cover md:h-[360px]"
            aria-label={project.title}
            onContextMenu={(event) => event.preventDefault()}
          />
        </div>
      ) : null}

      {/* BUTTONS */}
      {isMontgomery ? (
        <div className="flex flex-wrap gap-3 font-sans text-[0.62rem] uppercase tracking-[0.18rem]">
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-ink px-3 py-2 text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              Live demo
              <ArrowUpRight size={12} />
            </a>
          ) : null}
        </div>
      ) : !isMeding ? (
        <div className="flex flex-wrap gap-3 font-sans text-[0.62rem] uppercase tracking-[0.18rem]">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-ink px-3 py-2 text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              GitHub
              <ArrowUpRight size={12} />
            </a>
          ) : null}

          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 border border-ink px-3 py-2 text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              Live demo
              <ArrowUpRight size={12} />
            </a>
          ) : null}
        </div>
      ) : null}
    </motion.article>
  );
}
