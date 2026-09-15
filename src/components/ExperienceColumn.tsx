type ExperienceColumnProps = {
  company: string;
  role: string;
  city: string;
  year: string;
  points: string[];
};

export function ExperienceColumn({
  company,
  role,
  city,
  year,
  points,
}: ExperienceColumnProps) {
  return (
    <article className="border-t border-ink pt-5">
      <div className="mb-4 flex flex-col gap-2 md:mb-6">
        <div className="flex items-baseline justify-between gap-4">
          <h3 className="font-sans text-[1.1rem] font-bold uppercase tracking-[0.08em] text-ink md:text-[1.3rem]">
            {company}
          </h3>
          <span className="text-[0.62rem] font-sans uppercase tracking-[0.18rem] text-muted">
            {year}
          </span>
        </div>
        <div className="text-[0.7rem] font-sans uppercase tracking-[0.18rem] text-muted">
          {role} | {city}
        </div>
      </div>

      <ul className="space-y-3 text-[0.98rem] leading-relaxed text-ink text-justify md:text-[1.05rem]">
        {points.map((point) => (
          <li key={point} className="flex gap-3">
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 bg-ink"
              aria-hidden="true"
            />
            <span className="text-justify">{point}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}
