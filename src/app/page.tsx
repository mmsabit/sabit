import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Portfolio } from "@/components/Portfolio";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { ScrollControls } from "@/components/ScrollControls";

export default function Home() {
  return (
    <div className="min-h-screen bg-white font-roboto text-secondary antialiased selection:bg-primary selection:text-white">
      {/* Dynamic Floating Navbar */}
      <Navbar />

      {/* Hero / Header */}
      <Hero />

      {/* Main Content Sections */}
      <main>
        <About />
        <Skills />
        <Portfolio />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Scroll Actions */}
      <ScrollControls />
    </div>
  );
}
