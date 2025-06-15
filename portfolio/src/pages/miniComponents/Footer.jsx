import React from "react";
import { FaWhatsapp, FaGithub, FaLinkedin } from "react-icons/fa";
import { SiGmail } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="relative mt-12 w-full text-center bg-none">
      {/* Waves Animation */}
      <div className="relative w-full overflow-hidden leading-none">
        <svg className="waves" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
          <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
          </defs>
          <g className="parallax">
            <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7)" />
            <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
            <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
            <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
          </g>
        </svg>
      </div>

      {/* Footer Content */}
      <div className="absolute top-20 w-full flex flex-col bg-primary items-center justify-center p-8">
        <h1 className="text-3xl font-semibold text-[#1e293b]">Riza Zulfiqar</h1>
        <nav className="flex justify-center space-x-6 mt-2 text-gray-600 font-medium">
          <a href="#" className="hover:text-cyan-700">Home</a>
          <a href="#about" className="hover:text-cyan-700">About</a>
          <a href="#portfolio" className="hover:text-cyan-700">Projects</a>
          <a href="#skills" className="hover:text-cyan-700">Skills</a>
          <a href="#timeline" className="hover:text-cyan-700">Experience</a>
          <a href="#contact" className="hover:text-cyan-700">Contact</a>
        </nav>
        <p className="text-sm my-2 font-semibold text-gray-500">© Riza-Zulfiqar-Portfolio. All Rights Reserved.</p>
        <div className="flex justify-center space-x-5 mt-3 text-gray-700 text-xl">
          <a href="https://wa.me/923352961601" target="_blank" rel="noopener noreferrer">
            <FaWhatsapp className="hover:text-cyan-700 transition-all" />
          </a>
          <a href="mailto:rizzasunesara@gmail.com" target="_blank" rel="noopener noreferrer">
            <SiGmail className="hover:text-cyan-700 transition-all"/>
          </a>
          <a href="https://github.com/Riza-sunesara" target="_blank" rel="noopener noreferrer">
            <FaGithub className="hover:text-cyan-700 transition-all" />
          </a>
          <a href="https://www.linkedin.com/in/riza-zulfiqar-b45708240/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin className="hover:text-cyan-700 transition-all" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;