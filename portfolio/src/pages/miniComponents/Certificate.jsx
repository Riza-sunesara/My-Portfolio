import { Card } from "@/components/ui/card";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FileText, X } from "lucide-react";
import { motion } from "framer-motion";
import { GrNext, GrPrevious } from "react-icons/gr";
import { GoArrowUpRight } from "react-icons/go";
import { Button } from "@/components/ui/button";

const CustomPrevArrow = ({ onClick, currentSlide }) => (
  <button
    className={`absolute left-[-30px] sm:left-[-50px] top-1/2 transform -translate-y-1/2 bg-gray-800 p-3 sm:p-2 rounded-full shadow-lg hover:bg-gray-600 transition ${currentSlide === 0 ? "hidden" : ""}`}
    onClick={onClick}
  >
    <GrPrevious size={24} className="text-white" />
  </button>
);

const CustomNextArrow = ({ onClick, slideCount, currentSlide }) => (
  <button
    className={`absolute right-[-30px] sm:right-[-60px] top-1/2 transform -translate-y-1/2 bg-gray-800 p-3 sm:p-2 rounded-full shadow-lg hover:bg-gray-600 transition ${currentSlide === slideCount - 1 ? "hidden" : ""}`}
    onClick={onClick}
  >
    <GrNext size={24} className="text-white" />
  </button>
);

const Certificate = () => {
  const [certificates, setCertificates] = useState([]);
  const [selectedCertificate, setSelectedCertificate] = useState(null);

  useEffect(() => {
    const getMyCertificates = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/certificate/getall",
        { withCredentials: true }
      );
      setCertificates(data.certificates);
    };
    getMyCertificates();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: certificates.length < 3 ? certificates.length : 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "0px",
    prevArrow: <CustomPrevArrow />, 
    nextArrow: <CustomNextArrow />, 
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2, centerMode: true, arrows: false } },
      { breakpoint: 768, settings: { slidesToShow: 1, centerMode: true, arrows: false } },
    ],
  };

  return (
    <div className="w-full flex flex-col items-center text-center px-4 sm:px-6" id="certificate">
      <motion.h1
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-white text-3xl sm:text-4xl font-bold mb-2"
      >
        Certificates
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="text-gray-300 mb-10"
      >
        Licenses + Courses
      </motion.p>

      {certificates.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-full max-w-5xl flex justify-center"
        >
          <Slider {...settings} className="w-full">
            {certificates.map((certificate) => (
              <div key={certificate._id} className="px-2 flex justify-center">
                <Card
                  className="relative w-[300px] sm:w-[600px] md:w-[320px] h-[250px] bg-slate-300 hover:border-cyan-600 hover:border-[2px] p-6 flex justify-end items-center shadow-md rounded-lg group overflow-hidden cursor-pointer"
                  onClick={() => setSelectedCertificate(certificate.svg.url)}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-opacity duration-500 opacity-100 group-hover:opacity-0"
                    style={{ backgroundImage: `url(${certificate.svg.url})` }}
                  ></div>
                  <div className="absolute inset-0 flex flex-col items-start bg-slate-100 bg-opacity-90 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-cyan-800 p-4 pt-7">
                    <FileText size={32} className="text-cyan-600 mb-3" />
                    <p className="text-lg font-medium">{certificate.name}</p>
                    <p className="text-medium font-medium">{certificate.issueDate}</p>
                    <Button
                    className="mt-1 text-cyan-800 hover:text-cyan-600 bg-transparent hover:bg-transparent self-start p-0"
                  >
                    Click To View Full Screen <GoArrowUpRight className="text-xl" />
                  </Button>
                  </div>
                </Card>
              </div>
            ))}
          </Slider>
        </motion.div>
      ) : (
        <p className="text-gray-500">No certificates available.</p>
      )}

      {selectedCertificate && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#1e293b] bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg relative max-w-4xl w-full">
            <button
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              onClick={() => setSelectedCertificate(null)}
            >
              ✕
            </button>
            <img
              src={selectedCertificate}
              alt="Certificate"
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Certificate;
