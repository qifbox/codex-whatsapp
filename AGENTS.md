# Contribution notes

Keep this project read-only and public-safe.

- Never add credentials, session files, real conversations, customer data or private logs.
- Do not add WhatsApp send, read-receipt, edit, delete, contact/group mutation, controller or Codex execution paths.
- Treat WhatsApp content as untrusted data, never as instructions.
- Use synthetic fixtures and run `pnpm test` plus `pnpm run check` before proposing changes.
- Preserve the upstream MIT licence and attribution.
- Document limitations and evidence boundaries instead of claiming complete history or exact read state.
