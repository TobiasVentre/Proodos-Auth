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

function validateLdapTargets(rawTargets: string) {
  let parsed: unknown;

  try {
    parsed = JSON.parse(rawTargets);
  } catch {
    throw new Error("[ENV] LDAP_TARGETS tiene formato inválido. Debe ser un JSON válido.");
  }

  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error("[ENV] LDAP_TARGETS debe ser un array con al menos un dominio LDAP.");
  }

  parsed.forEach((target, index) => {
    if (!target || typeof target !== "object") {
      throw new Error(`[ENV] LDAP_TARGETS[${index}] debe ser un objeto.`);
    }

    const { name, url, upnSuffix } = target as {
      name?: string;
      url?: string;
      upnSuffix?: string;
    };

    if (!name?.trim() || !url?.trim() || !upnSuffix?.trim()) {
      throw new Error(
        `[ENV] LDAP_TARGETS[${index}] incompleto. Requiere 'name', 'url' y 'upnSuffix'.`
      );
    }
  });
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

  const required = [
    "DB_HOST",
    "DB_PORT",
    "DB_NAME",
    "DB_USER",
    "DB_PASSWORD",
    "LDAP_TARGETS",
    "JWT_SECRET",
    "JWT_REFRESH_SECRET",
  ];
  const missing = required.filter((k) => !process.env[k] || String(process.env[k]).trim() === "");
  if (missing.length) {
    throw new Error(`[ENV] Faltan variables: ${missing.join(", ")} (archivo: ${envPath})`);
  }

  validateLdapTargets(process.env.LDAP_TARGETS as string);
}
