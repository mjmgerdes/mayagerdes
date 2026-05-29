# Deployment Guide

Recommended setup: Vercel hosts the site, Namecheap keeps managing `mayagerdes.com`, and GitHub becomes the source of truth for updates.

## 1. Push This Project To GitHub

Create a new GitHub repo for the portfolio, then push this folder.

```bash
git init
git add .
git commit -m "Build personal portfolio"
git branch -M main
git remote add origin https://github.com/mjmgerdes/YOUR_REPO_NAME.git
git push -u origin main
```

## 2. Import The Repo In Vercel

1. Go to [vercel.com/new](https://vercel.com/new).
2. Import the GitHub repo.
3. Use the Vite defaults:
   - Framework preset: `Vite`
   - Build command: `npm run build`
   - Output directory: `dist`
4. Deploy.

Vercel will automatically create preview deployments for non-production branches and production deployments from the production branch, usually `main`.

## 3. Add `mayagerdes.com` In Vercel

In the Vercel project:

1. Open `Settings -> Domains`.
2. Add `mayagerdes.com`.
3. Add `www.mayagerdes.com`.
4. Choose one canonical domain, usually `mayagerdes.com`, and redirect the other to it.

## 4. Point Namecheap DNS To Vercel

In Namecheap:

1. Open `Domain List -> Manage -> Advanced DNS`.
2. In `Host Records`, add or edit these records:

| Type | Host | Value | TTL |
| --- | --- | --- | --- |
| A Record | `@` | `76.76.21.21` | Automatic |
| CNAME Record | `www` | `cname.vercel-dns-0.com` | Automatic |

Vercel may show project-specific DNS values in its dashboard. If Vercel gives you different values, use Vercel's values.

Remove conflicting records for the same hosts, especially old `A`, `CNAME`, `ALIAS`, or URL redirect records for `@` or `www`.

## 5. Verify

In Vercel, wait for DNS verification and SSL provisioning to complete. DNS often works within minutes, but it can take longer depending on propagation.

## GitHub Update Behavior

There are two kinds of updates:

- Site code or copy changes: push to the production branch, and Vercel will rebuild and redeploy the live site.
- Public GitHub repo activity: the Builds section fetches public repo data from GitHub in the browser. New public repos, changed descriptions, and updated timestamps can appear on page load without redeploying, subject to GitHub/API caching and rate limits.
