"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function CreateCoursePage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        price: "",
        originalPrice: "",
        features: ["", "", ""],
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

    const updateFormData = (field: string, value: string | string[]) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const updateFeature = (index: number, value: string) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        updateFormData("features", newFeatures);
    };

    const addFeature = () => {
        updateFormData("features", [...formData.features, ""]);
    };

    const handleSubmit = async (status: "draft" | "pending_review") => {
        setLoading(true);

        try {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push("/auth/login");
                return;
            }

            const slug = formData.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");

            const { error } = await supabase.from("courses").insert({
                title: formData.title,
                slug: slug + "-" + Date.now(),
                description: formData.description,
                category: formData.category,
                price: parseFloat(formData.price) || 0,
                original_price: parseFloat(formData.originalPrice) || null,
                features: formData.features.filter((f) => f.trim() !== ""),
                status: status,
                created_by: user.id,
            });

            if (error) {
                alert("Error creating course: " + error.message);
            } else {
                alert(
                    status === "draft"
                        ? "Course saved as draft!"
                        : "Course submitted for review!"
                );
                router.push("/educator/courses");
            }
        } catch {
            alert("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 bg-gray-50">
            <div className="container mx-auto px-4 max-w-3xl">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Create New Course
                    </h1>
                    <p className="text-gray-600">
                        Fill in the details below to create a new course
                    </p>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-center gap-4 mb-8">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className="flex items-center">
                            <button
                                onClick={() => setStep(s)}
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${s === step
                                        ? "bg-gradient-to-r from-[#00CED1] to-[#D81B60] text-white"
                                        : s < step
                                            ? "bg-green-500 text-white"
                                            : "bg-gray-200 text-gray-500"
                                    }`}
                            >
                                {s < step ? "✓" : s}
                            </button>
                            {s < 3 && (
                                <div
                                    className={`w-20 h-1 mx-2 ${s < step ? "bg-green-500" : "bg-gray-200"
                                        }`}
                                />
                            )}
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-2xl shadow-lg p-8">
                    {/* Step 1: Basic Info */}
                    {step === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                Basic Information
                            </h2>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Course Title *
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => updateFormData("title", e.target.value)}
                                    placeholder="e.g., SSC CGL Complete Course 2026"
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00CED1] outline-none"
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
                                    placeholder="Describe what students will learn..."
                                    rows={4}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00CED1] outline-none resize-none"
                                />
                            </div>

                            <button
                                onClick={() => setStep(2)}
                                disabled={!formData.title || !formData.category}
                                className="w-full py-3 bg-gradient-to-r from-[#00CED1] to-[#D81B60] text-white font-semibold rounded-xl hover:shadow-lg disabled:opacity-50"
                            >
                                Continue
                            </button>
                        </div>
                    )}

                    {/* Step 2: Pricing */}
                    {step === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Pricing</h2>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Selling Price (₹) *
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => updateFormData("price", e.target.value)}
                                        placeholder="999"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00CED1] outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Original Price (₹)
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.originalPrice}
                                        onChange={(e) =>
                                            updateFormData("originalPrice", e.target.value)
                                        }
                                        placeholder="1999"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00CED1] outline-none"
                                    />
                                </div>
                            </div>

                            {formData.price && formData.originalPrice && (
                                <div className="p-4 bg-green-50 rounded-xl">
                                    <span className="text-green-700 font-semibold">
                                        {Math.round(
                                            ((parseFloat(formData.originalPrice) -
                                                parseFloat(formData.price)) /
                                                parseFloat(formData.originalPrice)) *
                                            100
                                        )}
                                        % OFF
                                    </span>
                                    <span className="text-green-600 ml-2">
                                        Students save ₹
                                        {parseFloat(formData.originalPrice) -
                                            parseFloat(formData.price)}
                                    </span>
                                </div>
                            )}

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setStep(1)}
                                    className="flex-1 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={() => setStep(3)}
                                    disabled={!formData.price}
                                    className="flex-1 py-3 bg-gradient-to-r from-[#00CED1] to-[#D81B60] text-white font-semibold rounded-xl disabled:opacity-50"
                                >
                                    Continue
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Features & Submit */}
                    {step === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">
                                Course Features
                            </h2>

                            <div className="space-y-3">
                                {formData.features.map((feature, index) => (
                                    <div key={index} className="flex gap-2">
                                        <input
                                            type="text"
                                            value={feature}
                                            onChange={(e) => updateFeature(index, e.target.value)}
                                            placeholder={`Feature ${index + 1} (e.g., 50+ Live Classes)`}
                                            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00CED1] outline-none"
                                        />
                                    </div>
                                ))}
                                <button
                                    onClick={addFeature}
                                    className="text-[#00CED1] font-medium hover:underline"
                                >
                                    + Add Another Feature
                                </button>
                            </div>

                            {/* Preview */}
                            <div className="p-6 bg-gray-50 rounded-xl">
                                <h3 className="font-bold text-gray-900 mb-2">Preview</h3>
                                <div className="text-lg font-bold text-gray-900">
                                    {formData.title}
                                </div>
                                <div className="text-gray-500 text-sm mb-2">
                                    {formData.category}
                                </div>
                                <div className="flex items-baseline gap-2 mb-2">
                                    <span className="text-xl font-bold text-[#00CED1]">
                                        ₹{formData.price || 0}
                                    </span>
                                    {formData.originalPrice && (
                                        <span className="text-gray-400 line-through">
                                            ₹{formData.originalPrice}
                                        </span>
                                    )}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {formData.features
                                        .filter((f) => f.trim())
                                        .map((f, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 bg-white text-gray-600 rounded-full text-sm"
                                            >
                                                {f}
                                            </span>
                                        ))}
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setStep(2)}
                                    className="flex-1 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl"
                                >
                                    Back
                                </button>
                                <button
                                    onClick={() => handleSubmit("draft")}
                                    disabled={loading}
                                    className="flex-1 py-3 border-2 border-[#00CED1] text-[#00CED1] font-semibold rounded-xl hover:bg-[#00CED1]/10"
                                >
                                    {loading ? "Saving..." : "Save as Draft"}
                                </button>
                                <button
                                    onClick={() => handleSubmit("pending_review")}
                                    disabled={loading}
                                    className="flex-1 py-3 bg-gradient-to-r from-[#00CED1] to-[#D81B60] text-white font-semibold rounded-xl hover:shadow-lg"
                                >
                                    {loading ? "Submitting..." : "Submit for Review"}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
