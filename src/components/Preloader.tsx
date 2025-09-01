"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const texts = [
  "Loading Assets…",
  "Preparing Interface…",
  "Launching Experience…",
];
const DISPLAY_DURATION = 1200;

interface PreloaderProps {
  onFinish: () => void;
}

export default function Preloader({ onFinish }: PreloaderProps) {
  const [step, setStep] = useState(0);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [textsFinished, setTextsFinished] = useState(false);
  const [done, setDone] = useState(false);

  // Text step progression
  useEffect(() => {
    if (step < texts.length - 1) {
      const timer = setTimeout(
        () => setStep((prev) => prev + 1),
        DISPLAY_DURATION
      );
      return () => clearTimeout(timer);
    } else {
      const finishDelay = setTimeout(
        () => setTextsFinished(true),
        DISPLAY_DURATION
      );
      return () => clearTimeout(finishDelay);
    }
  }, [step]);

  // Wait for page load
  useEffect(() => {
    const handleLoad = () => setHasLoaded(true);

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);

  // Trigger exit
  useEffect(() => {
    if (textsFinished && hasLoaded) {
      const exitDelay = setTimeout(() => {
        setDone(true);
        onFinish();
      }, 800);
      return () => clearTimeout(exitDelay);
    }
  }, [textsFinished, hasLoaded, onFinish]);

  return (
    <AnimatePresence mode="wait">
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 flex flex-col items-center justify-center bg-[#FCF3DC] z-50"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        >
          <motion.h1
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-[#5A2E17] text-3xl md:text-5xl text-center"
          >
            {texts[step]}
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
