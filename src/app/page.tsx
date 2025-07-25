// app/page.tsx
"use client";

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import HomePageContent from "../components/HomePageContent";
import Preloader from "@/components/Preloader";
import HomePageFadeBlur from "@/components/HomePage"; // Assuming HomePageFadeBlur renders HomePageContent
import Navbar from "@/components/Navbar"; // Import the new Navbar component


export default function Page() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Preloader onFinish={() => setIsLoading(false)} />}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isLoading && (
          <motion.div
            key="homepage"
            initial={{ y: '100vh', opacity: 1 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100vh', opacity: 0 }}
            transition={{ duration: 1.5, ease: [0.2, 0, 0, 1] }}
            className="w-full h-full"
          >
            <Navbar /> {/* Render the Navbar component here */}
            <HomePageFadeBlur/>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}