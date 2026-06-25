export const SITE_STORAGE_KEYS = {
    theme: "portfolio-theme",
};

export const SITE_ROUTES = [
    { id: "home", label: "Home", path: "/" },
    { id: "skills", label: "Skills", path: "/skills" },
    { id: "timeline", label: "Experience", path: "/about" },
    { id: "projects", label: "Work", path: "/projects" },
    { id: "contact", label: "Contact", path: "/contact" },
];

export function getRouteFromPath(pathname) {
    return SITE_ROUTES.find((m) => m.path === pathname) ?? SITE_ROUTES[0];
}
