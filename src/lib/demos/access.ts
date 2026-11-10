/** Role-based module access for the CIMP demo. */

export type Role = "admin" | "marketer" | "analyst";
export type ModuleId =
  | "loyalty"
  | "campaigns"
  | "bonuses"
  | "retention"
  | "crossmail"
  | "analytics"
  | "partner";
export type Access = "active" | "read" | "none";

const MARKETER: readonly ModuleId[] = ["loyalty", "campaigns", "bonuses", "crossmail", "partner"];
const ANALYST: readonly ModuleId[] = ["analytics", "retention"];

export function accessFor(role: Role, module: ModuleId): Access {
  if (role === "admin") return "active";
  if (role === "marketer") return MARKETER.includes(module) ? "active" : "none";
  return ANALYST.includes(module) ? "read" : "none";
}

export const visibleCount = (role: Role, modules: readonly ModuleId[]): number =>
  modules.filter(m => accessFor(role, m) !== "none").length;
