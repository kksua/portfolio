import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Header } from "./components/Header";
import { Ticker } from "./components/Ticker";
import { Navigation } from "./components/Navigation";
import { About } from "./sections/About";
import { Experience } from "./sections/Experience";
import { Projects } from "./sections/Projects";
import { Photography } from "./sections/Photography";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";

function App() {
  const prefersReducedMotion = useReducedMotion();
  const pinnedHeaderRef = useRef<HTMLDivElement>(null);
  const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);

  useEffect(() => {
    const header = pinnedHeaderRef.current;
    if (!header) return;

    const root = document.documentElement;
    const previousOffset = root.style.getPropertyValue(
      "--pinned-header-height",
    );
    const updateOffset = () => {
      root.style.setProperty(
        "--pinned-header-height",
        `${header.offsetHeight}px`,
      );
    };
    updateOffset();
    const observer = new ResizeObserver(updateOffset);
    observer.observe(header);

    return () => {
      observer.disconnect();
      if (previousOffset) {
        root.style.setProperty("--pinned-header-height", previousOffset);
      } else {
        root.style.removeProperty("--pinned-header-height");
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-paper text-ink">
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-[1400px] border-x border-ink bg-paper"
      >
        <div ref={pinnedHeaderRef} className="sticky top-0 z-50 bg-paper">
          <div
            id="pinned-header-content"
            className={isHeaderCollapsed ? "hidden md:block" : "block"}
          >
            <Header />
            <Ticker text="SEEKING A 12-MONTH ALTERNANCE IN FRANCE, STARTING IN FEBRUARY 2027" />
            <Navigation />
          </div>
          <div className="flex justify-end border-b border-ink px-4 md:hidden">
            <button
              type="button"
              onClick={() => setIsHeaderCollapsed((collapsed) => !collapsed)}
              aria-controls="pinned-header-content"
              aria-expanded={!isHeaderCollapsed}
              aria-label={
                isHeaderCollapsed
                  ? "Expand header and navigation"
                  : "Collapse header and navigation"
              }
              className="flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-ink"
            >
              {isHeaderCollapsed ? (
                <ChevronDown size={22} aria-hidden="true" />
              ) : (
                <ChevronUp size={22} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
        <main className="divide-y divide-ink">
          <About />
          <Experience />
          <Projects />
          <Photography />
          <Contact />
        </main>
        <Footer />
      </motion.div>
    </div>
  );
}

export default App;
