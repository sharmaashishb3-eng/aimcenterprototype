"use client";

import { useState } from "react";

const ChatButton = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <button
            className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-[#00CED1] to-[#D81B60] text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => {
                // TODO: Implement chat functionality
                alert("Chat feature coming soon!");
            }}
        >
            <svg
                className={`w-5 h-5 transition-transform duration-300 ${isHovered ? "scale-110" : ""
                    }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
            </svg>
            <span className="hidden sm:inline">Chat With Us</span>
        </button>
    );
};

export default ChatButton;
