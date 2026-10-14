# Water Under Pressure: Europe's changing water economy

This repository belongs to your team for the case. Everyone on the team has push access.

## Getting started

Your team page on ATELIA walks you through it, with a one-minute video:

- **In your browser (nothing to install):** open Claude Code (claude.ai/code) or Codex (chatgpt.com/codex), connect GitHub, choose this repository, and ask for what you want to build.
- **On your own computer (Mac or Windows):** follow "Prefer to work on your own computer?" on your team page. You install the basics once, then paste two prompts into your agent: one sets everything up, one checks that your prompts reach ATELIA.

You need your own licence: Claude (Pro or higher) or ChatGPT (Plus or higher, for Codex). Your school may provide one.

## Rules

1. **One branch per person, named after your GitHub login.** Your agent creates it for you. Never push to `main` directly, never force-push.
2. **Your prompts are logged automatically** in `prompts/` (one file per person per day). Do not edit or delete them. They reach ATELIA when your agent pushes your branch, which it does at the end of every request.
3. **Never paste a password, a GitHub token or an API key** into your agent or into a file. The setup never needs one. API keys for your app go in a `.env` file, which is never committed. If a key ever lands in a commit, tell ATELIA at once so it can be revoked.
4. **Merge often** into `main` (a pull request every hour or so), so the team's work stays together.

## The case

- **The brief:** `WATER_Case_Brief.md`.
- **The data:** real, free public sources listed in `data/PUBLIC_SOURCES.md`, with the ones not worth your time.
- **In one sentence:** Europe's water stress became an economic story in 2026 (droughts, record-low rivers, industrial risk, EU investment). Pick a real problem inside it and build a tool that helps someone make a better decision, on real public data.

There is no single company and no fixed decision: you choose the angle, the user and the country.

### Before you build, ask yourselves

ATELIA's feedback looks at these questions as much as at the app. Tick them as you go, not at the end.

- [ ] **Data:** what does your app pull, and from where? Is a source rate-limited, or does it need a key?
- [ ] **Keys:** a source's key lives in `.env`, never in the code. ("We only used sources without a key" is a fine answer.)
- [ ] **Online:** once your app is online, does any page expose a key or return raw data to any visitor?
- [ ] **Honesty:** no estimated or invented number is presented as an official figure.
- [ ] **Snapshots:** if you saved a copy of a dataset, is it small, and is its source written next to it?
- [ ] **Robustness:** what happens with an unexpected input, or when the public source is down?
- [ ] **Explainability:** can you explain to someone non-technical what the app decides, and on which real data?
- [ ] **A real user:** does it solve a specific problem for a specific kind of person, or is it a build with no "who is this for"?

### What you hand in

On your ATELIA team page, under Hand-in: the address of your running app and a short note. ATELIA writes back to the team: what held, what did not, what to try next. There is no grade.

## Our approach

*To be written by the team at the end, in business language: what you built, for whom, and why.*

## Need help?

Write to contact@ateliaworkshop.ai with a screenshot.
