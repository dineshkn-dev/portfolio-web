import dynamic from "next/dynamic";
import PageFallback from "@/components/PageFallback";

const ProjectsContent = dynamic(() => import("./ProjectsContent"), {
    loading: () => <PageFallback />,
});

export const metadata = {
    title: "Projects",
    description:
        "Explore projects by Dinesh K N — VaultDeck, Torrin, digital banking APIs, IoT dashboards, HRMS platforms, and ML applications."
};

export default function ProjectsPage() {
    return <ProjectsContent />;
}
