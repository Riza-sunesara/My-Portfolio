import React, { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { Link } from "react-scroll";

const Navbar = () => {
    const [nav, setNav] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    // Close mobile menu when resizing to desktop view
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setNav(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            {/* Desktop Navbar */}
            <nav className="hidden lg:flex fixed top-4 left-1/2 bg-opacity-70 backdrop-blur-md transform -translate-x-1/2 w-[90%] sm:w-[80%] md:w-[65%] lg:w-[45%] max-w-screen-lg px-6 py-2 bg-gray-800 shadow-sm rounded-full justify-between items-center z-50 overflow-hidden">
                
                {/* Left Side (Logo) */}
                <div className="flex items-center gap-4">
                    <a href="#" className="text-white text-lg font-semibold"><img src="/logo-web.png" alt="logo" className="h-8 w-auto" /></a>
                </div>

                {/* Center (Links) */}
                <ul className="flex gap-6 text-white flex-nowrap mr-14 justify-center items-center relative">
                    {["home", "about", "timeline", "skills", "portfolio", "contact"].map((section) => (
                        <li key={section} className="relative">
                            <Link 
                                to={section} 
                                className={`hover:text-cyan-400 hover:cursor-pointer whitespace-nowrap relative transition-all duration-300 ${activeSection === section ? "text-cyan-400" : "text-white"}`}
                                activeClass="text-cyan-400"
                                smooth={true} 
                                duration={500}
                                spy={true}
                                onSetActive={() => setActiveSection(section)}
                                onClick={() => setActiveSection(section)}
                            >
                                {section.charAt(0).toUpperCase() + section.slice(1)}
                            </Link>
                            {activeSection === section && (
                                <span className="absolute bottom-[-4px] left-0 w-full h-[2px] bg-cyan-400 transition-all duration-300"></span>
                            )}
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Mobile Menu Button */}
            <button onClick={() => setNav(!nav)} className="lg:hidden text-white bg-opacity-70 backdrop-blur-md bg-gray-800 p-3 rounded-full fixed top-4 right-4 z-50">
                {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
            </button>

            {/* Full-Screen Mobile Menu */}
            {nav && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-65 backdrop-blur-md flex flex-col items-center justify-center text-white z-50">
                    <button onClick={() => setNav(false)} className="absolute top-6 right-6 text-white text-2xl">
                        <AiOutlineClose size={30} />
                    </button>
                    <ul className="flex flex-col items-center gap-8 text-2xl">
                        {["home", "about", "timeline", "skills", "portfolio", "contact"].map((section) => (
                            <li key={section}>
                                <Link 
                                    to={section} 
                                    className="hover:text-cyan-400 hover:cursor-pointer"
                                    smooth={true} 
                                    duration={500}
                                    spy={true}
                                    onClick={() => { 
                                        setNav(false); 
                                        setActiveSection(section); 
                                    }}
                                >
                                    {section.charAt(0).toUpperCase() + section.slice(1)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default Navbar;
