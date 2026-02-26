import ldap from "ldapjs";
import type { Client } from "ldapjs";
import { LdapAuthProvider } from "@proodos/application/Interfaces/ILdapAuthProvider";

interface LdapTargetConfig {
  name: string;
  url: string;
  upnSuffix: string;
}

const normalizeUsername = (username: string): string => {
  if (username.includes("\\")) {
    return username.split("\\").pop() ?? username;
  }

  if (username.includes("@")) {
    return username.split("@")[0] ?? username;
  }

  return username;
};

const readTargetsConfig = (): LdapTargetConfig[] => {
  const rawTargets = process.env.LDAP_TARGETS;
  if (!rawTargets) {
    throw new Error("LDAP_TARGETS no configurado.");
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawTargets);
  } catch {
    throw new Error("LDAP_TARGETS tiene formato inválido. Debe ser un JSON válido.");
  }

  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error("LDAP_TARGETS debe ser un array con al menos un dominio LDAP.");
  }

  return parsed.map((item, index) => {
    if (!item || typeof item !== "object") {
      throw new Error(`LDAP_TARGETS[${index}] debe ser un objeto.`);
    }

    const { name, url, upnSuffix } = item as Partial<LdapTargetConfig>;

    if (!name || !url || !upnSuffix) {
      throw new Error(
        `LDAP_TARGETS[${index}] incompleto. Requiere 'name', 'url' y 'upnSuffix'.`
      );
    }

    return {
      name: name.trim(),
      url: url.trim(),
      upnSuffix: upnSuffix.trim(),
    };
  });
};

export class LdapAuthProviderService implements LdapAuthProvider {
  async authenticate(username: string, password: string): Promise<boolean> {
    if (!password) return false;

    const normalizedUsername = normalizeUsername(username);
    const targets = readTargetsConfig();

    for (const target of targets) {
      const principal = `${normalizedUsername}@${target.upnSuffix}`;
      const client = ldap.createClient({ url: target.url });

      try {
        await this.bind(client, principal, password);
        return true;
      } catch {
        console.warn(
          `[LDAP] Falló bind en target '${target.name}' (${target.url}) para usuario normalizado '${normalizedUsername}'.`
        );
      } finally {
        try {
          client.unbind();
        } catch {
          // noop
        }
      }
    }

    return false;
  }

  private bind(client: Client, dn: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      client.bind(dn, password, (err: Error | null) => {
        if (err) {
          reject(err);
          return;
        }
        resolve();
      });
    });
  }
}
