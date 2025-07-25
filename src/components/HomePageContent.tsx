// components/HomePageContent.tsx
"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion"
import cocoon from "../../public/cocoon.png"
import meditatinggirl from "../../public/Heroimage.png"

export default function HomePageContent() {
  return (
    <div className="min-h-screen mt-10">
      {/* Main Content */}
      <main className="flex flex-col md:flex-row items-center px-8 max-w-7xl mx-auto gap-50">
        {/* Left: Text */}
        <div className="flex flex-col items-start gap-6 pl-10 pb-15">
          <h1 className="leading-none text-[#7a553e] font-hand-sc">
            <span className="block text-[7rem]">Soulful</span>
            <span className="block text-[7rem]">Destress</span>
          </h1>
          <p className="text-2xl w-fit text-[#7a5a3a]">Find balance, embrace serenity,</p>
          <button className="mt-4 bg-[#d7e0a7] text-[#5a6b2c] px-8 py-3 rounded-lg shadow-md hover:bg-[#c9d49a] transition-colors text-lg font-medium">
            Start Zen Experience
          </button>
        </div>
        {/* Right: Illustration */}
        <div className="flex justify-end items-center">
          <div className="relative h-[95vh] w-[50vw]">
            <Image
              src={meditatinggirl}
              alt="Girl Meditating"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </main>
      {/* Decorative Elements */}
      {/* <div className="absolute right-0 top-0" style={{ width: '10vw', minWidth: 80 }}>
        <Image src={cocoon} alt="Leaf with Cocoon" width={160} />
      </div> */}
    </div>
  );
}