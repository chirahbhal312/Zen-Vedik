import TextReveal from "./Textreveal"

export default function AboutUs() {
  return (
    <main className="min-h-dvh bg-[#fcf3dc] text-[#7a553e]">
      <section className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <header className="text-center space-y-4 md:space-y-6">
          <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-balance">Welcome to Zen Vedik</h1>
        </header>

        <div className="mt-10 md:mt-14 rounded-xl text-justify  bg-card/50 p-6 md:p-10">
        <TextReveal
  className="md:text-xl text-justify md:text-justify lg:text-justify"
  text="Welcome to Zen Vedik, where we unravel the mysteries of mental wellness! 🌿 At the heart of our philosophy is the belief that stress is the root cause of many issues. 🧘‍♀️ Introducing our stress-buster kit, designed to transform your moments and elevate your Gen Z life! 💆‍♂️ Immerse yourself in a new realm of relaxation with ZenV Kit—your ultimate antidote to stress. Explore our site now and embrace the Zen lifestyle! 🌟 #StressFreeLiving #ZenVKit #WellnessJourney"
/>

        </div>
      </section>
    </main>
  )
}
