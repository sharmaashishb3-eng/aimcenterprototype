"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function CreateTestSeriesPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        duration: "",
        totalQuestions: "",
        isFree: true,
        price: "",
    });

    const categories = [
        "Banking",
        "SSC",
        "Railway",
        "UPSC",
        "Teaching",
        "State PCS",
        "Defence",
        "Engineering",
    ];

    const updateFormData = (field: string, value: string | boolean) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push("/auth/login");
                return;
            }

            const { error } = await supabase.from("test_series").insert({
                title: formData.title,
                description: formData.description,
                category: formData.category,
                duration_minutes: parseInt(formData.duration) || 60,
                total_questions: parseInt(formData.totalQuestions) || 0,
                is_free: formData.isFree,
                price: formData.isFree ? 0 : parseFloat(formData.price) || 0,
                status: "draft",
                created_by: user.id,
            });

            if (error) {
                alert("Error creating test series: " + error.message);
            } else {
                alert("Test series created! Now add questions.");
                router.push("/educator/tests");
            }
        } catch {
            alert("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 bg-gray-50">
            <div className="container mx-auto px-4 max-w-2xl">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Create Test Series
                    </h1>
                    <p className="text-gray-600">
                        Set up a new mock test or test series
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Test Title *
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => updateFormData("title", e.target.value)}
                            placeholder="e.g., SSC CGL 2026 Full Mock Test 1"
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00CED1] outline-none"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Category *
                        </label>
                        <select
                            value={formData.category}
                            onChange={(e) => updateFormData("category", e.target.value)}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00CED1] outline-none"
                            required
                        >
                            <option value="">Select Category</option>
                            {categories.map((cat) => (
                                <option key={cat} value={cat.toLowerCase()}>
                                    {cat}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) => updateFormData("description", e.target.value)}
                            placeholder="Brief description of the test..."
                            rows={3}
                            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00CED1] outline-none resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Duration (minutes) *
                            </label>
                            <input
                                type="number"
                                value={formData.duration}
                                onChange={(e) => updateFormData("duration", e.target.value)}
                                placeholder="60"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00CED1] outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Total Questions *
                            </label>
                            <input
                                type="number"
                                value={formData.totalQuestions}
                                onChange={(e) => updateFormData("totalQuestions", e.target.value)}
                                placeholder="100"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00CED1] outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="p-4 bg-gray-50 rounded-xl">
                        <div className="flex items-center gap-4 mb-4">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    checked={formData.isFree}
                                    onChange={() => updateFormData("isFree", true)}
                                    className="w-4 h-4 text-[#00CED1]"
                                />
                                <span className="font-medium">Free Test</span>
                            </label>
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="radio"
                                    checked={!formData.isFree}
                                    onChange={() => updateFormData("isFree", false)}
                                    className="w-4 h-4 text-[#00CED1]"
                                />
                                <span className="font-medium">Paid Test</span>
                            </label>
                        </div>
                        {!formData.isFree && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Price (₹)
                                </label>
                                <input
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => updateFormData("price", e.target.value)}
                                    placeholder="99"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00CED1] outline-none"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex gap-4">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="flex-1 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 py-3 bg-gradient-to-r from-[#00CED1] to-[#D81B60] text-white font-semibold rounded-xl hover:shadow-lg disabled:opacity-50"
                        >
                            {loading ? "Creating..." : "Create & Add Questions"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
