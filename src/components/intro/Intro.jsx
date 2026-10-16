
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ThreeScene from "./ThreeScene";
import "./Intro.css";

const DURATION = 4200;
const OBJECT_SPEED = 150;

const bootMessages = [
  "INITIALIZING MECHANICAL SYSTEMS",
  "CALIBRATING MOTION VECTORS",
  "LOADING ENGINEERING MODULES",
  "SYNCHRONIZING COMPONENTS",
  "SYSTEM READY",
];

export default function Intro({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [objectIndex, setObjectIndex] = useState(0);

  useEffect(() => {
    const startedAt = performance.now();

    const progressTimer = setInterval(() => {
      const elapsed = performance.now() - startedAt;
      const value = Math.min(100, Math.floor((elapsed / DURATION) * 100));

      setProgress(value);

      if (value >= 100) {
        clearInterval(progressTimer);
      }
    }, 30);

    const objectTimer = setInterval(() => {
      setObjectIndex((current) => (current + 1) % 6);
    }, OBJECT_SPEED);

    const completionTimer = setTimeout(() => {
      onComplete?.();
    }, DURATION + 550);

    return () => {
      clearInterval(progressTimer);
      clearInterval(objectTimer);
      clearTimeout(completionTimer);
    };
  }, [onComplete]);

  const messageIndex = Math.min(
    bootMessages.length - 1,
    Math.floor((progress / 100) * bootMessages.length)
  );

  return (
    <motion.main
      className="crt-intro"
      initial={{ opacity: 0, scale: 1.04 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{
        opacity: 0,
        scale: 1.35,
        filter: "blur(8px)",
      }}
      transition={{
        duration: 0.85,
        ease: [0.76, 0, 0.24, 1],
      }}
    >
      <div className="crt-grid" />
      <div className="crt-scanlines" />
      <div className="crt-vignette" />

      <header className="crt-header">
        <div className="crt-brand">
          ASME <span>/ NIT ROURKELA</span>
        </div>
        <div className="crt-live">
          <span className="crt-live-dot" />
          SYSTEM BOOT
        </div>
      </header>

      <section className="crt-center">
        <div className="crt-main-mark">
          <motion.div
            className="crt-as"
            animate={{ opacity: [0.88, 1, 0.92] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            AS
          </motion.div>

          <div className="crt-object-frame">
            <ThreeScene index={objectIndex} />
            <span className="object-corner corner-tl" />
            <span className="object-corner corner-tr" />
            <span className="object-corner corner-bl" />
            <span className="object-corner corner-br" />
          </div>
        </div>

        <div className="crt-object-label">
          MODULE_0{objectIndex + 1}
          <span> / MECHANICAL ASSET</span>
        </div>

        <div className="crt-loader">
          <div className="crt-loader-heading">
            <span>
              <span className="crt-prompt">&gt;_</span>{" "}
              {bootMessages[messageIndex]}
            </span>
            <span className="crt-percent">
              {String(progress).padStart(3, "0")}%
            </span>
          </div>

          <div
            className="crt-progress-track"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            aria-label="Loading ASME intro"
          >
            {Array.from({ length: 30 }, (_, i) => (
              <span
                key={i}
                className={i < Math.ceil((progress / 100) * 30)
                  ? "crt-segment active"
                  : "crt-segment"}
              />
            ))}
          </div>

          <div className="crt-loader-bottom">
            <span>ENGINEERING / INNOVATION / COMMUNITY</span>
            <span>
              {progress === 100 ? "BOOT COMPLETE" : "PLEASE WAIT_"}
              {progress < 100 && <i className="crt-cursor" />}
            </span>
          </div>
        </div>
      </section>

      <footer className="crt-footer">
        <span>AMERICAN SOCIETY OF MECHANICAL ENGINEERS</span>
        <span>BUILD {new Date().getFullYear()} // REV 01.0</span>
      </footer>
    </motion.main>
  );
}
