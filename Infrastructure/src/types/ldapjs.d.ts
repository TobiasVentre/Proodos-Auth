import "ldapjs";

declare module "ldapjs" {
  // Extendemos SOLO lo que te falta/querés tolerar.
  // No redefinas Client/SearchResponse/etc porque ya vienen de @types/ldapjs.
  interface SearchEntry {
    objectName?: string;
    dn?: string;
  }
}
