/**
 * Shared Framer Motion configs - Telegram-style springs & variants
 */

export const spring = {
  soft: { type: "spring", stiffness: 300, damping: 25 },
  bouncy: { type: "spring", stiffness: 400, damping: 20 },
  snappy: { type: "spring", stiffness: 500, damping: 30 },
  gentle: { type: "spring", stiffness: 200, damping: 22 },
  modal: { type: "spring", stiffness: 350, damping: 28 },
};

export const fadeInUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { type: "spring", stiffness: 300, damping: 24 },
};

export const staggerContainer = (delayChildren = 0.1, staggerChildren = 0.08) => ({
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { delayChildren, staggerChildren },
  },
});

export const staggerItem = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { type: "spring", stiffness: 350, damping: 26 },
};

export const tapScale = { scale: 0.96 };
export const hoverScale = { scale: 1.02 };
