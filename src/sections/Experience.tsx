import { ExperienceColumn } from '../components/ExperienceColumn'
import { experience } from '../data/experience'

export function Experience() {
  return (
    <section id="experience" className="px-4 py-4 md:px-8 md:py-5">
      <div className="mb-4 border-b border-ink pb-3">
        <h2 className="font-display text-[2.5rem] leading-none tracking-[-0.06em] text-ink md:text-[4rem]">EXPERIENCE</h2>
      </div>

      <div className="grid gap-8 md:grid-cols-2 md:gap-10">
        {experience.map((item) => (
          <ExperienceColumn key={item.company} {...item} />
        ))}
      </div>
    </section>
  )
}
