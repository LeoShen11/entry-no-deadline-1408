// One Line, No Deadline Met — entry program (Node 22).
// Writes a single-line joke excusing a missed deadline to /output/entry.txt,
// then reads it back and exits 0 only on an exact match.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "I missed the deadline because my to-do list filed a complaint about unrealistic expectations and went on strike.";

const OUT_PATH = "/output/entry.txt";

function fail(message: string): never {
  console.error(`INVALID: ${message}`);
  process.exit(1);
}

// --- validation: the line must be a single line, 1-200 chars, real content ---
const chars = [...LINE].length; // count Unicode code points, not UTF-16 units
const words = LINE.trim().split(/\s+/).filter(Boolean);
if (chars < 1 || chars > 200) fail(`length ${chars} chars is outside 1-200`);
if (LINE.includes("\n") || LINE.includes("\r")) fail("line contains a newline");
if (LINE !== LINE.trim()) fail("line has leading or trailing whitespace");
if (words.length < 5) fail(`only ${words.length} words, too thin for a joke`);
if (!/deadline/i.test(LINE)) fail("line does not mention the deadline");
if (!/[.!?]$/.test(LINE)) fail("line does not end with terminal punctuation");
if (/\s{2,}/.test(LINE)) fail("line contains a double space");

console.log(`line OK: ${chars} chars, ${words.length} words`);

// --- write, then read back and verify byte-for-byte ---
mkdirSync("/output", { recursive: true });
writeFileSync(OUT_PATH, LINE, "utf8");
const back = readFileSync(OUT_PATH, "utf8");
if (back !== LINE) fail("read-back mismatch: entry.txt differs from the line");
if ([...back].length !== chars) fail("read-back length mismatch");
// read-back word-count check: the file on disk must carry exactly the words written
const backWords = back.trim().split(/\s+/).filter(Boolean);
if (backWords.length !== words.length)
  fail(`read-back word count ${backWords.length} != written ${words.length}`);
if (back.endsWith("\n")) fail("entry.txt has a trailing newline");

console.log(`wrote ${OUT_PATH} (${chars} chars), read-back exact match`);
console.log(LINE);
