"use client";
import { useState } from "react";
import { departments } from "@/content/departments";
import { faculty } from "@/content/faculty";
import { FacultyCard } from "@/components/Cards";
export function FacultyIndex() {
  const [k, setK] = useState<string | null>(null);
  const list = faculty.filter((f) => !k || f.k === k);
  return (
    <>
      <section className="wrap" style={{ paddingBottom: 24 }}>
        <div className="row" style={{ gap: 8, padding: "18px 0", borderTop: "2px solid var(--ink)", borderBottom: "1px solid var(--rule)" }} role="group" aria-label="Filter by department">
          <button type="button" className={`chip${!k ? " on" : ""}`} aria-pressed={!k} onClick={() => setK(null)}>All departments</button>
          {departments.map((d) => <button key={d.k} type="button" className={`chip d-${d.k}${k === d.k ? " on" : ""}`} aria-pressed={k === d.k} onClick={() => setK(k === d.k ? null : d.k)}><span className="dot" />{d.name}</button>)}
          <span className="mono small" style={{ marginLeft: "auto" }} role="status">{list.length} faculty</span>
        </div>
      </section>
      <section className="wrap" style={{ paddingBottom: 120 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(250px, 100%), 1fr))", gap: "40px 24px" }}>{list.map((f) => <FacultyCard key={f.slug} f={f} />)}</div>
      </section>
    </>
  );
}
