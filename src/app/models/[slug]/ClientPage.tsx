'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { jsPDF } from 'jspdf';

interface ModelStats {
    height: string;
    bust: string;
    waist: string;
    hips: string;
    shoe: string;
}

interface ModelImage {
    src: string;
    alt: string;
    type?: 'landscape' | 'portrait' | 'detail';
}

interface ModelData {
    name: string;
    stats: ModelStats;
    images: ModelImage[];
    digitals: ModelImage[];
}

// Helper to load image for PDF
const loadImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const img = document.createElement('img');
        img.src = url;
        img.crossOrigin = 'Anonymous';
        img.onload = () => resolve(img);
        img.onerror = (err) => reject(err);
    });
};

export default function ClientPage({ model }: { model: ModelData }) {
    const [isDigitalsOpen, setIsDigitalsOpen] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [animationStep, setAnimationStep] = useState(0);

    useEffect(() => {
        if (isDigitalsOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isDigitalsOpen]);

    const handleDownload = async () => {
        setIsDownloading(true);
        setAnimationStep(1); // Start folder animation

        try {
            // 1. Initialize PDF (A4 Size: 210mm x 297mm)
            const doc = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4',
            });

            // 2. Load Images (Parallel)
            // We take up to 4 images: 1 main (front), 3 secondary (back)
            const imagesToLoad = model.images.slice(0, 4).map(img => img.src);
            const loadedImages = await Promise.all(imagesToLoad.map(src => loadImage(src)));

            // --- PAGE 1: FRONT (Main Headshot + Logo + Name) ---

            // Main Image (Full bleed with margins)
            const mainImg = loadedImages[0];
            if (mainImg) {
                // Calculate aspect ratio to fit nicely
                const imgRatio = mainImg.height / mainImg.width;
                const printWidth = 180; // 15mm margins
                const printHeight = printWidth * imgRatio;

                // If image is too tall, constrain by height
                let finalW = printWidth;
                let finalH = printHeight;
                if (finalH > 240) {
                    finalH = 240;
                    finalW = finalH / imgRatio;
                }

                const xPos = (210 - finalW) / 2; // Center horizontally
                doc.addImage(mainImg, 'JPEG', xPos, 20, finalW, finalH);
            }

            // Footer Text (Front)
            doc.setFont("times", "roman");
            doc.setFontSize(24);
            doc.text("NAATH", 105, 275, { align: "center" });

            doc.setFont("helvetica", "normal");
            doc.setFontSize(12);
            doc.text(model.name.toUpperCase(), 105, 282, { align: "center" });


            // --- PAGE 2: BACK (Stats + Grid + Contact) ---
            doc.addPage();

            // Stats Block (Top)
            doc.setFont("helvetica", "bold");
            doc.setFontSize(14);
            doc.text(model.name.toUpperCase(), 105, 20, { align: "center" });

            doc.setFont("helvetica", "normal");
            doc.setFontSize(9);
            const statsY = 30;
            const colWidth = 40;
            const startX = (210 - (colWidth * 5)) / 2; // Center the 5 columns

            // Draw Stats Row
            Object.entries(model.stats).forEach(([key, value], index) => {
                const x = startX + (index * colWidth);
                doc.text(key.toUpperCase(), x + (colWidth / 2), statsY, { align: "center" });
                doc.text(value, x + (colWidth / 2), statsY + 5, { align: "center" });
            });

            // Image Grid (Middle)
            // We use images 1, 2, and 3 from the loaded array if available
            const secondaryImages = loadedImages.slice(1);
            let gridY = 50;

            if (secondaryImages.length > 0) {
                // Layout depends on how many images we have. 
                // Ideally 1 landscape top, 2 portraits bottom, or just vertical stack.
                // Let's do a clean vertical stack for consistency or a grid if 2+.

                secondaryImages.forEach((img, idx) => {
                    if (gridY > 250) return; // Prevent overflow

                    const imgRatio = img.height / img.width;
                    // Fit into a box of 170mm width, max height 90mm per image
                    let w = 170;
                    let h = w * imgRatio;

                    if (h > 90) {
                        h = 90;
                        w = h / imgRatio;
                    }

                    const x = (210 - w) / 2;
                    doc.addImage(img, 'JPEG', x, gridY, w, h);
                    gridY += h + 10; // Add margin for next image
                });
            }

            // Contact Info (Bottom)
            doc.setFont("helvetica", "bold");
            doc.setFontSize(10);
            doc.text("CONTACT", 105, 275, { align: "center" });

            doc.setFont("helvetica", "normal");
            doc.text("nyagua@naathmodels.com", 105, 280, { align: "center" });
            doc.text("www.naathmodels.com", 105, 285, { align: "center" });

            // Save
            doc.save(`${model.name.replace(/\s+/g, '_')}_CompCard.pdf`);

        } catch (error) {
            console.error("PDF Generation Error:", error);
            alert("Failed to generate PDF. Please try again.");
        } finally {
            setIsDownloading(false);
            setAnimationStep(0);
        }
    };

    return (
        <main className="min-h-screen bg-alabaster w-full overflow-x-hidden">

            {/* --- Sticky Header --- */}
            <header className="sticky top-0 left-0 right-0 z-[60] bg-alabaster border-b border-clay/10 transition-all duration-300">
                <div className="max-w-[1800px] mx-auto px-6 md:px-12 h-[60px] flex justify-between items-center">
                    <Link
                        href="/models"
                        className="group flex items-center gap-2 uppercase text-charcoal hover:text-stone transition-colors cursor-pointer"
                        style={{
                            fontFamily: 'var(--font-montreal)',
                            fontSize: '11px',
                            fontWeight: 500,
                            letterSpacing: '0.15em',
                        }}
                    >
                        <span className="transition-transform duration-300 group-hover:-translate-x-1">←</span>
                        BACK TO CASTING
                    </Link>

                    <button
                        onClick={() => setIsDigitalsOpen(true)}
                        className="uppercase text-charcoal hover:text-clay transition-colors border border-charcoal/20 px-4 py-1.5 rounded-full hover:border-clay cursor-pointer bg-transparent"
                        style={{
                            fontFamily: 'var(--font-montreal)',
                            fontSize: '10px',
                            fontWeight: 600,
                            letterSpacing: '0.15em',
                        }}
                    >
                        VIEW DIGITALS
                    </button>
                </div>
            </header>

            {/* --- Intro & Stats --- */}
            <section className="pt-24 pb-16 px-6 md:px-12 bg-alabaster">
                <div className="max-w-[1200px] mx-auto">
                    <h1
                        className="text-charcoal mb-12 leading-[0.9]"
                        style={{
                            fontFamily: 'var(--font-editorial)',
                            fontWeight: 200,
                            fontSize: 'clamp(3.5rem, 8vw, 6rem)',
                        }}
                    >
                        {model.name}
                    </h1>

                    <div
                        className="grid grid-cols-2 md:grid-cols-5 gap-y-6 gap-x-8 border-t border-clay/30 pt-8"
                        style={{
                            fontFamily: 'var(--font-montreal)',
                            fontSize: '13px',
                            letterSpacing: '0.05em',
                        }}
                    >
                        {Object.entries(model.stats).map(([key, value]) => (
                            <div key={key} className="flex flex-col">
                                <span className="text-stone mb-1 uppercase text-[10px] tracking-widest opacity-60">{key}</span>
                                <span className="text-charcoal font-medium">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- Image Feed --- */}
            <section className="px-6 md:px-12 pb-32">
                <div className="max-w-[1200px] mx-auto flex flex-col gap-20 md:gap-32">
                    {model.images.map((img, index) => (
                        <div
                            key={index}
                            className={`relative overflow-hidden bg-bone ${img.type === 'landscape'
                                ? 'w-full aspect-[16/10]'
                                : img.type === 'detail'
                                    ? 'w-full md:w-2/3 mx-auto aspect-square'
                                    : 'w-full md:w-1/2 mx-auto aspect-[3/4]'
                                }`}
                        >
                            <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                priority={index === 0}
                                className="object-cover"
                                style={{
                                    ...(index === 0 ? { objectPosition: 'top center' } : {}),
                                }}
                                sizes="90vw"
                                quality={90}
                                unoptimized={process.env.NODE_ENV === 'development'}
                            />
                        </div>
                    ))}
                </div>
            </section>

            {/* --- Download Footer --- */}
            <section className="bg-bone py-32 px-6 md:px-12 border-t border-clay/10 relative overflow-hidden">
                <div className="max-w-[1200px] mx-auto flex flex-col items-center justify-center">
                    <div className="relative h-40 w-full flex justify-center items-center mb-10">
                        {animationStep === 1 && (
                            <div
                                className="w-24 h-32 bg-alabaster shadow-2xl border border-stone/10"
                                style={{ animation: 'fold 1.4s ease-in-out forwards' }}
                            />
                        )}
                        {animationStep === 0 && !isDownloading && (
                            <div className="w-24 h-32 border-2 border-dashed border-clay/30 rounded-sm flex items-center justify-center">
                                <span className="text-clay text-2xl font-editorial italic">PDF</span>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={handleDownload}
                        disabled={isDownloading}
                        className="group relative overflow-hidden px-12 py-5 bg-charcoal text-alabaster transition-all duration-300 hover:bg-clay disabled:bg-stone disabled:cursor-not-allowed"
                    >
                        <span
                            className="relative z-10 uppercase"
                            style={{
                                fontFamily: 'var(--font-montreal)',
                                fontSize: '11px',
                                fontWeight: 600,
                                letterSpacing: '0.2em',
                            }}
                        >
                            {isDownloading ? 'GENERATING...' : 'DOWNLOAD COMP CARD'}
                        </span>
                    </button>
                </div>
            </section>

            {/* --- Digitals Drawer --- */}
            <div
                className={`fixed inset-0 z-[70] bg-charcoal/20 backdrop-blur-sm transition-opacity duration-500 overflow-hidden ${isDigitalsOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                    }`}
                onClick={() => setIsDigitalsOpen(false)}
            >
                <div
                    className={`absolute right-0 top-0 bottom-0 w-full md:w-[500px] bg-alabaster shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col overflow-hidden ${isDigitalsOpen ? 'translate-x-0' : 'translate-x-full'
                        }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="flex justify-between items-center p-8 border-b border-clay/20 flex-shrink-0">
                        <h2
                            className="text-charcoal"
                            style={{
                                fontFamily: 'var(--font-editorial)',
                                fontSize: '2rem',
                                fontWeight: 200,
                            }}
                        >
                            Raw Digitals
                        </h2>
                        <button
                            onClick={() => setIsDigitalsOpen(false)}
                            className="w-8 h-8 flex items-center justify-center rounded-full border border-charcoal/20 hover:bg-charcoal hover:text-alabaster transition-colors"
                        >
                            ✕
                        </button>
                    </div>

                    <div className="p-8 overflow-y-auto flex-1 space-y-6">
                        <p className="text-stone text-xs font-montreal mb-8 leading-relaxed">
                            Unretouched polaroids. Natural light. No makeup.
                            <br />Updated: January 2026.
                        </p>

                        <div className="grid grid-cols-2 gap-4">
                            {model.digitals.map((digital, idx) => (
                                <div key={idx} className="relative aspect-[3/4] bg-stone/10">
                                    <Image
                                        src={digital.src}
                                        alt={digital.alt}
                                        fill
                                        className="object-cover grayscale hover:grayscale-0 transition-all duration-500"
                                        sizes="200px"
                                        unoptimized={process.env.NODE_ENV === 'development'}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}