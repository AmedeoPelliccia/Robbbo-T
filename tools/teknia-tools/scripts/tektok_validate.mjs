#!/usr/bin/env node
import fs from "fs";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";
import YAML from "yaml";
import { expandInputs, readYaml, printAjvErrors } from "./utils.mjs";

const USAGE = "Usage: node scripts/tektok_validate.mjs [tektoks/*.yaml]";

function main() {
  const schema = YAML.parse(fs.readFileSync("schemas/tektok.schema.yaml", "utf8"));
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  addFormats(ajv);
  const validate = ajv.compile(schema);

  const files = expandInputs(process.argv.slice(2), ["tektoks/*.yaml"]);
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
      } else {
        console.log(`✔ ${f}`);
      }
    } catch (e) {
      console.error(`✖ ${f}: ${(e && e.message) || e}`);
      bad++;
    }
  }
  process.exit(bad ? 1 : 0);
}

main();
