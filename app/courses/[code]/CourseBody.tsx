"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Course } from "@/content/courses";

const ZONES = [["London", "Europe/London"], ["New York", "America/New_York"], ["Los Angeles", "America/Los_Angeles"], ["Kolkata", "Asia/Kolkata"], ["Sydney", "Australia/Sydney"]];
function offsetMs(tz: string, t: number) {
  const p = new Intl.DateTimeFormat("en-US", { timeZone: tz, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit" }).formatToParts(new Date(t));
  const g = (k: string) => Number(p.find((x) => x.type === k)!.value);
  return Date.UTC(g("year"), g("month") - 1, g("day"), g("hour"), g("minute"), g("second")) - t;
}
/** the instant at which it is y-m-d h:m on a London wall clock */
function londonInstant(y: number, mo: number, d: number, h: number, mi: number) {
  const guess = Date.UTC(y, mo, d, h, mi); return guess - offsetMs("Europe/London", guess - offsetMs("Europe/London", guess));
}
function secondOccurrence(y: number, mo: number, dow: number) { const d = new Date(Date.UTC(y, mo, 1)); return 1 + ((dow - d.getUTCDay() + 7) % 7) + 7; }

const Ctx = createContext<{ tz: string; setTz: (z: string) => void; detected: string | null }>({ tz: "Europe/London", setTz: () => {}, detected: null });
export function TzProvider({ children }: { children: React.ReactNode }) {
  const [detected, setDetected] = useState<string | null>(null);
  const [tz, setTz] = useState("Europe/London");
  useEffect(() => { try { const z = Intl.DateTimeFormat().resolvedOptions().timeZone; if (z) { setDetected(z); setTz(z); } } catch {} }, []);
  return <Ctx.Provider value={{ tz, setTz, detected }}>{children}</Ctx.Provider>;
}

export function Syllabus({ c }: { c: Course }) {
  const [open, setOpen] = useState<number[]>([0]);
  const all = open.length === c.syllabus.length;
  const label = c.format === "res" ? "DAY" : "WEEK";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
        <h2 className="d3">Syllabus</h2>
        <button type="button" onClick={() => setOpen(all ? [] : c.syllabus.map((_, i) => i))} className="link" style={{ background: "none", borderTop: 0, borderLeft: 0, borderRight: 0, font: "inherit", fontSize: 14, cursor: "pointer" }}>{all ? "Collapse all" : "Expand all"}</button>
      </div>
      <div style={{ borderBottom: "1px solid var(--rule)" }}>
        {c.syllabus.map((w, i) => {
          const o = open.includes(i);
          return (
            <div className="acc" key={i}>
              <button className="acc-h" type="button" aria-expanded={o} onClick={() => setOpen(o ? open.filter((x) => x !== i) : [...open, i])}>
                <span className="wk">{label} {String(i + 1).padStart(2, "0")}</span><span className="t">{w.title.replace(/^Day \d · /, "")}</span><span className="pm" aria-hidden="true">{o ? "−" : "+"}</span>
              </button>
              {o && (
                <div className="acc-b" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
                  <div><div className="eyebrow" style={{ marginBottom: 6 }}>Reading</div><p style={{ fontSize: 15 }}>{w.reading}</p></div>
                  <div><div className="eyebrow" style={{ marginBottom: 6 }}>Teaching exercise</div><p style={{ fontSize: 15 }}>{w.task}</p></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Schedule({ c }: { c: Course }) {
  const { tz, setTz, detected } = useContext(Ctx);
  const zones = useMemo(() => {
    const base = ZONES.map(([l, z]) => ({ l, z }));
    if (!detected) return base;
    const i = base.findIndex((b) => b.z === detected);
    if (i >= 0) base[i] = { l: `${base[i].l} (your time)`, z: detected }; else base.unshift({ l: `Your time · ${detected.replace(/_/g, " ")}`, z: detected });
    return base;
  }, [detected]);
  const [dow, hh, mm, dur] = c.slot ?? [2, 18, 0, 120];
  const month = Math.min(Math.max(c.startMonth, 1), 9) - 1;
  const instant = (d: number, h: number, m: number) => londonInstant(2027, month, d, h, m);
  const f = (x: number, o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-GB", { timeZone: tz, hourCycle: "h23", ...o }).format(new Date(x));
  const show = (t: number, len: number, what: string) => ({ day: f(t, { weekday: "short" }).toUpperCase(), time: `${f(t, { hour: "2-digit", minute: "2-digit" })}–${f(t + len * 60000, { hour: "2-digit", minute: "2-digit" })}`, what });
  const sessions = c.format === "live"
    ? [show(instant(secondOccurrence(2027, month, dow), hh, mm), dur, "Seminar · weekly, live"), show(instant(secondOccurrence(2027, month, 4), 7, 30), 60, "Practice lab · weekly, optional")]
    : c.format === "self" ? [show(instant(secondOccurrence(2027, month, 6), 16, 0), 60, "Monthly live clinic · optional")] : [];
  return (
    <div style={{ borderTop: "1px solid var(--rule)", padding: 22, display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10 }}>
        <span className="eyebrow" style={{ color: "var(--ink)" }}>Schedule</span>
        {sessions.length > 0 && <><label htmlFor="tz" style={{ position: "absolute", left: -9999 }}>Time zone</label>
        <select id="tz" className="tz-select" value={tz} onChange={(e) => setTz(e.target.value)} style={{ fontSize: 14, maxWidth: 220 }}>{zones.map((z) => <option key={z.z} value={z.z}>{z.l}</option>)}</select></>}
      </div>
      {sessions.map((s, i) => (
        <div key={i} style={{ display: "grid", gridTemplateColumns: "52px 1fr", gap: 12, alignItems: "start", paddingTop: 12, borderTop: "1px solid var(--rule)" }}>
          <span className="mono" style={{ fontSize: 13, fontWeight: 500 }}>{s.day}</span>
          <span style={{ display: "flex", flexDirection: "column" }}><span className="mono" style={{ fontSize: 15 }}>{s.time}</span><span className="small">{s.what}</span></span>
        </div>
      ))}
      {c.format === "res" && <p className="body" style={{ fontSize: 15 }}>{c.place ?? "In person, London"}. Dates are confirmed with your cohort.</p>}
      {sessions.length > 0 && <p className="small">Shown in {tz.replace(/_/g, " ")} time. Recordings within 24 hours.</p>}
    </div>
  );
}
