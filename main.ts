import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';

// The Painfully Honest Out-of-Office — make.fun bounty entry.
// One brutally honest but still polite out-of-office auto-reply.
// The line is 175 characters: honest about being glad to be away, yet
// reassuring ("queued, not forgotten") and polite ("fresh eyes and full
// politeness") enough that a manager would let it stand.
// This program writes that single line to /output/entry.txt, where the
// sealed gate scorer checks it is UTF-8 text of 1-200 characters, not
// only whitespace, on one single line with no trailing newline.

const LINE = "Out of office until Monday, and honestly grateful for the distance — your email is queued, not forgotten, and I'll answer it with fresh eyes and full politeness when I return.";

// Gate: 1-200 characters, a single line, no trailing newline.
if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`Line must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.includes('\n') || LINE.includes('\r')) {
  throw new Error('Line must be a single line');
}

mkdirSync('/output', { recursive: true });
writeFileSync('/output/entry.txt', LINE, 'utf8');

// Read back and verify byte-for-byte: the file must be exactly the line,
// with no trailing newline added by the write.
const back = readFileSync('/output/entry.txt', 'utf8');
if (back !== LINE) {
  throw new Error('Read-back mismatch: /output/entry.txt does not match the line byte-for-byte');
}
if (back.length !== LINE.length || back.endsWith('\n')) {
  throw new Error('Read-back failed gate shape: expected one line, no trailing newline');
}

console.log(`Wrote ${LINE.length} characters to /output/entry.txt`);
console.log(LINE);
