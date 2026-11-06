import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { departments, deptBySlug } from "@/content/departments";
import { faculty } from "@/content/faculty";
import { courses } from "@/content/courses";
import { tracks } from "@/content/tracks";
import { Photo } from "@/components/Photo";
import { CourseCard, FacultyCard } from "@/components/Cards";

export function generateStaticParams() { return departments.map((d) => ({ slug: d.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const d = deptBySlug((await params).slug); return { title: d?.name ?? "Department" }; }
const ALT: Record<string, string> = {
  pt: "Used paperbacks stacked beside an espresso on a worn wooden table", as: "A timber studio floor with mismatched mats laid out", ms: "A skeleton model in a classroom beside a window", bm: "A person sitting still by a steel-framed window at dawn",
  tp: "A teacher writing on a whiteboard in front of a seated group", th: "A one-to-one session with a chair and blocks in a quiet room", sk: "Devanāgarī script on an old page",
};
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const d = deptBySlug((await params).slug); if (!d) notFound();
  const fac = faculty.filter((f) => f.dept === d.code);
  const cs = courses.filter((c) => c.dept === d.code);
  const feeds = tracks.filter((t) => t.required.concat(t.electives).some((c) => c.startsWith(d.code)) || t.dept === d.code);
  return (
    <div className={`d-${d.k}`}>
      <div style={{ height: 8, background: "var(--d)" }} />
      <section className="wrap" style={{ paddingTop: 28, paddingBottom: "clamp(40px,5vw,72px)" }}>
        <nav className="small" aria-label="Breadcrumb" style={{ display: "flex", gap: 8 }}><Link href="/curriculum" style={{ color: "var(--ink-3)" }}>Departments</Link><span>/</span><span style={{ color: "var(--ink)" }}>{d.name}</span></nav>
        <div className="split" style={{ marginTop: 40, alignItems: "end" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
            <span className="mono" style={{ color: "var(--d)", fontWeight: 500 }}>{d.code} · Department</span>
            <h1 className="d1">{d.name}</h1>
            <p className="lede">{d.scope}</p>
            <div className="row" style={{ gap: 10 }}><Link className="btn btn-primary" href={`/catalog?dept=${d.k}`}>See {cs.length} courses in the catalog</Link><Link className="btn" href={`/faculty/${fac.find((f) => f.role === "Chair")!.slug}`}>Meet the chair</Link></div>
          </div>
          <Photo slot={d.photo} ratio="4 / 3" alt={ALT[d.k]} cap={ALT[d.k]} />
        </div>
      </section>
      <section style={{ background: "var(--paper-2)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
        <div className="wrap sec-sm split" style={{ alignItems: "start" }}>
          <div><div className="eyebrow" style={{ marginBottom: 14 }}>Scope</div><h2 className="d3">What this department is for.</h2></div>
          <p className="body" style={{ fontSize: 18, lineHeight: 1.65 }}>{d.description}</p>
        </div>
      </section>
      <section className="wrap sec-sm">
        <div className="sec-head"><h2 className="d2">Faculty</h2></div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(210px, 100%), 1fr))", gap: 24 }}>{fac.map((f) => <FacultyCard key={f.slug} f={f} />)}</div>
      </section>
      <section className="wrap sec-sm" style={{ paddingTop: 0 }}>
        <div className="sec-head"><h2 className="d2">Courses</h2><Link className="link arrow" href={`/catalog?dept=${d.k}`}>Filter in the catalog</Link></div>
        {[100, 200, 300, 400].map((lv) => {
          const list = cs.filter((c) => c.level === lv); if (!list.length) return null;
          return (
            <div key={lv} style={{ marginBottom: 40 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}><span className="mono" style={{ color: "var(--d)", fontWeight: 500 }}>{lv}</span><span style={{ flex: 1, height: 1, background: "var(--rule-2)" }} /><span className="small">{lv === 100 ? "Foundations" : lv === 200 ? "Distribution & electives" : lv === 300 ? "Specialization" : "Practicum & capstone"}</span></div>
              <div className="g-auto">{list.map((c) => <CourseCard key={c.code} c={c} showType />)}</div>
            </div>
          );
        })}
      </section>
      <section style={{ background: "var(--ink)", color: "var(--paper)" }}>
        <div className="wrap sec-sm">
          <div className="eyebrow" style={{ color: "#A69E90", marginBottom: 14 }}>Tracks this department feeds</div>
          <div className="g-auto">
            {feeds.map((t) => <Link key={t.slug} className={`dt d-${t.k}`} href={`/tracks/${t.slug}`} style={{ background: "transparent", borderColor: "#3A362F", color: "#EEE8DC" }}><span className="code">TRACK</span><h3>{t.name}</h3><p style={{ color: "#CFC7B8" }}>{t.who}</p><span className="cnt">Capstone: {t.cap} →</span></Link>)}
          </div>
        </div>
      </section>
    </div>
  );
}
