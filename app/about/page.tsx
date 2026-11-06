import Link from "next/link";
import type { Metadata } from "next";
import { faculty } from "@/content/faculty";
import { deptByCode } from "@/content/departments";
export const metadata: Metadata = { title: "About & governance" };
const bodies = [["Academic Council", "The chairs of the seven departments. Sets the curriculum, approves courses and decides who is admitted and who graduates. Chaired by rotation, one year at a time."], ["Board of Trustees", "[Placeholder] A small board with a majority of members from outside the faculty. Responsible for finances, safeguarding and the school’s mission. Meets quarterly; minutes are published."], ["Student Assembly", "Elected from each cohort. Meets termly with the Academic Council, with the right to table a motion and to have it answered in writing."], ["Ethics & Safeguarding Panel", "Independent of the teaching staff. Receives and investigates complaints. Its annual report is public."]];
export default function Page() {
  return (
    <>
      <section className="wrap" style={{ paddingTop: "clamp(56px, 7vw, 104px)", paddingBottom: 48 }}>
        <div className="eyebrow" style={{ marginBottom: 24 }}>About · how the school is run</div>
        <h1 className="d1" style={{ maxWidth: "16ch" }}>A faculty, answerable to <span className="it">one another.</span></h1>
        <p className="lede" style={{ marginTop: 28 }}>We are a school, not a brand. That means a governance structure that doesn’t depend on any one person, and a faculty that can be questioned in public. This page is a sketch for the prototype; the real terms are still being written.</p>
      </section>
      <section className="wrap" style={{ paddingBottom: "clamp(48px, 6vw, 96px)" }}>
        <div className="g-auto-lg">{bodies.map(([t, d]) => <div key={t} className="panel"><h2 className="d3" style={{ marginBottom: 10 }}>{t}</h2><p className="body">{d}</p></div>)}</div>
      </section>
      <section style={{ background: "var(--paper-2)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
        <div className="wrap sec-sm">
          <div className="sec-head"><div><div className="eyebrow" style={{ marginBottom: 14 }}>Founding faculty</div><h2 className="d2">Ten people who agreed to be answerable.</h2></div><Link className="link arrow" href="/faculty">Meet the faculty</Link></div>
          {faculty.map((f, i) => (
            <Link key={f.slug} href={`/faculty/${f.slug}`} className={`d-${f.k}`} style={{ display: "grid", gridTemplateColumns: "minmax(0,1.2fr) minmax(0,1fr) auto", gap: 16, padding: "14px 0", borderTop: "1px solid var(--rule-2)", borderBottom: i === faculty.length - 1 ? "1px solid var(--rule-2)" : 0, textDecoration: "none", color: "var(--ink)", alignItems: "baseline" }}>
              <span className="d4">{f.name}</span><span className="small">{deptByCode(f.dept).name}</span><span className="mono small" style={{ color: "var(--d)" }}>{f.role}</span>
            </Link>
          ))}
        </div>
      </section>
      <section className="wrap sec">
        <div className="split" style={{ alignItems: "start" }}>
          <div><div className="eyebrow" style={{ marginBottom: 14 }}>How decisions are made</div><h2 className="d2">In writing, and in public.</h2></div>
          <div className="prose"><p>Curriculum changes are proposed by a department, discussed by the Academic Council and published before they take effect. Admissions decisions are made by two faculty readers and recorded with reasons. Complaints go to the Ethics &amp; Safeguarding Panel, not to the person complained about.</p><p>Faculty are paid. Teaching Fellows are paid. Nobody is asked to work for exposure.</p><p>Questions? <Link className="link" href="/admissions">Ask about admissions</Link> or <Link className="link" href="/manifesto">read the manifesto</Link>.</p></div>
        </div>
      </section>
    </>
  );
}
