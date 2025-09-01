"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import HomePageContent from "./HomePageContent";
import ShopPageContent from "./ShopPageContent";
import RelaxCornerPageContent from "./RelaxCornerPageContent";
import Navbar from "./Navbar";

const HomepageContainer = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "relax", "shop"];

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (
            rect.top <= window.innerHeight / 2 &&
            rect.bottom >= window.innerHeight / 2
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const scrollContainer = containerRef.current;
    scrollContainer?.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      scrollContainer?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="h-screen overflow-y-scroll snap-y snap-mandatory hide-scrollbar scroll-smooth"
      style={{
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
      }}
    >
      <Navbar activeSection={activeSection} />

      <section id="home" className="h-screen snap-start pt-15">
        <HomePageContent />
      </section>

      <div style={{ height: "30vh" }} />

      <section
  id="relax"
  className="min-h-screen snap-start pt-10 overflow-visible"
>
  <RelaxCornerPageContent />
</section>


      <div style={{ height: "30vh" }} />

      <section id="shop" className="h-screen snap-start pt-10">
        <ShopPageContent />
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
  );
};

export default HomepageContainer;
