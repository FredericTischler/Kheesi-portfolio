import { mkdir } from "fs/promises";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { mdToPdf } from "md-to-pdf";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const exportDir = join(rootDir, "exports");

await mkdir(exportDir, { recursive: true });

const filesToConvert = [
  "README.md",
  "slides/modernisation-slides.md",
  "guides/animateur.md",
  "guides/participant.md",
  "outils/template-mindmap-architecture.md",
  "outils/feuille-de-route-3-iterations.md",
  "outils/audit-checklist.md",
  "exercices/01-mapping-flux.md",
  "exercices/02-architecture-cible.md",
  "exercices/03-plan-migration-db.md"
];

for (const relativePath of filesToConvert) {
  const source = join(rootDir, relativePath);
  const outputName = relativePath.replace(/[\\/]/g, "-").replace(/\.md$/, ".pdf");
  const destination = join(exportDir, outputName);
  try {
    await mdToPdf(
      { path: source },
      {
        dest: destination,
        launch_options: {
          args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage"],
        },
      },
    );
    console.log(`✓ ${relativePath} → exports/${outputName}`);
  } catch (error) {
    console.error(`✗ Échec génération pour ${relativePath}`);
    console.error(error instanceof Error ? error.message : error);
    console.error(
      "Vérifiez que les dépendances Chromium sont installées (libnspr4, libnss3, libgbm1…). Consultez https://pptr.dev/troubleshooting.",
    );
  }
}

console.log("Tous les PDF ont été générés dans", exportDir);
