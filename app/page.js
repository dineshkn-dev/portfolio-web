import dynamic from "next/dynamic";
import PageFallback from "@/components/PageFallback";

const HomeContent = dynamic(() => import("./home/HomeContent"), {
    loading: () => <PageFallback />,
});

export const metadata = {
    title: "About",
    description:
        "Dinesh K N — Software Engineer building solutions one line of code at a time."
};

export default function Page() {
    return <HomeContent />;
}
