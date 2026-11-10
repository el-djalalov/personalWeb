import { useState } from "react";
import { fill, type DemoCopy } from "@/i18n/cases";
import { accessFor, visibleCount, type ModuleId, type Role } from "@/lib/demos/access";
import { DemoFrame, ToolButton, showToast } from "../ui";

const BASE: ModuleId[] = ["loyalty", "campaigns", "bonuses", "retention", "crossmail", "analytics"];
const ROLES: Role[] = ["admin", "marketer", "analyst"];

interface Props {
  label: string;
  t: DemoCopy["modules"];
}

export default function ModulesDemo({ label, t }: Props) {
  const [role, setRole] = useState<Role>("admin");
  const [plugged, setPlugged] = useState(false);
  const modules: ModuleId[] = plugged ? [...BASE, "partner"] : BASE;

  const togglePlug = () => {
    const next = !plugged;
    setPlugged(next);
    if (next) showToast(t.added);
  };

  return (
    <DemoFrame
      label={label}
      tools={ROLES.map(r => (
        <ToolButton key={r} on={role === r} onClick={() => setRole(r)}>
          {t.roles[r]}
        </ToolButton>
      ))}
      footer={
        <span aria-live="polite">
          {fill(t.sees, { role: t.roles[role], n: visibleCount(role, modules), m: modules.length })}
        </span>
      }
    >
      <div className="grid gap-3 p-4">
        <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
          {modules.map(id => {
            const access = accessFor(role, id);
            return (
              <div
                key={id}
                className={`flex min-h-[96px] flex-col gap-2.5 rounded-[10px] border border-border bg-surf2 p-3.5 transition duration-300 ease-site ${
                  access === "none" ? "scale-[0.97] opacity-35 grayscale" : ""
                } ${id === "partner" ? "ticket-land" : ""}`}
              >
                <span
                  className="grid h-[26px] w-[26px] place-items-center rounded-[7px] bg-acc/20 font-mono text-xs text-acc"
                  aria-hidden="true"
                >
                  {t.names[id][0]}
                </span>
                <b className="text-sm font-semibold">{t.names[id]}</b>
                <span
                  className={`font-mono text-[10.5px] uppercase tracking-wider ${
                    access === "none" ? "text-muted-foreground" : "text-good"
                  }`}
                >
                  {t.states[access]}
                </span>
              </div>
            );
          })}
        </div>
        <div>
          <ToolButton onClick={togglePlug}>{plugged ? t.remove : t.plug}</ToolButton>
        </div>
      </div>
    </DemoFrame>
  );
}
