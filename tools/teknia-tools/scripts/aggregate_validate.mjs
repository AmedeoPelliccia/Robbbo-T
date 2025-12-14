#!/usr/bin/env node
import fs from "fs";
import YAML from "yaml";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import { expandInputs, readYaml, printAjvErrors } from "./utils.mjs";

const USAGE = "Usage: node scripts/aggregate_validate.mjs [aggregations/*.yaml]";

function main() {
  const schema = YAML.parse(fs.readFileSync("schemas/teknia.aggregation.schema.yaml", "utf8"));
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  addFormats(ajv);
  const validate = ajv.compile(schema);

  const files = expandInputs(process.argv.slice(2), ["aggregations/*.yaml"]);
  if (!files.length) {
    console.error("No input files found.\n" + USAGE);
    process.exit(2);
  }

  let bad = 0;
  for (const f of files) {
    try {
      const doc = readYaml(f);
      if (!validate(doc)) {
        console.error(`✖ ${f}`);
        printAjvErrors(validate, ajv, f);
        bad++;
        continue;
      }
      const ag = doc.aggregation;
      const items = Array.isArray(ag.items) ? ag.items : [];
      const sumAlpha = items.reduce((s, x) => s + (x.alpha || 0), 0);
      if (Math.abs(sumAlpha - 1) > 1e-6) {
        console.error(`✖ ${f}: alpha must sum to 1 (now ${Number(sumAlpha.toFixed(6))})`);
        bad++;
        continue;
      }
      const base = items.reduce((s, x) => s + (x.nv || 0) * (x.alpha || 0), 0);
      const synergy = ag.rules?.synergy?.applied || 0;
      const nv = Math.round((base + synergy) * 1000) / 1000;
      if (ag.nv_portfolio != null && Math.abs(nv - ag.nv_portfolio) > 0.01) {
        console.error(`✖ ${f}: nv_portfolio mismatch given=${ag.nv_portfolio} calc=${nv}`);
        bad++;
        continue;
      }
      console.log(`✔ ${f} NV=${nv}`);
    } catch (e) {
      console.error(`✖ ${f}: ${(e && e.message) || e}`);
      bad++;
    }
  }
  process.exit(bad ? 1 : 0);
}

main();
