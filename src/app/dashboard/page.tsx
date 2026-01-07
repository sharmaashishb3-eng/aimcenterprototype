"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

interface User {
    email?: string;
    user_metadata?: {
        full_name?: string;
        exam_preference?: string;
    };
}

export default function DashboardPage() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            const supabase = createClient();
            const {
                data: { user },
            } = await supabase.auth.getUser();
            setUser(user);
            setLoading(false);
        };
        getUser();
    }, []);

    const quickLinks = [
        {
            title: "My Courses",
            description: "Continue your enrolled courses",
            icon: "📚",
            href: "/dashboard/my-courses",
            color: "from-blue-500 to-blue-600",
        },
        {
            title: "Mock Tests",
            description: "Practice with test series",
            icon: "📝",
            href: "/dashboard/mock-tests",
            color: "from-[#00CED1] to-[#0891B2]",
        },
        {
            title: "Live Classes",
            description: "Join upcoming live sessions",
            icon: "📺",
            href: "/dashboard/live-classes",
            color: "from-purple-500 to-purple-600",
        },
        {
            title: "Study Materials",
            description: "Access PDFs and notes",
            icon: "📖",
            href: "/dashboard/materials",
            color: "from-[#D81B60] to-[#AD1457]",
        },
    ];

    const recentMockTests = [
        { name: "SSC CGL Prelims Mock 1", score: "85/100", date: "Today" },
        { name: "Banking Aptitude Test", score: "72/100", date: "Yesterday" },
        { name: "Railway Group D Full Test", score: "68/100", date: "2 days ago" },
    ];

    if (loading) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center">
                <div className="animate-spin w-12 h-12 border-4 border-[#00CED1] border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Welcome Section */}
                <div className="bg-gradient-to-r from-[#00CED1] to-[#D81B60] rounded-3xl p-8 mb-8 text-white">
                    <h1 className="text-2xl md:text-3xl font-bold mb-2">
                        Welcome back, {user?.user_metadata?.full_name || "Student"}! 👋
                    </h1>
                    <p className="text-white/80">
                        Continue your learning journey with AIM Center
                    </p>
                </div>

                {/* Quick Links Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {quickLinks.map((link) => (
                        <Link
                            key={link.title}
                            href={link.href}
                            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all group"
                        >
                            <div
                                className={`w-12 h-12 bg-gradient-to-br ${link.color} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}
                            >
                                {link.icon}
                            </div>
                            <h3 className="font-bold text-gray-900 mb-1">{link.title}</h3>
                            <p className="text-gray-500 text-sm">{link.description}</p>
                        </Link>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Recent Activity */}
                    <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-md">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-900">
                                Recent Mock Tests
                            </h2>
                            <Link
                                href="/dashboard/mock-tests"
                                className="text-[#00CED1] font-medium text-sm hover:underline"
                            >
                                View All →
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {recentMockTests.map((test, index) => (
                                <div
                                    key={index}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-[#00CED1]/10 rounded-lg flex items-center justify-center text-lg">
                                            📝
                                        </div>
                                        <div>
                                            <h4 className="font-medium text-gray-900">{test.name}</h4>
                                            <p className="text-gray-500 text-sm">{test.date}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="font-bold text-[#00CED1]">{test.score}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Profile Card */}
                    <div className="bg-white rounded-2xl p-6 shadow-md">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Profile</h2>
                        <div className="text-center mb-6">
                            <div className="w-20 h-20 bg-gradient-to-r from-[#00CED1] to-[#D81B60] rounded-full flex items-center justify-center text-3xl text-white mx-auto mb-4">
                                {user?.user_metadata?.full_name?.charAt(0) || "S"}
                            </div>
                            <h3 className="font-bold text-gray-900">
                                {user?.user_metadata?.full_name || "Student"}
                            </h3>
                            <p className="text-gray-500 text-sm">{user?.email}</p>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between py-3 border-b border-gray-100">
                                <span className="text-gray-500">Target Exam</span>
                                <span className="font-medium text-gray-900 capitalize">
                                    {user?.user_metadata?.exam_preference || "Not set"}
                                </span>
                            </div>
                            <div className="flex justify-between py-3 border-b border-gray-100">
                                <span className="text-gray-500">Courses Enrolled</span>
                                <span className="font-medium text-gray-900">3</span>
                            </div>
                            <div className="flex justify-between py-3">
                                <span className="text-gray-500">Tests Attempted</span>
                                <span className="font-medium text-gray-900">24</span>
                            </div>
                        </div>
                        <Link
                            href="/dashboard/profile"
                            className="block w-full mt-6 py-3 text-center text-[#00CED1] font-semibold border-2 border-[#00CED1] rounded-xl hover:bg-[#00CED1] hover:text-white transition-all"
                        >
                            Edit Profile
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
