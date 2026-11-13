# Sanjana Banjare Portfolio

React 19 + Vite 8 single-page portfolio. The production build is a static site written to `dist/`.

## Local development

Requires Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

## Verify and build

```sh
npm run check
npm run preview
```

`npm run check` runs Oxlint and a production build. GitHub Actions runs this check for pushes and pull requests.

## Deploy

This project is configured for root-domain static hosting, such as Netlify or Cloudflare Pages:

- Build command: `npm ci && npm run build`
- Publish directory: `dist`
- Deploy the repository root (not a nested URL path)
- Enable the provider's automatic HTTPS and attach the intended custom domain

The files in `public/_headers` provide the Content Security Policy and browser security headers on Netlify and Cloudflare Pages. For another host, configure the same headers in its dashboard or static-host configuration; a static file cannot enforce response headers by itself. After deploying, verify in the browser's Network panel that the production document response includes `Content-Security-Policy`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `X-Frame-Options`, and `Strict-Transport-Security`.

The Content Security Policy allows the Google Fonts stylesheet and font files used by the site. It does not allow third-party scripts, plugins, embeds, or analytics. If any are added later, update the policy narrowly and test it in production.

## Security notes

- This is a static frontend with no API server or secret values. Never put private API keys or credentials in `src/`, `public/`, or Vite `VITE_*` variables; client-side values are shipped to every visitor.
- Contact form submission opens the visitor's mail application. It does not send or store messages on a server.
- Keep `package-lock.json` committed and use `npm ci` for reproducible installs. Review `npm audit` output before dependency updates.
- `public/` is published as-is. Keep source scripts, scratch assets, credentials, and local-only files outside it.
- Keep the HTTPS deployment enabled so the HSTS header is effective.
