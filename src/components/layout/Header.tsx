"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu";

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isCoursesOpen, setIsCoursesOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const examCategories = [
        { name: "Banking", href: "/exams/banking", icon: "🏦" },
        { name: "SSC", href: "/exams/ssc", icon: "📋" },
        { name: "Railway", href: "/exams/railway", icon: "🚂" },
        { name: "Teaching", href: "/exams/teaching", icon: "📚" },
        { name: "UPSC", href: "/exams/upsc", icon: "🏛️" },
        { name: "State PCS", href: "/exams/state-pcs", icon: "🏢" },
        { name: "Defence", href: "/exams/defence", icon: "🎖️" },
        { name: "Engineering", href: "/exams/engineering", icon: "⚙️" },
    ];

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                        ? "bg-white shadow-md py-2"
                        : "bg-white/95 backdrop-blur-sm py-4"
                    }`}
            >
                <div className="container mx-auto px-4">
                    <div className="flex items-center justify-between">
                        {/* Mobile Menu Button */}
                        <button
                            className="lg:hidden flex flex-col gap-1.5 p-2"
                            onClick={() => setIsMobileMenuOpen(true)}
                            aria-label="Open menu"
                        >
                            <span className="w-6 h-0.5 bg-gray-700 transition-all"></span>
                            <span className="w-6 h-0.5 bg-gray-700 transition-all"></span>
                            <span className="w-6 h-0.5 bg-gray-700 transition-all"></span>
                        </button>

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2">
                            <Image
                                src="/logo.jpg"
                                alt="AIM Center Logo"
                                width={45}
                                height={45}
                                className="rounded-lg"
                                priority
                            />
                            <span className="hidden sm:block text-xl font-bold">
                                <span className="text-[#00CED1]">AIM</span>
                                <span className="text-[#D81B60]">Center</span>
                            </span>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-6">
                            {/* All Courses Dropdown */}
                            <div
                                className="relative"
                                onMouseEnter={() => setIsCoursesOpen(true)}
                                onMouseLeave={() => setIsCoursesOpen(false)}
                            >
                                <button className="flex items-center gap-2 px-4 py-2 font-medium text-gray-700 hover:text-[#00CED1] transition-colors">
                                    All Courses
                                    <svg
                                        className={`w-4 h-4 transition-transform ${isCoursesOpen ? "rotate-180" : ""
                                            }`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </button>

                                {/* Dropdown Menu */}
                                <div
                                    className={`absolute top-full left-0 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 transition-all duration-200 ${isCoursesOpen
                                            ? "opacity-100 visible translate-y-0"
                                            : "opacity-0 invisible -translate-y-2"
                                        }`}
                                >
                                    {examCategories.map((category) => (
                                        <Link
                                            key={category.name}
                                            href={category.href}
                                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                                        >
                                            <span className="text-xl">{category.icon}</span>
                                            <span className="font-medium text-gray-700">
                                                {category.name}
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Search Bar */}
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Find courses, mock tests..."
                                    className="w-80 pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:border-[#00CED1] focus:ring-2 focus:ring-[#00CED1]/20 transition-all"
                                />
                                <svg
                                    className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                        </nav>

                        {/* Right Side Actions */}
                        <div className="flex items-center gap-3">
                            {/* Refer & Earn - Desktop Only */}
                            <Link
                                href="/refer"
                                className="hidden md:flex items-center gap-2 px-4 py-2 text-sm font-semibold text-[#D81B60] border-2 border-[#D81B60] rounded-full hover:bg-[#D81B60] hover:text-white transition-all"
                            >
                                <span>🎁</span>
                                Refer & Earn
                            </Link>

                            {/* Search Icon - Mobile Only */}
                            <button className="lg:hidden p-2" aria-label="Search">
                                <svg
                                    className="w-6 h-6 text-gray-700"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>

                            {/* Login/Signup */}
                            <Link
                                href="/auth/login"
                                className="hidden sm:block px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-[#00CED1] to-[#D81B60] rounded-full hover:shadow-lg hover:scale-105 transition-all"
                            >
                                Signup/Login
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Menu */}
            <MobileMenu
                isOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
                examCategories={examCategories}
            />
        </>
    );
};

export default Header;
