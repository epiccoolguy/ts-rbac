import { beforeEach, describe, expect, test } from "@jest/globals";

import { createInMemoryRBAC } from "./memory.js";
import type { RBAC } from "./rbac.js";

const permissions = [
  "service.component.create",
  "service.component.read",
  "service.component.update",
  "service.component.delete",
  "service.component.list",
] as const;

type Permission = (typeof permissions)[number];

const roles = [
  "roles/service.componentCreator",
  "roles/service.componentReader",
  "roles/service.componentUpdater",
  "roles/service.componentDeleter",
  "roles/service.componentAdmin",
] as const;

type Role = (typeof roles)[number];

let rbac: RBAC<Permission, Role>;

beforeEach(() => {
  rbac = createInMemoryRBAC();
});

describe("permissions to roles", () => {
  test("assigns a permission to a role", async () => {
    const permission: Permission = "service.component.create";
    const role: Role = "roles/service.componentCreator";

    await rbac.assignPermissionToRole(permission, role);

    const hasPermission = await rbac.roleHasPermission(role, permission);
    expect(hasPermission).toBe(true);
  });

  test("removes a permission from a role", async () => {
    const permission: Permission = "service.component.create";
    const role: Role = "roles/service.componentCreator";

    await rbac.assignPermissionToRole(permission, role);
    await rbac.removePermissionFromRole(permission, role);

    const hasPermission = await rbac.roleHasPermission(role, permission);
    expect(hasPermission).toBe(false);
  });
});

describe("subjects to roles", () => {
  test("assigns a role to a subject", async () => {
    const role: Role = "roles/service.componentCreator";
    const subject = "user:example@example.com";

    await rbac.assignRoleToSubject(role, subject);

    const hasRole = await rbac.subjectHasRole(subject, role);
    expect(hasRole).toBe(true);
  });

  test("removes a role from a subject", async () => {
    const role: Role = "roles/service.componentCreator";
    const subject = "user:example@example.com";

    await rbac.assignRoleToSubject(role, subject);
    await rbac.removeRoleFromSubject(role, subject);

    const hasRole = await rbac.subjectHasRole(subject, role);
    expect(hasRole).toBe(false);
  });
});

describe("subjects to permissions", () => {
  test("checks if a subject has a permission", async () => {
    const permission: Permission = "service.component.create";
    const role = "roles/service.componentAdmin";
    const subject = "user:example@example.com";

    await rbac.assignPermissionToRole(permission, role);
    await rbac.assignRoleToSubject(role, subject);

    const hasPermission = await rbac.subjectHasPermission(subject, permission);
    expect(hasPermission).toBe(true);
  });

  test("removes role after being assigned to a user", async () => {
    const permission: Permission = "service.component.create";
    const role = "roles/service.componentAdmin";
    const subject = "user:example@example.com";

    await rbac.assignPermissionToRole(permission, role);
    await rbac.assignRoleToSubject(role, subject);
    await rbac.removeRoleFromSubject(role, subject);

    const hasPermission = await rbac.subjectHasPermission(subject, permission);
    expect(hasPermission).toBe(false);
  });

  test("removes permission after being assigned to a role", async () => {
    const permission: Permission = "service.component.create";
    const role = "roles/service.componentAdmin";
    const subject = "user:example@example.com";

    await rbac.assignPermissionToRole(permission, role);
    await rbac.assignRoleToSubject(role, subject);
    await rbac.removePermissionFromRole(permission, role);

    const hasPermission = await rbac.subjectHasPermission(subject, permission);
    expect(hasPermission).toBe(false);
  });
});
