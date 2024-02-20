export type RBAC<
  P extends string = string,
  R extends string = string,
  S extends string = string
> = {
  assignPermissionToRole(role: R, permission: P): Promise<void>;
  removePermissionFromRole(role: R, permission: P): Promise<void>;
  roleHasPermission(subject: R, permission: P): Promise<boolean>;
  assignRoleToSubject(subject: S, role: R): Promise<void>;
  removeRoleFromSubject(subject: S, role: R): Promise<void>;
  subjectHasRole(subject: S, role: R): Promise<boolean>;
  subjectHasPermission(subject: S, permission: P): Promise<boolean>;
};

export function createRBAC<
  P extends string = string,
  R extends string = string,
  S extends string = string
>(rbac: RBAC<P, R, S>): RBAC<P, R, S> {
  return {
    assignPermissionToRole(role: R, permission: P) {
      return rbac.assignPermissionToRole(role, permission);
    },
    removePermissionFromRole(role: R, permission: P) {
      return rbac.removePermissionFromRole(role, permission);
    },
    roleHasPermission(subject: R, permission: P) {
      return rbac.roleHasPermission(subject, permission);
    },
    assignRoleToSubject(subject: S, role: R) {
      return rbac.assignRoleToSubject(subject, role);
    },
    removeRoleFromSubject(subject: S, role: R) {
      return rbac.removeRoleFromSubject(subject, role);
    },
    subjectHasRole(subject: S, role: R) {
      return rbac.subjectHasRole(subject, role);
    },
    subjectHasPermission(subject: S, permission: P) {
      return rbac.subjectHasPermission(subject, permission);
    },
  };
}
