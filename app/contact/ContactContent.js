"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { socialIconMap } from "@/components/icons/SocialIcons";
import ModulePage from "@/components/shell/ModulePage";
import { contactFormEndpoint, socialLinks } from "@/lib/site-content";

export default function ContactContent() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const res = await fetch(contactFormEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        if (res.ok) {
            toast.success("Message sent.");
            setFormData({ name: "", email: "", message: "" });
        } else {
            toast.error("Message could not be sent. Please try again.");
        }
        setIsSubmitting(false);
    };

    return (
        <ModulePage
            sysId="Contact"
            eyebrow="Let's talk"
            title="Build something dependable"
            description="Reach out for backend engineering, cloud delivery, or product work that needs practical technical ownership."
            aside={
                <div className="site-stat-pill">
                    <strong>Open</strong>
                    <span>Availability</span>
                </div>
            }
        >
            <div className="contact-layout">
                <aside className="site-card site-card--glow-left">
                    <p className="site-card-label">Response rhythm</p>
                    <div className="contact-bars" aria-hidden="true">
                        <span /><span /><span /><span /><span />
                    </div>
                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                        Best for collaboration, product engineering discussions, and roles where
                        backend reliability matters.
                    </p>

                    <p className="site-card-label mt-6">Direct links</p>
                    <div className="site-channel-list">
                        {socialLinks.map(({ platform, href, color }) => {
                            const Icon = socialIconMap[platform];
                            return (
                                <a
                                    key={platform}
                                    href={href}
                                    className="site-channel"
                                    target={href.startsWith("http") ? "_blank" : undefined}
                                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                                >
                                    <span className="site-channel-icon">
                                        <Icon className={`w-5 h-5 ${color}`} />
                                    </span>
                                    <span>
                                        <span className="site-channel-label">{platform}</span>
                                        <span className="site-channel-status block">Open</span>
                                    </span>
                                </a>
                            );
                        })}
                    </div>
                </aside>

                <form onSubmit={handleSubmit} className="site-card site-form-console">
                    <p className="site-card-label">Send a message</p>

                    <div className="site-form-row">
                        <span className="site-form-label">Name</span>
                        <input
                            className="site-form-input"
                            name="name"
                            type="text"
                            placeholder="Your name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="site-form-row">
                        <span className="site-form-label">Email</span>
                        <input
                            className="site-form-input"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="site-form-row">
                        <span className="site-form-label">Message</span>
                        <textarea
                            className="site-form-input site-form-textarea"
                            name="message"
                            placeholder="Tell me what you are building or where you need help."
                            value={formData.message}
                            onChange={handleChange}
                            required
                            rows={5}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="button button-primary site-form-submit"
                    >
                        {isSubmitting ? "Sending..." : "Send message"}
                    </button>
                </form>
            </div>
        </ModulePage>
    );
}
