"use client";

export default function ModulePage({
    sysId,
    eyebrow,
    title,
    description,
    aside,
    children,
    className = "",
    viewportFit = false,
    compact = false,
}) {
    const pageClass = [
        "site-page",
        viewportFit ? "site-page--viewport" : "",
        compact ? "site-page--compact" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={pageClass}>
            <header className="site-page-header">
                <div className="site-page-header-main">
                    {sysId ? <span className="site-section-kicker">{sysId}</span> : null}
                    <p className="site-eyebrow">{eyebrow}</p>
                    <h1 className="site-title">{title}</h1>
                    {description && !compact ? (
                        <p className="site-page-desc">{description}</p>
                    ) : null}
                </div>
                {aside ? <div className="site-page-header-aside">{aside}</div> : null}
            </header>

            <div className="site-page-body">{children}</div>
        </div>
    );
}
