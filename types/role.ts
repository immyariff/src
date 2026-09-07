export type RoleId = string;

export interface Role {
  readonly id: RoleId;
  readonly name: string;
  readonly description?: string;
}