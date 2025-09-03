"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { motion, useMotionValue, useSpring, type SpringOptions } from "framer-motion"

export type CursorFollowerProps = {
  size?: number
  color?: string
  opacity?: number
  className?: string
  springConfig?: Partial<SpringOptions>
  enableLabel?: boolean
  labelClassName?: string
  labelOffsetX?: number
  labelOffsetY?: number
  zIndex?: number
}

export default function CursorFollower({
  size = 70,
  color = "#F9DFB8",
  opacity = 1,
  className,
  springConfig,
  enableLabel = true,
  labelClassName,
  labelOffsetX = 12,
  labelOffsetY = 16,
  zIndex = 2147483647,
}: CursorFollowerProps) {
  // Detect if mobile
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768)
    checkScreen()
    window.addEventListener("resize", checkScreen)
    return () => window.removeEventListener("resize", checkScreen)
  }, [])

  // Motion values (always initialized, hooks order safe)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  const config: SpringOptions = useMemo(
    () => ({
      stiffness: 300,
      damping: 30,
      mass: 0.5,
      ...springConfig,
    }),
    [springConfig],
  )

  const xSpring = useSpring(x, config)
  const ySpring = useSpring(y, config)

  const [label, setLabel] = useState<string>("")
  const lastLabelRef = useRef<string>("")
  const containerRef = useRef<HTMLDivElement | null>(null)
  const dimsRef = useRef<{ w: number; h: number }>({ w: size, h: size })

  useEffect(() => {
    if (!containerRef.current || typeof ResizeObserver === "undefined") return
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        dimsRef.current = { w: width, h: height }
      }
    })
    ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [size])

  useEffect(() => {
    if (isMobile) return // skip on mobile

    const handleMove = (e: MouseEvent) => {
      const { w, h } = dimsRef.current
      x.set(e.clientX - w / 2)
      y.set(e.clientY - h / 2)

      if (!enableLabel) return

      const el = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null
      let next = ""
      if (el) {
        const target = el.closest<HTMLElement>("[data-cursor-label]")
        if (target) next = target.getAttribute("data-cursor-label") ?? ""
      }
      if (next !== lastLabelRef.current) {
        lastLabelRef.current = next
        setLabel(next)
      }
    }

    window.addEventListener("mousemove", handleMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMove)
  }, [x, y, enableLabel, isMobile])

  // ✅ Conditionally render nothing on mobile
  if (isMobile) return null

  return (
    <motion.div
      ref={containerRef}
      aria-hidden="true"
      className={className}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex,
        pointerEvents: "none",
        width: "auto",
        height: "auto",
        minWidth: size,
        minHeight: size,
        borderRadius: label ? 9999 : "50%",
        backgroundColor: color,
        opacity,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: label ? 12 : 0,
        paddingRight: label ? 12 : 0,
        paddingTop: label ? 8 : 0,
        paddingBottom: label ? 8 : 0,
        whiteSpace: "nowrap",
        x: xSpring,
        y: ySpring,
        willChange: "transform",
      }}
    >
      {enableLabel && label ? (
        <span className={labelClassName} style={{ fontSize: 15, fontWeight: 500, color: "#5A2E17" }}>
          {label}
        </span>
      ) : null}
    </motion.div>
  )
}
