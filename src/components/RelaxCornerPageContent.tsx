"use client";

import Image from "next/image";
import FlippingCard from "./FlippingCard";


export default function RelaxCornerPageContent() {
  return (
    <div className="min-h-screen lg:mt-10">
           <h1
  className="my-10   block text-5xl sm:text-6xl md:text-[2rem] lg:text-[4rem] font-medium text-center text-[#7a553e]"
>
  Relax Corner
</h1>




      {/* Cards Section */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-10">
        <FlippingCard />
        <FlippingCard />
        <FlippingCard />
      </div>

      {/* Centered Button */}
      <div className="flex justify-center mt-10">
        <button
        className="bg-[#d7e0a7] rounded-full  text-[#5a6b2c] px-6 py-2 shadow-[3px_5px_#8a8d6b] hover:bg-[#c9d49a] transition-colors text-base font-bold md:px-8 md:py-3 md:text-lg"
       
        >
          Explore More
        </button>
      </div>
    </div>
  );
}
