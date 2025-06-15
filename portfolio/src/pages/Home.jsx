import React from "react";
import Hero from "./miniComponents/Hero";
import Timeline from "./miniComponents/Timeline";
import Skills from "./miniComponents/Skills";
import Certificate from "./miniComponents/Certificate";
import About from "./miniComponents/About";
import Navbar from "./miniComponents/Navbar";
import Portfolio from "./miniComponents/Portfolio";
import Contact from "./miniComponents/Contact";
import ScrollUp from "./miniComponents/ScrollUp";

const Home = () => {
  return (
    <article className="px-2 mt-10 sm:mt-14 md:mt-16 lg:mt-24 xl:mt-32 sm:mx-auto w-full max-w-[1050px] flex flex-col gap-14">
      {/* Starry Background (Fixed for Whole Page, Visible in Hero) */}
      <div className="starry-background">
        <div className="hero-glow"></div>
      </div>
      <div className="floating-blurred-circles">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
        <div className="circle circle-4"></div>
        <div className="circle circle-5"></div>
      </div>
      <Navbar/>
      <Hero />
      <About />
      <Timeline />
      <Skills />
      <Portfolio />
      <Certificate />
      <Contact />
      <ScrollUp/>
    </article>
  );
};

export default Home;
