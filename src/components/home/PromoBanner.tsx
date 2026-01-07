"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface Banner {
    id: number;
    title: string;
    subtitle: string;
    category: string;
    ctaText: string;
    ctaLink: string;
    bgGradient: string;
}

const PromoBanner = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const banners: Banner[] = [
        {
            id: 1,
            title: "All India Mock: SSC CGL 2026",
            subtitle: "Test your preparation with lakhs of aspirants",
            category: "SSC",
            ctaText: "Attempt Now",
            ctaLink: "/mock-tests/ssc-cgl",
            bgGradient: "from-blue-500 to-purple-600",
        },
        {
            id: 2,
            title: "Banking Maha Pack 2026",
            subtitle: "Complete preparation for all banking exams",
            category: "BANKING",
            ctaText: "Get Now",
            ctaLink: "/courses/banking-maha-pack",
            bgGradient: "from-[#00CED1] to-[#0891B2]",
        },
        {
            id: 3,
            title: "Railway Group D Mock Test",
            subtitle: "Section tests, Previous Year papers & more",
            category: "RAILWAY",
            ctaText: "Start Free",
            ctaLink: "/mock-tests/railway-group-d",
            bgGradient: "from-orange-500 to-red-600",
        },
        {
            id: 4,
            title: "UPSC Prelims 2026 Course",
            subtitle: "Expert faculty, complete syllabus coverage",
            category: "UPSC",
            ctaText: "Enroll Now",
            ctaLink: "/courses/upsc-prelims",
            bgGradient: "from-[#D81B60] to-[#9C27B0]",
        },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % banners.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [banners.length]);

    return (
        <section className="py-6 bg-white">
            <div className="container mx-auto px-4">
                <div className="relative rounded-2xl overflow-hidden">
                    {/* Slides */}
                    <div
                        className="flex transition-transform duration-500 ease-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {banners.map((banner) => (
                            <div
                                key={banner.id}
                                className={`w-full flex-shrink-0 bg-gradient-to-r ${banner.bgGradient} p-6 md:p-8`}
                            >
                                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                                    <div className="text-white text-center md:text-left">
                                        <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold mb-2">
                                            {banner.category}
                                        </span>
                                        <h3 className="text-xl md:text-2xl font-bold mb-1">
                                            {banner.title}
                                        </h3>
                                        <p className="text-white/80 text-sm md:text-base">
                                            {banner.subtitle}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <span className="hidden md:block text-white/60 px-3 py-1 border border-white/30 rounded-full text-sm">
                                            ⭐ Special Recognition
                                        </span>
                                        <Link
                                            href={banner.ctaLink}
                                            className="px-6 py-3 bg-white text-gray-900 font-bold rounded-xl hover:bg-gray-100 transition-colors whitespace-nowrap"
                                        >
                                            {banner.ctaText}
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Navigation Arrows */}
                    <button
                        onClick={() =>
                            setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length)
                        }
                        className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors"
                        aria-label="Previous slide"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                    <button
                        onClick={() => setCurrentSlide((prev) => (prev + 1) % banners.length)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white transition-colors"
                        aria-label="Next slide"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                        {banners.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSlide(index)}
                                className={`w-2 h-2 rounded-full transition-all ${index === currentSlide
                                        ? "w-6 bg-white"
                                        : "bg-white/50 hover:bg-white/75"
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PromoBanner;
