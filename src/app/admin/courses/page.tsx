"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Course, CourseStatus } from "@/types/database";

export default function AdminCoursesPage() {
    const router = useRouter();
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<CourseStatus | "all">("pending_review");
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [reviewNotes, setReviewNotes] = useState("");

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            router.push("/auth/login");
            return;
        }

        const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();

        if (profile?.role !== "admin") {
            router.push("/dashboard");
            return;
        }

        const { data } = await supabase
            .from("courses")
            .select("*")
            .order("created_at", { ascending: false });

        setCourses(data || []);
        setLoading(false);
    };

    const handleReview = async (courseId: string, action: "publish" | "reject") => {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        const { error } = await supabase
            .from("courses")
            .update({
                status: action === "publish" ? "published" : "rejected",
                reviewed_by: user?.id,
                review_notes: reviewNotes,
                published_at: action === "publish" ? new Date().toISOString() : null,
            })
            .eq("id", courseId);

        if (!error) {
            setCourses(
                courses.map((c) =>
                    c.id === courseId
                        ? {
                            ...c,
                            status: action === "publish" ? "published" : "rejected",
                        }
                        : c
                )
            );
            setSelectedCourse(null);
            setReviewNotes("");
        }
    };

    const filteredCourses = courses.filter(
        (course) => filter === "all" || course.status === filter
    );

    const statusColors = {
        draft: "bg-gray-100 text-gray-600",
        pending_review: "bg-yellow-100 text-yellow-700",
        published: "bg-green-100 text-green-600",
        rejected: "bg-red-100 text-red-600",
    };

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
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Course Review</h1>
                        <p className="text-gray-500">
                            Review and approve courses submitted by teachers
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                            ⏳ {courses.filter((c) => c.status === "pending_review").length}{" "}
                            Pending
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full">
                            ✓ {courses.filter((c) => c.status === "published").length}{" "}
                            Published
                        </span>
                    </div>
                </div>

                {/* Filters */}
                <div className="flex flex-wrap gap-2 mb-6">
                    {["all", "pending_review", "published", "draft", "rejected"].map(
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
                                    ? "All Courses"
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
                            className="bg-white rounded-2xl shadow-md overflow-hidden"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[course.status]
                                            }`}
                                    >
                                        {course.status.replace("_", " ")}
                                    </span>
                                    <span className="text-gray-400 text-sm">
                                        {course.category}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-gray-900 mb-2">
                                    {course.title}
                                </h3>
                                <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                                    {course.description || "No description provided"}
                                </p>

                                <div className="flex items-baseline gap-2 mb-4">
                                    <span className="text-xl font-bold text-[#00CED1]">
                                        ₹{course.price}
                                    </span>
                                    {course.original_price && (
                                        <span className="text-gray-400 line-through">
                                            ₹{course.original_price}
                                        </span>
                                    )}
                                </div>

                                <div className="text-gray-400 text-sm mb-4">
                                    Created:{" "}
                                    {new Date(course.created_at).toLocaleDateString()}
                                </div>

                                {course.status === "pending_review" && (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => setSelectedCourse(course)}
                                            className="flex-1 py-2 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600"
                                        >
                                            Review
                                        </button>
                                    </div>
                                )}

                                {course.status === "rejected" && course.review_notes && (
                                    <div className="p-3 bg-red-50 rounded-xl text-red-600 text-sm">
                                        <strong>Rejection Note:</strong> {course.review_notes}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {filteredCourses.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📚</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            No courses found
                        </h3>
                        <p className="text-gray-500">
                            {filter === "pending_review"
                                ? "No courses pending review"
                                : "No courses in this category"}
                        </p>
                    </div>
                )}

                {/* Review Modal */}
                {selectedCourse && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">
                                Review Course
                            </h3>

                            <div className="mb-6">
                                <h4 className="font-bold text-gray-900 text-lg">
                                    {selectedCourse.title}
                                </h4>
                                <p className="text-gray-500 text-sm mb-4">
                                    {selectedCourse.description}
                                </p>

                                <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl mb-4">
                                    <div>
                                        <span className="text-gray-500 text-sm">Category</span>
                                        <div className="font-medium capitalize">
                                            {selectedCourse.category}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-gray-500 text-sm">Price</span>
                                        <div className="font-medium">₹{selectedCourse.price}</div>
                                    </div>
                                </div>

                                {selectedCourse.features &&
                                    (selectedCourse.features as string[]).length > 0 && (
                                        <div className="mb-4">
                                            <span className="text-gray-500 text-sm">Features</span>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {(selectedCourse.features as string[]).map((f, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                                                    >
                                                        {f}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Review Notes (optional)
                                    </label>
                                    <textarea
                                        value={reviewNotes}
                                        onChange={(e) => setReviewNotes(e.target.value)}
                                        placeholder="Add notes for the teacher (especially if rejecting)..."
                                        rows={3}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00CED1] outline-none resize-none"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => {
                                        setSelectedCourse(null);
                                        setReviewNotes("");
                                    }}
                                    className="flex-1 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => handleReview(selectedCourse.id, "reject")}
                                    className="flex-1 py-3 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600"
                                >
                                    Reject
                                </button>
                                <button
                                    onClick={() => handleReview(selectedCourse.id, "publish")}
                                    className="flex-1 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600"
                                >
                                    Approve & Publish
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
