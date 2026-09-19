import type { ContactLink, Incident, Service } from './types';

export const profile = {
  handle: 'Ras',
  tagline: 'I build random stuff whenever I feel like it, ranging from simple websites to custom hardware and software. I also run a small game server hosting business called Kraken Hosting.',
  /** ISO date shown in the banner and used as "today" for the uptime bars. TODO: bump when you edit. */
  lastUpdated: '2026-09-18',
  contacts: [
    { label: 'GitHub', href: 'https://github.com/ras-rap' },
    { label: 'Discord', href: 'https://discordapp.com/users/867970591267881000' },
  ] as ContactLink[],
  repo: 'https://github.com/ras-rap/hc-page',
};

/**
 * operational = shipped and working, degraded = works with known problems,
 * maintenance = in development, outage = broken or shelved.
 */
export const services: Service[] = [
  {
    id: 'kraken',
    name: 'Kraken Hosting',
    status: 'operational',
    blurb: 'Game server hosting. I used to run the infrastructure, DevOps, and development mostly myself. Now it\'s co-run by a couple friends and I.',
    live: 'https://krakenhosting.net',
    screenshot: 'screenshots/kh.png',
  },
  {
    id: 'htl',
    name: 'Heed the light',
    status: 'operational',
    blurb: 'A minecraft mod I made for a friend that damages you while in the darkness for too long, meant for his horror modpack streams.',
    repo: 'https://github.com/ras-rap/heed-the-light',
    live: 'https://modrinth.com/mod/htl',
    screenshot: 'screenshots/htl.png',
  },
  {
    id: 'logforge',
    name: 'LogForge',
    status: 'maintenance',
    blurb: 'A web app that reads Minecraft logs and explains what went wrong.',
    repo: 'https://github.com/ras-rap/logforge',
  },
   {
    id: 'dms',
    name: 'DM Screen',
    status: 'operational',
    blurb: 'A website for D&D DMs to manage rolls, players, enemies, notes, etc. (This was my first web project)',
    stack: ['React', 'TypeScript', 'TailwindCSS'],
    repo: 'https://github.com/ras-rap/dm-screen',
    live: 'https://dms.ras-rap.click',
    screenshot: 'screenshots/dms.png',
  },
  {
    id: 'keyboard-pcb',
    name: 'Custom 80% keyboard',
    status: 'maintenance',
    blurb: 'A keyboard PCB I designed from scratch in KiCad for the Hack Club Keeb program (I never shipped it :sad:).',
    stack: ['KiCad'],
    repo: 'https://github.com/ras-rap/keeb',
    // screenshot: 'screenshots/keyboard-pcb.png',
  },
  {
    id: 'ignis',
    name: 'Ignis',
    status: 'maintenance',
    blurb: 'A voice assistant that runs entirely on your own machine.',
    stack: ['Rust', 'Tauri'],
  },
  {
    id: 'bolt',
    name: 'Bolt',
    status: 'outage',
    blurb: 'A mod I made for the game "Screw Drivers" dedicated server to add actual admin features.',
    stack: ['C#', 'Bepinex'],
    repo: 'https://github.com/ras-rap/bolt',
  }
  
 
  
];

export const incidents: Incident[] = [
  {
    date: '2026-09-15',
    title: 'DMS was re-hosted and put on cloudflare pages.',
    resolved: true,
    body: 'I put it on cloudflare pages after years of it not being accessible because someone asked me to bring it back.',
  },
  {
    date: '2024-08-15',
    title: 'Kraken Hosting re-launched',
    resolved: true,
    body: 'Kraken Hosting was re-launched after roughly a year of us abandoning it.',
  },
  {
    date: '2024-06-21',
    title: 'Played Screw Drivers for the first time',
    resolved: false,
    body: 'The first time I played Screw Drivers, which lead to me continuing to mod it, even to this day. (I\'ve never actually played the game the correct way, just make random dumb mods.)',
  }
];
