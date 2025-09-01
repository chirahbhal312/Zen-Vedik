import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HomePageContent from "./HomePageContent";
import Homepagecontainer from "./HomePageContainer";
import GifPlay from "./GifPlayer";

export default function HomePageFadeBlur() {
  const [clicked, setClicked] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect screen width ONCE and on resize (client-side only)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <main className="relative h-[100vh] w-full overflow-hidden bg-[#fcf3dc]">
      {/* Overlay animation, fades out everywhere */}
      <AnimatePresence>
        {!clicked && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-[999] w-screen h-screen flex items-center justify-center bg-[#221e1c]"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 2, ease: "easeIn" } }}
          />
        )}
      </AnimatePresence>

      {/* Candle image, animates away on mobile after click, stays on desktop */}
      <AnimatePresence>
        {/*
        On mobile: hide/fade away if clicked.
        On desktop: always show!
      */}
        {(!clicked || !isMobile) && (
          <motion.img
            key="candle"
            src="/candel.png" // Make sure this path is correct for your project
            alt="Light the Candle"
            onClick={() => {
              // On mobile, fade away on click; on desktop, overlay goes but candle stays
              if (!clicked) setClicked(true);
            }}
            whileHover={!clicked && isMobile ? { scale: 1.05 } : {}}
            whileTap={!clicked && isMobile ? { scale: 0.95 } : {}}
            className={`
            cursor-pointer
            absolute
            z-[1000]
            object-cover
            left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            md:left-8 md:bottom-10 md:top-auto md:translate-x-0 md:translate-y-0
          `}
            style={{
              // Sizing based on the isMobile state
              width: isMobile ? "40vw" : "10vw", // 20% of viewport width on mobile, 10% on desktop
              minWidth: isMobile ? 100 : 80, // Minimum 100px on mobile, 80px on desktop
              willChange: "transform",
              pointerEvents: clicked && isMobile ? "none" : "auto", // Disable pointer events on mobile after click
            }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={isMobile ? { opacity: 0 } : {}}
            transition={{ opacity: { duration: 2, ease: "easeIn" } }}
          />
        )}
      </AnimatePresence>

      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: clicked ? 1 : 0,
          y: clicked ? 0 : 20,
        }}
        transition={{ duration: 0.0 }}
      >
        <Homepagecontainer />
        {/* <HomePageContent/> */}
      </motion.div>
    </main>
  );
}
