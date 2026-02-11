import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const MEDIA_DIR = path.resolve(import.meta.dirname!, "../scripts/media");
const EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".gif", ".webp"]);
const MAX_WIDTH = 1280;
const WEBP_QUALITY = 80;

function formatBytes(bytes: number): string {
  if (bytes >= 1e6) return `${(bytes / 1e6).toFixed(2)} MB`;
  if (bytes >= 1e3) return `${(bytes / 1e3).toFixed(1)} KB`;
  return `${bytes} B`;
}

async function main() {
  const allFiles = fs.readdirSync(MEDIA_DIR).filter((f) => fs.statSync(path.join(MEDIA_DIR, f)).isFile());
  const files: string[] = [];

  for (const f of allFiles) {
    if (f.startsWith("opt-")) continue;
    if (EXTENSIONS.has(path.extname(f).toLowerCase())) {
      files.push(f);
    } else {
      console.log(`WARN ${f} is not optimized (missing opt- prefix)`);
    }
  }

  if (files.length === 0) {
    console.log("No source images found in scripts/media/");
    return;
  }

  let converted = 0;
  let skipped = 0;
  let totalOriginal = 0;
  let totalOptimized = 0;

  for (const file of files) {
    const srcPath = path.join(MEDIA_DIR, file);
    const basename = path.parse(file).name;
    const outName = `opt-${basename}.webp`;
    const outPath = path.join(MEDIA_DIR, outName);

    const srcStat = fs.statSync(srcPath);

    // Skip if optimized version exists and is newer than source
    if (fs.existsSync(outPath)) {
      const outStat = fs.statSync(outPath);
      if (outStat.mtimeMs >= srcStat.mtimeMs) {
        console.log(`SKIP ${file} (${outName} is up-to-date)`);
        skipped++;
        continue;
      }
    }

    const image = sharp(srcPath);
    const metadata = await image.metadata();
    const srcWidth = metadata.width ?? 0;
    const srcHeight = metadata.height ?? 0;

    let pipeline = image;
    let resized = false;
    let outWidth = srcWidth;
    let outHeight = srcHeight;

    if (srcWidth > MAX_WIDTH) {
      pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
      resized = true;
      outWidth = MAX_WIDTH;
      outHeight = Math.round(srcHeight * (MAX_WIDTH / srcWidth));
    }

    const buffer = await pipeline.webp({ quality: WEBP_QUALITY }).toBuffer();
    fs.writeFileSync(outPath, buffer);
    fs.unlinkSync(srcPath);

    const outSize = buffer.length;
    const srcSize = srcStat.size;
    const savings = ((1 - outSize / srcSize) * 100).toFixed(1);
    const resizeInfo = resized
      ? ` (resized ${srcWidth}x${srcHeight} -> ${outWidth}x${outHeight})`
      : "";

    console.log(
      `DONE ${file} -> ${outName} | ${formatBytes(srcSize)} -> ${formatBytes(outSize)} | -${savings}%${resizeInfo}`
    );

    totalOriginal += srcSize;
    totalOptimized += outSize;
    converted++;
  }

  console.log();
  console.log(
    `${converted} converted, ${skipped} skipped` +
      (converted > 0
        ? ` | ${formatBytes(totalOriginal)} -> ${formatBytes(totalOptimized)} total`
        : "")
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
