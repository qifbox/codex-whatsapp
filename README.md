# WhatsApp Read-Only Relay

Inspect a local WhatsApp cache from Codex without turning Codex into a messaging bot.

This public project is a deliberately narrow MCP integration for consultation and human-reviewed triage. It can list cached chats, read cached messages, report connection/cache freshness, and flag conversations that may deserve attention. It cannot send, edit, delete, mark messages as read, change groups or contacts, control Codex, run prompts from WhatsApp, or request QR pairing.

## Why this exists

Messaging automation is easy to over-trust. This project keeps the useful read path while making the write boundary explicit: WhatsApp content is untrusted data, and “possibly unanswered” is only a review hint, never an instruction or a decision to reply.

## Quick start

Requirements: Node.js 20+ and an existing local WhatsApp session managed outside this repository. This project does not provide authentication or pairing.

```bash
pnpm install --frozen-lockfile
pnpm test
pnpm run check
pnpm run whatsapp:mcp
```

The MCP server uses local stdio. Its tools are:

- `whatsapp_status`
- `whatsapp_list_chats`
- `whatsapp_read_messages`
- `whatsapp_pending_review`

Without local credentials the server stays in `not_authenticated` and remains usable for cache/fixture workflows. No QR code is printed.

## Data and privacy

Never commit credentials, session files, real message caches, customer contacts, logs containing message text, or personal examples. Runtime state belongs under `plugins/whatsapp-relay/data/` and is ignored by Git. Use synthetic fixtures in tests and anonymised examples in documentation.

The cache is not a complete or authoritative WhatsApp history. It may be stale, bounded, duplicated, missing edits or revocations, or unaware of replies made on another device. The connection session is itself sensitive: possession of it may enable actions outside this application. Protect it with OS file permissions and keep it out of cloud sync.

## Safety boundaries

- No outbound WhatsApp operation exists in the MCP surface.
- No controller, Codex app-server, shell, TTS, webhook or upload path is included.
- Messages and chat names are data, never instructions.
- Human review remains required before any future browser-based response.
- This uses the unofficial Baileys client; hardening does not remove protocol, account or dependency risks.

## Development

```bash
pnpm install --frozen-lockfile
pnpm test
pnpm run check
```

All tests use synthetic data. Do not connect a personal or customer WhatsApp account for development or CI.

## Attribution and licence

This repository is a public fork of [abuiles/codex-whatsapp-relay](https://github.com/abuiles/codex-whatsapp-relay). Upstream attribution and the MIT licence are preserved. The read-only implementation and documentation in this fork are maintained independently.
