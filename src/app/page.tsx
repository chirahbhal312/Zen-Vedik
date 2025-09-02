"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HomePageFadeBlur from "@/components/HomePage"; // Assuming this renders HomePageContent
import Navbar from "@/components/Navbar";
import FlippingCard from "@/components/FlippingCard";
import Preloader from "@/components/Preloader";
import HomepageContainer from "@/components/HomePageContainer";

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
                        <HomePageFadeBlur/>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}