"use client";

import { useRef } from "react";
import { useScroll } from "framer-motion";
import Navbar from "@/components/Navbar";
import RevueltoScrollCanvas from "@/components/RevueltoScrollCanvas";
import RevueltoExperience from "@/components/RevueltoExperience";

export default function Home() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <main className="bg-lambo-black min-h-screen text-white selection:bg-lambo-orange selection:text-white">
      <Navbar />

      {/* Scroll Container: 500vh usually gives enough scroll room for animation */}
      <section ref={containerRef} className="h-[500vh] relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          {/* Layer 0: The Product (Canvas) */}
          <div className="absolute inset-0 z-0">
            <RevueltoScrollCanvas
              scrollYProgress={scrollYProgress}
              totalFrames={181}
              imageFolderPath="/images/revuelto-sequence"
            />
          </div>

          {/* Layer 10: The Experience (HUD) */}
          <div className="absolute inset-0 z-10 pointer-events-none">
            <RevueltoExperience scrollYProgress={scrollYProgress} />
          </div>

          {/* Overlay Gradient for depth */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-lambo-black/80 via-transparent to-lambo-black/40 z-1" />
        </div>
      </section>

      {/* Footer / Contact Section */}
      <footer className="relative z-20 bg-carbon-gray py-20 px-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center opacity-50 hover:opacity-100 transition-opacity">
          <div>
            <h4 className="font-orbitron text-xl mb-2">AUTOMOBILI LAMBORGHINI</h4>
            <p className="text-xs text-gray-400">© 2026 All Rights Reserved</p>
          </div>
          <div className="flex gap-6 mt-6 md:mt-0 text-gray-400 text-sm">
            <a href="#" className="hover:text-lambo-orange transition-colors">PRIVACY</a>
            <a href="#" className="hover:text-lambo-orange transition-colors">LEGAL</a>
            <a href="#" className="hover:text-lambo-orange transition-colors">CONTACT</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
