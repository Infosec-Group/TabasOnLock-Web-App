import Navbar from "@/components/Navbar";
import Hero from "@/sections/Hero";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-6">
        <Hero />
      </section>
    </div>
  )
}
