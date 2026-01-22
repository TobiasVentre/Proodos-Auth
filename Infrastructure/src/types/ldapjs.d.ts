declare module "ldapjs" {
  export interface SearchEntry {
    objectName?: string;
    dn?: string;
  }

  export interface SearchResponse {
    on(event: "searchEntry", listener: (entry: SearchEntry) => void): this;
    on(event: "error", listener: (err: Error) => void): this;
    on(event: "end", listener: () => void): this;
  }

  export interface SearchOptions {
    scope: "base" | "one" | "sub";
    filter: string;
    attributes?: string[];
  }

  export interface Client {
    bind(dn: string, password: string, callback: (err: Error | null) => void): void;
    search(
      base: string,
      options: SearchOptions,
      callback: (err: Error | null, res: SearchResponse) => void
    ): void;
    unbind(): void;
  }

  export function createClient(options: { url: string }): Client;

  const ldap: {
    createClient: typeof createClient;
  };

  export default ldap;
}
