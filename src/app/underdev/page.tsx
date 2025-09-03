"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function Page() {
  return (
    <>
    {/* <Navbar/> */}
    <main className="h-[95vh] flex flex-col items-center justify-center text-center bg-[#fcf3dc] text-[#7a553e] px-4">
        
      {/* Heading */}
      <h1 className="text-4xl md:text-6xl font-bold mb-8">Coming Soon</h1>

      {/* Image */}
      <Image
        src="/underdev.jpeg"
        alt="Under Development"
        width={300}
        height={300}
        className="mb-6"
        priority
      />

      {/* Paragraph */}
      <p className="max-w-xl text-lg md:text-xl leading-relaxed mb-8">
        yes, this is the developer of the website. He is trying his best to
        complete asap. please come back later
      </p>

      {/* Button */}
      <Link
        href="/home"
        className="mt-4 bg-[#d7e0a7] text-[#5a6b2c] px-6 py-2 rounded-full shadow-[3px_5px_#8a8d6b] hover:bg-[#c9d49a] transition-colors text-base font-bold md:px-8 md:py-3 md:text-lg"
      >
        Return to Home
      </Link>
    </main>
    </>
  );
}
