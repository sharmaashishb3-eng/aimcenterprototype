"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Profile, UserRole } from "@/types/database";

export default function UserManagementPage() {
    const router = useRouter();
    const [users, setUsers] = useState<Profile[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");
    const [editingUser, setEditingUser] = useState<Profile | null>(null);
    const [newRole, setNewRole] = useState<UserRole>("student");

    useEffect(() => {
        const fetchUsers = async () => {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                router.push("/auth/login");
                return;
            }

            // Check if admin
            const { data: profile } = await supabase
                .from("profiles")
                .select("*")
                .eq("id", user.id)
                .single();

            if (!profile || profile.role !== "admin") {
                router.push("/dashboard");
                return;
            }

            // Fetch all users
            const { data: usersData } = await supabase
                .from("profiles")
                .select("*")
                .order("created_at", { ascending: false });

            setUsers(usersData || []);
            setLoading(false);
        };

        fetchUsers();
    }, [router]);

    const handleRoleChange = async () => {
        if (!editingUser) return;

        const supabase = createClient();
        const { error } = await supabase
            .from("profiles")
            .update({ role: newRole })
            .eq("id", editingUser.id);

        if (!error) {
            setUsers(users.map(u =>
                u.id === editingUser.id ? { ...u, role: newRole } : u
            ));
            setEditingUser(null);
        }
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch =
            user.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === "all" || user.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const roleColors = {
        student: "bg-blue-100 text-blue-600",
        teacher: "bg-purple-100 text-purple-600",
        admin: "bg-red-100 text-red-600",
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
                        <h1 className="text-3xl font-bold text-gray-900">User Management</h1>
                        <p className="text-gray-500">Manage user roles and permissions</p>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                        <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full">
                            👥 {users.filter(u => u.role === "student").length} Students
                        </span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full">
                            👨‍🏫 {users.filter(u => u.role === "teacher").length} Teachers
                        </span>
                        <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full">
                            🛡️ {users.filter(u => u.role === "admin").length} Admins
                        </span>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-2xl p-6 shadow-md mb-6">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <input
                                type="text"
                                placeholder="Search by name or email..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00CED1] focus:ring-2 focus:ring-[#00CED1]/20 outline-none"
                            />
                        </div>
                        <div className="flex gap-2">
                            {["all", "student", "teacher", "admin"].map((role) => (
                                <button
                                    key={role}
                                    onClick={() => setRoleFilter(role as UserRole | "all")}
                                    className={`px-4 py-3 rounded-xl font-medium transition-all ${roleFilter === role
                                            ? "bg-gradient-to-r from-[#00CED1] to-[#D81B60] text-white"
                                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                        }`}
                                >
                                    {role === "all" ? "All Users" : role.charAt(0).toUpperCase() + role.slice(1) + "s"}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Users Table */}
                <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">User</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">Email</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">Phone</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">Role</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">Joined</th>
                                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-600">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-r from-[#00CED1] to-[#D81B60] rounded-full flex items-center justify-center text-white font-bold">
                                                    {user.full_name?.charAt(0) || "U"}
                                                </div>
                                                <span className="font-medium text-gray-900">{user.full_name || "Unknown"}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600">{user.email}</td>
                                        <td className="px-6 py-4 text-gray-600">{user.phone || "-"}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize ${roleColors[user.role]}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 text-sm">
                                            {new Date(user.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => {
                                                    setEditingUser(user);
                                                    setNewRole(user.role);
                                                }}
                                                className="px-4 py-2 text-[#00CED1] hover:bg-[#00CED1]/10 rounded-lg font-medium transition-colors"
                                            >
                                                Change Role
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Edit Role Modal */}
                {editingUser && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Change User Role</h3>
                            <div className="mb-6">
                                <p className="text-gray-600 mb-4">
                                    Changing role for <strong>{editingUser.full_name}</strong>
                                </p>
                                <select
                                    value={newRole}
                                    onChange={(e) => setNewRole(e.target.value as UserRole)}
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00CED1] outline-none"
                                >
                                    <option value="student">Student</option>
                                    <option value="teacher">Teacher</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setEditingUser(null)}
                                    className="flex-1 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleRoleChange}
                                    className="flex-1 py-3 bg-gradient-to-r from-[#00CED1] to-[#D81B60] text-white font-semibold rounded-xl hover:shadow-lg"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
