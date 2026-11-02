import { chromium } from "playwright"; import fs from "fs";
const [gen, out] = process.argv.slice(2);
const b = await chromium.launch({ executablePath: "/opt/pw-browsers/chromium" });
const p = await b.newPage();
p.on("pageerror", (e) => console.log("pageerror", e.message));
await p.goto("http://localhost:8201/wp-login.php");
await p.fill("#user_login", "admin"); await p.fill("#user_pass", "admin"); await p.click("#wp-submit");
await p.waitForURL(/wp-admin/);
await p.goto("http://localhost:8201/wp-admin/post-new.php?post_type=page", { waitUntil: "domcontentloaded" });
await p.waitForFunction(() => window.wp && wp.blocks && wp.blocks.getBlockType("core/cover") && wp.blocks.getBlockType("core/navigation"), null, { timeout: 60000 });
const src = fs.readFileSync(gen, "utf8").trim().replace(/;$/, "");
const res = await p.evaluate(`(${src})()`);
// Kontrollera att varje mönster är giltigt efter en ny tolkning
const check = await p.evaluate((res) => {
  const bad = {};
  const walk = (blocks, slug) => blocks.forEach((bl) => { if (!bl.isValid) (bad[slug] ||= []).push(bl.name + ": " + JSON.stringify(bl.validationIssues?.slice?.(0, 1) || "").slice(0, 300)); walk(bl.innerBlocks, slug); });
  for (const [slug, v] of Object.entries(res)) walk(wp.blocks.parse(v.markup), slug);
  return bad;
}, res);
fs.writeFileSync(out, JSON.stringify(res, null, 1));
console.log(Object.keys(res).length, "patterns; invalid:", JSON.stringify(check));
await b.close();
