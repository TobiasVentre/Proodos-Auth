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
        if (!password) {
            return false;
        }
        const url = process.env.LDAP_URL;
        if (!url) {
            throw new Error("LDAP_URL no configurado.");
        }
        const client = ldapjs_1.default.createClient({ url });
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
    bindClient(client, dn, password) {
        return new Promise((resolve) => {
            client.bind(dn, password, (err) => {
                client.unbind();
                if (err) {
                    resolve(false);
                    return;
                }
                resolve(true);
            });
        });
    }
    findUserDn(client, baseDn, attribute, username) {
        return new Promise((resolve, reject) => {
            const opts = {
                scope: "sub",
                filter: `(${attribute}=${username})`,
                attributes: ["dn"],
            };
            client.search(baseDn, opts, (err, res) => {
                if (err) {
                    client.unbind();
                    reject(err);
                    return;
                }
                let userDn = null;
                res.on("searchEntry", (entry) => {
                    userDn = entry.objectName ?? entry.dn ?? null;
                });
                res.on("error", (searchErr) => {
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
exports.LdapAuthProviderService = LdapAuthProviderService;
