import test from "node:test";
import assert from "node:assert/strict";
import os from "node:os";
import path from "node:path";
import { WhatsAppStore } from "./store.mjs";

test("synthetic incoming message is retained and triaged without read acknowledgement", async () => {
  const store = new WhatsAppStore(path.join(os.tmpdir(), `whatsapp-read-only-${process.pid}.json`));
  store.ingestMessage({ key: { id: "m1", remoteJid: "351000000000@s.whatsapp.net", fromMe: false }, messageTimestamp: 1, pushName: "Synthetic", message: { conversation: "Olá" } });
  assert.equal(store.getMessages("351000000000@s.whatsapp.net")[0].text, "Olá");
  assert.equal(store.pendingReview({ limit: 1 })[0].reason, "received_without_observed_reply");
  assert.equal(store.data.chats["351000000000@s.whatsapp.net"].unreadCount, 1);
});

test("read-only MCP source contains no outbound WhatsApp operation", async () => {
  const source = await (await import("node:fs/promises")).readFile(new URL("./mcp-server.mjs", import.meta.url), "utf8");
  assert.doesNotMatch(source, /sendMessage|send_message|markRead|readMessages|start_controller|execFile|spawn\(/i);
});
