import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Fortune Cookie Wisdom for Developers — one original line, 1-120 chars.
const ENTRY =
  "The legacy code you curse was written by someone in a hurry — just like you.";

function validateEntry(text: string): void {
  // Gate (RULES.txt): UTF-8 text of 1 to 120 characters, not only white space.
  if (text.length < 1 || text.length > 120) {
    throw new Error(`entry must be 1-120 characters, got ${text.length}`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not have leading or trailing white space");
  }
}

validateEntry(ENTRY);
mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Post-write byte check: what landed on disk must be exactly ENTRY,
// same characters and same UTF-8 byte length.
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== ENTRY) {
  throw new Error("post-write check failed: file differs from ENTRY");
}
if (Buffer.byteLength(written, "utf8") !== Buffer.byteLength(ENTRY, "utf8")) {
  throw new Error("post-write check failed: byte length differs");
}
console.log(`entry written: ${ENTRY.length} chars, valid`);
