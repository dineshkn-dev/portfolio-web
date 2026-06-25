import Link from "next/link";
import { homeBrief, homeStats, projects } from "@/lib/site-content";

export default function HomeContent() {
    const featuredApps = projects.filter((p) => p.featured);

    return (
        <div className="portfolio-home">
            <section className="portfolio-hero">
                <div className="home-hero-copy">
                    <p className="site-eyebrow">{homeBrief.eyebrow}</p>
                    <h1 className="site-title">{homeBrief.headline}</h1>
                    <p className="site-typewriter">{homeBrief.subline}</p>

                    <div className="site-hero-actions">
                        <Link href="/projects" className="button button-primary">
                            View selected work
                        </Link>
                        <Link href="/contact" className="button button-ghost">
                            Start a conversation
                        </Link>
                    </div>
                </div>

                <aside className="home-hero-proof" aria-label="Engineering focus">
                    <p className="site-card-label">What I bring</p>
                    <div className="home-proof-grid">
                        {homeStats.map((stat) => (
                            <div key={stat.label} className="home-proof-row">
                                <strong>{stat.value}</strong>
                                <span>{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </aside>
            </section>

            {featuredApps.length > 0 ? (
                <section className="portfolio-featured" aria-label="Featured software">
                    <div className="portfolio-featured-head">
                        <p className="site-eyebrow">Featured products</p>
                        <Link
                            href="/projects"
                            className="portfolio-featured-more"
                        >
                            View all work
                        </Link>
                    </div>
                    <div className="portfolio-featured-grid">
                        {featuredApps.map((app) => (
                            <article key={app.title} className="site-launch-card">
                                <h2 className="site-launch-card-title">{app.title}</h2>
                                <p className="site-launch-card-tagline">{app.featuredTagline}</p>
                                <div className="site-launch-card-links">
                                    {app.links?.map((link) => (
                                        <a
                                            key={link.href}
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="site-launch-link"
                                        >
                                            {link.label}
                                        </a>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            ) : null}

            <div className="site-stat-grid">
                {homeStats.map((stat) => (
                    <article
                        key={stat.label}
                        className="site-stat-card site-stat-card--static"
                    >
                        <strong>{stat.value}</strong>
                        <span>{stat.label}</span>
                    </article>
                ))}
            </div>

        </div>
    );
}
