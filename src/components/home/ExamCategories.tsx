import Link from "next/link";

const ExamCategories = () => {
    const categories = [
        { name: "Banking", icon: "🏦", href: "/exams/banking", color: "#0066CC" },
        { name: "SSC", icon: "📋", href: "/exams/ssc", color: "#E74C3C" },
        { name: "Railway", icon: "🚂", href: "/exams/railway", color: "#F39C12" },
        { name: "Teaching", icon: "👨‍🏫", href: "/exams/teaching", color: "#9B59B6" },
        { name: "UPSC", icon: "🏛️", href: "/exams/upsc", color: "#1ABC9C" },
        { name: "State PCS", icon: "🏢", href: "/exams/state-pcs", color: "#3498DB" },
        { name: "Defence", icon: "🎖️", href: "/exams/defence", color: "#27AE60" },
        { name: "Police", icon: "👮", href: "/exams/police", color: "#2C3E50" },
        { name: "Engineering", icon: "⚙️", href: "/exams/engineering", color: "#E67E22" },
        { name: "Medical", icon: "🩺", href: "/exams/medical", color: "#00CED1" },
        { name: "Law", icon: "⚖️", href: "/exams/law", color: "#8E44AD" },
        { name: "Management", icon: "📊", href: "/exams/management", color: "#D81B60" },
        { name: "UGC NET", icon: "🎓", href: "/exams/ugc-net", color: "#16A085" },
        { name: "GATE", icon: "🔧", href: "/exams/gate", color: "#C0392B" },
        { name: "CUET", icon: "📖", href: "/exams/cuet", color: "#2980B9" },
        { name: "Insurance", icon: "🛡️", href: "/exams/insurance", color: "#7F8C8D" },
    ];

    return (
        <section className="py-12 lg:py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="text-gray-900">Explore by</span>{" "}
                        <span className="text-[#D81B60]">Exam Categories</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Choose your target exam and start your preparation journey
                    </p>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-4 md:gap-6">
                    {categories.map((category, index) => (
                        <Link
                            key={category.name}
                            href={category.href}
                            className="group flex flex-col items-center text-center p-4 rounded-2xl hover:bg-gray-50 transition-all duration-300"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            {/* Circular Icon */}
                            <div
                                className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center text-2xl md:text-3xl mb-3 shadow-md group-hover:shadow-lg group-hover:scale-110 transition-all duration-300"
                                style={{ backgroundColor: `${category.color}15` }}
                            >
                                {category.icon}
                            </div>

                            {/* Category Name */}
                            <span className="text-xs md:text-sm font-medium text-gray-700 group-hover:text-[#00CED1] transition-colors">
                                {category.name}
                            </span>
                        </Link>
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center mt-10">
                    <Link
                        href="/exams"
                        className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#00CED1] to-[#D81B60] text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all"
                    >
                        View All Categories
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default ExamCategories;
