"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Profile } from "@/types/database";

export default function ProfilePage() {
    const router = useRouter();
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        full_name: "",
        phone: "",
        exam_preference: "",
    });

    useEffect(() => {
        const fetchProfile = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push("/auth/login");
                return;
            }

            const { data } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", user.id)
                .single();

            if (data) {
                setProfile(data);
                setFormData({
                    full_name: data.full_name || "",
                    phone: data.phone || "",
                    exam_preference: data.exam_preference || "",
                });
            }
            setLoading(false);
        };

        fetchProfile();
    }, [router]);

    const handleSave = async () => {
        if (!profile) return;

        setSaving(true);
        const supabase = createClient();

        const { error } = await supabase
            .from("profiles")
            .update({
                full_name: formData.full_name,
                phone: formData.phone,
                exam_preference: formData.exam_preference,
                updated_at: new Date().toISOString(),
            })
            .eq("id", profile.id);

        if (error) {
            alert("Error updating profile: " + error.message);
        } else {
            alert("Profile updated successfully!");
        }
        setSaving(false);
    };

    const handleSignOut = async () => {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push("/");
        router.refresh();
    };

    const examOptions = [
        { id: "banking", name: "Banking Exams" },
        { id: "ssc", name: "SSC Exams" },
        { id: "railway", name: "Railway Exams" },
        { id: "upsc", name: "UPSC" },
        { id: "teaching", name: "Teaching" },
        { id: "defence", name: "Defence" },
        { id: "state-pcs", name: "State PCS" },
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
            <div className="container mx-auto px-4 max-w-2xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="w-24 h-24 bg-gradient-to-r from-[#00CED1] to-[#D81B60] rounded-full flex items-center justify-center text-4xl text-white mx-auto mb-4">
                        {formData.full_name?.charAt(0) || "U"}
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
                    <p className="text-gray-500">{profile?.email}</p>
                    <span className="inline-block mt-2 px-3 py-1 bg-[#00CED1]/10 text-[#00CED1] rounded-full text-sm font-medium capitalize">
                        {profile?.role || "student"}
                    </span>
                </div>

                {/* Form */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                        Personal Information
                    </h2>

                    <div className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={formData.full_name}
                                onChange={(e) =>
                                    setFormData({ ...formData, full_name: e.target.value })
                                }
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00CED1] outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={profile?.email || ""}
                                disabled
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50 text-gray-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) =>
                                    setFormData({ ...formData, phone: e.target.value })
                                }
                                placeholder="Enter 10 digit number"
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00CED1] outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Target Exam
                            </label>
                            <select
                                value={formData.exam_preference}
                                onChange={(e) =>
                                    setFormData({ ...formData, exam_preference: e.target.value })
                                }
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00CED1] outline-none"
                            >
                                <option value="">Select your target exam</option>
                                {examOptions.map((exam) => (
                                    <option key={exam.id} value={exam.id}>
                                        {exam.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="w-full mt-6 py-3 bg-gradient-to-r from-[#00CED1] to-[#D81B60] text-white font-semibold rounded-xl hover:shadow-lg disabled:opacity-50"
                    >
                        {saving ? "Saving..." : "Save Changes"}
                    </button>
                </div>

                {/* Account Stats */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                        Account Statistics
                    </h2>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 bg-gray-50 rounded-xl">
                            <div className="text-2xl font-bold text-[#00CED1]">0</div>
                            <div className="text-gray-500 text-sm">Courses</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-xl">
                            <div className="text-2xl font-bold text-[#00CED1]">0</div>
                            <div className="text-gray-500 text-sm">Tests Taken</div>
                        </div>
                        <div className="text-center p-4 bg-gray-50 rounded-xl">
                            <div className="text-2xl font-bold text-[#00CED1]">0</div>
                            <div className="text-gray-500 text-sm">Certificates</div>
                        </div>
                    </div>
                </div>

                {/* Sign Out */}
                <button
                    onClick={handleSignOut}
                    className="w-full py-3 border-2 border-red-200 text-red-600 font-semibold rounded-xl hover:bg-red-50"
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
}
