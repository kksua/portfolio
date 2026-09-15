import { Download, Mail, ExternalLink } from "lucide-react";

const contactLinks = [
  { label: "Email", href: "mailto:supipiamarajeeva@gmail.com", icon: Mail },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/supipi-amarajeeva/",
    icon: ExternalLink,
  },
  { label: "GitHub", href: "https://github.com/kksua", icon: ExternalLink },
  {
    label: "Download CV",
    href: "/images/Supipi%20Amarajeeva-CV.pdf",
    icon: Download,
  },
];

export function Contact() {
  return (
    <section id="contact" className="px-4 py-4 md:px-8 md:py-5">
      <div className="border-b border-ink pb-4">
        <h2 className="font-display text-[2.3rem] leading-none tracking-[-0.06em] text-ink md:text-[4rem]">
          GET IN TOUCH
        </h2>
      </div>

      <div className="mt-8 grid gap-8 md:grid-cols-[1.2fr_1.5fr] md:items-end">
        <p className="max-w-lg text-[1rem] leading-relaxed text-ink md:text-[1.3rem]">
          I&apos;m currently looking for CDI/CDD opportunities in France. If you
          have an opportunity or would simply like to connect, feel free to
          reach out by email or LinkedIn. <br /> I would love to chat!
        </p>

        <div className="flex flex-wrap gap-x-3 gap-y-3">
          {contactLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-ink px-3 py-2 text-[0.62rem] font-sans uppercase tracking-[0.18rem] text-ink transition-colors hover:bg-ink hover:text-paper"
            >
              <span>{label}</span>
              <Icon size={14} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
