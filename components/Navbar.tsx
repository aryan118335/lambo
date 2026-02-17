"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { clsx } from "clsx";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={clsx(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/10",
                scrolled ? "bg-lambo-black/80 backdrop-blur-md py-4" : "bg-transparent py-6"
            )}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="group flex items-center gap-2">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-lambo-orange">
                        <path d="M12 2L2 22h20L12 2zm0 3l7.5 15h-15L12 5z" />
                    </svg>
                    <span className="font-orbitron font-bold text-xl tracking-wider group-hover:text-lambo-orange transition-colors">
                        LAMBORGHINI
                    </span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8 font-rajdhani font-medium tracking-widest text-sm text-gray-300">
                    {["MODELS", "BRAND", "OWNERSHIP"].map((item) => (
                        <Link
                            key={item}
                            href="#"
                            className="hover:text-white hover:scale-105 transition-all relative group"
                        >
                            {item}
                            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-lambo-orange group-hover:w-full transition-all duration-300" />
                        </Link>
                    ))}
                </div>

                {/* CTA Button */}
                <button className="hidden md:block px-6 py-2 border border-lambo-orange text-lambo-orange font-orbitron text-xs tracking-widest hover:bg-lambo-orange hover:text-black transition-all duration-300 clip-path-slant">
                    ORDER
                </button>

                {/* Mobile Menu Icon (Placeholder) */}
                <div className="md:hidden text-white">
                    MENU
                </div>
            </div>
        </nav>
    );
}
