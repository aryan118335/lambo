"use client";

import { motion, MotionValue, useTransform } from "framer-motion";
import { REVUELTO_DATA } from "@/data/revueltoData";
import { clsx } from "clsx";

interface RevueltoExperienceProps {
    scrollYProgress: MotionValue<number>;
}

export default function RevueltoExperience({
    scrollYProgress,
}: RevueltoExperienceProps) {
    // --- Phase 1: HERO (0 - 0.30) ---
    const heroOpacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 1, 0]);
    const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
    const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

    // --- Phase 2: AERODYNAMICS (0.30 - 0.60) ---
    const aeroOpacity = useTransform(
        scrollYProgress,
        [0.25, 0.35, 0.55, 0.65],
        [0, 1, 1, 0]
    );
    const aeroX = useTransform(scrollYProgress, [0.3, 0.6], [100, 0]);

    // --- Phase 3: POWERTRAIN (0.60 - 1.0) ---
    const powerOpacity = useTransform(scrollYProgress, [0.6, 0.7, 1], [0, 1, 1]);
    const powerY = useTransform(scrollYProgress, [0.6, 0.8], [50, 0]);

    return (
        <div className="absolute inset-0 pointer-events-none w-full h-full">

            {/* --- HERO SECTION --- */}
            <motion.div
                className="absolute inset-0 flex flex-col justify-center items-center text-center z-10"
                style={{ opacity: heroOpacity, y: heroY, scale: heroScale }}
            >
                <h2 className="text-lambo-orange tracking-[0.2em] font-orbitron text-sm md:text-base mb-2">
                    {REVUELTO_DATA.hero.subtitle}
                </h2>
                <h1 className="text-5xl md:text-8xl font-black font-orbitron tracking-tighter mb-4 glitch-text">
                    {REVUELTO_DATA.hero.title}
                </h1>
                <p className="text-xl md:text-2xl font-rajdhani text-gray-300 mb-8">
                    STARTING AT <span className="text-white">{REVUELTO_DATA.hero.price}</span>
                </p>
                <button className="pointer-events-auto px-8 py-3 bg-lambo-orange text-black font-bold font-orbitron tracking-widest hover:bg-white hover:text-black transition-all clip-path-slant">
                    {REVUELTO_DATA.hero.cta}
                </button>
            </motion.div>

            {/* --- AERODYNAMICS SECTION --- */}
            <motion.div
                className="absolute top-1/2 left-4 md:left-20 -translate-y-1/2 max-w-md z-10"
                style={{ opacity: aeroOpacity, x: aeroX }}
            >
                <div className="border-l-2 border-lambo-orange pl-6 py-4 bg-black/50 backdrop-blur-sm">
                    <h3 className="text-4xl md:text-6xl font-orbitron font-bold mb-4">
                        {REVUELTO_DATA.aerodynamics.title}
                    </h3>
                    <p className="text-gray-300 font-rajdhani text-lg leading-relaxed">
                        {REVUELTO_DATA.aerodynamics.description}
                    </p>
                    <div className="mt-6 flex gap-2">
                        <div className="w-12 h-1 bg-lambo-orange"></div>
                        <div className="w-2 h-1 bg-gray-600"></div>
                        <div className="w-2 h-1 bg-gray-600"></div>
                    </div>
                </div>

                {/* Decorative Hexagon */}
                <div className="absolute -right-20 -top-20 w-40 h-40 border border-electric-cyan/30 clip-path-hexagon animate-pulse"></div>
            </motion.div>

            {/* --- POWERTRAIN SECTION --- */}
            <motion.div
                className="absolute bottom-20 right-4 md:right-20 z-10 bg-black/60 backdrop-blur-md p-8 border-t-2 border-electric-cyan"
                style={{ opacity: powerOpacity, y: powerY }}
            >
                <h3 className="text-3xl md:text-5xl font-orbitron font-bold mb-6 text-right">
                    {REVUELTO_DATA.powertrain.title}
                </h3>
                <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-right">
                    {REVUELTO_DATA.powertrain.specs.map((spec, index) => (
                        <div key={index} className="flex flex-col">
                            <span className="text-gray-400 text-xs tracking-widest font-rajdhani">
                                {spec.label}
                            </span>
                            <span className="text-2xl font-orbitron font-bold text-electric-cyan">
                                {spec.value}
                            </span>
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* --- GLOBAL HUD ELEMENTS --- */}
            <div className="absolute hidden md:block bottom-10 left-10 text-xs text-gray-500 font-mono">
                SYSTEM: ONLINE <br />
                BATTERY: 98% <br />
                MODE: CITTÀ
            </div>

            {/* Corner Accents */}
            <div className="absolute top-20 left-10 w-4 h-4 border-t border-l border-white/20"></div>
            <div className="absolute top-20 right-10 w-4 h-4 border-t border-r border-white/20"></div>
            <div className="absolute bottom-20 left-10 w-4 h-4 border-b border-l border-white/20"></div>
            <div className="absolute bottom-20 right-10 w-4 h-4 border-b border-r border-white/20"></div>
        </div>
    );
}
