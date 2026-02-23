"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";
import toast from "react-hot-toast";
import { spring, staggerContainer, staggerItem } from "@/lib/motion";

export default function ContactContent() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
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
            body: JSON.stringify(formData),
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

    const socials = [
        { Icon: FaLinkedin, href: "https://www.linkedin.com/in/kandili/", label: "LinkedIn", color: "text-[#0a66c2]" },
        { Icon: FaGithub, href: "https://github.com/kandilidinesh", label: "GitHub", color: "text-white" },
        { Icon: FaEnvelope, href: "mailto:kandilindinesh@gmail.com", label: "Email", color: "text-red-400" },
    ];

    return (
        <>
            <div className="contact-bg fixed top-0 left-0 w-full min-h-screen h-full -z-10">
                <div className="absolute inset-0 bg-[var(--background)]" />
                <div className="absolute inset-0 opacity-30 bg-[radial-gradient(ellipse_80%_50%_at_50%_120%,rgba(0,230,255,0.2),transparent)]" />
                <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />
            </div>

            <div className="min-h-screen flex flex-col justify-center items-center px-6 md:px-8 pt-24 pb-16 relative text-white">
                <motion.div
                    className="flex flex-col items-center w-full max-w-md"
                    variants={staggerContainer(0.1, 0.1)}
                    initial="initial"
                    animate="animate"
                >
                    <motion.h1
                        className="text-4xl font-semibold mb-2 neon-text"
                        variants={staggerItem}
                        transition={spring.bouncy}
                    >
                        Let&apos;s connect
                    </motion.h1>

                    <motion.div
                        className="flex gap-8 mb-10"
                        variants={staggerItem}
                        transition={spring.soft}
                    >
                        {socials.map(({ Icon, href, label, color }) => (
                            <motion.a
                                key={label}
                                href={href}
                                target={href.startsWith("http") ? "_blank" : undefined}
                                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                                aria-label={label}
                                className={`text-3xl md:text-4xl ${color} contact-social-icon`}
                                whileHover={{ scale: 1.2, y: -4 }}
                                whileTap={{ scale: 0.9 }}
                                transition={spring.bouncy}
                            >
                                <Icon />
                            </motion.a>
                        ))}
                    </motion.div>

                    <motion.form
                        onSubmit={handleSubmit}
                        className="contact-form w-full max-w-lg rounded-2xl p-6 md:p-8 border border-[var(--border)] bg-[var(--surface)] backdrop-blur-xl shadow-xl"
                        variants={staggerItem}
                        transition={spring.soft}
                    >
                        <label className="block mb-4">
                            <span className="block text-xs font-medium text-white/50 mb-1.5">Name</span>
                            <input
                                name="name"
                                type="text"
                                placeholder="Your name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="contact-input w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--border)] text-white placeholder-white/30 outline-none focus:border-[var(--neon-cyan)] focus:ring-2 focus:ring-[var(--accent-soft)] transition-all duration-200"
                            />
                        </label>
                        <label className="block mb-4">
                            <span className="block text-xs font-medium text-white/50 mb-1.5">Email</span>
                            <input
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="contact-input w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--border)] text-white placeholder-white/30 outline-none focus:border-[var(--neon-cyan)] focus:ring-2 focus:ring-[var(--accent-soft)] transition-all duration-200"
                            />
                        </label>
                        <label className="block mb-6">
                            <span className="block text-xs font-medium text-white/50 mb-1.5">Message</span>
                            <textarea
                                name="message"
                                placeholder="Say hello..."
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="contact-input w-full px-4 py-3 rounded-xl bg-white/5 border border-[var(--border)] text-white placeholder-white/30 resize-none outline-none focus:border-[var(--neon-cyan)] focus:ring-2 focus:ring-[var(--accent-soft)] transition-all duration-200"
                            />
                        </label>
                        <motion.button
                            type="submit"
                            disabled={status === "loading"}
                            className="w-full py-3.5 rounded-xl font-medium bg-gradient-to-r from-[var(--neon-blue)] to-[var(--neon-cyan)] text-[#0a0a0f] border-0 cursor-pointer disabled:opacity-70"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            transition={spring.snappy}
                        >
                            {status === "loading" ? "Sending…" : "Send message"}
                        </motion.button>
                    </motion.form>
                </motion.div>
            </div>
        </>
    );
}
