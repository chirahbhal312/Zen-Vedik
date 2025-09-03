"use client";

import FlippingCard from "./FlippingCard";

export default function RelaxCornerPageContent() {
  return (
    <div className="min-h-screen lg:mt-10">
      <h1 className="my-10 block text-5xl sm:text-6xl md:text-[2rem] lg:text-[4rem] font-medium text-center text-[#7a553e]">
        Relax Corner
      </h1>

      {/* Cards Section */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-10">
        <FlippingCard
          heading="ZenSound Lounge"
          subheading="Feeling overwhelmed?"
          description="Escape into a world of calming tunes, nature's whispers, or gentle white noise. Pick your perfect sound and drift away to peaceville."
          imageSrc="/CardImg.png"
          frontBgColor="#b5bf7a"
          imageBgColor="#E9EDC9"
          buttonText="Listen Now"
          buttonUrl="https://kashishriddhi29may.wixsite.com/zen-vedik"
        />

        <FlippingCard
          heading="Smile Stories Hub"
          subheading="Feeling down?"
          description="Let's swap happy tales! Share a story that makes you smile or pick one from our collection to brighten your day. You've got this! Got a story that warms your heart and brings a smile? Share it here! Read others' tales of triumph, joy, and self-discovery. Get inspired, connect with the community, and spread the love!"
          imageSrc="/CardImg.png"
          frontBgColor="#A792B0"
          imageBgColor="#F7E7FE"
          buttonText="Start Session"
          buttonUrl="https://kashishriddhi29may.wixsite.com/zen-vedik/general-8"
        />

        <FlippingCard
          heading="Meditation Corner"
          subheading="Feeling tense?"
          description="Take a deep breath and join us for some guided meditations or relaxing activities. Find your inner zen and let the stress melt away"
          imageSrc="/CardImg.png"
          frontBgColor="#C17764"
          imageBgColor="#F2C5B2"
          buttonText="Boost Focus"
          buttonUrl=  "https://kashishriddhi29may.wixsite.com/zen-vedik"
        />
      </div>

      {/* Centered Button */}
      {/* <div className="flex justify-center mt-10">
        <button className="bg-[#d7e0a7] rounded-full text-[#5a6b2c] px-6 py-2 shadow-[3px_5px_#8a8d6b] hover:bg-[#c9d49a] transition-colors text-base font-bold md:px-8 md:py-3 md:text-lg">
          Explore More
        </button>
      </div> */}
    </div>
  );
}
