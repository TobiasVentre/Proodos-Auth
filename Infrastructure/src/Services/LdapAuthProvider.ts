import ldap, { type Client, type SearchEntry, type SearchResponse } from "ldapjs";
import { LdapAuthProvider } from "@proodos/application/Interfaces/ILdapAuthProvider";

const buildUserDn = (template: string, username: string): string =>
  template.replace(/\{\{username\}\}/g, username);

export class LdapAuthProviderService implements LdapAuthProvider {
  async authenticate(username: string, password: string): Promise<boolean> {
    if (!password) {
      return false;
    }

    const url = process.env.LDAP_URL;
    if (!url) {
      throw new Error("LDAP_URL no configurado.");
    }

    const client = ldap.createClient({ url });
    const userDnTemplate = process.env.LDAP_USER_DN_TEMPLATE;

    if (userDnTemplate) {
      const userDn = buildUserDn(userDnTemplate, username);
      return this.bindClient(client, userDn, password);
    }

    const bindDn = process.env.LDAP_BIND_DN;
    const bindPassword = process.env.LDAP_BIND_PASSWORD;
    const baseDn = process.env.LDAP_BASE_DN;
    const userAttribute = process.env.LDAP_USER_ATTRIBUTE || "sAMAccountName";

    if (!bindDn || !bindPassword || !baseDn) {
      throw new Error("LDAP_BIND_DN, LDAP_BIND_PASSWORD y LDAP_BASE_DN son obligatorios.");
    }

    await this.bindClient(client, bindDn, bindPassword);

    const userDn = await this.findUserDn(client, baseDn, userAttribute, username);
    if (!userDn) {
      return false;
    }

    return this.bindClient(client, userDn, password);
  }

  private bindClient(client: Client, dn: string, password: string): Promise<boolean> {
    return new Promise((resolve) => {
      client.bind(dn, password, (err: Error | null) => {
        client.unbind();

        if (err) {
          resolve(false);
          return;
        }

        resolve(true);
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
      const opts = {
        scope: "sub" as const,
        filter: `(${attribute}=${username})`,
        attributes: ["dn"],
      };

      client.search(baseDn, opts, (err: Error | null, res: SearchResponse) => {
        if (err) {
          client.unbind();
          reject(err);
          return;
        }

        let userDn: string | null = null;

        res.on("searchEntry", (entry: SearchEntry) => {
          userDn = entry.objectName || entry.dn;
        });

        res.on("error", (searchErr: Error) => {
          client.unbind();
          reject(searchErr);
        });

        res.on("end", () => {
          resolve(userDn);
        });
      });
    });
  }
}
