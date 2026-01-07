"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/types/database";

export default function AdminDashboard() {
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

            if (!profileData || profileData.role !== "admin") {
                router.push("/dashboard");
                return;
            }

            setProfile(profileData);
            setLoading(false);
        };

        checkAccess();
    }, [router]);

    const stats = [
        { label: "Total Users", value: "15,234", icon: "👥", color: "bg-blue-500" },
        { label: "Students", value: "14,500", icon: "🎓", color: "bg-green-500" },
        { label: "Teachers", value: "700", icon: "👨‍🏫", color: "bg-purple-500" },
        { label: "Revenue", value: "₹12.5L", icon: "💰", color: "bg-[#D81B60]" },
    ];

    const pendingReviews = [
        { id: 1, title: "SSC CGL Complete Course", teacher: "Rahul Sharma", date: "Jan 5, 2026", type: "course" },
        { id: 2, title: "Banking Prelims Test Series", teacher: "Priya Singh", date: "Jan 4, 2026", type: "test" },
        { id: 3, title: "Railway Group D Pack", teacher: "Amit Kumar", date: "Jan 3, 2026", type: "course" },
    ];

    const recentUsers = [
        { id: 1, name: "Arjun Patel", email: "arjun@email.com", role: "student", date: "Today" },
        { id: 2, name: "Sneha Gupta", email: "sneha@email.com", role: "student", date: "Today" },
        { id: 3, name: "Vikram Singh", email: "vikram@email.com", role: "teacher", date: "Yesterday" },
        { id: 4, name: "Anjali Rao", email: "anjali@email.com", role: "student", date: "Yesterday" },
    ];

    const quickActions = [
        { label: "User Management", href: "/admin/users", icon: "👥", color: "from-blue-500 to-blue-600" },
        { label: "Review Courses", href: "/admin/courses", icon: "📚", color: "from-[#00CED1] to-[#0891B2]" },
        { label: "Review Tests", href: "/admin/tests", icon: "📝", color: "from-purple-500 to-purple-600" },
        { label: "Analytics", href: "/admin/analytics", icon: "📊", color: "from-[#D81B60] to-[#AD1457]" },
    ];

    if (loading) {
        return (
            <div className="min-h-screen pt-24 flex items-center justify-center">
                <div className="animate-spin w-12 h-12 border-4 border-[#D81B60] border-t-transparent rounded-full" />
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-12 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Welcome Header */}
                <div className="bg-gradient-to-r from-[#D81B60] to-[#AD1457] rounded-3xl p-8 mb-8 text-white">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <div>
                            <h1 className="text-2xl md:text-3xl font-bold mb-2">
                                Admin Dashboard 🛡️
                            </h1>
                            <p className="text-white/80">Manage users, review content, and monitor platform health</p>
                        </div>
                        <div className="flex gap-3">
                            <Link
                                href="/admin/users"
                                className="px-6 py-3 bg-white text-[#D81B60] font-semibold rounded-xl hover:shadow-lg transition-all"
                            >
                                Manage Users
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat) => (
                        <div key={stat.label} className="bg-white rounded-2xl p-6 shadow-md">
                            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-2xl text-white mb-4`}>
                                {stat.icon}
                            </div>
                            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                            <div className="text-gray-500 text-sm">{stat.label}</div>
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
                    {/* Pending Reviews */}
                    <div className="bg-white rounded-2xl p-6 shadow-md">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Pending Reviews</h2>
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-bold">
                                {pendingReviews.length} pending
                            </span>
                        </div>
                        <div className="space-y-4">
                            {pendingReviews.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                                >
                                    <div>
                                        <h3 className="font-medium text-gray-900">{item.title}</h3>
                                        <p className="text-gray-500 text-sm">
                                            by {item.teacher} • {item.date}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="px-4 py-2 bg-green-500 text-white text-sm font-semibold rounded-lg hover:bg-green-600 transition-colors">
                                            Approve
                                        </button>
                                        <button className="px-4 py-2 bg-red-100 text-red-600 text-sm font-semibold rounded-lg hover:bg-red-200 transition-colors">
                                            Reject
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Users */}
                    <div className="bg-white rounded-2xl p-6 shadow-md">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-bold text-gray-900">Recent Users</h2>
                            <Link
                                href="/admin/users"
                                className="text-[#D81B60] font-medium text-sm hover:underline"
                            >
                                View All →
                            </Link>
                        </div>
                        <div className="space-y-4">
                            {recentUsers.map((user) => (
                                <div
                                    key={user.id}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-gradient-to-r from-[#00CED1] to-[#D81B60] rounded-full flex items-center justify-center text-white font-bold">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">{user.name}</h3>
                                            <p className="text-gray-500 text-sm">{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${user.role === "teacher"
                                                    ? "bg-purple-100 text-purple-600"
                                                    : "bg-blue-100 text-blue-600"
                                                }`}
                                        >
                                            {user.role}
                                        </span>
                                        <button className="text-[#00CED1] hover:underline text-sm">
                                            Edit
                                        </button>
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
