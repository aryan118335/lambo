"use client";

import { useRef, useEffect, useState } from "react";
import { MotionValue, useMotionValueEvent } from "framer-motion";

interface RevueltoScrollCanvasProps {
    scrollYProgress: MotionValue<number>;
    totalFrames: number;
    imageFolderPath: string;
}

export default function RevueltoScrollCanvas({
    scrollYProgress,
    totalFrames,
    imageFolderPath,
}: RevueltoScrollCanvasProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Preload images
    useEffect(() => {
        let loadedCount = 0;
        const imgArray: HTMLImageElement[] = [];

        // We have 181 frames e.g. ezgif-frame-001.jpg
        const loadImages = async () => {
            for (let i = 1; i <= totalFrames; i++) {
                const img = new Image();
                // Pad with zeros to 3 digits
                const formattedIndex = i.toString().padStart(3, "0");
                const src = `${imageFolderPath}/ezgif-frame-${formattedIndex}.jpg`;

                img.src = src;
                img.onload = () => {
                    loadedCount++;
                    if (loadedCount === totalFrames) {
                        setIsLoaded(true);
                    }
                };
                imgArray.push(img);
            }
            setImages(imgArray);
        };

        loadImages();
    }, [totalFrames, imageFolderPath]);

    // Draw frame on canvas
    const drawFrame = (index: number) => {
        const canvas = canvasRef.current;
        if (!canvas || !images[index]) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Handle high DPI
        const dpr = window.devicePixelRatio || 1;
        // Set canvas dimensions if not set (or on resize)
        if (canvas.width !== window.innerWidth * dpr) {
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            ctx.scale(dpr, dpr);
        }

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw image contain logic
        const img = images[index];
        const canvasWidth = canvas.width / dpr;
        const canvasHeight = canvas.height / dpr;

        const scale = Math.max(canvasWidth / img.width, canvasHeight / img.height);
        // Use 'contain' style logic -> actually user asked for object-fit: contain so use min
        // But usually for background we want cover. Let's stick to user request: "object-fit: contain"
        // Wait, "background" implies cover usually, but text overlay might need space. 
        // Spec says: "Draw images using <canvas> ● Apply object-fit: contain"

        const containScale = Math.min(canvasWidth / img.width, canvasHeight / img.height);

        const x = (canvasWidth / 2) - (img.width / 2) * containScale;
        const y = (canvasHeight / 2) - (img.height / 2) * containScale;

        ctx.drawImage(img, x, y, img.width * containScale, img.height * containScale);
    };

    // React to scroll changes
    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (!isLoaded || images.length === 0) return;

        // Map 0-1 to 0-(totalFrames-1)
        const frameIndex = Math.min(
            totalFrames - 1,
            Math.floor(latest * totalFrames)
        );

        requestAnimationFrame(() => drawFrame(frameIndex));
    });

    // Initial draw when loaded
    useEffect(() => {
        if (isLoaded) {
            drawFrame(0);
        }
    }, [isLoaded]);

    // Handle resize
    useEffect(() => {
        const handleResize = () => {
            if (isLoaded) {
                // re-draw current frame
                const currentProgress = scrollYProgress.get();
                const frameIndex = Math.min(
                    totalFrames - 1,
                    Math.floor(currentProgress * totalFrames)
                );
                drawFrame(frameIndex);
            }
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isLoaded, totalFrames, scrollYProgress]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            style={{ width: "100%", height: "100%" }}
        />
    );
}
