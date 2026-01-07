"use client";

import { useState } from "react";
import Image from "next/image";

const HeroSection = () => {
    const [phoneNumber, setPhoneNumber] = useState("");

    const handleGetLink = () => {
        if (phoneNumber.length === 10) {
            alert(`App download link will be sent to +91 ${phoneNumber}`);
        } else {
            alert("Please enter a valid 10-digit mobile number");
        }
    };

    return (
        <section className="relative pt-24 pb-12 lg:pt-32 lg:pb-20 overflow-hidden bg-gradient-to-br from-white via-[#00CED1]/5 to-[#D81B60]/5">
            {/* Background Decorations */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#00CED1]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#D81B60]/10 rounded-full blur-3xl" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
                    {/* Left Content */}
                    <div className="flex-1 text-center lg:text-left">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            <span className="text-[#00CED1]">Learning Today</span>
                            <br />
                            <span className="text-[#D81B60]">Leading Tomorrow</span>
                        </h1>

                        <p className="text-xl md:text-2xl text-[#D81B60] font-semibold mb-4">
                            With India&apos;s #1 Learning App
                        </p>

                        <p className="text-gray-600 text-lg mb-8 max-w-lg mx-auto lg:mx-0">
                            Download our app & discover AIM Center&apos;s revolutionary way of learning!
                        </p>

                        {/* App Download CTA */}
                        <div className="bg-white rounded-2xl shadow-xl p-2 max-w-md mx-auto lg:mx-0 mb-6">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-xl">
                                    <span className="text-gray-600 font-medium">+91</span>
                                </div>
                                <input
                                    type="tel"
                                    placeholder="Enter your 10 digit mobile number"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                                    className="flex-1 px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none"
                                />
                                <button
                                    onClick={handleGetLink}
                                    className="px-6 py-3 bg-[#D81B60] text-white font-bold rounded-xl hover:bg-[#AD1457] transition-colors whitespace-nowrap"
                                >
                                    GET LINK
                                </button>
                            </div>
                        </div>

                        {/* App Store Buttons */}
                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                            <a
                                href="#"
                                className="flex items-center gap-3 px-5 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
                            >
                                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v17c0 .83-.67 1.5-1.5 1.5S3 21.33 3 20.5zm7-17v17c0 .83.67 1.5 1.5 1.5h8c.83 0 1.5-.67 1.5-1.5v-17c0-.83-.67-1.5-1.5-1.5h-8c-.83 0-1.5.67-1.5 1.5zm2 15h6v-2h-6v2z" />
                                </svg>
                                <div className="text-left">
                                    <div className="text-[10px] text-gray-400 uppercase">Get it on</div>
                                    <div className="text-base font-semibold">Google Play</div>
                                </div>
                            </a>
                            <a
                                href="#"
                                className="flex items-center gap-3 px-5 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition-colors"
                            >
                                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                </svg>
                                <div className="text-left">
                                    <div className="text-[10px] text-gray-400 uppercase">Download on the</div>
                                    <div className="text-base font-semibold">App Store</div>
                                </div>
                            </a>
                        </div>
                    </div>

                    {/* Right Illustration */}
                    <div className="flex-1 relative">
                        <div className="relative w-full max-w-lg mx-auto">
                            {/* Main Illustration Container */}
                            <div className="relative bg-gradient-to-br from-[#00CED1]/20 to-[#D81B60]/20 rounded-3xl p-8">
                                {/* Floating Elements */}
                                <div className="absolute -top-6 -left-6 w-20 h-20 bg-[#00CED1] rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
                                    <span className="text-3xl">📚</span>
                                </div>
                                <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#D81B60] rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
                                    <span className="text-2xl">🎯</span>
                                </div>
                                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                                    <span className="text-2xl">🏆</span>
                                </div>
                                <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-gradient-to-br from-[#00CED1] to-[#D81B60] rounded-2xl flex items-center justify-center shadow-lg animate-bounce" style={{ animationDelay: "0.5s" }}>
                                    <span className="text-3xl">💡</span>
                                </div>

                                {/* Center Image */}
                                <div className="relative aspect-square flex items-center justify-center">
                                    <Image
                                        src="/logo.jpg"
                                        alt="AIM Center Learning"
                                        width={300}
                                        height={300}
                                        className="rounded-2xl"
                                    />
                                </div>

                                {/* Stats Badges */}
                                <div className="absolute top-1/4 -right-12 bg-white rounded-xl shadow-lg p-3 hidden md:block">
                                    <div className="text-[#00CED1] font-bold text-lg">2000+</div>
                                    <div className="text-gray-500 text-xs">Live Classes</div>
                                </div>
                                <div className="absolute bottom-1/4 -left-12 bg-white rounded-xl shadow-lg p-3 hidden md:block">
                                    <div className="text-[#D81B60] font-bold text-lg">4000+</div>
                                    <div className="text-gray-500 text-xs">Mock Tests</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
