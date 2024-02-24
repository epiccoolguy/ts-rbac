export type RBAC<
  P extends string = string,
  R extends string = string,
  S extends string = string
> = {
  assignPermissionToRole(permission: P, role: R): Promise<void>;
  removePermissionFromRole(permission: P, role: R): Promise<void>;
  roleHasPermission(role: R, permission: P): Promise<boolean>;

  assignRoleToSubject(role: R, subject: S): Promise<void>;
  removeRoleFromSubject(role: R, subject: S): Promise<void>;
  subjectHasRole(subject: S, role: R): Promise<boolean>;
  subjectHasPermission(subject: S, permission: P): Promise<boolean>;
};
