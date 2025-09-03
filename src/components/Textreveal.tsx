"use client"

import { motion, useInView, type Variants } from "framer-motion"
import { useRef } from "react"

interface TextRevealProps {
  text: string
  className?: string
}

export default function TextReveal({ text, className }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  const words = text.split(" ")

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const word: Variants = {
    hidden: { opacity: 0.2, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  }

  const easeOutBezier: [number, number, number, number] = [0.16, 1, 0.3, 1]

  return (
    <motion.div
      ref={ref}
      className={`flex flex-wrap gap-2 overflow-hidden ${className ?? ""}`}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {words.map((w, i) => (
        <motion.span key={i} variants={word} className="inline-block text-justify">
          {w}
        </motion.span>
      ))}
    </motion.div>
  )
}
