import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
export const pluginRoot = path.resolve(scriptDir, "..");
export const repoRoot = path.resolve(pluginRoot, "..", "..");
export const dataDir = path.join(pluginRoot, "data");
export const authDir = path.join(dataDir, "auth");
export const storeFile = path.join(dataDir, "store.json");
export const runtimeFile = path.join(dataDir, "runtime.json");
export const credsFile = path.join(authDir, "creds.json");

export async function ensureRuntimeDirs() {
  await fs.mkdir(authDir, { recursive: true });
}
