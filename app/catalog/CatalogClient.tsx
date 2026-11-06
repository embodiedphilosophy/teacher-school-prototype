"use client";
import { useCallback, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { courses, FORMAT_LABEL, TYPE_LABEL } from "@/content/courses";
import type { CFormat, CType } from "@/content/courses";
import { departments } from "@/content/departments";
import { facultyBySlug } from "@/content/faculty";
import { CourseCard, CourseRow } from "@/components/Cards";

const LEVELS = [100, 200, 300, 400];
export function CatalogClient() {
  const sp = useSearchParams(); const router = useRouter(); const path = usePathname();
  const [sheet, setSheet] = useState(false);
  const dept = useMemo(() => (sp.get("dept") ?? "").split(",").filter(Boolean), [sp]);
  const level = sp.get("level") ? Number(sp.get("level")) : null;
  const type = sp.get("type") as CType | null;
  const format = sp.get("format") as CFormat | null;
  const ce = sp.get("ce") === "1"; const open = sp.get("open") === "1";
  const q = sp.get("q") ?? ""; const view = sp.get("view") === "list" ? "list" : "grid";

  const set = useCallback((patch: Record<string, string | null>) => {
    const n = new URLSearchParams(sp.toString());
    Object.entries(patch).forEach(([k, v]) => (v === null || v === "" ? n.delete(k) : n.set(k, v)));
    const qs = n.toString(); router.replace(qs ? `${path}?${qs}` : path, { scroll: false });
  }, [sp, router, path]);

  const match = (c: (typeof courses)[number], skipDept = false) => {
    const f = facultyBySlug(c.fac);
    const hay = `${c.code} ${c.title} ${f?.name ?? ""}`.toLowerCase();
    return (skipDept || !dept.length || dept.includes(c.k)) && (!level || c.level === level) && (!type || c.type === type) && (!format || c.format === format) && (!ce || c.ce) && (!open || c.open) && (!q || hay.includes(q.toLowerCase()));
  };
  const results = courses.filter((c) => match(c)).sort((a, b) => a.level - b.level || a.code.localeCompare(b.code));
  const active = dept.length + (level ? 1 : 0) + (type ? 1 : 0) + (format ? 1 : 0) + (ce ? 1 : 0) + (open ? 1 : 0);
  const toggleDept = (k: string) => set({ dept: (dept.includes(k) ? dept.filter((x) => x !== k) : [...dept, k]).join(",") });
  const one = (key: string, cur: string | number | null, v: string | number) => set({ [key]: String(cur) === String(v) ? null : String(v) });
  const chip = (on: boolean) => `chip${on ? " on" : ""}`;

  return (
    <>
      <section className="wrap" style={{ paddingTop: 48, paddingBottom: 32, display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 24, flexWrap: "wrap", borderBottom: "1px solid var(--rule)" }}>
        <div><div className="eyebrow" style={{ marginBottom: 14 }}>Catalog · 2026–27</div><h1 className="d1">Course catalog</h1></div>
        <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
          <label htmlFor="q" style={{ position: "absolute", left: -9999 }}>Search courses</label>
          <div style={{ position: "relative" }}>
            <svg style={{ position: "absolute", left: 14, top: 16 }} width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><circle cx="9" cy="9" r="6" /><path d="M13.5 13.5 18 18" /></svg>
            <input id="q" className="input" type="search" placeholder="Search by title, code or faculty" value={q} onChange={(e) => set({ q: e.target.value })} style={{ width: 340, maxWidth: "100%", paddingLeft: 42 }} />
          </div>
          <div style={{ display: "flex", border: "1.5px solid var(--ink)" }} role="group" aria-label="View">
            <button type="button" className={`btn btn-sm${view === "grid" ? " btn-ink" : ""}`} aria-pressed={view === "grid"} onClick={() => set({ view: null })} style={{ height: 47, padding: "0 16px", border: 0 }}>Grid</button>
            <button type="button" className={`btn btn-sm${view === "list" ? " btn-ink" : ""}`} aria-pressed={view === "list"} onClick={() => set({ view: "list" })} style={{ height: 47, padding: "0 16px", border: 0 }}>List</button>
          </div>
          <button type="button" className="btn sheet-btn" style={{ height: 50 }} onClick={() => setSheet(true)}>Filters{active ? ` (${active})` : ""}</button>
        </div>
      </section>

      <div className="wrap" style={{ paddingTop: 32, paddingBottom: 96 }}>
        <div className="catalog-layout">
          {sheet && <div className="sheet-scrim" onClick={() => setSheet(false)} aria-hidden="true" />}
          <aside className={`filters${sheet ? " open" : ""}`} aria-label="Filters">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span className="eyebrow" style={{ color: "var(--ink)" }}>Filters</span>
              <span className="row" style={{ gap: 14 }}>
                <button type="button" onClick={() => set({ dept: null, level: null, type: null, format: null, ce: null, open: null, q: null })} className="small" style={{ background: "none", border: 0, textDecoration: "underline", cursor: "pointer", color: "var(--ink-2)", font: "inherit", fontSize: 14 }}>Clear all</button>
                <button type="button" className="btn btn-sm sheet-btn" onClick={() => setSheet(false)}>Done</button>
              </span>
            </div>
            <div className="fgroup">
              <span className="eyebrow">Department</span>
              {departments.map((d) => (
                <button key={d.code} type="button" className={`${chip(dept.includes(d.k))} d-${d.k}`} aria-pressed={dept.includes(d.k)} onClick={() => toggleDept(d.k)} style={{ justifyContent: "space-between", width: "100%", height: 38 }}>
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}><span className="dot" />{d.name}</span>
                  <span className="mono" style={{ fontSize: 12, opacity: 0.7 }}>{courses.filter((c) => c.k === d.k && match(c, true)).length}</span>
                </button>
              ))}
            </div>
            <div className="fgroup"><span className="eyebrow">Level</span><div className="chips">{LEVELS.map((l) => <button key={l} type="button" className={chip(level === l)} aria-pressed={level === l} onClick={() => one("level", level, l)}>{l}</button>)}</div></div>
            <div className="fgroup"><span className="eyebrow">Type</span><div className="chips">{(Object.keys(TYPE_LABEL) as CType[]).map((t) => <button key={t} type="button" className={chip(type === t)} aria-pressed={type === t} onClick={() => one("type", type, t)}>{TYPE_LABEL[t]}</button>)}</div></div>
            <div className="fgroup"><span className="eyebrow">Format</span><div className="chips">{(Object.keys(FORMAT_LABEL) as CFormat[]).map((t) => <button key={t} type="button" className={chip(format === t)} aria-pressed={format === t} onClick={() => one("format", format, t)}>{FORMAT_LABEL[t]}</button>)}</div></div>
            <div className="fgroup" style={{ borderTop: "1px solid var(--rule)", paddingTop: 20 }}>
              <label className="check"><input type="checkbox" checked={ce} onChange={() => set({ ce: ce ? null : "1" })} /> CE-eligible (YACEP)</label>
              <label className="check"><input type="checkbox" checked={open} onChange={() => set({ open: open ? null : "1" })} /> Open to non-cohort teachers</label>
            </div>
          </aside>

          <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <span className="mono" style={{ fontSize: 14 }} role="status" aria-live="polite"><b style={{ fontWeight: 500 }}>{results.length}</b> courses</span>
              <span className="small">Sorted by level, then code</span>
            </div>
            {results.length > 0 && view === "grid" && <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(270px, 100%), 1fr))", gap: 18 }}>{results.map((c) => <CourseCard key={c.code} c={c} showType />)}</div>}
            {results.length > 0 && view === "list" && <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>{results.map((c) => <CourseRow key={c.code} c={c} />)}</div>}
            {results.length === 0 && (
              <div className="panel" style={{ textAlign: "center", padding: "56px 24px" }}>
                <h2 className="d3">Nothing matches that. Yet.</h2>
                <p className="body" style={{ margin: "12px auto 24px", maxWidth: 420 }}>Try fewer filters, or search for a teacher’s name. A course you want may sit in another department.</p>
                <button type="button" className="btn btn-ink" onClick={() => set({ dept: null, level: null, type: null, format: null, ce: null, open: null, q: null })}>Clear all filters</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
