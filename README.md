# sms360x-site

Static marketing landing page for **sms360x.com**, built with [Astro](https://astro.build). It is a separate, public repository from the core SMS360X application. The site is fully static — no backend, forms, analytics, tracking, or third-party fonts — and outputs plain HTML and CSS to `dist/`.

## Run locally

```sh
npm install
npm run dev
```

## Build

```sh
npm run build
```

The generated static site is written to `dist/`. Preview the production build with `npm run preview`.

## Deployment

Pushing to `main` triggers the GitHub Actions workflow in `.github/workflows/deploy.yml`, which builds the site and deploys `dist/` to GitHub Pages.

## DNS

The apex domain `sms360x.com` is configured with GitHub Pages records:

- Four `A` records pointing to the GitHub Pages IP addresses.
- An `AAAA` record set (optional) for IPv6.

These records must be set to **DNS-only (grey cloud)** in Cloudflare so that GitHub Pages can serve the domain and issue its TLS certificate. The `public/CNAME` file pins the custom domain to `sms360x.com`.
