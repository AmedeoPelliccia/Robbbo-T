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
      // Support both old and new synergy structure
      const synergy = ag.rules?.synergy?.applied || 0;
      const nv = Math.round((base + synergy) * 1000) / 1000;
      
      // Check nv_portfolio at top level (for backward compatibility) or in computation section
      const expectedNv = ag.computation?.nv_portfolio ?? ag.nv_portfolio;
      if (expectedNv != null && Math.abs(nv - expectedNv) > 0.01) {
        console.error(`✖ ${f}: nv_portfolio mismatch given=${expectedNv} calc=${nv}`);
        bad++;
        continue;
      }
      
      // Optional: validate computation section consistency if present
      if (ag.computation) {
        const compBase = ag.computation.nv_base;
        const compSynergy = ag.computation.nv_synergy;
        if (compBase != null && Math.abs(compBase - base) > 0.01) {
          console.error(`✖ ${f}: computation.nv_base mismatch given=${compBase.toFixed(5)} calc=${base.toFixed(5)}`);
          bad++;
          continue;
        }
        if (compSynergy != null && Math.abs(compSynergy - synergy) > 0.001) {
          console.error(`✖ ${f}: computation.nv_synergy mismatch given=${compSynergy.toFixed(3)} calc=${synergy.toFixed(3)}`);
          bad++;
          continue;
        }
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
