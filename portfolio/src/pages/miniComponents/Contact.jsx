import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Contact = () => {
  const [senderName, setSenderName] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleMessage = async (e) => {
    e.preventDefault();
    setLoading(true);
    await axios
      .post(
        "http://localhost:4000/api/v1/message/send",
        { senderName, subject, message },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        setSenderName("");
        setSubject("");
        setMessage("");
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setLoading(false);
      });
  };
  return (
    <>
      <div id="contact" className="h-5"></div>
      <div className="overflow-x-hidden p-6">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-4xl mb-2 font-extrabold text-center mx-auto w-fit">
          LET'S CONNECT
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16 text-gray-300 text-center mx-auto w-fit">Feel free to contact me</motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="px-5">
            <img src="/contact.png" className="" alt="Contact" />
            <p></p>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 500 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}>
            <h2 className="text-2xl font-bold mb-8 text-center">What's the Message?</h2>
            <form onSubmit={handleMessage} className="flex flex-col gap-9">
              <div className="relative">
                <Label
                  className="absolute left-4 -top-3 text-sm backdrop-blur-md bg-[#0a1431] bg-opacity-60 text-white"
                >
                  Name
                </Label>
                <Input
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="Type your name"
                  className="border border-gray-400 rounded-xl p-3 bg-transparent text-white focus:border-transparent"
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <Label
                  className="absolute left-4 -top-3 text-sm backdrop-blur-md bg-[#0a1431] bg-opacity-60 text-white"
                >
                  Subject
                </Label>
                <Input
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Type your subject"
                  className="border border-gray-400 rounded-xl p-3 bg-transparent text-white focus:border-transparent"
                />
              </div>

              {/* Project Details Field */}
              <div className="relative">
                <Label
                  className="absolute left-4 -top-3 text-sm backdrop-blur-md bg-[#0a1431] bg-opacity-60 text-white"
                >
                  Message
                </Label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Provide some project details..."
                  className="border border-gray-400 text-sm rounded-xl w-full p-3 bg-transparent text-white focus:border-transparent h-32 resize-none"
                />
              </div>
              <div className="flex justify-end">
                {!loading ? (
                  <Button className="w-full sm:w-32 text-secondary hover:text-cyan-600">SEND MESSAGE </Button>
                ) : (
                  <Button disabled className="w-full sm:w-52 text-cyan-600">
                    Sending...
                  </Button>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Contact;
