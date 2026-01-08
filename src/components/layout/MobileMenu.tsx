"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface ExamCategory {
    name: string;
    href: string;
    icon: string;
}

interface MobileMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
    // Lock body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    const quickLinks = [
        { name: "Live Classes", href: "/live-classes", icon: "📺" },
        { name: "Mock Tests", href: "/mock-tests", icon: "📝" },
        { name: "Video Courses", href: "/video-courses", icon: "🎬" },
        { name: "E-Books", href: "/ebooks", icon: "📱" },
        { name: "Study Materials", href: "/study-materials", icon: "📚" },
    ];

    return (
        <div
            className={`fixed inset-0 z-[60] transition-all duration-500 flex flex-col items-center justify-center ${isOpen ? "visible opacity-100" : "invisible opacity-0"
                }`}
        >
            {/* Glassmorphism Backdrop */}
            <div
                className={`absolute inset-0 bg-black/95 backdrop-blur-2xl transition-all duration-700 ${isOpen ? "scale-100" : "scale-110"
                    }`}
                onClick={onClose}
            />

            {/* Close Button */}
            <button
                onClick={onClose}
                className="absolute top-6 right-6 p-4 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all z-70 border border-white/20"
                aria-label="Close menu"
            >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>

            {/* Menu Content */}
            <div className="relative z-70 w-full max-w-lg px-6 flex flex-col items-center">
                {/* Logo Section */}
                <div className={`mb-12 transition-all duration-1000 transform ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-20 opacity-0"}`}>
                    <Link href="/" className="flex flex-col items-center gap-4" onClick={onClose}>
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#00CED1] to-[#D81B60] rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                            <Image
                                src="/logo.jpg"
                                alt="AIM Center"
                                width={100}
                                height={100}
                                className="relative rounded-2xl shadow-2xl transition duration-500 group-hover:scale-105"
                            />
                        </div>
                        <span className="text-4xl font-black tracking-tight text-white mt-4">
                            <span className="text-[#00CED1]">AIM</span>
                            <span className="text-[#D81B60]">Center</span>
                        </span>
                    </Link>
                </div>

                {/* Navigation Links */}
                <nav className="w-full space-y-3 mb-12">
                    {quickLinks.map((link, index) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`flex items-center justify-between px-8 py-5 rounded-3xl bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-500 group overflow-hidden relative ${isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
                                }`}
                            onClick={onClose}
                            style={{
                                transitionDelay: `${index * 75}ms`,
                            }}
                        >
                            <span className="flex items-center gap-5 relative z-10">
                                <span className="text-3xl group-hover:scale-125 group-hover:rotate-12 transition-transform duration-500">{link.icon}</span>
                                <span className="text-2xl font-bold tracking-tight">{link.name}</span>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#00CED1]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                            <svg className="w-6 h-6 text-[#00CED1] group-hover:translate-x-2 transition-transform relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </Link>
                    ))}
                </nav>

                {/* Auth & Socials */}
                <div className={`w-full flex flex-col items-center gap-10 transition-all duration-1000 delay-500 ${isOpen ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}`}>
                    <Link
                        href="/auth/login"
                        className="w-full py-6 text-center text-white font-black text-xl bg-gradient-to-r from-[#00CED1] via-[#D81B60] to-[#00CED1] bg-[length:200%_auto] animate-gradient-x rounded-3xl shadow-[0_20px_50px_-15px_rgba(0,206,209,0.4)] hover:shadow-[0_20px_50px_-10px_rgba(0,206,209,0.6)] hover:scale-[1.03] active:scale-[0.97] transition-all"
                        onClick={onClose}
                    >
                        Student Login / Sign Up
                    </Link>

                    <div className="flex gap-8">
                        {[
                            { name: "YouTube", icon: "📺", color: "hover:text-red-500" },
                            { name: "Telegram", icon: "✈️", color: "hover:text-blue-400" },
                            { name: "Instagram", icon: "📸", color: "hover:text-pink-500" },
                            { name: "WhatsApp", icon: "💬", color: "hover:text-green-500" },
                        ].map((social) => (
                            <Link
                                key={social.name}
                                href="#"
                                className={`w-16 h-16 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-3xl transition-all hover:bg-white/10 hover:border-[#00CED1] hover:-translate-y-2 ${social.color}`}
                                title={social.name}
                                onClick={onClose}
                            >
                                {social.icon}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;
