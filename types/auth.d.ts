
declare module "auth-types" {
  export interface AuthToken {
    token: string;
    expiresAt?: number;
  }
}
