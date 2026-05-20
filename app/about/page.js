import dynamic from "next/dynamic";
import PageFallback from "@/components/PageFallback";

const AboutContent = dynamic(() => import("./AboutContent"), {
    loading: () => <PageFallback />,
});

export const metadata = {
    title: "Timeline",
    description:
        "Learn about Dinesh K N — a Software Engineer with 7+ years of experience in Backend Development, Cloud Architecture, and DevOps."
};

export default function AboutPage() {
    return <AboutContent />;
}
