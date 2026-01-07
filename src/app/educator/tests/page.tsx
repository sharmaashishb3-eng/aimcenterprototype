"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { TestSeries, CourseStatus } from "@/types/database";

export default function TeacherTestsPage() {
    const router = useRouter();
    const [tests, setTests] = useState<TestSeries[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTests = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push("/auth/login");
                return;
            }

            const { data } = await supabase
                .from("test_series")
                .select("*")
                .eq("created_by", user.id)
                .order("created_at", { ascending: false });

            setTests(data || []);
            setLoading(false);
        };

        fetchTests();
    }, [router]);

    const statusColors: Record<CourseStatus, string> = {
        draft: "bg-gray-100 text-gray-600",
        pending_review: "bg-yellow-100 text-yellow-700",
        published: "bg-green-100 text-green-600",
        rejected: "bg-red-100 text-red-600",
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
                        <h1 className="text-3xl font-bold text-gray-900">My Test Series</h1>
                        <p className="text-gray-500">Create and manage mock tests</p>
                    </div>
                    <Link
                        href="/educator/tests/new"
                        className="px-6 py-3 bg-gradient-to-r from-[#00CED1] to-[#D81B60] text-white font-semibold rounded-xl hover:shadow-lg"
                    >
                        + Create New Test
                    </Link>
                </div>

                {/* Tests Grid */}
                {tests.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center shadow-md">
                        <div className="text-6xl mb-4">📝</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            No test series yet
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Create your first mock test for students
                        </p>
                        <Link
                            href="/educator/tests/new"
                            className="inline-block px-6 py-3 bg-gradient-to-r from-[#00CED1] to-[#D81B60] text-white font-semibold rounded-xl"
                        >
                            Create Test Series
                        </Link>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {tests.map((test) => (
                            <div
                                key={test.id}
                                className="bg-white rounded-2xl shadow-md overflow-hidden"
                            >
                                <div className="h-24 bg-gradient-to-r from-[#00CED1] to-[#0891B2] relative flex items-center justify-center">
                                    <span className="text-5xl opacity-30">📝</span>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-3">
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[test.status]
                                                }`}
                                        >
                                            {test.status.replace("_", " ")}
                                        </span>
                                        <span className="text-gray-400 text-sm capitalize">
                                            {test.category}
                                        </span>
                                    </div>

                                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
                                        {test.title}
                                    </h3>

                                    <div className="flex items-center gap-4 text-gray-500 text-sm mb-4">
                                        <span>📝 {test.total_questions} Qs</span>
                                        <span>⏱️ {test.duration_minutes} mins</span>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span
                                            className={`font-bold ${test.is_free ? "text-green-600" : "text-[#00CED1]"
                                                }`}
                                        >
                                            {test.is_free ? "Free" : `₹${test.price}`}
                                        </span>
                                        <Link
                                            href={`/educator/tests/${test.id}/questions`}
                                            className="text-[#00CED1] font-medium hover:underline"
                                        >
                                            Manage Questions →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
