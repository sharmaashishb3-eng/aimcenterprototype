import Link from "next/link";

export default function MockTestsPage() {
    const mockTests = [
        {
            id: 1,
            title: "SSC CGL 2026 Full Mock Test 1",
            category: "SSC",
            questions: 100,
            duration: "60 mins",
            attempts: "15.2K",
            tags: ["Free"],
            color: "from-blue-500 to-blue-600",
        },
        {
            id: 2,
            title: "IBPS PO Prelims Mock Test",
            category: "Banking",
            questions: 100,
            duration: "60 mins",
            attempts: "23.5K",
            tags: ["Premium"],
            color: "from-[#00CED1] to-[#0891B2]",
        },
        {
            id: 3,
            title: "Railway Group D Section Test",
            category: "Railway",
            questions: 75,
            duration: "45 mins",
            attempts: "8.7K",
            tags: ["Free"],
            color: "from-orange-500 to-orange-600",
        },
        {
            id: 4,
            title: "UPSC Prelims GS Paper 1",
            category: "UPSC",
            questions: 100,
            duration: "120 mins",
            attempts: "5.2K",
            tags: ["Premium"],
            color: "from-[#D81B60] to-[#AD1457]",
        },
        {
            id: 5,
            title: "SBI Clerk Mains Mock Test",
            category: "Banking",
            questions: 190,
            duration: "160 mins",
            attempts: "12.1K",
            tags: ["Premium"],
            color: "from-purple-500 to-purple-600",
        },
        {
            id: 6,
            title: "CTET Paper 1 Full Mock",
            category: "Teaching",
            questions: 150,
            duration: "150 mins",
            attempts: "9.3K",
            tags: ["Free"],
            color: "from-emerald-500 to-emerald-600",
        },
    ];

    const categories = [
        "All",
        "Banking",
        "SSC",
        "Railway",
        "UPSC",
        "Teaching",
        "Defence",
    ];

    return (
        <div className="min-h-screen pt-24 pb-12 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="text-gray-900">Practice with</span>{" "}
                        <span className="bg-gradient-to-r from-[#00CED1] to-[#D81B60] bg-clip-text text-transparent">
                            Mock Tests
                        </span>
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Prepare for your exams with full-length and sectional mock tests
                        designed by exam experts
                    </p>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {categories.map((category, index) => (
                        <button
                            key={category}
                            className={`px-5 py-2 rounded-full font-medium transition-all ${index === 0
                                    ? "bg-gradient-to-r from-[#00CED1] to-[#D81B60] text-white"
                                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Mock Tests Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockTests.map((test) => (
                        <div
                            key={test.id}
                            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden group"
                        >
                            {/* Header */}
                            <div
                                className={`bg-gradient-to-r ${test.color} p-4 text-white relative overflow-hidden`}
                            >
                                <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full" />
                                <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full" />
                                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold mb-2">
                                    {test.category}
                                </span>
                                <h3 className="font-bold text-lg relative z-10">{test.title}</h3>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                {/* Stats */}
                                <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                                    <div className="flex items-center gap-1">
                                        <span>📝</span>
                                        <span>{test.questions} Qs</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span>⏱️</span>
                                        <span>{test.duration}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <span>👥</span>
                                        <span>{test.attempts}</span>
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="flex gap-2 mb-4">
                                    {test.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className={`px-3 py-1 rounded-full text-xs font-bold ${tag === "Free"
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-[#D81B60]/10 text-[#D81B60]"
                                                }`}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <Link
                                        href={`/mock-tests/${test.id}`}
                                        className="flex-1 py-3 text-center text-white font-semibold bg-gradient-to-r from-[#00CED1] to-[#D81B60] rounded-xl hover:shadow-lg transition-all"
                                    >
                                        Start Test
                                    </Link>
                                    <button className="px-4 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                                        <svg
                                            className="w-5 h-5 text-gray-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Load More */}
                <div className="text-center mt-10">
                    <button className="px-8 py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-50 transition-all">
                        Load More Tests
                    </button>
                </div>
            </div>
        </div>
    );
}
