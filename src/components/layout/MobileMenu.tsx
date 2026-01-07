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
    examCategories: ExamCategory[];
}

const MobileMenu = ({ isOpen, onClose, examCategories }: MobileMenuProps) => {
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
            className={`fixed inset-0 z-[60] transition-all duration-300 ${isOpen ? "visible" : "invisible"
                }`}
        >
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0"
                    }`}
                onClick={onClose}
            />

            {/* Menu Panel */}
            <div
                className={`absolute top-0 left-0 w-[85%] max-w-sm h-full bg-white shadow-2xl transition-transform duration-300 ease-out overflow-y-auto ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2" onClick={onClose}>
                        <Image
                            src="/logo.jpg"
                            alt="AIM Center"
                            width={40}
                            height={40}
                            className="rounded-lg"
                        />
                        <span className="text-lg font-bold">
                            <span className="text-[#00CED1]">AIM</span>
                            <span className="text-[#D81B60]">Center</span>
                        </span>
                    </Link>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                        aria-label="Close menu"
                    >
                        <svg
                            className="w-6 h-6 text-gray-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Auth Buttons */}
                <div className="p-4 border-b border-gray-100">
                    <Link
                        href="/auth/login"
                        className="block w-full py-3 text-center text-white font-semibold bg-gradient-to-r from-[#00CED1] to-[#D81B60] rounded-xl hover:shadow-lg transition-all"
                        onClick={onClose}
                    >
                        Login / Sign Up
                    </Link>
                </div>

                {/* Quick Links */}
                <div className="p-4 border-b border-gray-100">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                        Quick Links
                    </h3>
                    <div className="space-y-1">
                        {quickLinks.map((link, index) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="flex items-center gap-3 px-3 py-3 rounded-xl hover:bg-gray-50 transition-colors"
                                onClick={onClose}
                                style={{
                                    animationDelay: `${index * 50}ms`,
                                }}
                            >
                                <span className="text-xl">{link.icon}</span>
                                <span className="font-medium text-gray-700">{link.name}</span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Exam Categories */}
                <div className="p-4 border-b border-gray-100">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                        Exam Categories
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                        {examCategories.map((category, index) => (
                            <Link
                                key={category.name}
                                href={category.href}
                                className="flex items-center gap-2 px-3 py-3 rounded-xl bg-gray-50 hover:bg-[#00CED1]/10 hover:border-[#00CED1] border border-transparent transition-all"
                                onClick={onClose}
                                style={{
                                    animationDelay: `${(index + 5) * 50}ms`,
                                }}
                            >
                                <span className="text-lg">{category.icon}</span>
                                <span className="text-sm font-medium text-gray-700">
                                    {category.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Refer & Earn */}
                <div className="p-4 border-b border-gray-100">
                    <Link
                        href="/refer"
                        className="flex items-center justify-center gap-2 w-full py-3 bg-[#D81B60]/10 text-[#D81B60] font-semibold rounded-xl border-2 border-dashed border-[#D81B60]/30 hover:border-[#D81B60] transition-all"
                        onClick={onClose}
                    >
                        <span className="text-xl">🎁</span>
                        Refer & Earn Rewards
                    </Link>
                </div>

                {/* Footer Links */}
                <div className="p-4 pb-8">
                    <div className="flex flex-wrap gap-3 text-sm text-gray-500">
                        <Link href="/about" className="hover:text-[#00CED1]" onClick={onClose}>
                            About Us
                        </Link>
                        <span>•</span>
                        <Link href="/contact" className="hover:text-[#00CED1]" onClick={onClose}>
                            Contact
                        </Link>
                        <span>•</span>
                        <Link href="/careers" className="hover:text-[#00CED1]" onClick={onClose}>
                            Careers
                        </Link>
                        <span>•</span>
                        <Link href="/support" className="hover:text-[#00CED1]" onClick={onClose}>
                            Support
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;
