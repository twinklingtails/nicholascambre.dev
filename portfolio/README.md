# Nicholas Cambre — Portfolio

A modern, resilient portfolio built with **Next.js 15 (App Router)** and **Tailwind CSS**, deployed behind **Cloudflare Tunnel** and managed with **PM2**. It showcases projects, skills, and case studies with clean, accessible UI and production-ready routing.

## 🚀 Live

- Public Site: **https://nicholascambre.dev**
- Projects: `/projects` and `/projects/[slug]`
- About/Contact: `/about`, `/contact`

---

## ✨ Features

### Public Portfolio
- **Purposeful Design** — Clear typography, subtle motion, and a curated card grid.
- **Case Studies** — Each project gets a dedicated page under `/projects/[slug]`.
- **Theming** — System theme detection + manual toggle; dark-mode first contrast.
- **Optimized Assets** — Standalone Next.js output; static image assets in `public/`.
- **SEO Ready** — Per-page titles/descriptions via `generateMetadata` and semantic markup.
- **Accessibility** — Keyboard-friendly, high contrast, and ARIA-considerate components.

### Operations
- **Cloudflare Tunnel** — Secure inbound access without opening ports.
- **PM2** — Process manager for uptime, logs, and zero-downtime restarts.
- **Clean Redirects** — Middleware removing legacy `?panel=` routes to new pages.
- **Edge Headers** — Sensible security headers via Cloudflare (and easily extendable).

---

## 🧰 Tech Stack

- **Frontend**: Next.js 15 (App Router), React, TypeScript, Tailwind CSS
- **UI**: Custom components, responsive grid, minimal dependencies
- **Build**: Next standalone (`output: "standalone"`), npm scripts
- **Runtime**: Node.js (served via PM2)
- **Edge / Networking**: Cloudflare Tunnel (cloudflared)

---

## 🏗️ Architecture

### Project Structure (simplified)

```
portfolio/
├── app/
│   ├── about/page.tsx
│   ├── contact/page.tsx
│   ├── page.tsx                     # Home
│   ├── projects/
│   │   ├── [slug]/page.tsx          # Dynamic case-study pages
│   │   └── page.tsx                 # Projects index
│   ├── components/
│   │   ├── SkillsTicker.tsx
│   │   └── ThemeToggle.tsx
│   ├── data/
│   │   └── projects.ts              # Project registry (title, tags, images, etc.)
│   └── globals.css
├── middleware.ts                    # Legacy URL redirects (e.g., ?panel=projects → /projects)
├── public/
│   ├── nicholascambredevwebsite.jpg # Site-wide background asset
│   └── projects/*                   # Per-project imagery
├── next.config.ts
├── tailwind.config.js
├── postcss.config.js
├── package.json
└── tsconfig.json
```

> Add rich, per-project content by expanding `app/data/projects.ts` and (optionally) a `content` registry for longform sections.

---

## 🔒 Security & Routing

- **Cloudflare** front door (TLS, DDoS, WAF) → **cloudflared** tunnel → **localhost** app.
- **Middleware** cleans up legacy query-param based routes:
  - `/?panel=projects` → `/projects`
  - `/?panel=about` → `/about`
  - `/?panel=contact` → `/contact`

---

## 🛠️ Local Development

### Prerequisites
- Node.js 18+
- npm (or pnpm/yarn, if you prefer)

### Install & Run

```bash
cd portfolio
npm install
npm run dev
# open http://localhost:3000
```

---

## 📦 Production Build

```bash
# from portfolio/
rm -rf .next
npm run build
# run however you prefer; with PM2:
pm2 start npm --name "portfolio" -- start
# or if you already have an ecosystem file / process, just:
pm2 restart portfolio
pm2 logs portfolio
```

> Build uses `output: "standalone"` in `next.config.ts` for lean, portable runtime.

---

## 🌐 Cloudflare Tunnel (cloudflared)

Example systemd service (already in place on your server):

```
/etc/systemd/system/cloudflared.service
ExecStart=/usr/local/bin/cloudflared --no-autoupdate --config /etc/cloudflared/config.yml tunnel run
```

Example `config.yml` for **nicholascambre.dev** tunnel:

```yaml
tunnel: nicholascambre    # your tunnel name
credentials-file: /home/youruser/.cloudflared/<UUID>.json

ingress:
  - hostname: nicholascambre.dev
    service: http://localhost:4100   # or 3000/your chosen port
  - hostname: www.nicholascambre.dev
    service: http://localhost:4100
  - service: http_status:404
```

Then:

```bash
sudo systemctl daemon-reload
sudo systemctl enable cloudflared
sudo systemctl restart cloudflared
sudo systemctl status cloudflared -l
```

> DNS: set `CNAME` or Cloudflare “DNS only/Proxied” to the tunnel as configured in your CF dashboard.

---

## 🚀 Deployment Flow (PM2 + cloudflared)

1. **Pull changes**
   ```bash
   git pull origin main
   ```
2. **Build**
   ```bash
   npm ci
   npm run build
   ```
3. **Restart app**
   ```bash
   pm2 restart portfolio
   ```
4. **Verify**
   ```bash
   pm2 logs portfolio
   curl -I https://nicholascambre.dev
   ```

---

## 🔍 SEO & Performance

- `generateMetadata` for titles/descriptions on project pages.
- Static images in `public/` (serve modern formats where possible).
- Minimal JS and no heavy UI libs by default.
- Longform content uses `prose prose-invert` (readable dark mode).

**Lighthouse (typical local dev)**  
- Accessibility: High  
- Best Practices: High  
- SEO: High  
- Performance: Dependent on network and image sizes; optimize hero assets for production.

---

## 🧪 Testing & Checks

**Manual checklist**
- Navigation: `/`, `/projects`, `/projects/[slug]`, `/about`, `/contact`
- Dark/light toggle and theme persistence
- Mobile spacing, tap targets, and font scaling
- Legacy redirects (`/?panel=projects|about|contact`)
- 404 for unknown slugs
- Cloudflare Tunnel reachability & TLS

**Future enhancements**
- Jest + React Testing Library for components
- Playwright E2E for nav, redirects, and slug pages
- Lint/type checks in CI

---

## 🔧 Content Editing

Add/edit projects in `app/data/projects.ts`:

```ts
{
  slug: "cloudflare-nginx-edge",
  title: "Cloudflare + Nginx Edge",
  tagline: "Zero-downtime deploys, cache rules, and hardened TLS",
  description: "Reverse proxy with rate limiting, cache keys, and clean rollout strategies.",
  tags: ["Nginx", "Cloudflare", "DevOps", "Security"],
  heroImage: "/projects/cf-nginx.jpg"
}
```

Place images under `public/projects/…`. Each item automatically appears on `/projects` and renders at `/projects/[slug]`.

---

## 📫 Contact

- Portfolio: **https://nicholascambre.dev**
- GitHub: **https://github.com/twinklingtails**
- LinkedIn: **https://www.linkedin.com/in/nicholascambre**

---

## 📝 License

Private / All rights reserved (update if you prefer MIT/Apache-2.0).
