"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import HomePageContent from "./HomePageContent"

export default function HomePageFadeBlur() {
  const [clicked, setClicked] = useState(false)

  return (
    
    <main className="relative min-h-screen w-full overflow-hidden bg-[#fcf3dc]">

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

      {/* Candle image persists, in the same fixed spot */}
      <motion.img
        src="/candel.png"
        alt="Light the Candle"
        onClick={() => !clicked && setClicked(true)}
        whileHover={!clicked ? { scale: 1.05 } : {}}
        whileTap={!clicked ? { scale: 0.95 } : {}}
        className="cursor-pointer absolute left-8 bottom-10 object-cover z-[1000]"
        
        style={{
          width: '10vw', minWidth: 80,
          willChange: "transform",
          pointerEvents: clicked ? "none" : "auto", // disables interaction after click
        }}
      />

      <motion.div
        className="relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: clicked ? 1 : 0,
          y: clicked ? 0 : 20,
        }}
        transition={{ duration: 0.0 }}
      >
        <HomePageContent/>
      </motion.div>
    </main>
  )
}
