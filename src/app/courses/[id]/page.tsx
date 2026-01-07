"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function CourseDetailPage() {
    const params = useParams();
    const [activeTab, setActiveTab] = useState("overview");

    const course = {
        id: params.id,
        title: "Bank Maha Pack 2026",
        description:
            "Complete preparation package for all banking exams including SBI PO, IBPS PO, RRB PO, and more. Learn from India's best educators and crack your dream banking exam.",
        category: "Banking",
        price: 4999,
        originalPrice: 14999,
        discount: 67,
        rating: 4.8,
        students: "45K+",
        features: [
            "200+ Live Classes",
            "400+ Mock Tests",
            "50+ E-Books",
            "Daily Current Affairs",
            "Doubt Support",
            "1 Year Validity",
        ],
        curriculum: [
            {
                title: "Quantitative Aptitude",
                lessons: 45,
                duration: "20 hours",
                topics: ["Number System", "Simplification", "Data Interpretation", "Quadratic Equations"],
            },
            {
                title: "Reasoning Ability",
                lessons: 40,
                duration: "18 hours",
                topics: ["Puzzles", "Seating Arrangement", "Syllogism", "Inequality"],
            },
            {
                title: "English Language",
                lessons: 35,
                duration: "15 hours",
                topics: ["Reading Comprehension", "Cloze Test", "Error Spotting", "Para Jumbles"],
            },
            {
                title: "General Awareness",
                lessons: 50,
                duration: "22 hours",
                topics: ["Banking Awareness", "Current Affairs", "Static GK", "Economy"],
            },
        ],
        instructors: [
            { name: "Rahul Sharma", subject: "Quant Expert", students: "50K+" },
            { name: "Priya Singh", subject: "Reasoning Expert", students: "45K+" },
        ],
    };

    return (
        <div className="min-h-screen pt-20 bg-gray-50">
            {/* Hero Section */}
            <div className="bg-gradient-to-r from-[#00CED1] to-[#0891B2] text-white">
                <div className="container mx-auto px-4 py-12">
                    <div className="max-w-3xl">
                        <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-4">
                            {course.category}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-bold mb-4">
                            {course.title}
                        </h1>
                        <p className="text-white/80 mb-6">{course.description}</p>

                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            <div className="flex items-center gap-1">
                                <span className="text-yellow-400">⭐</span>
                                <span className="font-bold">{course.rating}</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span>👥</span>
                                <span>{course.students} students</span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                            {course.features.slice(0, 4).map((feature) => (
                                <span
                                    key={feature}
                                    className="px-3 py-1 bg-white/20 rounded-full text-sm"
                                >
                                    ✓ {feature}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Tabs */}
                        <div className="bg-white rounded-2xl shadow-md mb-6">
                            <div className="flex border-b">
                                {["overview", "curriculum", "instructors", "reviews"].map(
                                    (tab) => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`flex-1 py-4 text-center font-medium capitalize transition-colors ${activeTab === tab
                                                    ? "text-[#00CED1] border-b-2 border-[#00CED1]"
                                                    : "text-gray-500 hover:text-gray-700"
                                                }`}
                                        >
                                            {tab}
                                        </button>
                                    )
                                )}
                            </div>

                            <div className="p-6">
                                {activeTab === "overview" && (
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                                            What you&apos;ll learn
                                        </h3>
                                        <div className="grid md:grid-cols-2 gap-3">
                                            {course.features.map((feature) => (
                                                <div key={feature} className="flex items-center gap-2">
                                                    <span className="text-green-500">✓</span>
                                                    <span className="text-gray-700">{feature}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {activeTab === "curriculum" && (
                                    <div className="space-y-4">
                                        {course.curriculum.map((section, index) => (
                                            <div
                                                key={index}
                                                className="border border-gray-200 rounded-xl overflow-hidden"
                                            >
                                                <div className="p-4 bg-gray-50 flex justify-between items-center">
                                                    <h4 className="font-bold text-gray-900">
                                                        {section.title}
                                                    </h4>
                                                    <span className="text-gray-500 text-sm">
                                                        {section.lessons} lessons • {section.duration}
                                                    </span>
                                                </div>
                                                <div className="p-4">
                                                    <div className="flex flex-wrap gap-2">
                                                        {section.topics.map((topic) => (
                                                            <span
                                                                key={topic}
                                                                className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                                                            >
                                                                {topic}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {activeTab === "instructors" && (
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {course.instructors.map((instructor, index) => (
                                            <div
                                                key={index}
                                                className="p-4 bg-gray-50 rounded-xl flex items-center gap-4"
                                            >
                                                <div className="w-16 h-16 bg-gradient-to-r from-[#00CED1] to-[#D81B60] rounded-full flex items-center justify-center text-white text-2xl">
                                                    {instructor.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-gray-900">
                                                        {instructor.name}
                                                    </h4>
                                                    <p className="text-gray-500 text-sm">
                                                        {instructor.subject}
                                                    </p>
                                                    <p className="text-[#00CED1] text-sm">
                                                        {instructor.students} students
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {activeTab === "reviews" && (
                                    <div className="text-center py-8">
                                        <div className="text-5xl mb-4">⭐</div>
                                        <div className="text-3xl font-bold text-gray-900 mb-2">
                                            {course.rating}
                                        </div>
                                        <p className="text-gray-500">
                                            Based on {course.students} students
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Pricing Card */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
                            {/* Price */}
                            <div className="mb-6">
                                <div className="flex items-baseline gap-2 mb-2">
                                    <span className="text-3xl font-bold text-gray-900">
                                        ₹{course.price.toLocaleString()}
                                    </span>
                                    <span className="text-gray-400 line-through">
                                        ₹{course.originalPrice.toLocaleString()}
                                    </span>
                                </div>
                                <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-bold">
                                    {course.discount}% OFF
                                </span>
                            </div>

                            {/* CTA Buttons */}
                            <Link
                                href={`/checkout?course=${course.id}`}
                                className="block w-full py-4 text-center bg-gradient-to-r from-[#00CED1] to-[#D81B60] text-white font-semibold rounded-xl hover:shadow-lg transition-all mb-3"
                            >
                                Buy Now
                            </Link>
                            <button className="w-full py-4 border-2 border-[#00CED1] text-[#00CED1] font-semibold rounded-xl hover:bg-[#00CED1]/10 transition-all">
                                Add to Cart
                            </button>

                            {/* Features */}
                            <div className="mt-6 pt-6 border-t border-gray-200">
                                <h4 className="font-bold text-gray-900 mb-4">
                                    This course includes:
                                </h4>
                                <div className="space-y-3">
                                    {course.features.map((feature) => (
                                        <div
                                            key={feature}
                                            className="flex items-center gap-3 text-gray-600"
                                        >
                                            <span className="text-[#00CED1]">✓</span>
                                            <span>{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Guarantee */}
                            <div className="mt-6 p-4 bg-green-50 rounded-xl text-center">
                                <span className="text-green-600 text-sm">
                                    🔒 30-Day Money-Back Guarantee
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
