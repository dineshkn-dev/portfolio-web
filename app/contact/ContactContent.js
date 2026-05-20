"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { socialIconMap } from "@/components/icons/SocialIcons";
import { useMotionUI } from "@/lib/motion-ui";
import { contactFormEndpoint, socialLinks } from "@/lib/site-content";

export default function ContactContent() {
    const { m, spring, staggerContainer, staggerItem, animateClass, motionInitial, motionAnimate } = useMotionUI();
    const Div = m.div;
    const Aside = m.aside;
    const Form = m.form;
    const Button = m.button;
    const A = m.a;

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
            toast.success("Message sent successfully!");
            setFormData({ name: "", email: "", message: "" });
        } else {
            toast.error("Failed to send message. Try again!");
        }
        setIsSubmitting(false);
    };

    return (
        <section className="page-shell">
            <Div
                className={`section-shell section-stack ${animateClass}`}
                variants={staggerContainer(0.1, 0.1)}
                initial={motionInitial}
                animate={motionAnimate}
            >
                <Div className="section-intro" variants={staggerItem} transition={spring.soft}>
                    <span className="eyebrow">Contact</span>
                    <h1>Let&apos;s build something meaningful.</h1>
                    <p className="section-copy">
                        Reach out for engineering collaboration, consulting, or backend leadership opportunities.
                    </p>
                </Div>

                <Div
                    className="grid-2"
                    variants={staggerContainer(0.08, 0.08)}
                    initial={motionInitial}
                    animate={motionAnimate}
                >
                    <Aside className="glass-card p-6" variants={staggerItem} transition={spring.soft}>
                        <h2 className="text-xl">Social</h2>
                        <p className="mt-2 text-sm">Pick your preferred channel and I&apos;ll respond quickly.</p>
                        <div className="cluster mt-5">
                            {socialLinks.map(({ platform, href, color }) => {
                                const Icon = socialIconMap[platform];

                                return (
                                    <A
                                        key={platform}
                                        href={href}
                                        target={href.startsWith("http") ? "_blank" : undefined}
                                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                                        aria-label={platform}
                                        className="glass-card px-4 py-3 inline-flex items-center gap-3 hover-lift text-[var(--foreground)]"
                                    >
                                        <Icon className={`w-5 h-5 shrink-0 ${color}`} />
                                        <span className="text-sm font-medium">{platform}</span>
                                    </A>
                                );
                            })}
                        </div>
                    </Aside>

                    <Form onSubmit={handleSubmit} className="contact-form p-6" variants={staggerItem} transition={spring.soft}>
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
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="button button-primary w-full disabled:opacity-70"
                        >
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </Button>
                    </Form>
                </Div>
            </Div>
        </section>
    );
}
