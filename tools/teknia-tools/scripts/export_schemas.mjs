#!/usr/bin/env node
import fs from "fs";
import path from "path";
import YAML from "yaml";

const ROOT = process.cwd();
const SCHEMAS_DIR = path.join(ROOT, "schemas");
const OUT_DIR = path.join(ROOT, "schemas", "json");

function readYamlSchema(filePath) {
  const txt = fs.readFileSync(filePath, "utf8");
  return YAML.parse(txt);
}

function writeJson(filePath, obj) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(obj, null, 2) + "\n", "utf8");
}

function main() {
  const inputs = [
    "tektok.schema.yaml",
    "teknia.aggregation.schema.yaml",
  ];

  fs.mkdirSync(OUT_DIR, { recursive: true });
  const out = [];

  for (const name of inputs) {
    const src = path.join(SCHEMAS_DIR, name);
    if (!fs.existsSync(src)) {
      console.error(`Missing schema: ${src}`);
      process.exitCode = 2;
      return;
    }
    const schema = readYamlSchema(src);
    const jsonName = name.replace(/\.ya?ml$/i, ".json");
    const dst = path.join(OUT_DIR, jsonName);
    writeJson(dst, schema);
    out.push(path.relative(ROOT, dst));
  }

  console.log("Exported JSON Schemas:");
  for (const p of out) console.log(`- ${p}`);
}

main();
