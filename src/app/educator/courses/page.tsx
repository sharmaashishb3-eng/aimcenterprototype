"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Course, CourseStatus } from "@/types/database";

export default function TeacherCoursesPage() {
    const router = useRouter();
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<CourseStatus | "all">("all");

    useEffect(() => {
        const fetchCourses = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push("/auth/login");
                return;
            }

            const { data } = await supabase
                .from("courses")
                .select("*")
                .eq("created_by", user.id)
                .order("created_at", { ascending: false });

            setCourses(data || []);
            setLoading(false);
        };

        fetchCourses();
    }, [router]);

    const filteredCourses = courses.filter(
        (course) => filter === "all" || course.status === filter
    );

    const statusColors = {
        draft: "bg-gray-100 text-gray-600",
        pending_review: "bg-yellow-100 text-yellow-700",
        published: "bg-green-100 text-green-600",
        rejected: "bg-red-100 text-red-600",
    };

    const statusIcons = {
        draft: "📝",
        pending_review: "⏳",
        published: "✅",
        rejected: "❌",
    };

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
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
                        <p className="text-gray-500">Manage and track your courses</p>
                    </div>
                    <Link
                        href="/educator/courses/new"
                        className="px-6 py-3 bg-gradient-to-r from-[#00CED1] to-[#D81B60] text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                    >
                        + Create New Course
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: "Total", count: courses.length, color: "bg-blue-500" },
                        {
                            label: "Published",
                            count: courses.filter((c) => c.status === "published").length,
                            color: "bg-green-500",
                        },
                        {
                            label: "Pending",
                            count: courses.filter((c) => c.status === "pending_review").length,
                            color: "bg-yellow-500",
                        },
                        {
                            label: "Draft",
                            count: courses.filter((c) => c.status === "draft").length,
                            color: "bg-gray-500",
                        },
                    ].map((stat) => (
                        <div
                            key={stat.label}
                            className="bg-white rounded-2xl p-4 shadow-md text-center"
                        >
                            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center text-white text-xl font-bold mx-auto mb-2`}>
                                {stat.count}
                            </div>
                            <div className="text-gray-600 text-sm">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {["all", "draft", "pending_review", "published", "rejected"].map(
                        (status) => (
                            <button
                                key={status}
                                onClick={() => setFilter(status as CourseStatus | "all")}
                                className={`px-4 py-2 rounded-xl font-medium transition-all ${filter === status
                                        ? "bg-gradient-to-r from-[#00CED1] to-[#D81B60] text-white"
                                        : "bg-white text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                {status === "all"
                                    ? "All"
                                    : status.charAt(0).toUpperCase() +
                                    status.slice(1).replace("_", " ")}
                            </button>
                        )
                    )}
                </div>

                {/* Courses Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                        <div
                            key={course.id}
                            className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all"
                        >
                            <div className="h-32 bg-gradient-to-r from-[#00CED1] to-[#D81B60] relative">
                                <div className="absolute inset-0 flex items-center justify-center text-white text-6xl opacity-20">
                                    📚
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-3">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${statusColors[course.status]
                                            }`}
                                    >
                                        {statusIcons[course.status]} {course.status.replace("_", " ")}
                                    </span>
                                    <span className="text-gray-400 text-sm capitalize">
                                        {course.category}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                                    {course.title}
                                </h3>
                                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                                    {course.description || "No description"}
                                </p>

                                <div className="flex items-baseline gap-2 mb-4">
                                    <span className="text-xl font-bold text-[#00CED1]">
                                        ₹{course.price}
                                    </span>
                                    {course.original_price && (
                                        <span className="text-gray-400 line-through text-sm">
                                            ₹{course.original_price}
                                        </span>
                                    )}
                                </div>

                                {course.status === "rejected" && course.review_notes && (
                                    <div className="p-3 bg-red-50 rounded-xl text-red-600 text-sm mb-4">
                                        <strong>Feedback:</strong> {course.review_notes}
                                    </div>
                                )}

                                <div className="flex gap-2">
                                    <Link
                                        href={`/educator/courses/${course.id}/edit`}
                                        className="flex-1 py-2 text-center border-2 border-[#00CED1] text-[#00CED1] font-semibold rounded-xl hover:bg-[#00CED1]/10"
                                    >
                                        Edit
                                    </Link>
                                    <Link
                                        href={`/educator/courses/${course.id}`}
                                        className="flex-1 py-2 text-center bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200"
                                    >
                                        View
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {filteredCourses.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📚</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            No courses yet
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Start by creating your first course
                        </p>
                        <Link
                            href="/educator/courses/new"
                            className="inline-block px-6 py-3 bg-gradient-to-r from-[#00CED1] to-[#D81B60] text-white font-semibold rounded-xl"
                        >
                            Create Course
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
