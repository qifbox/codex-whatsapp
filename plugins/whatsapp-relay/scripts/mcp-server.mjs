import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { WhatsAppRuntime } from "./runtime.mjs";
import { storeFile } from "./paths.mjs";

const runtime = new WhatsAppRuntime();
await runtime.initialize();
const server = new McpServer({ name: "whatsapp-readonly", version: "0.1.0" });
const text = (value) => ({ content: [{ type: "text", text: typeof value === "string" ? value : JSON.stringify(value, null, 2) }] });

server.registerTool("whatsapp_status", { description: "Estado da ligação passiva e frescura do cache. Nunca inicia autenticação.", inputSchema: {} }, async () => text(runtime.summary()));
server.registerTool("whatsapp_list_chats", { description: "Consultar conversas no cache local.", inputSchema: { limit: z.number().int().min(1).max(100).optional(), query: z.string().optional(), unreadOnly: z.boolean().optional() } }, async ({ limit, query, unreadOnly }) => text(runtime.store.listChats({ limit, query, unreadOnly })));
server.registerTool("whatsapp_read_messages", { description: "Consultar mensagens já recebidas/enviadas no cache, sem marcar como lidas.", inputSchema: { chatId: z.string(), limit: z.number().int().min(1).max(1000).optional() } }, async ({ chatId, limit }) => text(runtime.store.getMessages(chatId, limit)));
server.registerTool("whatsapp_pending_review", { description: "Sinalizar conversas com mensagens recebidas sem resposta observável no cache; é uma heurística, não uma decisão de envio.", inputSchema: { limit: z.number().int().min(1).max(100).optional() } }, async ({ limit }) => text(runtime.store.pendingReview({ limit })));

await runtime.startPassive();
await server.connect(new StdioServerTransport());
console.error(`WhatsApp read-only MCP ready; cache=${storeFile}`);
