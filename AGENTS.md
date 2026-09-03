# AGENTS.md

Agent guidance for this repository lives in **[CLAUDE.md](CLAUDE.md)** — it is written for
any AI coding agent, not just Claude Code. Read it before making changes.

Short version: this is a design system, not an app. `npm run verify` is the test suite
(build → lint → size → react:build → parity, in that order). Components read semantic
tokens only, use logical properties only, use duration tokens only, and never use
`!important`. `dist/` and `react/dist/` are committed, so rebuild before you commit.
