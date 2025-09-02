"use client"

import React from "react"
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "framer-motion"
import type { ProductImage } from "./types.ts"

type Props = {
  images: ProductImage[]
  title: string
}

export default function ScrollProductCarouselEdge({ images, title }: Props) {
  const scrollerRef = React.useRef<HTMLDivElement>(null)
  const [active, setActive] = React.useState(0)
  const n = images.length

  // ---- Document scroll lock handling ----
  const htmlRef = React.useRef<HTMLElement | null>(null)
  const bodyRef = React.useRef<HTMLElement | null>(null)
  const prevHtmlOverflowRef = React.useRef<string>("")
  const prevBodyOverflowRef = React.useRef<string>("")
  const isLockedRef = React.useRef<boolean>(false)
  const [isUnlocked, setIsUnlocked] = React.useState(false)

  const lockDocumentScroll = React.useCallback(() => {
    if (!htmlRef.current || !bodyRef.current || isLockedRef.current) return
    htmlRef.current.style.overflow = "hidden"
    bodyRef.current.style.overflow = "hidden"
    isLockedRef.current = true
  }, [])

  const unlockDocumentScroll = React.useCallback(() => {
    if (!htmlRef.current || !bodyRef.current || !isLockedRef.current) return
    htmlRef.current.style.overflow = prevHtmlOverflowRef.current
    bodyRef.current.style.overflow = prevBodyOverflowRef.current
    isLockedRef.current = false
  }, [])

  React.useEffect(() => {
    const htmlEl = document.documentElement
    const bodyEl = document.body
    htmlRef.current = htmlEl
    bodyRef.current = bodyEl
    prevHtmlOverflowRef.current = htmlEl.style.overflow
    prevBodyOverflowRef.current = bodyEl.style.overflow
    lockDocumentScroll()
    return () => {
      if (htmlRef.current && bodyRef.current) {
        htmlRef.current.style.overflow = prevHtmlOverflowRef.current
        bodyRef.current.style.overflow = prevBodyOverflowRef.current
      }
      isLockedRef.current = false
    }
  }, [lockDocumentScroll])

  // ---- Scroll tracking ----
  const { scrollXProgress } = useScroll({ container: scrollerRef })
  const heroScale = useTransform(scrollXProgress, [0, 1], [0.98, 1.02])

  useMotionValueEvent(scrollXProgress, "change", (v) => {
    const clamped = Math.max(0, Math.min(1, v))
    const idx = Math.round(clamped * (n - 1))
    if (idx !== active) setActive(idx)
  })

  React.useEffect(() => {
    const atEdge = active === 0 || active === n - 1
    if (!atEdge && isUnlocked) {
      lockDocumentScroll()
      setIsUnlocked(false)
    }
  }, [active, n, isUnlocked, lockDocumentScroll])

  // ---- Wheel mapping to horizontal scroll ----
  const EPS = 2
  const getEdgeState = React.useCallback((el: HTMLElement) => {
    const max = Math.max(0, el.scrollWidth - el.clientWidth)
    const sl = el.scrollLeft
    const atStart = sl <= EPS
    const atEnd = Math.abs(max - sl) <= EPS
    return { atStart, atEnd }
  }, [])

  const onWheel = React.useCallback(
    (e: React.WheelEvent<HTMLDivElement>) => {
      const el = scrollerRef.current
      if (!el) return

      const isVerticalIntent = Math.abs(e.deltaY) > Math.abs(e.deltaX)
      if (isVerticalIntent) {
        const { atStart, atEnd } = getEdgeState(el)
        const scrollingUp = e.deltaY < 0
        const scrollingDown = e.deltaY > 0

        if ((atStart && scrollingUp) || (atEnd && scrollingDown)) {
          if (!isUnlocked) {
            unlockDocumentScroll()
            setIsUnlocked(true)
          }
          return
        }

        if (isUnlocked) {
          lockDocumentScroll()
          setIsUnlocked(false)
        }

        el.scrollLeft += e.deltaY
        e.preventDefault()
      }
    },
    [getEdgeState, isUnlocked, lockDocumentScroll, unlockDocumentScroll],
  )

  // ---- Pointer drag support ----
  const isDraggingRef = React.useRef(false)
  const startXRef = React.useRef(0)
  const startScrollLeftRef = React.useRef(0)
  const pointerIdRef = React.useRef<number | null>(null)
  const startYRef = React.useRef(0)
  const gestureModeRef =
    React.useRef<"undecided" | "horizontal" | "vertical">("undecided")

  const onPointerDown = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = scrollerRef.current
      if (!el) return
      if (e.pointerType === "mouse" && e.buttons !== 1) return
      if (isUnlocked) {
        lockDocumentScroll()
        setIsUnlocked(false)
      }
      isDraggingRef.current = true
      pointerIdRef.current = e.pointerId
      el.setPointerCapture(e.pointerId)
      startXRef.current = e.clientX
      startYRef.current = e.clientY
      gestureModeRef.current = "undecided"
      startScrollLeftRef.current = el.scrollLeft
    },
    [isUnlocked, lockDocumentScroll],
  )

  const onPointerMove = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const el = scrollerRef.current
      if (!el || !isDraggingRef.current) return

      const dx = e.clientX - startXRef.current
      const dy = e.clientY - startYRef.current

      if (gestureModeRef.current === "undecided") {
        const ax = Math.abs(dx)
        const ay = Math.abs(dy)
        if (ax > 6 || ay > 6) {
          gestureModeRef.current = ax >= ay ? "horizontal" : "vertical"
        }
      }

      if (gestureModeRef.current === "vertical" && e.pointerType !== "mouse") {
        const { atStart, atEnd } = getEdgeState(el)
        const scrollingUp = dy > 0
        const scrollingDown = dy < 0
        if ((atStart && scrollingUp) || (atEnd && scrollingDown)) {
          if (!isUnlocked) {
            unlockDocumentScroll()
            setIsUnlocked(true)
          }
          try {
            el.releasePointerCapture(e.pointerId)
          } catch {}
          return
        }
        if (isUnlocked) {
          lockDocumentScroll()
          setIsUnlocked(false)
        }
        el.scrollLeft = startScrollLeftRef.current - dy
        e.preventDefault()
        return
      }

      el.scrollLeft = startScrollLeftRef.current - dx
      e.preventDefault()
    },
    [getEdgeState, isUnlocked, lockDocumentScroll, unlockDocumentScroll],
  )

  const onPointerEnd = React.useCallback(() => {
    const el = scrollerRef.current
    if (pointerIdRef.current != null && el) {
      try {
        el.releasePointerCapture(pointerIdRef.current)
      } catch {}
    }
    isDraggingRef.current = false
    pointerIdRef.current = null
    gestureModeRef.current = "undecided"
  }, [])

  // ---- Thumbnails click ----
  const scrollToIndex = React.useCallback((i: number) => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" })
  }, [])

  const onScroll = React.useCallback(() => {
    if (!isUnlocked) return
    const el = scrollerRef.current
    if (!el) return
    const { atStart, atEnd } = getEdgeState(el)
    if (!atStart && !atEnd) {
      lockDocumentScroll()
      setIsUnlocked(false)
    }
  }, [getEdgeState, isUnlocked, lockDocumentScroll])

  return (
    <section
      className={`relative min-h-screen w-full bg-background text-foreground ${
        isUnlocked ? "overscroll-auto" : "overscroll-none"
      }`}
    >
      {/* Hidden scroller for progress tracking */}
      <div
        ref={scrollerRef}
        onWheel={onWheel}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onPointerLeave={onPointerEnd}
        style={{
          touchAction: isUnlocked ? "pan-y" : "none",
          overscrollBehavior: isUnlocked ? "auto" : "none",
        }}
        className="absolute inset-0 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden cursor-grab active:cursor-grabbing select-none"
      >
        <div className="h-full flex snap-x snap-mandatory">
          {images.map((_, i) => (
            <div
              key={`panel-${i}`}
              className="w-screen h-screen shrink-0 snap-center"
              aria-hidden="true"
            />
          ))}
        </div>
      </div>

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <h2 className="mb-6 text-center font-sans text-2xl md:text-4xl font-semibold tracking-tight">
          {title}
        </h2>

        {/* Hero image */}
        <motion.div
          className="relative w-full flex items-center justify-center"
          style={{ height: "60vh", scale: heroScale }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={images[active]?.src}
              src={images[active]?.src}
              alt={images[active]?.alt ?? "Active product"}
              initial={{ opacity: 0, x: 20, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.96 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="mx-auto rounded-md shadow-sm pointer-events-none select-none"
              style={{
                width: "min(80vw, 820px)",
                maxHeight: "60vh",
                objectFit: "contain",
              }}
            />
          </AnimatePresence>
        </motion.div>

        {/* Thumbnails */}
        <div className="absolute bottom-4 left-0 right-0 pointer-events-auto">
  <div className="mx-auto max-w-5xl px-4">
    <ul className="flex items-center justify-center gap-3 overflow-x-auto">
      {images.map((img, i) => {
        const isActive = i === active
        return (
          <li key={`thumb-${img.src}`} className="shrink-0">
            <button
              type="button"
              onClick={() => scrollToIndex(i)}
              className={[
                "rounded overflow-hidden", // keeps thumbnails square
                isActive ? "ring-2 ring-sky-500" : "ring-1 ring-muted",
              ].join(" ")}
            >
              <img
                src={img.thumb}
                alt={img.alt ?? `Thumbnail ${i + 1}`}
                className={[
                  "w-[50px] h-[50px] object-cover transition-transform",
                  isActive ? "scale-105" : "opacity-80",
                ].join(" ")}
                loading="lazy"
              />
            </button>
          </li>
        )
      })}
    </ul>
  </div>
</div>

      </div>
    </section>
  )
}
