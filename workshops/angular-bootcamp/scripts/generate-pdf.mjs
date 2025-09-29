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
  "slides/bootcamp-slides.md",
  "guides/animateur.md",
  "guides/participant.md",
  "exercices/00-setup.md",
  "exercices/01-bases-lib.md",
  "exercices/02-forms-typed.md",
  "exercices/03-design-system.md",
  "exercices/04-testing.md",
  "exercices/05-ci-integration.md",
  "checklists/checklist-design-system.md",
  "checklists/checklist-accessibilite.md",
  "checklists/checklist-ci.md",
  "handouts/starter-kit-notes.md"
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
