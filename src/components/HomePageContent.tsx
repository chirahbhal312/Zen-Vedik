"use client";

import Image from "next/image";
import Link from "next/link";
// import cocoon from "../../public/cocoon.png" // This import is not used in this component
import meditatinggirl from "../../public/Heroimage.png";

export default function HomePageContent() {
  return (
    <div className="min-h-screen  bg-[#fcf3dc]   mt-12.5 lg:mt-0 ">
      {/* Main Content */}
      <main className="flex flex-col md:flex-row items-center px-4 md:px-8 max-w-7xl mx-auto lg:gap-x-40">
        {/* Left: Text */}
        <div className="flex flex-col items-center md:items-start gap-4 md:gap-6 
                text-center md:text-left px-4 md:pl-10 md:pb-15 
                 w-fit whitespace-nowrap">
  <h1 className="leading-none text-[#7a553e]">
    <span className="block text-6xl sm:text-6xl md:text-[5rem] lg:text-[6rem]">
      Soulful
    </span>
    <span className="block text-6xl sm:text-6xl md:text-[5rem] lg:text-[6rem]">
      Destress
    </span>
  </h1>
  <p className="text-lg font-medium text-[#7a5a3a] md:text-2xl md:font-semibold lg:font-medium">
 
    Find balance, embrace serenity,
  </p>
  <Link href="/underdev">
  <button className="mt-4 bg-[#d7e0a7] text-[#5a6b2c] px-6 py-2 rounded-full shadow-[3px_5px_#8a8d6b] hover:bg-[#c9d49a] transition-colors text-base font-bold md:px-8 md:py-3 md:text-lg">
  Start Zen Experience
</button>
</Link>

</div>

        {/* Right: Illustration */}
        <div className="flex justify-center md:justify-end items-center
         w-full md:w-auto
        ">
          <div className="relative h-[50vh] w-full md:h-[95vh] md:w-[50vw] max-w-md md:max-w-none">
            <Image
              src={meditatinggirl || "/placeholder.svg"}
              alt="Girl Meditating"
              fill
              className="object-contain lg:max-w-[50vw] "
              // sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
        {/* <div className="flex justify-center md:justify-end items-center
         w-full md:w-auto
        bg-green-300 ">
          <div className="relative h-[50vh] w-full md:h-[95vh] md:w-[50vw] max-w-md md:max-w-none">
            <Image
              src={meditatinggirl || "/placeholder.svg"}
              alt="Girl Meditating"
              fill
              className="object-contain"
              // sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div> */}
      </main>
      {/* Decorative Elements (commented out as per original) */}
      {/* <div className="absolute right-0 top-0" style={{ width: '10vw', minWidth: 80 }}>
        <Image src={cocoon || "/placeholder.svg"} alt="Leaf with Cocoon" width={160} />
      </div> */}
    </div>
  );
}
