type SectionHeadingProps = {
  title: string
  subtitle?: string
  align?: 'left' | 'center'
}

export function SectionHeading({ title, subtitle, align = 'left' }: SectionHeadingProps) {
  return (
    <div className={`mb-8 md:mb-10 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      <div className="mb-2 text-[0.62rem] font-medium uppercase tracking-[0.28rem] text-muted">
        {subtitle}
      </div>
      <h2 className="font-display text-[2.2rem] leading-none tracking-[-0.05em] text-ink md:text-[3.2rem]">
        {title}
      </h2>
    </div>
  )
}
