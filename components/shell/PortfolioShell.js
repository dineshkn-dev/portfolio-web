import ShellProvider from "@/components/shell/ShellProvider";
import SiteNav from "@/components/shell/SiteNav";
import PageTransition from "@/components/shell/PageTransition";

function PortfolioShellInner({ children }) {
    return (
        <div className="portfolio-shell site-shell">
            <div className="site-chrome">
                <SiteNav />
                <main className="site-main">
                    <PageTransition>{children}</PageTransition>
                </main>
            </div>
        </div>
    );
}

export default function PortfolioShell({ children }) {
    return (
        <ShellProvider>
            <PortfolioShellInner>{children}</PortfolioShellInner>
        </ShellProvider>
    );
}
