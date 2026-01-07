"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/types/database";

export default function EducatorDashboard() {
    const router = useRouter();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAccess = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push("/auth/login");
                return;
            }

            const { data: profileData } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", user.id)
                .single();

            if (!profileData || (profileData.role !== "teacher" && profileData.role !== "admin")) {
                router.push("/dashboard");
                return;
            }

            setProfile(profileData);
            setLoading(false);
        };

        checkAccess();
    }, [router]);

    const stats = [
        { label: "Total Courses", value: "12", icon: "📚", trend: "+2 this month" },
        { label: "Active Students", value: "1,234", icon: "👥", trend: "+15% growth" },
        { label: "Tests Created", value: "45", icon: "📝", trend: "+5 this week" },
        { label: "Revenue", value: "₹45,000", icon: "💰", trend: "+8% this month" },
    ];

    const pendingCourses = [
        { id: 1, title: "SSC CGL Complete Course", status: "draft", date: "Jan 5, 2026" },
        { id: 2, title: "Banking Fundamentals", status: "pending_review", date: "Jan 3, 2026" },
        { id: 3, title: "Aptitude Mastery", status: "rejected", date: "Jan 1, 2026" },
    ];

    const quickActions = [
        { label: "Create Course", href: "/educator/courses/new", icon: "➕", color: "from-blue-500 to-blue-600" },
        { label: "Add Questions", href: "/educator/questions", icon: "📝", color: "from-[#00CED1] to-[#0891B2]" },
        { label: "Create Test", href: "/educator/tests/new", icon: "📋", color: "from-purple-500 to-purple-600" },
        { label: "View Analytics", href: "/educator/analytics", icon: "📊", color: "from-[#D81B60] to-[#AD1457]" },
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
                {/* Welcome Header */}
                <div className="bg-gradient-to-r from-[#00CED1] to-[#0891B2] rounded-3xl p-8 mb-8 text-white">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold mb-2">
                                Welcome, {profile?.full_name || "Educator"}! 👨‍🏫
                            </h1>
                            <p className="text-white/80">Manage your courses and track student progress</p>
                        </div>
                        <Link
                            href="/educator/courses/new"
                            className="px-6 py-3 bg-white text-[#00CED1] font-semibold rounded-xl hover:shadow-lg transition-all"
                        >
                            + Create New Course
                        </Link>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat) => (
                        <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-md">
                            <div className="text-3xl mb-2">{stat.icon}</div>
                            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                            <div className="text-gray-500 text-sm">{stat.label}</div>
                            <div className="text-green-500 text-xs mt-1">{stat.trend}</div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {quickActions.map((action) => (
                        <Link
                            key={action.label}
                            href={action.href}
                            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all group"
                        >
                            <div
                                className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}
                            >
                                {action.icon}
                            </div>
                            <span className="font-semibold text-gray-900">{action.label}</span>
                        </Link>
                    ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Pending Courses */}
                    <div className="bg-white rounded-2xl p-6 shadow-md">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">My Courses</h2>
                            <Link
                                href="/educator/courses"
                                className="text-[#00CED1] font-medium text-sm hover:underline"
                            >
                                View All →
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {pendingCourses.map((course) => (
                                <div
                                    key={course.id}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                                >
                                    <div>
                                        <h3 className="font-medium text-gray-900">{course.title}</h3>
                                        <p className="text-gray-500 text-sm">{course.date}</p>
                                    </div>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-bold ${course.status === "draft"
                                                ? "bg-gray-200 text-gray-600"
                                                : course.status === "pending_review"
                                                    ? "bg-yellow-100 text-yellow-700"
                                                    : "bg-red-100 text-red-600"
                                            }`}
                                    >
                                        {course.status.replace("_", " ")}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white rounded-2xl p-6 shadow-md">
                        <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
                        <div className="space-y-4">
                            {[
                                { text: "New student enrolled in SSC Course", time: "2 hours ago", icon: "👤" },
                                { text: "Course 'Banking Basics' submitted for review", time: "5 hours ago", icon: "📤" },
                                { text: "15 new test attempts on Mock Test #3", time: "1 day ago", icon: "📝" },
                                { text: "Payment received: ₹999", time: "2 days ago", icon: "💰" },
                            ].map((activity, index) => (
                                <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                    <div className="w-10 h-10 bg-[#00CED1]/10 rounded-lg flex items-center justify-center text-lg">
                                        {activity.icon}
                                    </div>
                                    <div>
                                        <p className="text-gray-900">{activity.text}</p>
                                        <p className="text-gray-500 text-sm">{activity.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
