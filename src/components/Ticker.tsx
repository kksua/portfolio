type TickerProps = {
  text: string;
};

export function Ticker({ text }: TickerProps) {
  const repeatedText = `${text} · ${text} · ${text} · ${text} · ${text} · ${text}`;

  return (
    <div
      className="overflow-hidden border-y border-ink bg-paper"
      aria-label="Opportunity ticker"
    >
      <div className="ticker-track flex w-max items-center whitespace-nowrap py-2 text-[0.66rem] font-sans uppercase tracking-[0.22rem] text-ink md:text-[0.72rem]">
        <span className="mr-8">{repeatedText}</span>
        <span className="mr-8">{repeatedText}</span>
      </div>
    </div>
  );
}
