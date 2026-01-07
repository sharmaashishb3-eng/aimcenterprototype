"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function TestInstructionsPage() {
    const params = useParams();
    const testId = params.id;

    const testDetails = {
        title: "SSC CGL 2026 Full Mock Test",
        totalQuestions: 100,
        duration: "60 minutes",
        totalMarks: 200,
        positiveMarks: 2,
        negativeMarks: 0.5,
        sections: [
            { name: "General Intelligence & Reasoning", questions: 25 },
            { name: "General Awareness", questions: 25 },
            { name: "Quantitative Aptitude", questions: 25 },
            { name: "English Comprehension", questions: 25 },
        ],
    };

    const instructions = [
        "The test contains " + testDetails.totalQuestions + " questions.",
        "Total time allotted is " + testDetails.duration + ".",
        "Each correct answer carries +" + testDetails.positiveMarks + " marks.",
        "Each wrong answer carries -" + testDetails.negativeMarks + " marks.",
        "Questions not attempted will not be marked.",
        "You can navigate between questions using the question palette.",
        "You can mark questions for review and revisit them later.",
        "Once the time is over, the test will be auto-submitted.",
        "Do not refresh the page during the test.",
        "Ensure stable internet connectivity before starting.",
    ];

    return (
        <div className="min-h-screen pt-24 pb-12 bg-gray-50">
            <div className="container mx-auto px-4 max-w-3xl">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#00CED1] to-[#D81B60] rounded-2xl p-6 text-white mb-6">
                    <h1 className="text-2xl font-bold mb-2">{testDetails.title}</h1>
                    <div className="flex flex-wrap gap-4 text-sm">
                        <span>📝 {testDetails.totalQuestions} Questions</span>
                        <span>⏱️ {testDetails.duration}</span>
                        <span>🏆 {testDetails.totalMarks} Marks</span>
                    </div>
                </div>

                {/* Test Details Card */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Test Details</h2>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="p-4 bg-gray-50 rounded-xl text-center">
                            <div className="text-2xl font-bold text-[#00CED1]">
                                {testDetails.totalQuestions}
                            </div>
                            <div className="text-gray-500 text-sm">Questions</div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl text-center">
                            <div className="text-2xl font-bold text-[#00CED1]">
                                {testDetails.duration.split(" ")[0]}
                            </div>
                            <div className="text-gray-500 text-sm">Minutes</div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl text-center">
                            <div className="text-2xl font-bold text-green-600">
                                +{testDetails.positiveMarks}
                            </div>
                            <div className="text-gray-500 text-sm">Correct</div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-xl text-center">
                            <div className="text-2xl font-bold text-red-600">
                                -{testDetails.negativeMarks}
                            </div>
                            <div className="text-gray-500 text-sm">Wrong</div>
                        </div>
                    </div>

                    {/* Sections */}
                    <h3 className="font-bold text-gray-900 mb-3">Sections</h3>
                    <div className="space-y-2 mb-6">
                        {testDetails.sections.map((section, index) => (
                            <div
                                key={index}
                                className="flex justify-between items-center p-3 bg-gray-50 rounded-xl"
                            >
                                <span className="text-gray-700">{section.name}</span>
                                <span className="font-bold text-[#00CED1]">
                                    {section.questions} Qs
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Instructions Card */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                        📋 Instructions
                    </h2>
                    <ul className="space-y-3">
                        {instructions.map((instruction, index) => (
                            <li key={index} className="flex items-start gap-3">
                                <span className="w-6 h-6 bg-[#00CED1]/10 text-[#00CED1] rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                                    {index + 1}
                                </span>
                                <span className="text-gray-700">{instruction}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Question Palette Legend */}
                <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">
                        Question Palette Guide
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 font-bold">
                                1
                            </div>
                            <span className="text-gray-600">Not Visited</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold">
                                2
                            </div>
                            <span className="text-gray-600">Not Answered</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold">
                                3
                            </div>
                            <span className="text-gray-600">Answered</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold">
                                4
                            </div>
                            <span className="text-gray-600">Marked for Review</span>
                        </div>
                    </div>
                </div>

                {/* Terms Checkbox */}
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-4 mb-6">
                    <label className="flex items-start gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            className="w-5 h-5 mt-0.5 text-[#00CED1] rounded"
                            defaultChecked
                        />
                        <span className="text-gray-700">
                            I have read and understood all the instructions. I agree to follow
                            all the rules and regulations of the test.
                        </span>
                    </label>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <Link
                        href="/mock-tests"
                        className="flex-1 py-4 text-center border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50"
                    >
                        Go Back
                    </Link>
                    <Link
                        href={`/mock-tests/${testId}/attempt`}
                        className="flex-1 py-4 text-center bg-gradient-to-r from-[#00CED1] to-[#D81B60] text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                    >
                        Start Test →
                    </Link>
                </div>
            </div>
        </div>
    );
}
