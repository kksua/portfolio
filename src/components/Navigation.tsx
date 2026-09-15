const navItems = ['ABOUT', 'EXPERIENCE', 'PROJECTS', 'PHOTOGRAPHY', 'CONTACT']

export function Navigation() {
  return (
    <nav aria-label="Main navigation" className="border-b border-t border-ink bg-paper">
      <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 py-2 text-[0.7rem] font-sans uppercase tracking-[0.28rem] text-ink md:gap-x-10 md:px-8 md:py-2">
        {navItems.map((item) => (
          <li key={item}>
            <a href={`#${item.toLowerCase()}`} className="nav-link relative inline-block py-1 transition-colors hover:text-accent">
              {item}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
