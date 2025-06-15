import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Reveal from "./Reveal";

const Skills = () => {
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    const getMySkills = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/skill/getall",
        { withCredentials: true }
      );
      setSkills(data.skills);
    };
    getMySkills();
  }, []);

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <>
      <div id="skills" className="h-3"></div>
      <div className="max-w-5xl mx-auto flex flex-col justify-center px-4 text-gray-200 pb-8 md:py-10">
        <Reveal>
          <h2 className="text-4xl font-bold mb-2 text-center text-white">Skills</h2>
          <p className="text-center text-gray-300 mb-8">
            I worked on various Frontend and AI/ML based projects.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {Object.keys(groupedSkills).length > 0 ? (
              Object.entries(groupedSkills).map(([category, skills], index) => (
                <div key={index} className="w-64 border border-cyan-800 p-6 rounded-lg bg-cyan-900/20 shadow-lg flex flex-col items-center">
                  <h3 className="text-xl font-bold mb-4 text-center text-gray-300">{category}</h3>
                  <div className="grid grid-cols-2 gap-4 w-full">
                    {skills.map((skill, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <img src={skill.svg.url} alt={skill.title} className="w-6 h-6" />
                        <span className="text-[15px] text-gray-300">{skill.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400">No skills found.</p>
            )}
          </div>
        </Reveal>
      </div>
    </>
  );
};

export default Skills;
