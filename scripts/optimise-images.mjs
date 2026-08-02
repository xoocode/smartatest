#!/usr/bin/env node
/**
 * Normalise a sourced image into a master under /public, following the naming
 * convention in lib/image-config.mjs.
 *
 * Single file:
 *   node scripts/optimise-images.mjs --category smart-belysning \
 *     --id hue-white-color-e27 --role produkt .agent/tmp/bilder/hue.jpg
 *
 * Category editorial (no product id):
 *   node scripts/optimise-images.mjs --category smart-belysning \
 *     --role hero .agent/tmp/bilder/hero.png
 *
 * Portrait:
 *   node scripts/optimise-images.mjs --person daniel-hedin foto.jpg
 *
 * Batch a folder whose filenames already follow `{id}-{role}.{ext}`:
 *   node scripts/optimise-images.mjs --category smart-belysning --batch .agent/tmp/bilder
 *
 * Output is high-quality WebP with alpha preserved, EXIF stripped and
 * orientation baked in. We store one master per image rather than pre-rendered
 * size variants, because next/image derives responsive widths and AVIF at
 * request time. Storing AVIF here instead would mean lossy-on-lossy.
 */

import { mkdir, readdir, stat } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import sharp from "sharp";

import { IMAGE_ROLES, MASTER_WIDTH } from "../lib/image-config.mjs";

const PUBLIC_DIR = path.resolve(process.cwd(), "public", "bilder");
const SOURCE_EXT = /\.(jpe?g|png|webp|avif|tiff?)$/i;

function parseArgs(argv) {
  const args = { positional: [] };
  for (let i = 0; i < argv.length; i += 1) {
    const token = argv[i];
    if (token.startsWith("--")) {
      const key = token.slice(2);
      const next = argv[i + 1];
      if (!next || next.startsWith("--")) {
        args[key] = true;
      } else {
        args[key] = next;
        i += 1;
      }
    } else {
      args.positional.push(token);
    }
  }
  return args;
}

function fail(message) {
  console.error(`\n  ${message}\n`);
  process.exit(1);
}

/** WebP master: near-lossless quality, alpha kept, slowest effort for size. */
async function writeMaster(sourcePath, outPath, width) {
  await mkdir(path.dirname(outPath), { recursive: true });

  const pipeline = sharp(sourcePath, { failOn: "error" })
    /* Bake EXIF orientation in, then drop all metadata. Merchant feed images
       frequently carry rotation flags and stray colour profiles. */
    .rotate()
    .resize({
      width,
      /* Never upscale a small source: it adds bytes and no detail. */
      withoutEnlargement: true,
      fit: "inside",
    })
    .webp({ quality: 90, effort: 6, smartSubsample: true });

  const info = await pipeline.toFile(outPath);
  const before = (await stat(sourcePath)).size;

  const rel = path.relative(process.cwd(), outPath);
  const pct = Math.round((1 - info.size / before) * 100);
  console.log(
    `  ${rel}\n    ${info.width}x${info.height}  ` +
      `${(before / 1024).toFixed(0)} kB -> ${(info.size / 1024).toFixed(0)} kB  (${pct}% mindre)`,
  );
}

function assertRole(role) {
  if (!IMAGE_ROLES.includes(role)) {
    fail(`Okänd roll "${role}". Giltiga: ${IMAGE_ROLES.join(", ")}`);
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  /* Portrait: node scripts/optimise-images.mjs --person daniel-hedin foto.jpg */
  if (args.person) {
    const source = args.positional[0];
    if (!source) fail("Ange en källfil.");
    await writeMaster(
      source,
      path.join(PUBLIC_DIR, "skribent", `${args.person}.webp`),
      800,
    );
    return;
  }

  if (!args.category) {
    fail(
      "Ange --category <slug>, eller --person <slug> för porträtt.\n" +
        "  Se filhuvudet för exempel.",
    );
  }

  /* Batch: filenames must already be `{id}-{role}.{ext}`. */
  if (args.batch) {
    const dir = typeof args.batch === "string" ? args.batch : args.positional[0];
    if (!dir) fail("Ange en mapp med --batch <mapp>.");

    const entries = (await readdir(dir)).filter((f) => SOURCE_EXT.test(f));
    if (!entries.length) fail(`Inga bildfiler i ${dir}.`);

    for (const entry of entries) {
      const base = entry.replace(SOURCE_EXT, "");
      const match = base.match(/^(.*)-([a-zåäö]+)$/i);
      if (!match) {
        console.warn(
          `  hoppar över ${entry}: filnamnet måste vara {produkt-id}-{roll}`,
        );
        continue;
      }
      const [, id, role] = match;
      assertRole(role);
      await writeMaster(
        path.join(dir, entry),
        path.join(PUBLIC_DIR, args.category, `${id}-${role}.webp`),
        MASTER_WIDTH[role],
      );
    }
    return;
  }

  const source = args.positional[0];
  if (!source) fail("Ange en källfil.");

  const role = typeof args.role === "string" ? args.role : "produkt";
  assertRole(role);

  /* No --id means a category-level editorial image, prefixed with _. */
  const filename = args.id ? `${args.id}-${role}.webp` : `_${role}.webp`;

  await writeMaster(
    source,
    path.join(PUBLIC_DIR, args.category, filename),
    MASTER_WIDTH[role],
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
