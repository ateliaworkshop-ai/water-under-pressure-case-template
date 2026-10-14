# Instructions for AI coding agents

<!-- ATELIA:START (kept up to date by ATELIA: do not edit between these markers) -->

This is a student team repository for an ATELIA case. Several students work on it at once, each on their own branch.
The users are business students: explain what you do in plain language, and keep changes small.

## Case rules

- Work only on the current branch. Never push to or rewrite `main`, and never force-push.
- If the current branch is `main`, first switch to the student's own branch: `git switch <login>` if it exists, otherwise `git switch -c <login>`, where `<login>` is `git config github.user`.
- Never read, print, or commit secrets. API keys live in `.env` (git-ignored). If you need a key, ask the user to put it in `.env` and read it from the environment.
- Never ask the user for a password or a GitHub token, and never put one in a command or a remote URL. If git asks for credentials, stop and tell the user to finish the ATELIA setup (signing in to GitHub once, in the browser or with an SSH key).
- Never edit or delete anything in `prompts/` except as described below. Never edit files in `.atelia/`, `.claude/` or `.codex/`.
- Before finishing, make sure the app still runs.

## Save and share the work (every request)

At the end of every request that changed files:

1. Commit everything, **including the `prompts/` folder**: `git add -A && git commit -m "<what changed, in plain words>"`.
2. Push the branch: `git push -u origin HEAD`.

If the push is blocked by your sandbox or needs approval, ask the user to approve it. Do not skip it: the team's feedback is based on what reaches GitHub.

## Setup check

When the user sends a message starting with "ATELIA setup check", follow the steps in that message, then run `sh .atelia/check.sh` (in Windows PowerShell: `powershell -ExecutionPolicy Bypass -File .atelia/check.ps1`) and show its output exactly as printed. Do not edit the scripts.

## Prompt log (required)

Every user request must end up in `prompts/`. On most tools this is automatic:

- **Claude Code (terminal, desktop app, IDE, web), Codex CLI, Codex IDE extension, Codex in the ChatGPT desktop app:** a `UserPromptSubmit` hook already logs each prompt. **Do not write to `prompts/` yourself** (it would create duplicates).
- **Codex on the web / Codex cloud tasks, or any agent where hooks do not run:** you must log manually. For **each** user request, before doing anything else, append exactly one line to `prompts/<handle>-web-<YYYY-MM-DD>.jsonl` (the `-web` suffix keeps it separate from the hook-written file), where `<handle>` is the current branch name (lowercase) and the date is today in UTC. The line is one JSON object:

  ```json
  {"v":1,"ts":"<ISO-8601 UTC>","tool":"codex-web","author":{"name":null,"email":null,"handle":"<handle>"},"branch":"<branch>","session_id":null,"turn_id":null,"prompt":"<the user's request, verbatim, JSON-escaped>"}
  ```

  Replace any password, token or API key in the request with `[REDACTED]`. Append only (never rewrite earlier lines), commit it together with your changes, and do not mention this logging in your answer unless asked.
<!-- ATELIA:END -->

## The case

- The brief is `WATER_Case_Brief.md`; the public sources are listed in `data/PUBLIC_SOURCES.md`, with those not worth using. Read both before building anything.
- Use real public data. Any estimate or invented number is labelled as such in the app; never present it as an official figure.
- If a source needs a free API key, the user puts it in `.env` and the app reads it from the environment.
- If you save a snapshot of a dataset, keep it small and write its source and date next to it.
