import sharp from "sharp";
import fs from "fs";
import path from "path";

const ARTIFACT_DIR = "C:/Users/can20/.gemini/antigravity-ide/brain/a69f8ed5-de6f-4835-855c-cdca0b885740";
const TARGET_WIDTH = 1920;
const TARGET_HEIGHT = 1200;

export async function processAndSaveImage(artifactFileOrPattern, destinationRelativePath) {
  const destPath = path.resolve(process.cwd(), destinationRelativePath);
  const destDir = path.dirname(destPath);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }

  // Find the latest file matching the pattern in ARTIFACT_DIR
  let matchedFile = null;
  if (fs.existsSync(path.join(ARTIFACT_DIR, artifactFileOrPattern))) {
    matchedFile = path.join(ARTIFACT_DIR, artifactFileOrPattern);
  } else {
    const files = fs.readdirSync(ARTIFACT_DIR);
    const matches = files.filter(f => f.startsWith(artifactFileOrPattern) && (f.endsWith('.jpg') || f.endsWith('.png')));
    if (matches.length > 0) {
      // sort by mtime desc
      matches.sort((a, b) => {
        return fs.statSync(path.join(ARTIFACT_DIR, b)).mtimeMs - fs.statSync(path.join(ARTIFACT_DIR, a)).mtimeMs;
      });
      matchedFile = path.join(ARTIFACT_DIR, matches[0]);
    }
  }

  if (!matchedFile) {
    console.error(`File not found for pattern: ${artifactFileOrPattern}`);
    return false;
  }

  console.log(`Processing ${matchedFile} -> ${destPath}`);
  await sharp(matchedFile)
    .resize(TARGET_WIDTH, TARGET_HEIGHT, {
      fit: "cover",
      position: "center",
    })
    .jpeg({ quality: 90, mozjpeg: true })
    .toFile(destPath);

  console.log(`Saved 1920x1200 image to ${destPath}`);
  return true;
}

// Test with existing generated images if run directly
if (process.argv[2] && process.argv[3]) {
  processAndSaveImage(process.argv[2], process.argv[3]);
}
