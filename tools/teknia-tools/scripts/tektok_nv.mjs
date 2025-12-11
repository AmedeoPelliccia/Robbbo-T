#!/usr/bin/env node
import { expandInputs, readYaml } from "./utils.mjs";

const files = expandInputs(process.argv.slice(2), ["tektoks/*.yaml"]);
if (!files.length) {
  console.error("Usage: node scripts/tektok_nv.mjs [tektoks/*.yaml]");
  process.exit(2);
}

let bad = 0;
for (const f of files) {
  try {
    const doc = readYaml(f);
    const t = doc?.tektok; if (!t) { console.error(`✖ ${f}: missing tektok`); bad++; continue; }
    const nv = t.net_value || {};
    const i = nv.inputs || {}, w = nv.weights || {};
    const trl = (i.trl ?? 0) / 9.0;
    const quality = i.quality ?? 0;
    const energy = Math.min((i.energy_saving_pct ?? 0) / 30.0, 1.0);
    const market = i.market_readiness ?? 0;
    const co2e = Math.min((i.co2e_avoided_kg_per_unit ?? 0) / 100.0, 1.0);
    const beta = i.risk_discount ?? 0;
    const score = (Number(w.trl || 0) * trl + Number(w.quality || 0) * quality + Number(w.energy || 0) * energy + Number(w.market || 0) * market + Number(w.co2e || 0) * co2e) * (1 - beta);
    const s = Math.round(score * 1000) / 1000;
    const given = Math.round((nv.score ?? 0) * 1000) / 1000;
    if (Math.abs(s - given) > 0.01) {
      console.error(`✖ ${f} NV mismatch ${given} vs ${s}`);
      bad++;
    } else {
      console.log(`✔ ${f} NV=${s}`);
    }
  } catch (e) {
    console.error(`✖ ${f}: ${(e && e.message) || e}`);
    bad++;
  }
}
process.exit(bad ? 1 : 0);
