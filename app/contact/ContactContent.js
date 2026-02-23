"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import { toast, Toaster } from "react-hot-toast";

export default function ContactContent() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });
    const [status, setStatus] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("loading");

        const res = await fetch("https://formspree.io/f/meoelkyp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        });

        if (res.ok) {
            setStatus("success");
            toast.success("Message sent successfully!");
            setFormData({ name: "", email: "", message: "" });
            setTimeout(() => setStatus(null), 3000);
        } else {
            setStatus("error");
            toast.error("Failed to send message. Try again!");
            setTimeout(() => setStatus(null), 3000);
        }
    };

    return (
        <>
            <Toaster position="bottom-right" reverseOrder={false} />

            <div className="fixed top-0 left-0 w-full min-h-screen h-full bg-[#0d0d0d]">
                <div className="absolute inset-0 w-full h-full opacity-25 bg-[radial-gradient(circle,rgba(0,255,255,0.3)_0%,rgba(0,0,0,0.1)_80%)]"></div>
                <div className="absolute inset-0 w-full h-full opacity-15 bg-[linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            </div>

            <div className="min-h-screen flex flex-col justify-center items-center px-8 pt-20 relative text-white">
                <motion.h1
                    className="text-4xl font-bold mb-6 flex items-center neon-text"
                    initial={{ opacity: 0, y: -15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{ willChange: "transform, opacity" }}>
                    Let&apos;s connect
                </motion.h1>

                <motion.div
                    className="flex space-x-8 mb-6"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    style={{ willChange: "transform, opacity" }}>
                    <a
                        href="https://www.linkedin.com/in/kandili/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-4xl text-blue-400 transition-all hover:scale-110">
                        <FaLinkedin />
                    </a>
                    <a
                        href="https://github.com/kandilidinesh"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-4xl text-gray-300 transition-all hover:scale-110">
                        <FaGithub />
                    </a>
                    <a
                        href="mailto:kandilindinesh@gmail.com"
                        className="text-4xl text-red-400 transition-all hover:scale-110">
                        <FaEnvelope />
                    </a>
                </motion.div>

                <motion.form
                    onSubmit={handleSubmit}
                    className="bg-opacity-50 p-8 rounded-lg w-full max-w-lg shadow-lg backdrop-blur-md border border-cyan-400/20 bg-white/5 transition-all duration-300">
                    <input
                        name="name"
                        type="text"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full p-3 mb-4 bg-transparent border-b border-cyan-700 text-white placeholder-gray-600 
                   outline-none focus:ring-0 focus:border-cyan-300 transition-all 
                   duration-300 focus:shadow-[0px_0px_10px_#00ffc3]"
                    />

                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full p-3 mb-4 bg-transparent border-b border-cyan-700 text-white placeholder-gray-600 
                   outline-none focus:ring-0 focus:border-cyan-300 transition-all 
                   duration-300 focus:shadow-[0px_0px_10px_#00ffc3]"
                    />

                    <textarea
                        name="message"
                        placeholder="Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full p-3 mb-4 bg-transparent border-b border-cyan-700 text-white placeholder-gray-600 h-32 resize-none 
                   outline-none focus:ring-0 focus:border-cyan-300 transition-all 
                   duration-300 focus:shadow-[0px_0px_10px_#00ffc3]"
                    />

                    <button
                        type="submit"
                        className="w-full bg-cyan-600 text-white py-3 rounded-md transition-all duration-300 
                   hover:opacity-90 focus:shadow-[0px_0px_25px_#00ffc3]">
                        {status === "loading" ? "Sending..." : "Send Message"}
                    </button>
                </motion.form>
            </div>
        </>
    );
}
