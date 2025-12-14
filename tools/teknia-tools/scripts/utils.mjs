import fs from "fs";
import path from "path";
import YAML from "yaml";

// Naive, cross-platform expansion for patterns like "dir/*.yaml" without external deps
export function expandInputs(args, defaults = []) {
  const patterns = (args && args.length ? args : defaults).filter(Boolean);
  const files = [];
  for (const p of patterns) {
    const m = /^(.*)[/\\]\*\.(ya?ml)$/i.exec(p);
    if (m) {
      const dir = m[1];
      const ext = m[2].toLowerCase();
      let list = [];
      try {
        list = fs.readdirSync(dir);
      } catch {
        continue;
      }
      for (const f of list) {
        const full = path.join(dir, f);
        if (fs.statSync(full).isFile() &&
            (f.toLowerCase().endsWith(".yaml") || f.toLowerCase().endsWith(".yml")) &&
            (ext === "yaml" || ext === "yml" || true)) {
          files.push(full);
        }
      }
      continue;
    }
    // If it's a directory, add all YAML files inside
    try {
      if (fs.existsSync(p) && fs.statSync(p).isDirectory()) {
        for (const f of fs.readdirSync(p)) {
          const full = path.join(p, f);
          if (fs.statSync(full).isFile() && (/\.ya?ml$/i).test(f)) files.push(full);
        }
        continue;
      }
    } catch {}
    // Otherwise, assume direct file path
    files.push(p);
  }
  // Deduplicate while preserving order
  return Array.from(new Set(files));
}

export function readYaml(file) {
  try {
    const txt = fs.readFileSync(file, "utf8");
    return YAML.parse(txt);
  } catch (err) {
    const loc = err && err.linePos ? ` at line ${err.linePos.start.line}, col ${err.linePos.start.col}` : "";
    const msg = err && err.message ? err.message : String(err);
    throw new Error(`YAML parse error in ${file}${loc}: ${msg}`);
  }
}

export function printAjvErrors(validate, ajv, file) {
  if (!validate.errors || !validate.errors.length) return;
  for (const e of validate.errors) {
    const where = e.instancePath || e.schemaPath || "(root)";
    const det = e.message || ajv.errorsText([e]);
    console.error(`  - ${where}: ${det}`);
  }
}
