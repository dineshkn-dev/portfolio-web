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
        "hud-page",
        viewportFit ? "hud-page--viewport" : "",
        compact ? "hud-page--compact" : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div className={pageClass}>
            <header className="hud-page-header">
                <div className="hud-page-header-main">
                    {sysId ? <span className="hud-sys-id">{sysId}</span> : null}
                    <p className="hud-eyebrow">{eyebrow}</p>
                    <h1 className="hud-title">{title}</h1>
                    {description && !compact ? (
                        <p className="hud-page-desc">{description}</p>
                    ) : null}
                </div>
                {aside ? <div className="hud-page-header-aside">{aside}</div> : null}
            </header>

            <div className="hud-page-body">{children}</div>
        </div>
    );
}
