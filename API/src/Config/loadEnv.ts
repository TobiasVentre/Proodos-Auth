import fs from "fs";
import path from "path";
import dotenv from "dotenv";

function findRepoRoot(startDir: string): string {
  let dir = startDir;

  while (true) {
    const pkgPath = path.join(dir, "package.json");
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, "utf8"));
      if (pkg.workspaces) return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) return startDir;
    dir = parent;
  }
}

export function loadEnv() {
  const root = findRepoRoot(process.cwd());
  const envPath = path.join(root, ".env");

  if (!fs.existsSync(envPath)) {
    throw new Error(`[ENV] No se encontró .env en: ${envPath}`);
  }

  const result = dotenv.config({ path: envPath, override: true });
  if (result.error) {
    throw new Error(`[ENV] Error leyendo .env (${envPath}): ${result.error.message}`);
  }

  console.log("[ENV] Loaded:", envPath);
  console.log("[ENV] DB:", {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    name: process.env.DB_NAME,
    user: process.env.DB_USER ? "***set***" : "***missing***",
    pass: process.env.DB_PASSWORD ? "***set***" : "***missing***",
  });

  const required = ["DB_HOST", "DB_PORT", "DB_NAME", "DB_USER", "DB_PASSWORD"];
  const missing = required.filter((k) => !process.env[k] || String(process.env[k]).trim() === "");
  if (missing.length) {
    throw new Error(`[ENV] Faltan variables: ${missing.join(", ")} (archivo: ${envPath})`);
  }
}
