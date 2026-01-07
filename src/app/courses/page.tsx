import Link from "next/link";

export default function CoursesPage() {
    const courses = [
        {
            id: 1,
            title: "Bank Maha Pack 2026",
            description:
                "Complete preparation package for all banking exams - SBI PO, IBPS PO, RRB PO & more",
            category: "Banking",
            price: 4999,
            originalPrice: 14999,
            discount: 67,
            features: ["200+ Live Classes", "400+ Mock Tests", "50+ E-Books"],
            rating: 4.8,
            students: "45K+",
            color: "from-blue-500 to-blue-600",
        },
        {
            id: 2,
            title: "SSC Ultimate Pack",
            description:
                "Complete SSC CGL, CHSL, CPO, MTS preparation with expert faculty",
            category: "SSC",
            price: 3499,
            originalPrice: 9999,
            discount: 65,
            features: ["150+ Live Classes", "300+ Mock Tests", "30+ E-Books"],
            rating: 4.7,
            students: "32K+",
            color: "from-[#00CED1] to-[#0891B2]",
        },
        {
            id: 3,
            title: "Railway Complete Pack",
            description:
                "Group D, NTPC, JE, ALP all railway exams in one package",
            category: "Railway",
            price: 2999,
            originalPrice: 7999,
            discount: 63,
            features: ["120+ Live Classes", "250+ Mock Tests", "25+ E-Books"],
            rating: 4.6,
            students: "28K+",
            color: "from-orange-500 to-orange-600",
        },
        {
            id: 4,
            title: "UPSC Prelims Foundation",
            description:
                "Complete GS foundation for UPSC CSE Prelims with current affairs",
            category: "UPSC",
            price: 5999,
            originalPrice: 19999,
            discount: 70,
            features: ["250+ Live Classes", "100+ Mock Tests", "80+ E-Books"],
            rating: 4.9,
            students: "18K+",
            color: "from-[#D81B60] to-[#AD1457]",
        },
        {
            id: 5,
            title: "Teaching Exams Pack",
            description:
                "CTET, Super TET, KVS, DSSSB all teaching exams covered",
            category: "Teaching",
            price: 2499,
            originalPrice: 5999,
            discount: 58,
            features: ["100+ Live Classes", "200+ Mock Tests", "20+ E-Books"],
            rating: 4.7,
            students: "22K+",
            color: "from-purple-500 to-purple-600",
        },
        {
            id: 6,
            title: "State PCS Mega Pack",
            description:
                "UPPCS, BPSC, MPPSC, RPSC all state PCS in one package",
            category: "State PCS",
            price: 4499,
            originalPrice: 12999,
            discount: 65,
            features: ["180+ Live Classes", "350+ Mock Tests", "45+ E-Books"],
            rating: 4.8,
            students: "15K+",
            color: "from-emerald-500 to-emerald-600",
        },
    ];

    const categories = [
        "All Courses",
        "Banking",
        "SSC",
        "Railway",
        "UPSC",
        "Teaching",
        "State PCS",
    ];

    return (
        <div className="min-h-screen pt-24 pb-12 bg-gray-50">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="text-gray-900">Explore Our</span>{" "}
                        <span className="bg-gradient-to-r from-[#00CED1] to-[#D81B60] bg-clip-text text-transparent">
                            Courses
                        </span>
                    </h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Comprehensive courses designed by exam experts for your success
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

                {/* Courses Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <div
                            key={course.id}
                            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden group"
                        >
                            {/* Header */}
                            <div
                                className={`bg-gradient-to-r ${course.color} p-5 text-white relative overflow-hidden`}
                            >
                                <div className="absolute -right-6 -top-6 w-24 h-24 bg-white/10 rounded-full" />
                                <div className="absolute -right-10 -bottom-10 w-36 h-36 bg-white/5 rounded-full" />
                                <div className="flex justify-between items-start">
                                    <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold">
                                        {course.category}
                                    </span>
                                    <span className="px-3 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold">
                                        {course.discount}% OFF
                                    </span>
                                </div>
                                <h3 className="font-bold text-xl mt-4 relative z-10">
                                    {course.title}
                                </h3>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {course.description}
                                </p>

                                {/* Features */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {course.features.map((feature) => (
                                        <span
                                            key={feature}
                                            className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs"
                                        >
                                            {feature}
                                        </span>
                                    ))}
                                </div>

                                {/* Rating & Students */}
                                <div className="flex items-center gap-4 mb-4 text-sm">
                                    <div className="flex items-center gap-1">
                                        <span className="text-yellow-500">⭐</span>
                                        <span className="font-medium">{course.rating}</span>
                                    </div>
                                    <div className="flex items-center gap-1 text-gray-500">
                                        <span>👥</span>
                                        <span>{course.students} students</span>
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="flex items-baseline gap-2 mb-4">
                                    <span className="text-2xl font-bold text-gray-900">
                                        ₹{course.price.toLocaleString()}
                                    </span>
                                    <span className="text-gray-400 line-through">
                                        ₹{course.originalPrice.toLocaleString()}
                                    </span>
                                </div>

                                {/* Action */}
                                <Link
                                    href={`/courses/${course.id}`}
                                    className="block w-full py-3 text-center text-white font-semibold bg-gradient-to-r from-[#00CED1] to-[#D81B60] rounded-xl hover:shadow-lg transition-all"
                                >
                                    View Course
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Load More */}
                <div className="text-center mt-10">
                    <button className="px-8 py-3 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-full hover:bg-gray-50 transition-all">
                        Load More Courses
                    </button>
                </div>
            </div>
        </div>
    );
}
