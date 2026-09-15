import { motion, useReducedMotion } from "framer-motion";
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

  return (
    <div className="min-h-screen bg-paper text-ink">
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
        animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mx-auto max-w-[1400px] border-x border-ink bg-paper"
      >
        <Header />
        <Ticker text="LOOKING FOR CDI OR CDD OPPORTUNITIES IN SOFTWARE ENGINEERING IN FRANCE" />
        <Navigation />
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
