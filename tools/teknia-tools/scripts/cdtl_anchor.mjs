#!/usr/bin/env node
import fs from "fs"; import crypto from "crypto";
const file = process.argv[2]; const network = process.argv[3] || "mock";
if (!file){ console.error("Usage: npm run hash -- <file> [network]"); process.exit(2); }
let txt = fs.readFileSync(file,"utf8").replace(/\r\n/g,"\n"); if (!txt.endsWith("\n")) txt+="\n";
const sha = crypto.createHash("sha256").update(txt,"utf8").digest("hex");
const tx = "0x"+sha.slice(0,12); const now = new Date().toISOString();
console.log(JSON.stringify({ file, sha256: sha, mock_cdtl: { network, tx_id: tx, ts: now } }, null, 2));
