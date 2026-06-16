import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = join(__dirname, "..", "dist");

function walk(dir) {
  const results = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) results.push(...walk(path));
    else if (entry.name.endsWith(".js")) results.push(path);
  }
  return results;
}

for (const file of walk(distDir)) {
  let content = readFileSync(file, "utf-8");
  content = content.replace(
    /from\s+"(\.\.?\/[^"]+?)"/g,
    (match, p) => (p.endsWith(".js") ? match : `from "${p}.js"`),
  );
  writeFileSync(file, content);
}
