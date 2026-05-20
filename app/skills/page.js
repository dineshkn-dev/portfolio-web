import dynamic from "next/dynamic";
import PageFallback from "@/components/PageFallback";

const SkillsContent = dynamic(() => import("./SkillsContent"), {
    loading: () => <PageFallback />,
});

export const metadata = {
    title: "Skills",
    description:
        "Technical skills and proficiency levels for Dinesh K N — JavaScript, Node.js, cloud platforms, and backend frameworks."
};

export default function SkillsPage() {
    return <SkillsContent />;
}
