import React, { useState, useEffect } from "react";
import { FaChevronUp } from "react-icons/fa";

const ScrollUp = () => {
    const [toTopBtn, setToTopBtn] = useState(false);

    // Function to handle scroll event
    const handleScroll = () => {
        setToTopBtn(window.scrollY > 100);
    };

    useEffect(() => {
        // Add scroll event listener
        window.addEventListener("scroll", handleScroll);
        
        // Cleanup function to remove event listener
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <>
            {toTopBtn && (
                <button
                    className="fixed bottom-6 right-6 bg-cyan-600 text-white p-3 rounded-full shadow-lg hover:bg-cyan-500 transition-all duration-300 z-[999]"
                    onClick={scrollUp}
                >
                    <FaChevronUp size={20} />
                </button>
            )}
        </>
    );
};

export default ScrollUp;
