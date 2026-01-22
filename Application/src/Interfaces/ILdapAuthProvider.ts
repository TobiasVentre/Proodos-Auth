export interface LdapAuthProvider {
  authenticate(username: string, password: string): Promise<boolean>;
}
