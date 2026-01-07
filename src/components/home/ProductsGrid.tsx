import Link from "next/link";

const ProductsGrid = () => {
    const products = [
        {
            name: "Online Live Classes",
            description: "Interactive sessions with expert faculty",
            icon: "📺",
            href: "/live-classes",
            color: "from-blue-500 to-blue-600",
            stats: "2000+ Classes",
        },
        {
            name: "Mock Tests",
            description: "Practice with exam-like test series",
            icon: "📝",
            href: "/mock-tests",
            color: "from-[#00CED1] to-[#0891B2]",
            stats: "4000+ Tests",
        },
        {
            name: "Video Courses",
            description: "Learn at your own pace",
            icon: "🎬",
            href: "/video-courses",
            color: "from-purple-500 to-purple-600",
            stats: "25000+ Videos",
        },
        {
            name: "E-Books",
            description: "Digital study materials",
            icon: "📱",
            href: "/ebooks",
            color: "from-emerald-500 to-emerald-600",
            stats: "500+ E-Books",
        },
        {
            name: "Books",
            description: "Physical books & study guides",
            icon: "📚",
            href: "/books",
            color: "from-[#D81B60] to-[#AD1457]",
            stats: "1000+ Books",
        },
    ];

    return (
        <section className="py-12 lg:py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        <span className="text-[#00CED1]">Explore</span>{" "}
                        <span className="text-gray-900">by Products</span>
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Everything you need for your exam preparation journey
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
                    {products.map((product, index) => (
                        <Link
                            key={product.name}
                            href={product.href}
                            className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Background Gradient */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${product.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                            />

                            {/* Icon */}
                            <div
                                className={`w-14 h-14 mb-4 bg-gradient-to-br ${product.color} rounded-xl flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                            >
                                {product.icon}
                            </div>

                            {/* Content */}
                            <h3 className="font-bold text-gray-900 mb-1 group-hover:text-[#00CED1] transition-colors">
                                {product.name}
                            </h3>
                            <p className="text-gray-500 text-sm mb-3 line-clamp-2">
                                {product.description}
                            </p>

                            {/* Stats Badge */}
                            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full group-hover:bg-[#00CED1]/10 group-hover:text-[#00CED1] transition-colors">
                                {product.stats}
                            </span>

                            {/* Arrow */}
                            <div className="absolute bottom-4 right-4 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all">
                                <svg
                                    className="w-4 h-4 text-[#00CED1]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 5l7 7-7 7"
                                    />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductsGrid;
