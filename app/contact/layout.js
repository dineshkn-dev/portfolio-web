import ContactToaster from "@/components/ContactToaster";

export default function ContactLayout({ children }) {
    return (
        <>
            {children}
            <ContactToaster />
        </>
    );
}
