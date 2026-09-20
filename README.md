# Builder Page for Hack Club Pixl

A personal builder page styled as a live status page, where each of my projects is a "service" and its status shows how far along it is.

**Live site:** https://bp.ras-rap.click/

## Description

This is my builder page for [Hack Club Pixl](https://pixl.hackclub.com). Instead of a typical portfolio grid, it looks like the status page of a hosting company or server dashboard. Every project I've built is listed as a service, and the status badge next to it (operational, degraded, and so on) maps to its real development stage. A finished project reads as "operational," while something still in progress or on hold gets a different status. Visitors can see at a glance what I've shipped, what I'm working on, and what's still experimental.

I chose the status-page idea because it fits how I build things. I like infrastructure and hardware, and a dashboard with dark slate backgrounds and LED-style green and amber accents felt more like me than a standard template. Each project entry includes a short description and screenshots, so it works as a real portfolio and not just a novelty.

The site is a static single-page app built with React, TypeScript, and Vite, run with Bun and hosted on Cloudflare Pages. It is more up to date than my [main website](https://ras-rap.click) and includes newer work like my Minecraft mod *Heed The Light*. It also hides a couple of interactive easter eggs (see [Easter Eggs](#easter-eggs)).

**Key features**

- Status-page layout where each project is a service with a status badge
- Status values that correspond to a project's development stage
- Screenshots and descriptions for every project
- Dark, server-rack-inspired theme
- Hidden Konami code effect and secret terminal
- Fully static, so it deploys anywhere that hosts static files

### Screenshots

**Main page**
<img width="601" height="1042" alt="image" src="https://github.com/user-attachments/assets/7cf61ad8-f215-48e1-bb79-d5777d74046e" />

**Konami code effect**
<img width="1862" height="1036" alt="image" src="https://github.com/user-attachments/assets/22b4b15c-aea0-4614-bcda-08948a5b7761" />

**Secret terminal**
<img width="742" height="395" alt="image" src="https://github.com/user-attachments/assets/cb94b82a-5fb9-4dd5-8755-26521be05dcd" />

## Getting Started

### Dependencies

* [Bun](https://bun.sh) (runtime and package manager; Node.js is not required)
* [Git](https://git-scm.com) (only if you clone instead of downloading the zip)
* Any OS Bun supports: macOS, Linux, or Windows
* A modern browser (Chrome, Firefox, Safari, or Edge)

### Installing

1. Get the source code, either by cloning:
```bash
   git clone https://github.com/ras-rap/hc-page.git
   cd hc-page
```
   or by downloading the zip from the green **Code** button on GitHub and extracting it.
2. Install the dependencies:
```bash
   bun install
```

No other files or folders need to be modified to run the site locally.

### Executing program

1. Start the development server:
```bash
   bun run dev
```
2. Open the local URL printed in the terminal (usually http://localhost:5173).
3. To create and preview a production build:
```bash
   bun run build
   bun run preview
```

Or skip setup entirely and visit the hosted version at https://bp.ras-rap.click/.

## Easter Eggs

**Konami Code.** Enter `↑ ↑ ↓ ↓ ← → ← → B A` and the site starts failing and falling apart.

**Secret terminal.** Press the `` ` `` / `~` key to open a hidden terminal that lets you tweak the page and fix the aftermath of the Konami code.

## Help

**`bun: command not found`**
Bun isn't installed or isn't on your PATH. Install it from https://bun.sh, restart your terminal, and confirm with:
```bash
bun --version
```

**Dependency or build errors after pulling changes**
Reinstall dependencies from the lockfile:
```bash
rm -rf node_modules
bun install
```

**Port already in use**
Start the dev server on a different port:
```bash
bun run dev --port 3000
```

**The terminal or Konami code doesn't respond**
Click on the page first so it has keyboard focus, and make sure you're pressing the backtick key (top-left on most keyboards). It may be in a different place on non-US layouts.

## Deployment

Hosted on Cloudflare Pages with these settings:

* Build command: `bun run build`
* Output directory: `dist`

## AI Disclosure

Claude was used to scaffold the base of the site and help fix some bugs. The rest was written by me.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Made by [Ras_rap](https://ras-rap.click)
