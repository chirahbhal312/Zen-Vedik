"use client"

import React from "react"
import { AnimatePresence, motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion"

type ProductImage = { src: string; alt?: string }

type Props = {
  images?: ProductImage[]
  title?: string
}

export default function ScrollProductCarousel({
  images = [
    { src: "/products/tea-range.png", alt: "Tea range gift box" },
    { src: "/products/tea-02.png", alt: "Tea gift box 02" },
    { src: "/products/tea-03.png", alt: "Tea gift box 03" },
    { src: "/products/tea-04.png", alt: "Tea gift box 04" },
    { src: "/products/tea-05.png", alt: "Tea gift box 05" },
  ],
  title = "Tea Range",
}: Props) {
  const scrollerRef = React.useRef<HTMLDivElement>(null)
  const [active, setActive] = React.useState(0)
  const n = images.length

  // Lock vertical page scroll while this component is mounted
  React.useEffect(() => {
    const html = document.documentElement
    const body = document.body
    const prevHtmlOverflow = html.style.overflow
    const prevBodyOverflow = body.style.overflow

    html.style.overflow = "hidden"
    body.style.overflow = "hidden"

    return () => {
      html.style.overflow = prevHtmlOverflow
      body.style.overflow = prevBodyOverflow
    }
  }, [])

  // Track HORIZONTAL scroll progress of the scroller container
  const { scrollXProgress } = useScroll({
    container: scrollerRef,
  })

  // Subtle parallax/scale on the hero container
  const heroScale = useTransform(scrollXProgress, [0, 1], [0.98, 1.02])

  // Update the active slide index based on horizontal scroll position
  useMotionValueEvent(scrollXProgress, "change", (v) => {
    const clamped = Math.max(0, Math.min(1, v))
    const idx = Math.round(clamped * (n - 1))
    if (idx !== active) setActive(idx)
  })

  // Map vertical wheel to horizontal scroll for better desktop UX
  const onWheel = React.useCallback((e: React.WheelEvent<HTMLDivElement>) => {
    const el = scrollerRef.current
    if (!el) return
    // If user scrolls mostly vertically, translate to horizontal
    if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      el.scrollLeft += e.deltaY
      e.preventDefault()
    }
  }, [])

  // Allow clicking thumbnails to jump to a specific slide
  const scrollToIndex = React.useCallback((i: number) => {
    const el = scrollerRef.current
    if (!el) return
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" })
  }, [])

  return (
    <section
      className="relative h-screen w-full bg-background text-foreground overscroll-none"
      aria-label="Horizontal scroll product carousel"
    >
      {/* Horizontal scroller provides the progress */}
      <div
        ref={scrollerRef}
        onWheel={onWheel}
        style={{ touchAction: "pan-x", overscrollBehavior: "none" }}
        className="absolute inset-0 overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        role="region"
        aria-label="Product scroller"
        tabIndex={0}
      >
        <div className="h-full flex snap-x snap-mandatory">
          {images.map((_, i) => (
            <div key={`panel-${i}`} className="w-screen h-screen shrink-0 snap-center" aria-hidden="true" />
          ))}
        </div>
      </div>

      {/* Overlay content that stays centered while the scroller moves underneath */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <h2 className="mb-6 text-center text-balance font-sans text-2xl md:text-4xl font-semibold tracking-tight">
          {title}
        </h2>

        {/* Hero image crossfades as active index changes */}
        <motion.div
          className="relative w-full flex items-center justify-center"
          style={{ height: "60vh", scale: heroScale }}
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={images[active]?.src ?? "img"}
              src={images[active]?.src ?? "/placeholder.svg?height=600&width=800&query=product"}
              alt={images[active]?.alt ?? "Active product image"}
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mx-auto rounded-md shadow-sm pointer-events-none select-none"
              style={{
                width: "min(80vw, 820px)",
                maxHeight: "60vh",
                objectFit: "contain",
              }}
            />
          </AnimatePresence>
        </motion.div>

        {/* Thumbnails pinned to bottom; enable interaction */}
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
                        "rounded-md p-0.5 transition-all",
                        isActive ? "ring-2 ring-sky-500" : "ring-1 ring-muted",
                      ].join(" ")}
                      aria-label={`Go to image ${i + 1}`}
                    >
                      <img
                        src={img.src || "/placeholder.svg"}
                        alt={img.alt ?? `Thumbnail ${i + 1}`}
                        className={[
                          "h-12 w-12 md:h-14 md:w-14 object-cover rounded-sm transition-all",
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

      <p className="sr-only">
        Scroll right to change the main product image. The highlighted thumbnail indicates the current image.
      </p>
    </section>
  )
}
