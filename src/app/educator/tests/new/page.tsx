"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function CreateTestSeriesPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(1);
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

    const nextStep = () => {
        if (step === 1 && (!formData.title || !formData.category)) {
            alert("Please fill in required fields");
            return;
        }
        if (step === 2 && (!formData.duration || !formData.totalQuestions)) {
            alert("Please fill in required fields");
            return;
        }
        setStep(step + 1);
    };

    const prevStep = () => setStep(step - 1);

    const handleSubmit = async () => {
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
        <div className="min-h-screen pt-24 pb-12 bg-gradient-to-br from-[#f8fafc] via-[#00CED1]/5 to-[#D81B60]/5">
            {/* Background Orbs */}
            <div className="fixed top-20 left-10 w-96 h-96 bg-[#00CED1]/10 rounded-full blur-[100px] pointer-events-none" />
            <div className="fixed bottom-10 right-10 w-96 h-96 bg-[#D81B60]/10 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-12">
                        <div>
                            <h1 className="text-4xl font-black tracking-tight text-gray-900 mb-2">
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00CED1] to-[#D81B60]">
                                    New Test Series
                                </span>
                            </h1>
                            <p className="text-gray-500 font-medium">Create a premium testing experience for your students</p>
                        </div>
                        <div className="hidden md:flex items-center gap-4 px-6 py-3 bg-white/50 backdrop-blur-md rounded-2xl border border-white/20 shadow-sm">
                            <span className="text-2xl">📝</span>
                            <span className="font-bold text-gray-700">Wizard Mode</span>
                        </div>
                    </div>

                    {/* Progress Tracker */}
                    <div className="mb-12 relative flex justify-between">
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0 rounded-full" />
                        <div
                            className="absolute top-1/2 left-0 h-1 bg-gradient-to-r from-[#00CED1] to-[#D81B60] -translate-y-1/2 z-0 rounded-full transition-all duration-700 ease-in-out"
                            style={{ width: `${((step - 1) / 2) * 100}%` }}
                        />

                        {[1, 2, 3].map((s) => (
                            <div key={s} className="relative z-10 flex flex-col items-center gap-3">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-xl transition-all duration-500 shadow-xl ${s < step ? "bg-green-500 text-white scale-90" :
                                        s === step ? "bg-gradient-to-r from-[#00CED1] to-[#D81B60] text-white scale-110 ring-4 ring-white" :
                                            "bg-white text-gray-300 border-2 border-gray-100"
                                    }`}>
                                    {s < step ? "✓" : s}
                                </div>
                                <span className={`text-xs font-bold uppercase tracking-widest ${s === step ? "text-[#00CED1]" : "text-gray-400"}`}>
                                    {s === 1 ? "Basic Info" : s === 2 ? "Configure" : "Publish"}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Wizard Card */}
                    <div className="bg-white/70 backdrop-blur-xl rounded-[40px] shadow-[0_20px_100px_-20px_rgba(0,0,0,0.1)] border border-white p-10 md:p-16 animate-fadeIn">

                        {/* Step 1: Basic Info */}
                        {step === 1 && (
                            <div className="space-y-8 animate-slideUp">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                        <span className="p-3 bg-[#00CED1]/10 rounded-2xl text-[#00CED1]">01</span>
                                        Core Details
                                    </h2>
                                    <div className="grid gap-8">
                                        <div className="space-y-2">
                                            <label className="text-sm font-black text-gray-400 uppercase tracking-widest">Test Title</label>
                                            <input
                                                type="text"
                                                value={formData.title}
                                                onChange={(e) => updateFormData("title", e.target.value)}
                                                placeholder="e.g., SSC CGL Full Mock Test 2026"
                                                className="w-full px-6 py-5 bg-white border-2 border-gray-100 rounded-3xl focus:border-[#00CED1] focus:ring-4 focus:ring-[#00CED1]/10 outline-none transition-all text-lg font-bold"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-black text-gray-400 uppercase tracking-widest">Category</label>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                                {categories.map((cat) => (
                                                    <button
                                                        key={cat}
                                                        type="button"
                                                        onClick={() => updateFormData("category", cat.toLowerCase())}
                                                        className={`px-4 py-4 rounded-2xl text-sm font-bold border-2 transition-all ${formData.category === cat.toLowerCase()
                                                                ? "bg-[#00CED1] border-[#00CED1] text-white shadow-lg scale-95"
                                                                : "bg-white border-gray-100 text-gray-600 hover:border-[#00CED1]/30"
                                                            }`}
                                                    >
                                                        {cat}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-black text-gray-400 uppercase tracking-widest">Description</label>
                                            <textarea
                                                value={formData.description}
                                                onChange={(e) => updateFormData("description", e.target.value)}
                                                placeholder="Write a compelling description for your students..."
                                                rows={4}
                                                className="w-full px-6 py-5 bg-white border-2 border-gray-100 rounded-3xl focus:border-[#00CED1] focus:ring-4 focus:ring-[#00CED1]/10 outline-none transition-all font-medium resize-none"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Configuration */}
                        {step === 2 && (
                            <div className="space-y-8 animate-slideUp">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                        <span className="p-3 bg-[#D81B60]/10 rounded-2xl text-[#D81B60]">02</span>
                                        Test Structure
                                    </h2>
                                    <div className="grid md:grid-cols-2 gap-10">
                                        <div className="space-y-4 p-8 bg-gradient-to-br from-[#00CED1]/5 to-transparent rounded-[32px] border border-[#00CED1]/10">
                                            <div className="text-4xl mb-4">⏱️</div>
                                            <label className="text-sm font-black text-gray-400 uppercase tracking-widest block">Duration (Mins)</label>
                                            <input
                                                type="number"
                                                value={formData.duration}
                                                onChange={(e) => updateFormData("duration", e.target.value)}
                                                placeholder="e.g., 60"
                                                className="w-full px-6 py-5 bg-white border-2 border-gray-100 rounded-3xl focus:border-[#00CED1] outline-none transition-all text-2xl font-black text-[#00CED1]"
                                            />
                                            <p className="text-gray-400 text-xs font-bold">Standard exam time for this category</p>
                                        </div>
                                        <div className="space-y-4 p-8 bg-gradient-to-br from-[#D81B60]/5 to-transparent rounded-[32px] border border-[#D81B60]/10">
                                            <div className="text-4xl mb-4">❓</div>
                                            <label className="text-sm font-black text-gray-400 uppercase tracking-widest block">Total Questions</label>
                                            <input
                                                type="number"
                                                value={formData.totalQuestions}
                                                onChange={(e) => updateFormData("totalQuestions", e.target.value)}
                                                placeholder="e.g., 100"
                                                className="w-full px-6 py-5 bg-white border-2 border-gray-100 rounded-3xl focus:border-[#D81B60] outline-none transition-all text-2xl font-black text-[#D81B60]"
                                            />
                                            <p className="text-gray-400 text-xs font-bold">You can add questions in the next phase</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 3: Pricing & Review */}
                        {step === 3 && (
                            <div className="space-y-12 animate-slideUp">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                                        <span className="p-3 bg-indigo-100 rounded-2xl text-indigo-600">03</span>
                                        Pricing & Review
                                    </h2>

                                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                                        <button
                                            type="button"
                                            onClick={() => updateFormData("isFree", true)}
                                            className={`p-8 rounded-[32px] border-4 transition-all flex flex-col items-center gap-4 ${formData.isFree
                                                    ? "border-[#00CED1] bg-[#00CED1]/5 scale-105 shadow-xl"
                                                    : "border-gray-50 bg-gray-50/50 grayscale opacity-60 hover:opacity-100 hover:grayscale-0"
                                                }`}
                                        >
                                            <span className="text-5xl">🎁</span>
                                            <span className="text-xl font-black text-gray-900">Free Access</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => updateFormData("isFree", false)}
                                            className={`p-8 rounded-[32px] border-4 transition-all flex flex-col items-center gap-4 ${!formData.isFree
                                                    ? "border-[#D81B60] bg-[#D81B60]/5 scale-105 shadow-xl"
                                                    : "border-gray-50 bg-gray-50/50 grayscale opacity-60 hover:opacity-100 hover:grayscale-0"
                                                }`}
                                        >
                                            <span className="text-5xl">💰</span>
                                            <span className="text-xl font-black text-gray-900">Paid Tier</span>
                                        </button>
                                        <div className={`p-8 rounded-[32px] border-4 transition-all flex flex-col justify-center ${!formData.isFree ? "border-indigo-100 bg-white" : "border-transparent opacity-0 pointer-events-none"
                                            }`}>
                                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Set Price (INR)</label>
                                            <div className="flex items-center gap-3">
                                                <span className="text-3xl font-black text-gray-400">₹</span>
                                                <input
                                                    type="number"
                                                    value={formData.price}
                                                    onChange={(e) => updateFormData("price", e.target.value)}
                                                    placeholder="199"
                                                    className="w-full bg-transparent text-4xl font-black text-indigo-600 outline-none"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Final Summary */}
                                    <div className="p-10 bg-gray-900 rounded-[40px] text-white shadow-2xl relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#00CED1]/20 to-transparent rounded-full blur-3xl -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-1000" />
                                        <div className="relative z-10 grid md:grid-cols-2 gap-8">
                                            <div>
                                                <p className="text-[#00CED1] text-xs font-black uppercase tracking-widest mb-4">Review Summary</p>
                                                <h3 className="text-3xl font-bold mb-4">{formData.title || "Untitled Test"}</h3>
                                                <div className="flex flex-wrap gap-3">
                                                    <span className="px-4 py-2 bg-white/10 rounded-full text-xs font-bold border border-white/10">{formData.category.toUpperCase()}</span>
                                                    <span className="px-4 py-2 bg-white/10 rounded-full text-xs font-bold border border-white/10">{formData.duration} MINS</span>
                                                    <span className="px-4 py-2 bg-white/10 rounded-full text-xs font-bold border border-white/10">{formData.totalQuestions} Qs</span>
                                                </div>
                                            </div>
                                            <div className="flex flex-col justify-center md:items-end p-6 bg-white/5 rounded-3xl border border-white/10">
                                                <p className="text-gray-400 text-xs font-bold mb-1">FINAL PRICE</p>
                                                <p className="text-5xl font-black">{formData.isFree ? "FREE" : `₹${formData.price || 0}`}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Navigation Actions */}
                        <div className="flex gap-6 mt-16">
                            {step > 1 && (
                                <button
                                    type="button"
                                    onClick={prevStep}
                                    className="px-10 py-5 border-2 border-gray-100 text-gray-700 font-bold rounded-3xl hover:bg-gray-50 transition-all flex items-center gap-3 group"
                                >
                                    <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                                    </svg>
                                    Previous
                                </button>
                            )}
                            <button
                                type="button"
                                onClick={step === 3 ? handleSubmit : nextStep}
                                disabled={loading}
                                className="flex-1 py-5 bg-gradient-to-r from-[#00CED1] via-[#D81B60] to-[#00CED1] bg-[length:200%_auto] animate-gradient-x text-white font-black text-xl rounded-3xl shadow-[0_20px_50px_-15px_rgba(216,27,96,0.3)] hover:shadow-[0_20px_50px_-10px_rgba(216,27,96,0.5)] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-4"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-3">
                                        <svg className="animate-spin h-6 w-6 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Deploying...
                                    </span>
                                ) : (
                                    <>
                                        {step === 3 ? "Launch Test Series" : "Next Milestone"}
                                        <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Footer Hint */}
                    <p className="text-center text-gray-400 text-sm font-bold mt-12 tracking-widest uppercase">
                        Step {step} of 3 • Powered by AIM Engine
                    </p>
                </div>
            </div>
        </div>
    );
}
