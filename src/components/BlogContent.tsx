import BlogCard from "./BlogCard"

const blogPosts = [
  {
    id: 1,
    title: "Finding Calm in Chaos",
    summary: "Explore simple techniques to bring calm and balance to your busy life.",
    image: "/blog1.png",
    url: "#",
    bgColor: "bg-[#b5bf7a]",
    colSpan: "col-span-4",
    rowSpan: "row-span-3",
  },
  {
    id: 2,
    title: "Healing with Nature Sounds",
    summary: "Discover how nature’s whispers and gentle tunes can soothe your soul.",
    image: "/blog2.png",
    url: "#",
    bgColor: "bg-neutral-200",
    colSpan: "col-span-4",
    rowSpan: "row-span-1",
  },
  {
    id: 3,
    title: "Tea Rituals for Mindfulness",
    summary: "Create your own mindful tea ritual to enhance serenity.",
    image: "/blog3.png",
    url: "#",
    bgColor: "bg-[#f2c5b2]",
    colSpan: "col-span-4",
    rowSpan: "row-span-2",
  },
  {
    id: 4,
    title: "Self-care Tips for Overwhelm",
    summary: "Gentle practices to ease overwhelm and find balance.",
    image: "/blog4.png",
    url: "#",
    bgColor: "bg-[#CAA1DC]",
    colSpan: "col-span-4",
    rowSpan: "row-span-2",
  },
  {
    id: 5,
    title: "Meditation for Beginners",
    summary: "Start your meditation journey with simple guided tips.",
    image: "/blog5.png",
    url: "#",
    bgColor: "bg-[#f9dfb8]",
    colSpan: "col-span-4",
    rowSpan: "row-span-1",
  },
]

export default function Blog() {
    return (
      <main className="min-h-screen bg-[#fcf3dc]  max-w-7xl mx-auto p-6 md:p-12 font-sans">
        <h1 className="text-center text-4xl md:text-[5rem] lg:text-[4rem] font-medium mb-10 text-[#624029] tracking-wide">
          Soulful Reads
        </h1>
        <section className="bento-grid flex flex-col gap-6 md:grid md:grid-cols-12 md:gap-6 md:auto-rows-[180px]">
          {blogPosts.map((post) => (
            <BlogCard
              key={post.id}
              title={post.title}
              summary={post.summary}
              image={post.image}
              url={post.url}
              bgColor={post.bgColor}
              colSpan={post.colSpan}
              rowSpan={post.rowSpan}
            />
          ))}
        </section>
      </main>
    )
  }
  
