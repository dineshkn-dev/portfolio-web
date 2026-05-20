"use client";

import { motion, useReducedMotion } from "framer-motion";
import { spring, staggerContainer, staggerItem } from "@/lib/motion";

const staticTags = {
    section: "section",
    div: "div",
    article: "article",
    p: "p",
    h1: "h1",
    span: "span",
    aside: "aside",
    form: "form",
    button: "button",
    a: "a",
};

const motionTags = {
    section: motion.section,
    div: motion.div,
    article: motion.article,
    p: motion.p,
    h1: motion.h1,
    span: motion.span,
    aside: motion.aside,
    form: motion.form,
    button: motion.button,
    a: motion.a,
};

const reducedContainer = () => ({ initial: { opacity: 1 }, animate: { opacity: 1 } });
const reducedItem = { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } };
const reducedSpring = { duration: 0 };

export function useMotionUI() {
    const reduce = useReducedMotion();

    return {
        reduce,
        m: reduce ? staticTags : motionTags,
        spring: reduce ? reducedSpring : spring,
        staggerContainer: reduce ? reducedContainer : staggerContainer,
        staggerItem: reduce ? reducedItem : staggerItem,
        animateClass: reduce ? "animate-in" : "",
        motionInitial: reduce ? false : "initial",
        motionAnimate: reduce ? false : "animate",
    };
}
