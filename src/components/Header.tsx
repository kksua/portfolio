import { useEffect, useState } from "react";

export function Header() {
  const [time, setTime] = useState(() => {
    const now = new Date();
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Paris",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(now);
  });

  const [date, setDate] = useState(() => {
    const now = new Date();
    return new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Paris",
      weekday: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(now);
  });

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Europe/Paris",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(now),
      );
      setDate(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Europe/Paris",
          weekday: "short",
          day: "2-digit",
          month: "short",
          year: "numeric",
        }).format(now),
      );
    };

    updateClock();
    const timer = window.setInterval(updateClock, 60000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <header className="border-b border-ink bg-paper">
      <div className="grid grid-cols-3 items-center border-b border-ink px-4 py-2 text-[0.56rem] font-sans uppercase tracking-[0.2rem] text-muted md:px-8">
        <div className="justify-self-start">
          {date} | {time}
        </div>
        <div className="justify-self-center">Junior Software Engineer</div>
        <div className="justify-self-end">Paris, France</div>
      </div>

      <div className="px-4 py-4 text-center md:px-8 md:py-5">
        <div className="font-display text-[2.1rem] leading-[0.9] tracking-[-0.08em] text-ink md:text-[4.8rem]">
          SUPIPI AMARAJEEVA
        </div>
      </div>
    </header>
  );
}
