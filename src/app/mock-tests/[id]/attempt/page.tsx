"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

interface Question {
    id: string;
    question_text: string;
    options: { id: string; text: string }[];
}

type QuestionStatus = "not_visited" | "not_answered" | "answered" | "marked" | "answered_marked";

export default function TestAttemptPage() {
    const router = useRouter();
    // const params = useParams();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [questionStatus, setQuestionStatus] = useState<Record<string, QuestionStatus>>({});
    const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes in seconds
    const [showSubmitModal, setShowSubmitModal] = useState(false);

    // Sample questions for demo
    const questions: Question[] = useMemo(() => [
        {
            id: "1",
            question_text: "What is the capital of India?",
            options: [
                { id: "a", text: "Mumbai" },
                { id: "b", text: "New Delhi" },
                { id: "c", text: "Kolkata" },
                { id: "d", text: "Chennai" },
            ],
        },
        {
            id: "2",
            question_text: "Which river is the longest in India?",
            options: [
                { id: "a", text: "Yamuna" },
                { id: "b", text: "Brahmaputra" },
                { id: "c", text: "Ganga" },
                { id: "d", text: "Godavari" },
            ],
        },
        {
            id: "3",
            question_text: "Who wrote the Indian national anthem?",
            options: [
                { id: "a", text: "Bankim Chandra Chatterjee" },
                { id: "b", text: "Rabindranath Tagore" },
                { id: "c", text: "Sarojini Naidu" },
                { id: "d", text: "Muhammad Iqbal" },
            ],
        },
        {
            id: "4",
            question_text: "What is the currency of Japan?",
            options: [
                { id: "a", text: "Yuan" },
                { id: "b", text: "Won" },
                { id: "c", text: "Yen" },
                { id: "d", text: "Ringgit" },
            ],
        },
        {
            id: "5",
            question_text: "Which planet is known as the Red Planet?",
            options: [
                { id: "a", text: "Venus" },
                { id: "b", text: "Mars" },
                { id: "c", text: "Jupiter" },
                { id: "d", text: "Saturn" },
            ],
        },
    ], []);

    const handleSubmit = useCallback(() => {
        // Calculate score (demo)
        const correctAnswers: Record<string, string> = {
            "1": "b",
            "2": "c",
            "3": "b",
            "4": "c",
            "5": "b",
        };
        let score = 0;
        Object.entries(answers).forEach(([qId, ans]) => {
            if (correctAnswers[qId] === ans) score++;
        });

        alert(`Test submitted! Your score: ${score}/${questions.length}`);
        router.push("/dashboard");
    }, [answers, router, questions.length]);

    // Timer
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [handleSubmit]);

    // Initialize question status
    useEffect(() => {
        const initialStatus: Record<string, QuestionStatus> = {};
        questions.forEach((q, i) => {
            initialStatus[q.id] = i === 0 ? "not_answered" : "not_visited";
        });
        setQuestionStatus(initialStatus);
    }, [questions]);

    const formatTime = (seconds: number) => {
        const hrs = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hrs.toString().padStart(2, "0")}:${mins
            .toString()
            .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const handleSelectOption = (optionId: string) => {
        const questionId = questions[currentQuestion].id;
        setAnswers({ ...answers, [questionId]: optionId });
        setQuestionStatus({
            ...questionStatus,
            [questionId]: questionStatus[questionId] === "marked" ? "answered_marked" : "answered",
        });
    };

    const handleSaveAndNext = () => {
        if (currentQuestion < questions.length - 1) {
            const nextQuestionId = questions[currentQuestion + 1].id;
            if (questionStatus[nextQuestionId] === "not_visited") {
                setQuestionStatus({
                    ...questionStatus,
                    [nextQuestionId]: "not_answered",
                });
            }
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handleMarkForReview = () => {
        const questionId = questions[currentQuestion].id;
        const hasAnswer = answers[questionId];
        setQuestionStatus({
            ...questionStatus,
            [questionId]: hasAnswer ? "answered_marked" : "marked",
        });
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handleClearResponse = () => {
        const questionId = questions[currentQuestion].id;
        const newAnswers = { ...answers };
        delete newAnswers[questionId];
        setAnswers(newAnswers);
        setQuestionStatus({
            ...questionStatus,
            [questionId]: questionStatus[questionId]?.includes("marked") ? "marked" : "not_answered",
        });
    };



    const getStatusColor = (status: QuestionStatus) => {
        switch (status) {
            case "not_visited":
                return "bg-gray-200 text-gray-600";
            case "not_answered":
                return "bg-red-500 text-white";
            case "answered":
                return "bg-green-500 text-white";
            case "marked":
                return "bg-purple-500 text-white";
            case "answered_marked":
                return "bg-purple-500 text-white border-4 border-green-400";
            default:
                return "bg-gray-200";
        }
    };

    const getCounts = () => {
        const counts = {
            answered: 0,
            not_answered: 0,
            marked: 0,
            not_visited: 0,
        };
        Object.values(questionStatus).forEach((status) => {
            if (status === "answered" || status === "answered_marked") counts.answered++;
            else if (status === "not_answered") counts.not_answered++;
            else if (status === "marked") counts.marked++;
            else counts.not_visited++;
        });
        return counts;
    };

    const counts = getCounts();

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Top Bar */}
            <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-40">
                <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <h1 className="font-bold text-lg hidden sm:block">Mock Test</h1>
                        <span className="text-gray-500 text-sm">
                            Q {currentQuestion + 1} of {questions.length}
                        </span>
                    </div>
                    <div
                        className={`px-4 py-2 rounded-lg font-mono font-bold text-lg ${timeLeft < 300 ? "bg-red-100 text-red-600" : "bg-[#00CED1]/10 text-[#00CED1]"
                            }`}
                    >
                        ⏱️ {formatTime(timeLeft)}
                    </div>
                    <button
                        onClick={() => setShowSubmitModal(true)}
                        className="px-4 py-2 bg-[#D81B60] text-white font-semibold rounded-lg hover:bg-[#AD1457]"
                    >
                        Submit Test
                    </button>
                </div>
            </div>

            <div className="pt-20 pb-8 flex flex-col lg:flex-row">
                {/* Question Panel */}
                <div className="flex-1 p-4 lg:pr-80">
                    <div className="bg-white rounded-2xl shadow-md p-6 mb-4">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="px-3 py-1 bg-[#00CED1] text-white rounded-full text-sm font-bold">
                                Question {currentQuestion + 1}
                            </span>
                            <span className="text-gray-500 text-sm">Marks: +1 | -0.25</span>
                        </div>
                        <p className="text-lg text-gray-900 mb-6">
                            {questions[currentQuestion].question_text}
                        </p>

                        {/* Options */}
                        <div className="space-y-3">
                            {questions[currentQuestion].options.map((option) => (
                                <button
                                    key={option.id}
                                    onClick={() => handleSelectOption(option.id)}
                                    className={`w-full p-4 rounded-xl text-left transition-all flex items-center gap-4 ${answers[questions[currentQuestion].id] === option.id
                                        ? "bg-[#00CED1] text-white border-2 border-[#00CED1]"
                                        : "bg-gray-50 hover:bg-gray-100 border-2 border-gray-200"
                                        }`}
                                >
                                    <span
                                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold uppercase ${answers[questions[currentQuestion].id] === option.id
                                            ? "bg-white text-[#00CED1]"
                                            : "bg-gray-200 text-gray-600"
                                            }`}
                                    >
                                        {option.id}
                                    </span>
                                    <span>{option.text}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-3">
                        <button
                            onClick={handleMarkForReview}
                            className="flex-1 py-3 bg-purple-100 text-purple-700 font-semibold rounded-xl hover:bg-purple-200"
                        >
                            Mark for Review
                        </button>
                        <button
                            onClick={handleClearResponse}
                            className="flex-1 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200"
                        >
                            Clear Response
                        </button>
                        <button
                            onClick={handleSaveAndNext}
                            className="flex-1 py-3 bg-gradient-to-r from-[#00CED1] to-[#D81B60] text-white font-semibold rounded-xl hover:shadow-lg"
                        >
                            Save & Next
                        </button>
                    </div>
                </div>

                {/* Question Palette - Sidebar */}
                <div className="fixed right-0 top-20 bottom-0 w-72 bg-white shadow-lg p-4 overflow-y-auto hidden lg:block">
                    <h3 className="font-bold text-gray-900 mb-4">Question Palette</h3>

                    {/* Legend */}
                    <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-green-500 rounded"></div>
                            <span>Answered ({counts.answered})</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-red-500 rounded"></div>
                            <span>Not Answered ({counts.not_answered})</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-purple-500 rounded"></div>
                            <span>Marked ({counts.marked})</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-gray-200 rounded"></div>
                            <span>Not Visited ({counts.not_visited})</span>
                        </div>
                    </div>

                    {/* Question Grid */}
                    <div className="grid grid-cols-5 gap-2">
                        {questions.map((q, index) => (
                            <button
                                key={q.id}
                                onClick={() => {
                                    if (questionStatus[q.id] === "not_visited") {
                                        setQuestionStatus({
                                            ...questionStatus,
                                            [q.id]: "not_answered",
                                        });
                                    }
                                    setCurrentQuestion(index);
                                }}
                                className={`w-10 h-10 rounded-lg font-bold text-sm ${getStatusColor(
                                    questionStatus[q.id] || "not_visited"
                                )} ${currentQuestion === index ? "ring-2 ring-[#00CED1]" : ""}`}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Submit Modal */}
            {showSubmitModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-md">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                            Submit Test?
                        </h3>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="p-4 bg-green-50 rounded-xl text-center">
                                <div className="text-2xl font-bold text-green-600">
                                    {counts.answered}
                                </div>
                                <div className="text-green-600 text-sm">Answered</div>
                            </div>
                            <div className="p-4 bg-red-50 rounded-xl text-center">
                                <div className="text-2xl font-bold text-red-600">
                                    {counts.not_answered + counts.not_visited}
                                </div>
                                <div className="text-red-600 text-sm">Unanswered</div>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to submit the test?
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowSubmitModal(false)}
                                className="flex-1 py-3 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="flex-1 py-3 bg-[#D81B60] text-white font-semibold rounded-xl"
                            >
                                Submit Test
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
