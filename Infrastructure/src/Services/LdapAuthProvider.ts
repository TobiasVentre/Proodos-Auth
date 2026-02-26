import ldap from "ldapjs";
import type { Client, SearchEntry, SearchOptions, SearchCallbackResponse } from "ldapjs";
import { LdapAuthProvider } from "@proodos/application/Interfaces/ILdapAuthProvider";

const buildUserDn = (template: string, username: string): string =>
  template.replace(/\{\{username\}\}/g, username);

const normalizeUsername = (username: string): string => {
  if (username.includes("\\")) {
    return username.split("\\").pop() ?? username;
  }

  if (username.includes("@")) {
    return username.split("@")[0] ?? username;
  }

  return username;
};

const escapeLdapFilterValue = (value: string): string =>
  value
    .replace(/\\/g, "\\5c")
    .replace(/\*/g, "\\2a")
    .replace(/\(/g, "\\28")
    .replace(/\)/g, "\\29")
    .replace(/\0/g, "\\00");

export class LdapAuthProviderService implements LdapAuthProvider {
  async authenticate(username: string, password: string): Promise<boolean> {
    if (!password) return false;

    const normalizedUsername = normalizeUsername(username);
    const searchUsername = escapeLdapFilterValue(normalizedUsername);

    const url = process.env.LDAP_URL;
    if (!url) throw new Error("LDAP_URL no configurado.");

    const userDnTemplate = process.env.LDAP_USER_DN_TEMPLATE;

    // Caso 1: DN directo por template -> bind como usuario
    if (userDnTemplate) {
      const userDn = buildUserDn(userDnTemplate, normalizedUsername);

      const client = ldap.createClient({ url });
      try {
        await this.bind(client, userDn, password);
        return true;
      } catch {
        return false;
      } finally {
        try {
          client.unbind();
        } catch {
          // noop
        }
      }
    }

    // Caso 2: Bind de servicio + search del DN + bind como usuario
    const bindDn = process.env.LDAP_BIND_DN;
    const bindPassword = process.env.LDAP_BIND_PASSWORD;
    const baseDn = process.env.LDAP_BASE_DN;
    const userAttribute = process.env.LDAP_USER_ATTRIBUTE || "sAMAccountName";

    if (!bindDn || !bindPassword || !baseDn) {
      return false;
    }

    // 2.a) Cliente para búsqueda
    const searchClient = ldap.createClient({ url });
    let userDn: string | null = null;

    try {
      await this.bind(searchClient, bindDn, bindPassword);
      userDn = await this.findUserDn(searchClient, baseDn, userAttribute, searchUsername);
    } catch {
      return false;
    } finally {
      try {
        searchClient.unbind();
      } catch {
        // noop
      }
    }

    if (!userDn) return false;

    // 2.b) Cliente separado para bind del usuario (más robusto)
    const userClient = ldap.createClient({ url });
    try {
      await this.bind(userClient, userDn, password);
      return true;
    } catch {
      return false;
    } finally {
      try {
        userClient.unbind();
      } catch {
        // noop
      }
    }
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

  private findUserDn(
    client: Client,
    baseDn: string,
    attribute: string,
    username: string
  ): Promise<string | null> {
    return new Promise((resolve, reject) => {
      const opts: SearchOptions = {
        scope: "sub",
        filter: `(${attribute}=${username})`,
        attributes: ["dn"]
      };

      client.search(baseDn, opts, (err: Error | null, res: SearchCallbackResponse) => {
        if (err) {
          reject(err);
          return;
        }

        let userDn: string | null = null;

        res.on("searchEntry", (entry: SearchEntry) => {
          // Dependiendo del server, a veces viene en objectName, a veces en dn
          // (y a veces el DN está implícito en entry.dn)
          // Tu augmentation lo tolera si falta en los types oficiales.
          userDn = (entry as any).objectName ?? (entry as any).dn ?? null;
        });

        res.on("error", (searchErr: Error) => {
          reject(searchErr);
        });

        res.on("end", () => {
          resolve(userDn);
        });
      });
    });
  }
}
