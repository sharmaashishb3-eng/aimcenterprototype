"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function RegisterPage() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Form data
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        examPreference: "",
    });

    const examOptions = [
        { id: "banking", name: "Banking Exams", icon: "🏦" },
        { id: "ssc", name: "SSC Exams", icon: "📋" },
        { id: "railway", name: "Railway Exams", icon: "🚂" },
        { id: "upsc", name: "UPSC", icon: "🏛️" },
        { id: "teaching", name: "Teaching", icon: "👨‍🏫" },
        { id: "defence", name: "Defence", icon: "🎖️" },
        { id: "state-pcs", name: "State PCS", icon: "🏢" },
        { id: "engineering", name: "Engineering", icon: "⚙️" },
    ];

    const updateFormData = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
        if (step === 1) {
            if (!formData.name || !formData.email) {
                setError("Please fill in all fields");
                return;
            }
        }
        setError("");
        setStep(step + 1);
    };

    const handleBack = () => {
        setError("");
        setStep(step - 1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const supabase = createClient();
            const { error } = await supabase.auth.signUp({
                email: formData.email,
                password: formData.password,
                options: {
                    data: {
                        full_name: formData.name,
                        phone: formData.phone,
                        exam_preference: formData.examPreference,
                    },
                },
            });

            if (error) {
                console.error("Signup error:", error);
                // If the error message is generic, provide more context
                if (error.message.includes("Database error")) {
                    setError("There was a database issue saving your profile. This usually happens if the email is already in use or the system is experiencing high load.");
                } else {
                    setError(error.message);
                }
            } else {
                router.push("/auth/verify-email");
            }
        } catch {
            setError("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-20 pb-12 flex items-center justify-center bg-gradient-to-br from-white via-[#00CED1]/5 to-[#D81B60]/5">
            {/* Background Decorations */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-[#00CED1]/10 rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#D81B60]/10 rounded-full blur-3xl" />

            <div className="relative z-10 w-full max-w-lg px-4">
                <div className="bg-white rounded-3xl shadow-2xl p-8">
                    {/* Logo */}
                    <div className="text-center mb-6">
                        <Link href="/" className="inline-flex items-center gap-2 mb-4">
                            <Image
                                src="/logo.jpg"
                                alt="AIM Center"
                                width={50}
                                height={50}
                                className="rounded-lg"
                            />
                            <span className="text-2xl font-bold">
                                <span className="text-[#00CED1]">AIM</span>
                                <span className="text-[#D81B60]">Center</span>
                            </span>
                        </Link>
                        <h1 className="text-2xl font-bold text-gray-900 mb-2">
                            Create Your Account
                        </h1>
                        <p className="text-gray-600">Start your learning journey today</p>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex items-center justify-center gap-2 mb-8">
                        {[1, 2, 3].map((s) => (
                            <div key={s} className="flex items-center">
                                <div
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${s === step
                                        ? "bg-gradient-to-r from-[#00CED1] to-[#D81B60] text-white"
                                        : s < step
                                            ? "bg-green-500 text-white"
                                            : "bg-gray-200 text-gray-500"
                                        }`}
                                >
                                    {s < step ? "✓" : s}
                                </div>
                                {s < 3 && (
                                    <div
                                        className={`w-12 h-1 mx-1 transition-all ${s < step ? "bg-green-500" : "bg-gray-200"
                                            }`}
                                    />
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg animate-shake">
                            <div className="flex items-center gap-3">
                                <span className="text-xl">⚠️</span>
                                <div>
                                    <p className="font-bold text-red-800 text-sm">Action Required</p>
                                    <p className="text-red-600 text-xs mt-0.5 leading-relaxed">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        {/* Step 1: Personal Info */}
                        {step === 1 && (
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => updateFormData("name", e.target.value)}
                                        placeholder="Enter your full name"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00CED1] focus:ring-2 focus:ring-[#00CED1]/20 outline-none transition-all"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => updateFormData("email", e.target.value)}
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00CED1] focus:ring-2 focus:ring-[#00CED1]/20 outline-none transition-all"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Mobile Number
                                    </label>
                                    <div className="flex gap-2">
                                        <div className="px-4 py-3 bg-gray-100 border-2 border-gray-200 rounded-xl text-gray-600">
                                            +91
                                        </div>
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) =>
                                                updateFormData(
                                                    "phone",
                                                    e.target.value.replace(/\D/g, "").slice(0, 10)
                                                )
                                            }
                                            placeholder="Enter 10 digit number"
                                            className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00CED1] focus:ring-2 focus:ring-[#00CED1]/20 outline-none transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Step 2: Exam Preference */}
                        {step === 2 && (
                            <div className="space-y-4">
                                <p className="text-gray-600 text-center mb-4">
                                    Select your target exam category
                                </p>
                                <div className="grid grid-cols-2 gap-3">
                                    {examOptions.map((exam) => (
                                        <button
                                            key={exam.id}
                                            type="button"
                                            onClick={() => updateFormData("examPreference", exam.id)}
                                            className={`p-4 rounded-xl border-2 text-left transition-all ${formData.examPreference === exam.id
                                                ? "border-[#00CED1] bg-[#00CED1]/10"
                                                : "border-gray-200 hover:border-gray-300"
                                                }`}
                                        >
                                            <span className="text-2xl mb-2 block">{exam.icon}</span>
                                            <span className="font-medium text-gray-700 text-sm">
                                                {exam.name}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Step 3: Password */}
                        {step === 3 && (
                            <div className="space-y-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => updateFormData("password", e.target.value)}
                                        placeholder="Create a strong password"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00CED1] focus:ring-2 focus:ring-[#00CED1]/20 outline-none transition-all"
                                        required
                                        minLength={8}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={(e) =>
                                            updateFormData("confirmPassword", e.target.value)
                                        }
                                        placeholder="Confirm your password"
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00CED1] focus:ring-2 focus:ring-[#00CED1]/20 outline-none transition-all"
                                        required
                                    />
                                </div>
                                <label className="flex items-start gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        required
                                        className="w-4 h-4 mt-1 rounded border-gray-300 text-[#00CED1] focus:ring-[#00CED1]"
                                    />
                                    <span className="text-sm text-gray-600">
                                        I agree to the{" "}
                                        <Link href="/terms" className="text-[#00CED1] hover:underline">
                                            Terms & Conditions
                                        </Link>{" "}
                                        and{" "}
                                        <Link href="/privacy" className="text-[#00CED1] hover:underline">
                                            Privacy Policy
                                        </Link>
                                    </span>
                                </label>
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="flex gap-4 mt-8">
                            {step > 1 && (
                                <button
                                    type="button"
                                    onClick={handleBack}
                                    className="flex-1 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all"
                                >
                                    Back
                                </button>
                            )}
                            {step < 3 ? (
                                <button
                                    type="button"
                                    onClick={handleNext}
                                    className="flex-1 py-3 bg-gradient-to-r from-[#00CED1] to-[#D81B60] text-white font-semibold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all"
                                >
                                    Continue
                                </button>
                            ) : (
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="flex-1 py-3 bg-gradient-to-r from-[#00CED1] to-[#D81B60] text-white font-semibold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50"
                                >
                                    {loading ? "Creating Account..." : "Create Account"}
                                </button>
                            )}
                        </div>
                    </form>

                    {/* Sign In Link */}
                    <p className="text-center text-gray-600 mt-8">
                        Already have an account?{" "}
                        <Link
                            href="/auth/login"
                            className="text-[#00CED1] font-semibold hover:underline"
                        >
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
