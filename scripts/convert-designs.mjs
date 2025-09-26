import { execFile } from "child_process";
import { promisify } from "util";
import { readdir, mkdir, stat } from "fs/promises";
import path from "path";
import cwebp from "cwebp-bin";

const execFileAsync = promisify(execFile);
const SOURCE_DIR = path.resolve("public/assets/designs");
const TARGET_DIR = path.resolve("public/assets/designs-webp");
const QUALITY = process.env.WEBP_QUALITY ? Number(process.env.WEBP_QUALITY) : 80;
const MAX_WIDTH = process.env.WEBP_MAX_WIDTH ? Number(process.env.WEBP_MAX_WIDTH) : 1600;

async function ensureDir(dir) {
  try {
    const stats = await stat(dir);
    if (!stats.isDirectory()) {
      throw new Error(`${dir} existe mais n'est pas un dossier`);
    }
  } catch (error) {
    if (error?.code === "ENOENT") {
      await mkdir(dir, { recursive: true });
    } else {
      throw error;
    }
  }
}

async function convertFile(file) {
  const baseName = path.basename(file, ".png");
  const target = path.join(TARGET_DIR, `${baseName}.webp`);
  const args = [
    "-q",
    String(QUALITY),
    "-resize",
    String(MAX_WIDTH),
    "0",
    file,
    "-o",
    target,
  ];
  await execFileAsync(cwebp, args);
  return target;
}

async function main() {
  await ensureDir(TARGET_DIR);
  const files = await readdir(SOURCE_DIR);
  const pngFiles = files
    .filter((file) => file.toLowerCase().endsWith(".png"))
    .map((file) => path.join(SOURCE_DIR, file));

  if (pngFiles.length === 0) {
    console.log("Aucun fichier PNG à convertir.");
    return;
  }

  console.log(`Conversion de ${pngFiles.length} fichier(s) PNG en WebP (qualité ${QUALITY}).`);
  for (const file of pngFiles) {
    try {
      const output = await convertFile(file);
      console.log(`✓ ${path.relative(process.cwd(), output)}`);
    } catch (error) {
      console.error(`✗ Échec conversion pour ${file}:`, error);
    }
  }
}

main().catch((error) => {
  console.error("Erreur lors de l'optimisation WebP", error);
  process.exitCode = 1;
});
