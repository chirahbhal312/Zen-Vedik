import ScrollProductCarouselEdge from "./ShopPageContent"
import type { ProductImage } from "./types"

const teaImages: ProductImage[] = [
  { src: "/products/tea.png", thumb: "/tea.png", alt: "Tea range gift box" },
  { src: "/products/tea-02.png", thumb: "/thumbs/tea-02-thumb.png", alt: "Tea gift box 02" },
  { src: "/products/tea-03.png", thumb: "/thumbs/tea-03-thumb.png", alt: "Tea gift box 03" },
  { src: "/products/tea-04.png", thumb: "/thumbs/tea-04-thumb.png", alt: "Tea gift box 04" },
  { src: "/products/tea-05.png", thumb: "/thumbs/tea-05-thumb.png", alt: "Tea gift box 05" },
]

export default function TeaCarousel() {
  return <ScrollProductCarouselEdge images={teaImages} title="Tea Range" />
}
