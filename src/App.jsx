
import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Intro from "./components/intro/Intro";
import CelestialScene from "./components/intro/CelestialScene";

function HomePage() {
  return (
    <motion.main
      className="main-hero"
      initial={{
        opacity: 0,
        scale: 1.08,
        filter: "blur(10px)",
      }}
      animate={{
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
      }}
      transition={{
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <nav className="hero-nav">
        <a href="#home">ASME / NIT ROURKELA</a>
        <span>ENGINEERING THE FUTURE</span>
      </nav>

      <section className="hero-content" id="home">
        <motion.div
          className="hero-wordmark"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          aria-label="ASME"
        >
          <span className="hero-as">AS</span>
          <span className="hero-me">ME</span>
        </motion.div>

        <motion.p
          className="hero-full-name"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.55 }}
        >
          AMERICAN SOCIETY OF MECHANICAL ENGINEERS
        </motion.p>

        <motion.div
          className="hero-divider"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.65 }}
        />

        <motion.p
          className="hero-description"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75 }}
        >
          Engineering minds. Building possibilities.
          <br />
          Shaping the future through innovation.
        </motion.p>

        <motion.a
          className="hero-link"
          href="#about"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          EXPLORE ASME <span>↗</span>
        </motion.a>
      </section>

      <footer className="hero-footer">
        <span>STUDENT SECTION</span>
        <span>NIT ROURKELA · INDIA</span>
      </footer>
    </motion.main>
  );
}

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [scenePhase, setScenePhase] = useState("intro");

  const handleIntroComplete = useCallback(() => {
    setScenePhase("zooming");

    window.setTimeout(() => {
      setShowIntro(false);
      setScenePhase("hero");
    }, 1400);
  }, []);

  return (
    <div className="app-shell">
      <CelestialScene phase={scenePhase} />

      <div className="page-content">
        <AnimatePresence mode="wait">
          {showIntro ? (
            <Intro
              key="intro"
              onComplete={handleIntroComplete}
            />
          ) : (
            <HomePage key="homepage" />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
