import { mkdirSync, writeFileSync } from "node:fs";
import { accessSync, constants } from "node:fs";
import { join } from "node:path";

// Two lines to my past self: one warning about a single moment,
// one sentence on why that moment mattered.
const entry = [
  "Don't send Maya the 11:47 p.m. text that says 'forget it, we're done' — put the phone down and sleep on it.",
  "Because that message stays unsent, the apology you make over coffee the next morning is why the two of you are still talking ten years later.",
].join("\n");

const length = [...entry].length;
if (length < 1 || length > 280) {
  throw new Error(`entry must be 1-280 characters, got ${length}`);
}

function resolveOutputDir(): string {
  const preferred = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  try {
    accessSync(preferred, constants.W_OK);
    return preferred;
  } catch {
    return join(process.cwd(), "output");
  }
}

const outDir = resolveOutputDir();
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
