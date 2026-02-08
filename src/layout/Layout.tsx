import React from "react";
import Navbar from "../componentes/navbar";
import Footer from "../componentes/Footer";
import { SparklesCore } from "../componentes/sparkles";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-black/[0.96] antialiased /*bg-grid-white/[0.02]*/ relative overflow-x-hidden">
      {/* Ambient background with moving particles */}
      <div className="fixed h-screen w-full top-0 left-0 z-0 pointer-events-none">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.8}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">{children}</div>
        <Footer />
      </div>
    </main>
  );
}
