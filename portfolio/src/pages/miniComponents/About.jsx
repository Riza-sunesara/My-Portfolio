import React, { useEffect, useState } from "react";
import axios from "axios";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { motion } from "framer-motion";
import { LuGoal, LuSparkles } from "react-icons/lu";
import { CgFileDocument } from "react-icons/cg";

const About = () => {

  const [user, setUser] = useState({});
  useEffect(() => {
    const getMyProfile = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/me",
        { withCredentials: true }
      );
      setUser(data.user);
    };
    getMyProfile();
  },
    []);

    const [projects, setProjects] = useState([]);
  useEffect(() => {
    const getMyProjects = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/project/getall",
        { withCredentials: true }
      );
      setProjects(data.projects);
    };
    getMyProjects();
  }, []);

  return (
    <>
      <div id="about" className="h-2"></div>
      <section className="w-full flex flex-col items-center text-center mt-4">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold text-white"
        >
          About Me
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-gray-300 mt-2"
        >
          A short introduction
        </motion.p>
        <div className="grid md:grid-cols-2 gap-8 items-center mt-10 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex justify-center"
          >
            <img
              src={user.avatar?.url || "/me.jpg"}
              alt="avatar"
              className="rounded-lg shadow-lg w-72 h-72 sm:w-96 sm:h-96 md:w-[400px] md:h-[450px]"
            />
          </motion.div>
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="border border-gray-300 rounded-lg p-4 hover:border-cyan-800 hover:bg-cyan-900/20 shadow-lg"
              >
                <HiOutlineDesktopComputer className="text-3xl text-gray-300 mb-2 mx-auto" />
                <h3 className="text-lg font-semibold">Experience</h3>
                <span className="text-sm text-gray-500">0-6 Months</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                className="border border-gray-300 rounded-lg p-4 hover:border-cyan-800 hover:bg-cyan-900/20 shadow-lg"
              >
                <LuGoal className="text-3xl text-gray-300 mb-2 mx-auto" />
                <h3 className="text-lg font-semibold">Completed</h3>
                <span className="text-sm text-gray-500">{projects.length}+ Projects</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.6 }}
                className="border border-gray-300 rounded-lg p-4 hover:border-cyan-800 hover:bg-cyan-900/20 shadow-lg"
              >
                <LuSparkles className="text-3xl text-gray-300 mb-2 mx-auto" />
                <h3 className="text-lg font-semibold">Support</h3>
                <span className="text-sm text-gray-500">Online 24/7</span>
              </motion.div>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-slate-400 text-base mb-6 max-w-lg"
            >
              I am a Final-year Computer Science student at DHA Suffa University specializing in AI and Machine Learning. With experience in NLP and Computer Vision, I develop data-driven solutions for real-world challenges. My background in web development enhances my ability to integrate AI seamlessly into interactive, user-centric applications.
            </motion.p>
            <motion.a
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1 }}
              href={user.resume?.url}
              className="bg-cyan-700 text-white text-base px-5 py-3 rounded-lg shadow-md hover:bg-cyan-800 flex items-center gap-2 transition"
            >
              View Resume <CgFileDocument className="text-2xl" />
            </motion.a>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
