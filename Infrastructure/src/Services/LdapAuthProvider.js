"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LdapAuthProviderService = void 0;
const ldapjs_1 = __importDefault(require("ldapjs"));
const buildUserDn = (template, username) => template.replace(/\{\{username\}\}/g, username);
class LdapAuthProviderService {
    async authenticate(username, password) {
        if (!password)
            return false;
        const url = process.env.LDAP_URL;
        if (!url)
            throw new Error("LDAP_URL no configurado.");
        const userDnTemplate = process.env.LDAP_USER_DN_TEMPLATE;
        // Caso 1: DN directo por template -> bind como usuario
        if (userDnTemplate) {
            const userDn = buildUserDn(userDnTemplate, username);
            const client = ldapjs_1.default.createClient({ url });
            try {
                await this.bind(client, userDn, password);
                return true;
            }
            catch {
                return false;
            }
            finally {
                try {
                    client.unbind();
                }
                catch {
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
            throw new Error("LDAP_BIND_DN, LDAP_BIND_PASSWORD y LDAP_BASE_DN son obligatorios.");
        }
        // 2.a) Cliente para búsqueda
        const searchClient = ldapjs_1.default.createClient({ url });
        let userDn = null;
        try {
            await this.bind(searchClient, bindDn, bindPassword);
            userDn = await this.findUserDn(searchClient, baseDn, userAttribute, username);
        }
        catch {
            return false;
        }
        finally {
            try {
                searchClient.unbind();
            }
            catch {
                // noop
            }
        }
        if (!userDn)
            return false;
        // 2.b) Cliente separado para bind del usuario (más robusto)
        const userClient = ldapjs_1.default.createClient({ url });
        try {
            await this.bind(userClient, userDn, password);
            return true;
        }
        catch {
            return false;
        }
        finally {
            try {
                userClient.unbind();
            }
            catch {
                // noop
            }
        }
    }
    bind(client, dn, password) {
        return new Promise((resolve, reject) => {
            client.bind(dn, password, (err) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            });
        });
    }
    findUserDn(client, baseDn, attribute, username) {
        return new Promise((resolve, reject) => {
            const opts = {
                scope: "sub",
                filter: `(${attribute}=${username})`,
                attributes: ["dn"]
            };
            client.search(baseDn, opts, (err, res) => {
                if (err) {
                    reject(err);
                    return;
                }
                let userDn = null;
                res.on("searchEntry", (entry) => {
                    // Dependiendo del server, a veces viene en objectName, a veces en dn
                    // (y a veces el DN está implícito en entry.dn)
                    // Tu augmentation lo tolera si falta en los types oficiales.
                    userDn = entry.objectName ?? entry.dn ?? null;
                });
                res.on("error", (searchErr) => {
                    reject(searchErr);
                });
                res.on("end", () => {
                    resolve(userDn);
                });
            });
        });
    }
}
exports.LdapAuthProviderService = LdapAuthProviderService;
