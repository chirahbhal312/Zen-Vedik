"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import HomePageContent from "./HomePageContent"
import RelaxCornerPageContent from "./RelaxCornerPageContent"
import Reviews from "./WhiteBoard"
import Blog from "./BlogContent"
import ContactUs from "./Footer"
import Navbar from "./Navbar"

const HomepageContainer = () => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const handleScroll = () => {
      const ids = ["home", "relax", "reviews", "blogs", "contact-us"]
      const centerY = window.innerHeight / 2

      let closestId: string | null = null
      let closestDist = Number.POSITIVE_INFINITY

      for (const id of ids) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()

        const coversCenter = rect.top <= centerY && rect.bottom >= centerY

        const mid = rect.top + rect.height / 2
        const dist = Math.abs(mid - centerY)

        if (coversCenter) {
          if (0 < closestDist) {
            closestDist = 0
            closestId = id
          }
        } else if (dist < closestDist) {
          closestDist = dist
          closestId = id
        }
      }

      if (closestId) {
        setActiveSection(closestId)
      }
    }

    const scrollContainer = containerRef.current
    scrollContainer?.addEventListener("scroll", handleScroll, {
      passive: true,
    })

    handleScroll()
    window.addEventListener("resize", handleScroll)

    return () => {
      scrollContainer?.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  return (
    <motion.div
      ref={containerRef}
      className="h-screen  bg-[#fcf3dc]  overflow-y-scroll snap-y snap-mandatory hide-scrollbar scroll-smooth"
      style={{
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <Navbar activeSection={activeSection} />

      <section id="home" className="h-screen snap-start pt-10">
        <HomePageContent />
      </section>

      <div style={{ height: "30vh" }} />

      <section id="relax" className="min-h-screen snap-start pt-10 overflow-visible">
        <RelaxCornerPageContent />
      </section>

      <div style={{ height: "30vh" }} />

      <section id="reviews" className="min-h-screen snap-start">
        <Reviews />
      </section>
      
      <div style={{ height: "30vh" }} />

      <section id="blogs" className="snap-start">
        <Blog />
      </section>

      <div style={{ height: "30vh" }} />
      
      <section id="contact-us" className=" snap-start">
        <ContactUs />
      </section>

      <style jsx>{`
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </motion.div>
  )
}

export default HomepageContainer