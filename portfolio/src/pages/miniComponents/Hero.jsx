import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import axios from "axios";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { SiGmail } from "react-icons/si";
import { GiHand } from "react-icons/gi";
import { LuSend } from "react-icons/lu";
import { Link } from "react-scroll";
import { Typewriter } from "react-simple-typewriter";

const Hero = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const getMyProfile = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/me",
        { withCredentials: true }
      );
      setUser(data.user);
      console.log(data.user);
    };
    getMyProfile();
  }, []);
  return (
    <>
      <div id="home" className="absolute -top-10"></div>
      <section className="pt-6 pb-10">
        <div className=" sm:px-2 md:px-2 grid gap-16 md:gap-28">

          {/* Grid layout with responsive handling */}
          <div className="grid grid-cols-1 md:grid-cols-[80px_repeat(2,1fr)] lg:grid-cols-[36px_repeat(2,1fr)] gap-8 pt-1 items-center">

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: -10 }}
              transition={{ duration: 1 }}
              className="grid gap-4 justify-center md:justify-start"
            >
              <motion.a whileHover={{ scale: 1.1 }} href="https://wa.me/923352961601" className="text-2xl text-title-color hover:text-cyan-500" target="_blank">
                <FaWhatsapp />
              </motion.a>
              <motion.a whileHover={{ scale: 1.1 }} href="mailto:riza.zulfiqar34@gmail.com" className="text-xl text-title-color hover:text-cyan-500" target="_blank">
                <SiGmail />
              </motion.a>
              <motion.a whileHover={{ scale: 1.1 }} href={user.githubURL} className="text-2xl text-title-color hover:text-cyan-500" target="_blank">
                <FaGithub />
              </motion.a>
              <motion.a whileHover={{ scale: 1.1 }} href={user.linkedInURL} className="text-2xl text-title-color hover:text-cyan-500" target="_blank">
                <FaLinkedin />
              </motion.a>
            </motion.div>

            {/* Hero Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="text-center md:text-left"
            >
              <h1 className="text-4xl sm:text-5xl font-bold mb-6 flex items-center gap-3 justify-center md:justify-start">
                {user.fullName} 
                <motion.div
                  initial={{ rotate: 0 }}
                  animate={{ rotate: [0, 15, -10, 15, 0] }} // Waving motion
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "easeInOut",
                  }}
                >
                  <GiHand className="text-cyan-500 text-5xl" />
                </motion.div>
              </h1>
              <h3 className="relative text-xl sm:text-2xl pl-0 lg:pl-10 font-normal mb-8">
                Aspiring {" "}
                <span className="text-cyan-500">
                  <Typewriter
                    words={["Data Scientist", "Data Analyst", "AI Developer"]}
                    loop={true}  // Infinite loop
                    cursor
                    cursorStyle="|"
                    typeSpeed={100}  // Typing speed
                    deleteSpeed={50}  // Deleting speed
                    delaySpeed={1000}  // Pause before deleting
                  />
                </span>
                <span className="absolute w-10 h-px bg-none lg:bg-white left-0 top-4"></span>
              </h3>

              <p className="max-w-[400px] text-base mb-10 text-slate-400 mx-auto md:mx-0">
                Driven by a passion for uncovering hidden patterns in data, I specialize in Machine Learning, NLP, and Computer Vision to build intelligent solutions. I blend statistical analysis and AI-driven insights with a background in web development, seamlessly integrating advanced AI into user experiences.
              </p>
              <Button className="gap-2 text-base text-secondary hover:text-cyan-600" asChild>
                <Link to="contact" smooth={true} duration={800}>
                  Say Hello <LuSend className="text-2xl" />
                </Link>
              </Button>
            </motion.div>

            {/* Profile Picture */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="profile-container w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] mx-auto md:mx-0"
            >
              <div className="profile-border"></div>
              <div
                className="profile-image bg-cover bg-center bg-no-repeat shadow-md"
                style={{ backgroundImage: `url(${user.avatar?.url || "/me.jpg"})` }}
              ></div>
            </motion.div>
          </div>

        </div>
      </section >
    </>
  );
};

export default Hero;
