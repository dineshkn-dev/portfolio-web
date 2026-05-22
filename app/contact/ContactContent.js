"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { socialIconMap } from "@/components/icons/SocialIcons";
import ModulePage from "@/components/hud/ModulePage";
import { useHudAudio } from "@/components/hud/AudioController";
import { contactFormEndpoint, socialLinks } from "@/lib/site-content";

export default function ContactContent() {
    const { playSfx } = useHudAudio();
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        playSfx("transmit");
        const res = await fetch(contactFormEndpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        if (res.ok) {
            toast.success("Transmission complete.");
            playSfx("success");
            setFormData({ name: "", email: "", message: "" });
        } else {
            toast.error("Transmission failed. Retry uplink.");
            playSfx("error");
        }
        setIsSubmitting(false);
    };

    return (
        <ModulePage
            sysId="SYS-05"
            eyebrow="Comms Channel"
            title="Secure uplink"
            description="Open a direct line for collaboration, consulting, or backend leadership opportunities. Encrypted relay via Formspree."
            aside={
                <div className="hud-telemetry">
                    <strong>ONLINE</strong>
                    <span>Channel status</span>
                </div>
            }
        >
            <div className="hud-comms-layout">
                <aside className="hud-card hud-card--glow-left">
                    <p className="hud-card-label">Signal integrity</p>
                    <div className="hud-signal-bars" aria-hidden="true">
                        <span /><span /><span /><span /><span />
                    </div>
                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">
                        All external channels verified. Average response within 24 hours on
                        business days.
                    </p>

                    <p className="hud-card-label mt-6">Alternate channels</p>
                    <div className="hud-channel-list">
                        {socialLinks.map(({ platform, href, color }) => {
                            const Icon = socialIconMap[platform];
                            return (
                                <a
                                    key={platform}
                                    href={href}
                                    className="hud-channel"
                                    target={href.startsWith("http") ? "_blank" : undefined}
                                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                                    onClick={() => playSfx("click")}
                                >
                                    <span className="hud-channel-icon">
                                        <Icon className={`w-5 h-5 ${color}`} />
                                    </span>
                                    <span>
                                        <span className="hud-channel-label">{platform}</span>
                                        <span className="hud-channel-status block">READY</span>
                                    </span>
                                </a>
                            );
                        })}
                    </div>
                </aside>

                <form onSubmit={handleSubmit} className="hud-card hud-form-console">
                    <p className="hud-card-label">Compose transmission</p>

                    <div className="hud-form-row">
                        <span className="hud-form-label">Name</span>
                        <input
                            className="hud-form-input"
                            name="name"
                            type="text"
                            placeholder="Enter operator name"
                            value={formData.name}
                            onChange={handleChange}
                            onFocus={() => playSfx("hover")}
                            required
                        />
                    </div>
                    <div className="hud-form-row">
                        <span className="hud-form-label">Email</span>
                        <input
                            className="hud-form-input"
                            name="email"
                            type="email"
                            placeholder="Enter secure address"
                            value={formData.email}
                            onChange={handleChange}
                            onFocus={() => playSfx("hover")}
                            required
                        />
                    </div>
                    <div className="hud-form-row">
                        <span className="hud-form-label">Payload</span>
                        <textarea
                            className="hud-form-input hud-form-textarea"
                            name="message"
                            placeholder="Describe mission objectives…"
                            value={formData.message}
                            onChange={handleChange}
                            onFocus={() => playSfx("hover")}
                            required
                            rows={5}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="button button-primary hud-form-submit disabled:opacity-70"
                    >
                        {isSubmitting ? "Transmitting…" : "Initiate Transmission"}
                    </button>
                </form>
            </div>
        </ModulePage>
    );
}
