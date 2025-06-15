import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaGraduationCap, FaBriefcase } from "react-icons/fa";
import { motion } from "framer-motion";

const Timeline = () => {
  const [timeline, setTimeline] = useState([]);
  const [activeCategory, setActiveCategory] = useState("Education");

  useEffect(() => {
    const getMyTimeline = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/timeline/getall",
        { withCredentials: true }
      );
      setTimeline(data.timelines);
    };
    getMyTimeline();
  }, []);

  const filteredTimeline = timeline.filter(
    (element) => element.category === activeCategory
  );

  return (
    <>
      <div id="timeline" className="h-2"></div>
      <div className="max-w-5xl mx-7 px-4 text-gray-200 md:pt-10 min-h-[400px]">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold text-center text-white mb-2"
        >
          Timeline
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-center text-gray-300 mb-4"
        >
          My journey of education and professional experience
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="flex justify-center space-x-6 mb-16">

          <button
            className={`flex items-center space-x-2 text-lg transition duration-300 ${activeCategory === "Education" ? "text-cyan-500" : "text-gray-300"}`}
            onClick={() => setActiveCategory("Education")}
          >
            <FaGraduationCap />
            <span>Education</span>
          </button>
          <button
            className={`flex items-center space-x-2 text-lg transition duration-300 ${activeCategory === "Work" ? "text-cyan-500" : "text-gray-300"}`}
            onClick={() => setActiveCategory("Work")}
          >
            <FaBriefcase />
            <span>Experience</span>
          </button>
        </motion.div>

        <div className="relative min-h-[350px] flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="absolute w-1 bg-gray-300 dark:bg-gray-700 h-full left-1/2 transform -translate-x-1/2"></motion.div>
          {filteredTimeline.length > 0 ? (
            <ol className="w-full max-w-2xl relative flex flex-col gap-28">
              {filteredTimeline.map((element, index) => (
                <li key={element._id} className="relative flex w-full items-center">
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="absolute w-4 h-4 bg-cyan-600 rounded-full left-[49%] transform -translate-x-1/2"></motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className={`absolute ${index % 2 === 0 ? "right-[55%] text-right" : "left-[55%] text-left"} max-w-[90%]`}>
                    <h3 className="text-lg font-semibold text-white">{element.title}</h3>
                    <p className="text-[15px] text-gray-300">{element.description}</p>
                    <time className="block mt-1 text-sm text-gray-400">{element.timeline.from} - {element.timeline.to ? element.timeline.to : "Present"}</time>
                  </motion.div>
                </li>
              ))}
            </ol>
          ) : (
            <p className="z-10 text-gray-400 ">No records found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Timeline;
