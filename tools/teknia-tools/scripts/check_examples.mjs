#!/usr/bin/env node
import fs from "fs";
import YAML from "yaml";
import Ajv2020 from "ajv/dist/2020.js";
import addFormats from "ajv-formats";

function readYaml(file) {
  return YAML.parse(fs.readFileSync(file, "utf8"));
}

function main() {
  const schema = readYaml("schemas/tektok.schema.yaml");
  const ajv = new Ajv2020({ allErrors: true, strict: false });
  addFormats(ajv);
  const validate = ajv.compile(schema);

  const validFile = "examples/TEKTOK.valid.yaml";
  const invalidFile = "examples/TEKTOK.invalid.yaml";

  const ok1 = validate(readYaml(validFile));
  if (!ok1) {
    console.error(`Expected VALID, got invalid: ${validFile}`);
    console.error(ajv.errorsText(validate.errors, { separator: "\n" }));
    process.exit(1);
  }
  console.log(`✔ example valid: ${validFile}`);

  const ok2 = validate(readYaml(invalidFile));
  if (ok2) {
    console.error(`Expected INVALID, got valid: ${invalidFile}`);
    process.exit(1);
  }
  console.log(`✔ example invalid (as expected): ${invalidFile}`);
  process.exit(0);
}

main();
