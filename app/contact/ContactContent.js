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
        { Icon: FaLinkedin, href: "https://www.linkedin.com/in/dinesh-kn/", label: "LinkedIn", color: "text-[#0a66c2]" },
        { Icon: FaGithub, href: "https://github.com/dineshkn-dev", label: "GitHub", color: "text-white" },
        { Icon: FaEnvelope, href: "mailto:kandilindinesh@gmail.com", label: "Email", color: "text-red-400" },
    ];

    return (
        <section className="page-shell">
            <motion.div className="section-shell section-stack" variants={staggerContainer(0.1, 0.1)} initial="initial" animate="animate">
                <motion.div className="section-intro" variants={staggerItem} transition={spring.soft}>
                    <span className="eyebrow">Contact</span>
                    <h1>Let&apos;s build something meaningful.</h1>
                    <p className="section-copy">
                        Reach out for engineering collaboration, consulting, or backend leadership opportunities.
                    </p>
                </motion.div>

                <motion.div className="grid-2" variants={staggerContainer(0.08, 0.08)} initial="initial" animate="animate">
                    <motion.aside className="glass-card p-6" variants={staggerItem} transition={spring.soft}>
                        <h2 className="text-xl">Social</h2>
                        <p className="mt-2 text-sm">Pick your preferred channel and I&apos;ll respond quickly.</p>
                        <div className="cluster mt-5">
                            {socials.map(({ Icon, href, label, color }) => (
                                <motion.a
                                    key={label}
                                    href={href}
                                    target={href.startsWith("http") ? "_blank" : undefined}
                                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                                    aria-label={label}
                                    className={`glass-card px-4 py-3 inline-flex items-center gap-3 ${color}`}
                                    whileHover={{ scale: 1.04 }}
                                    whileTap={{ scale: 0.97 }}
                                    transition={spring.snappy}
                                >
                                    <Icon className="text-xl" />
                                    <span className="text-sm font-medium">{label}</span>
                                </motion.a>
                            ))}
                        </div>
                    </motion.aside>

                    <motion.form onSubmit={handleSubmit} className="contact-form p-6" variants={staggerItem} transition={spring.soft}>
                        <label className="block mb-4">
                            <span className="block text-xs font-medium mb-1.5 text-[var(--muted-foreground)]">Name</span>
                            <input
                                name="name"
                                type="text"
                                placeholder="Your name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]"
                            />
                        </label>
                        <label className="block mb-4">
                            <span className="block text-xs font-medium mb-1.5 text-[var(--muted-foreground)]">Email</span>
                            <input
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)]"
                            />
                        </label>
                        <label className="block mb-5">
                            <span className="block text-xs font-medium mb-1.5 text-[var(--muted-foreground)]">Message</span>
                            <textarea
                                name="message"
                                placeholder="Tell me what you are building"
                                value={formData.message}
                                onChange={handleChange}
                                required
                                rows={5}
                                className="w-full px-4 py-3 rounded-xl bg-[var(--surface)] border border-[var(--border)] text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] resize-none"
                            />
                        </label>
                        <motion.button
                            type="submit"
                            disabled={status === "loading"}
                            className="button button-primary w-full disabled:opacity-70"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.98 }}
                            transition={spring.snappy}
                        >
                            {status === "loading" ? "Sending..." : "Send Message"}
                        </motion.button>
                    </motion.form>
                </motion.div>
            </motion.div>
        </section>
    );
}
