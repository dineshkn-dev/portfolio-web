# App Router — agent notes

Parent: [AGENTS.md](../AGENTS.md)

## Routes

| Path | `page.js` | Client content |
|------|-----------|----------------|
| `/` | `page.js` | `home/HomeContent.js` |
| `/skills` | `skills/page.js` | `skills/SkillsContent.js` |
| `/about` | `about/page.js` | `about/AboutContent.js` |
| `/projects` | `projects/page.js` | `projects/ProjectsContent.js` |
| `/contact` | `contact/page.js` | `contact/ContactContent.js` |

## Pattern for new routes

```javascript
// app/example/page.js
import dynamic from "next/dynamic";
import PageFallback from "@/components/PageFallback";

const ExampleContent = dynamic(() => import("./ExampleContent"), {
    loading: () => <PageFallback />,
});

export default function Page() {
    return <ExampleContent />;
}
```

- Metadata: export from `page.js` or use `layout.js` per segment.
- SEO: `app/sitemap.js`, `app/robots.js` at app root.
- Do not add a second root layout; extend `app/layout.js` only with care.
- After route changes: `npm run verify` (auto-syncs `llms.txt` + manifest).
