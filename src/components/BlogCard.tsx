// components/BlogCard.tsx
import React from "react"
import Image from "next/image"

interface BlogCardProps {
  title: string
  summary: string
  image: string
  url: string
  bgColor?: string
  colSpan?: string
  rowSpan?: string
}

export default function BlogCard({
  title,
  summary,
  image,
  url,
  bgColor = "bg-white",
  colSpan = "col-span-4",
  rowSpan = "row-span-1",
}: BlogCardProps) {
  return (
    <a
      href={url}
      className={`block ${colSpan} ${rowSpan} rounded-xl overflow-hidden transition-transform transform hover:scale-[1.03] ${bgColor} shadow-lg relative aspect-square md:aspect-auto md:flex md:flex-col md:h-full`}
    >
      {/* Image container */}
      <div className="absolute  inset-0 md:relative md:px-6 md:pt-6 md:w-full md:flex-grow md:overflow-hidden md:rounded-t-xl">
        <Image
          src={image || "/placeholder.svg"}
          alt={title}
          fill
          className="object-cover object-center md:rounded-xl"
          priority={false}
        />
      </div>

      {/* Text content */}
      <div className="absolute inset-x-0 bottom-0 p-4 md:static md:p-6 md:flex md:flex-col md:justify-between md:bg-transparent">
        <div>
          <h2 className="text-lg font-semibold text-white md:text-[#4B3429] mb-2 leading-snug">
            {title}
          </h2>
          <p className="text-sm text-white/90 md:text-[#5D4B41] leading-relaxed hidden md:block">
            {summary}
          </p>
        </div>
        <span className="mt-3 md:mt-6 inline-block text-sm font-medium text-white md:text-[#624029] hover:underline cursor-pointer">
          Read More &gt;
        </span>
      </div>
    </a>
  )
}
