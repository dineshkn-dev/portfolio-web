export default function PageFallback() {
    return (
        <div className="hud-module min-h-[50vh] flex items-center justify-center" aria-hidden="true">
            <p className="hud-eyebrow animate-pulse">Loading system module…</p>
        </div>
    );
}
