"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Question {
    id: string;
    question_text: string;
    options: { id: string; text: string }[];
    correct_answer: string;
    explanation: string;
    marks: number;
    negative_marks: number;
}

export default function QuestionBankPage() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        question_text: "",
        options: [
            { id: "a", text: "" },
            { id: "b", text: "" },
            { id: "c", text: "" },
            { id: "d", text: "" },
        ],
        correct_answer: "",
        explanation: "",
        marks: "1",
        negative_marks: "0.25",
    });

    const resetForm = () => {
        setFormData({
            question_text: "",
            options: [
                { id: "a", text: "" },
                { id: "b", text: "" },
                { id: "c", text: "" },
                { id: "d", text: "" },
            ],
            correct_answer: "",
            explanation: "",
            marks: "1",
            negative_marks: "0.25",
        });
        setEditingQuestion(null);
    };

    const updateOption = (index: number, text: string) => {
        const newOptions = [...formData.options];
        newOptions[index].text = text;
        setFormData({ ...formData, options: newOptions });
    };

    const handleSaveQuestion = async () => {
        if (!formData.question_text || !formData.correct_answer) {
            alert("Please fill in required fields");
            return;
        }

        setLoading(true);

        try {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) return;

            const questionData = {
                question_text: formData.question_text,
                options: formData.options.filter((o) => o.text.trim() !== ""),
                correct_answer: formData.correct_answer,
                explanation: formData.explanation,
                marks: parseFloat(formData.marks) || 1,
                negative_marks: parseFloat(formData.negative_marks) || 0,
                created_by: user.id,
            };

            if (editingQuestion) {
                // Update existing question
                await supabase
                    .from("questions")
                    .update(questionData)
                    .eq("id", editingQuestion.id);
            } else {
                // Create new question (without test_series_id for now - standalone bank)
                const { data, error } = await supabase
                    .from("questions")
                    .insert({ ...questionData, test_series_id: null })
                    .select()
                    .single();

                if (data && !error) {
                    setQuestions([...questions, data as Question]);
                }
            }

            setShowAddModal(false);
            resetForm();
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen pt-24 pb-12 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Question Bank</h1>
                        <p className="text-gray-500">Create and manage your questions</p>
                    </div>
                    <button
                        onClick={() => {
                            resetForm();
                            setShowAddModal(true);
                        }}
                        className="px-6 py-3 bg-gradient-to-r from-[#00CED1] to-[#D81B60] text-white font-semibold rounded-xl hover:shadow-lg"
                    >
                        + Add Question
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: "Total Questions", value: questions.length, icon: "📝" },
                        { label: "MCQ", value: questions.length, icon: "✓" },
                        { label: "This Week", value: 0, icon: "📅" },
                        { label: "In Tests", value: 0, icon: "📋" },
                    ].map((stat) => (
                        <div key={stat.label} className="bg-white rounded-2xl p-4 shadow-md text-center">
                            <div className="text-2xl mb-2">{stat.icon}</div>
                            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                            <div className="text-gray-500 text-sm">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Questions List */}
                {questions.length === 0 ? (
                    <div className="bg-white rounded-2xl p-12 text-center shadow-md">
                        <div className="text-6xl mb-4">📝</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            No questions yet
                        </h3>
                        <p className="text-gray-500 mb-6">
                            Start building your question bank
                        </p>
                        <button
                            onClick={() => setShowAddModal(true)}
                            className="px-6 py-3 bg-gradient-to-r from-[#00CED1] to-[#D81B60] text-white font-semibold rounded-xl"
                        >
                            Add Your First Question
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {questions.map((question, index) => (
                            <div key={question.id} className="bg-white rounded-2xl p-6 shadow-md">
                                <div className="flex justify-between items-start mb-4">
                                    <span className="px-3 py-1 bg-[#00CED1]/10 text-[#00CED1] rounded-full text-sm font-bold">
                                        Q{index + 1}
                                    </span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => {
                                                setEditingQuestion(question);
                                                setFormData({
                                                    question_text: question.question_text,
                                                    options: question.options,
                                                    correct_answer: question.correct_answer,
                                                    explanation: question.explanation,
                                                    marks: String(question.marks),
                                                    negative_marks: String(question.negative_marks),
                                                });
                                                setShowAddModal(true);
                                            }}
                                            className="text-[#00CED1] hover:underline"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                </div>
                                <p className="text-gray-900 font-medium mb-4">
                                    {question.question_text}
                                </p>
                                <div className="grid grid-cols-2 gap-2">
                                    {question.options.map((opt) => (
                                        <div
                                            key={opt.id}
                                            className={`p-3 rounded-lg text-sm ${opt.id === question.correct_answer
                                                ? "bg-green-100 text-green-700 border-2 border-green-300"
                                                : "bg-gray-50 text-gray-600"
                                                }`}
                                        >
                                            <span className="font-bold uppercase">{opt.id}.</span> {opt.text}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Add/Edit Question Modal */}
                {showAddModal && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">
                                {editingQuestion ? "Edit Question" : "Add New Question"}
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Question *
                                    </label>
                                    <textarea
                                        value={formData.question_text}
                                        onChange={(e) =>
                                            setFormData({ ...formData, question_text: e.target.value })
                                        }
                                        placeholder="Enter your question..."
                                        rows={3}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00CED1] outline-none resize-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Options
                                    </label>
                                    {formData.options.map((opt, index) => (
                                        <div key={opt.id} className="flex items-center gap-2 mb-2">
                                            <span className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center font-bold text-gray-600 uppercase">
                                                {opt.id}
                                            </span>
                                            <input
                                                type="text"
                                                value={opt.text}
                                                onChange={(e) => updateOption(index, e.target.value)}
                                                placeholder={`Option ${opt.id.toUpperCase()}`}
                                                className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#00CED1] outline-none"
                                            />
                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setFormData({ ...formData, correct_answer: opt.id })
                                                }
                                                className={`px-3 py-2 rounded-xl font-medium ${formData.correct_answer === opt.id
                                                    ? "bg-green-500 text-white"
                                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                                    }`}
                                            >
                                                ✓
                                            </button>
                                        </div>
                                    ))}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Explanation (optional)
                                    </label>
                                    <textarea
                                        value={formData.explanation}
                                        onChange={(e) =>
                                            setFormData({ ...formData, explanation: e.target.value })
                                        }
                                        placeholder="Explain the correct answer..."
                                        rows={2}
                                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[#00CED1] outline-none resize-none"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Marks
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.marks}
                                            onChange={(e) =>
                                                setFormData({ ...formData, marks: e.target.value })
                                            }
                                            className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#00CED1] outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Negative Marks
                                        </label>
                                        <input
                                            type="number"
                                            step="0.01"
                                            value={formData.negative_marks}
                                            onChange={(e) =>
                                                setFormData({ ...formData, negative_marks: e.target.value })
                                            }
                                            className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-[#00CED1] outline-none"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={() => {
                                        setShowAddModal(false);
                                        resetForm();
                                    }}
                                    className="flex-1 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSaveQuestion}
                                    disabled={loading}
                                    className="flex-1 py-3 bg-gradient-to-r from-[#00CED1] to-[#D81B60] text-white font-semibold rounded-xl hover:shadow-lg disabled:opacity-50"
                                >
                                    {loading ? "Saving..." : "Save Question"}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
