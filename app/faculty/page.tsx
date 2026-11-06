import Link from "next/link";
import type { Metadata } from "next";
import { FacultyIndex } from "./FacultyIndex";
export const metadata: Metadata = { title: "Faculty" };
export default function Page() {
  return (
    <>
      <section className="wrap" style={{ paddingTop: "clamp(56px, 7vw, 104px)", paddingBottom: 40 }}>
        <div className="eyebrow" style={{ marginBottom: 24 }}>Faculty</div>
        <div className="split" style={{ alignItems: "end" }}>
          <h1 className="d1">Masters who teach <span className="it">teachers.</span></h1>
          <p className="lede">Each founding faculty member chairs or teaches in a department and leads a mentorship pod. Teaching Fellows, our own graduates, join from Year 3.</p>
        </div>
      </section>
      <FacultyIndex />
      <section style={{ background: "var(--paper-2)", borderTop: "1px solid var(--rule)" }}>
        <div className="wrap sec-sm split" style={{ alignItems: "center" }}>
          <div><div className="eyebrow" style={{ marginBottom: 14 }}>Prospective faculty</div><h2 className="d3">We are building a faculty, not a roster. If you have taught teachers for a decade or more, write to us.</h2></div>
          <div className="row" style={{ gap: 12 }}><Link className="btn" href="/manifesto">Read the manifesto</Link><Link className="btn btn-ink" href="/about">Faculty enquiries</Link></div>
        </div>
      </section>
    </>
  );
}
