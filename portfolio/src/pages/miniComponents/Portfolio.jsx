import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Reveal from "./Reveal";
import { FaGithub } from "react-icons/fa";
import { X } from "lucide-react";
import { motion } from "framer-motion";

const Portfolio = () => {
  const [viewAll, setViewAll] = useState(false);
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);

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
      <div id="portfolio" className="h-4"></div>
      <div className="max-w-[1000px] mx-auto p-6 md:my-5">
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-4xl font-bold text-white text-center mb-2">Projects</motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center text-gray-300 mb-6">Showcasing my expertise in AI, Machine Learning, and Web Development</motion.p>
        {/* Show message if no projects are found */}
        {projects.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">No Projects yet</p>
        ) : (
          projects.slice(0, viewAll ? projects.length : 3).map((project, index) => (
            <Reveal key={project._id}>
              <div
                className={`flex flex-col md:flex-row ${index % 2 !== 0 ? "md:flex-row-reverse" : ""} mb-10 rounded-lg shadow-lg overflow-hidden min-h-[300px]`}
              >
                <div className="w-full md:w-1/2 p-4 flex-1 flex items-center justify-center max-h-[300px] overflow-hidden">
                  <img
                    src={project.projectBanner?.url}
                    alt={project.title}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="w-full md:w-1/2 p-4 flex-1 flex flex-col justify-center">
                  <h3 className="text-[21px] font-medium text-gray-300 mb-4">{project.title}</h3>
                  <p className="text-gray-300 mb-4 text-base line-clamp-3">
                    {project.description.length > 150 ? (
                      <>
                        {project.description.slice(0, 150)}...
                        <button
                          className="text-cyan-600 ml-2"
                          onClick={() => setSelectedProject(project)}
                        >
                          View More
                        </button>
                      </>
                    ) : (
                      project.description
                    )}
                  </p>
                  <p className="text-sm text-gray-300 mb-4">
                    TECHNOLOGIES USED: {Array.isArray(project.technologies) ? project.technologies.join(", ") : project.technologies}
                  </p>
                  <div className="flex space-x-4">
                    <a
                      href={project.projectLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-slate-800 text-gray-200 rounded-lg hover:bg-slate-300 hover:text-cyan-600 transition duration-300"
                    >
                      View Site
                    </a>
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 pb-2 pt-3 text-gray-200 rounded-full hover:bg-slate-300 hover:text-cyan-600 transition duration-300"
                    >
                      <FaGithub />
                    </a>
                  </div>
                </div>
              </div>
            </Reveal>
          ))
        )}

        {projects.length > 3 && (
          <div className="flex justify-center mt-6">
            <Button
              className="px-6 py-2 bg-slate-700 text-gray-200 rounded-lg hover:bg-slate-800 transition duration-300"
              onClick={() => setViewAll(!viewAll)}
            >
              {viewAll ? "Show Less" : "View All"}
            </Button>
          </div>
        )}

        {selectedProject && (
          <div className="fixed inset-0 flex items-center justify-center bg-[#1e293b] bg-opacity-50 z-50">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg relative max-w-xl w-full text-white">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-200"
                onClick={() => setSelectedProject(null)}
              >
                <X size={24} />
              </button>
              <h3 className="text-2xl font-semibold mb-4">{selectedProject.title}</h3>
              <p className="text-gray-300 mb-4 text-base">{selectedProject.description}</p>
              <p className="text-sm text-gray-400 mb-4">TECHNOLOGIES USED: {Array.isArray(selectedProject.technologies) ? selectedProject.technologies.join(", ") : selectedProject.technologies}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Portfolio;
