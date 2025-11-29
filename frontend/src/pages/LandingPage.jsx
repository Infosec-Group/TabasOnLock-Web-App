import Navbar from "@/components/Navbar";
import CTA from "@/sections/CTA";
import Features from "@/sections/Features";
import Footer from "@/sections/Footer";
import Hero from "@/sections/Hero";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="py-20 px-6">
        <Hero />
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <Features />
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-linear-to-r from-rose-900 to-primary">
        <CTA />
      </section>

      {/* Footer */}
      <footer className="bg-card text-dark-fg py-12 px-6">
        <Footer />
      </footer>
    </div>
  )
}
