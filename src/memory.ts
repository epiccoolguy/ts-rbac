import type { RBAC } from "./rbac.js";

export function createInMemoryRBAC<
  P extends string = string,
  R extends string = string,
  S extends string = string
>(): RBAC<P, R, S> {
  const rolePermissions = new Map<R, Set<P>>();
  const subjectRoles = new Map<string, Set<R>>();

  return {
    async assignPermissionToRole(permission: P, role: R): Promise<void> {
      if (!rolePermissions.has(role)) {
        rolePermissions.set(role, new Set<P>());
      }

      rolePermissions.get(role)?.add(permission);
    },

    async removePermissionFromRole(permission: P, role: R): Promise<void> {
      rolePermissions.get(role)?.delete(permission);
    },

    async roleHasPermission(role: R, permission: P): Promise<boolean> {
      return rolePermissions.get(role)?.has(permission) ?? false;
    },

    async assignRoleToSubject(role: R, subject: S): Promise<void> {
      if (!subjectRoles.has(subject)) {
        subjectRoles.set(subject, new Set<R>());
      }

      subjectRoles.get(subject)?.add(role);
    },

    async removeRoleFromSubject(role: R, subject: S): Promise<void> {
      subjectRoles.get(subject)?.delete(role);
    },

    async subjectHasRole(subject: S, role: R): Promise<boolean> {
      return subjectRoles.get(subject)?.has(role) ?? false;
    },

    async subjectHasPermission(subject: S, permission: P): Promise<boolean> {
      for (const role of subjectRoles.get(subject) ?? new Set<R>()) {
        if (rolePermissions.get(role)?.has(permission)) {
          return true;
        }
      }

      return false;
    },
  };
}
