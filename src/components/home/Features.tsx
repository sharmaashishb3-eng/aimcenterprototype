const Features = () => {
    const features = [
        {
            step: "01",
            title: "Choose Your Exam",
            description:
                "Select from 100+ exam categories including Banking, SSC, Railway, UPSC, and more.",
            icon: "🎯",
            color: "from-[#00CED1] to-[#0891B2]",
        },
        {
            step: "02",
            title: "Access Study Material",
            description:
                "Get unlimited access to video courses, live classes, e-books, and practice tests.",
            icon: "📚",
            color: "from-purple-500 to-purple-600",
        },
        {
            step: "03",
            title: "Practice with Mock Tests",
            description:
                "Take full-length and sectional mock tests designed by exam experts.",
            icon: "📝",
            color: "from-[#D81B60] to-[#AD1457]",
        },
        {
            step: "04",
            title: "Track Your Progress",
            description:
                "Analyze your performance with detailed reports and compete with peers.",
            icon: "📊",
            color: "from-emerald-500 to-emerald-600",
        },
    ];

    const stats = [
        { label: "Active Students", value: "15M+", icon: "👥" },
        { label: "Selections", value: "1L+", icon: "🏆" },
        { label: "Expert Faculty", value: "500+", icon: "👨‍🏫" },
        { label: "Youtube Subscribers", value: "9M+", icon: "▶️" },
    ];

    return (
        <section className="py-12 lg:py-20 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="text-gray-900">How to Learn with</span>{" "}
                        <span className="bg-gradient-to-r from-[#00CED1] to-[#D81B60] bg-clip-text text-transparent">
                            AIM Center?
                        </span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Start your journey to success with our comprehensive learning platform
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {features.map((feature, index) => (
                        <div
                            key={feature.step}
                            className="relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group hover:-translate-y-2"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Step Number */}
                            <div
                                className={`absolute -top-3 -left-3 w-10 h-10 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-lg`}
                            >
                                {feature.step}
                            </div>

                            {/* Icon */}
                            <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>

                            {/* Content */}
                            <h3 className="text-lg font-bold text-gray-900 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 text-sm">{feature.description}</p>

                            {/* Connecting Line (for desktop) */}
                            {index < features.length - 1 && (
                                <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gray-200" />
                            )}
                        </div>
                    ))}
                </div>

                {/* Stats Section */}
                <div className="bg-gradient-to-r from-[#0F172A] to-[#1E293B] rounded-3xl p-8 md:p-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div
                                key={stat.label}
                                className="text-center"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="text-4xl mb-2">{stat.icon}</div>
                                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#00CED1] to-[#D81B60] bg-clip-text text-transparent mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-gray-400 text-sm">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Features;
