import dynamic from "next/dynamic";
import PageFallback from "@/components/PageFallback";

const ContactContent = dynamic(() => import("./ContactContent"), {
    loading: () => <PageFallback />,
});

export const metadata = {
    title: "Contact",
    description:
        "Get in touch with Dinesh K N via email, LinkedIn, or GitHub."
};

export default function ContactPage() {
    return <ContactContent />;
}
