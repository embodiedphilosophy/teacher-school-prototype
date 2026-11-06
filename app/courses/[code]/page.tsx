import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { courses, courseByCode, TYPE_LABEL, FORMAT_LABEL } from "@/content/courses";
import { deptByCode } from "@/content/departments";
import { facultyBySlug } from "@/content/faculty";
import { PortraitBox } from "@/components/Photo";
import { CourseCard } from "@/components/Cards";
import { Syllabus, Schedule, TzProvider } from "./CourseBody";

export function generateStaticParams() { return courses.map((c) => ({ code: c.code })); }
export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const { code } = await params; const c = courseByCode(code); return { title: c ? `${c.code} · ${c.title}` : "Course" };
}
const hash = (s: string) => [...s].reduce((a, ch) => (a * 31 + ch.charCodeAt(0)) >>> 0, 7);

export default async function Page({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params; const c = courseByCode(code); if (!c) notFound();
  const d = deptByCode(c.dept); const f = facultyBySlug(c.fac)!;
  const requiredFor = courses.filter((x) => x.prereqs.includes(c.code));
  const taken = 10 + (hash(c.code) % 9); const cap = 20;
  const related = courses.filter((x) => x.dept === c.dept && x.code !== c.code).slice(0, 3);
  const noPlaces = c.start === "Cohort only";
  return (
    <div className={`d-${c.k}`}>
      <div style={{ height: 8, background: "var(--d)" }} />
      <section className="wrap" style={{ paddingTop: 28 }}>
        <nav className="small" aria-label="Breadcrumb" style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <Link href="/catalog" style={{ color: "var(--ink-3)" }}>Catalog</Link><span>/</span>
          <Link href={`/departments/${d.slug}`} style={{ color: "var(--ink-3)" }}>{d.name}</Link><span>/</span><span style={{ color: "var(--ink)" }}>{c.code}</span>
        </nav>
      </section>
      <TzProvider>
        <div className="wrap" style={{ display: "flex", flexWrap: "wrap", gap: "clamp(32px, 5vw, 72px)", paddingTop: 32, paddingBottom: 120, alignItems: "flex-start" }}>
          <div style={{ flex: "999 1 560px", minWidth: 0, display: "flex", flexDirection: "column", gap: 56 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div className="row" style={{ gap: 8 }}>
                <span className="mono" style={{ fontSize: 15, fontWeight: 500, color: "var(--d)" }}>{c.code}</span>
                <span className="tag">{TYPE_LABEL[c.type]} · Level {c.level}</span>
                <span className="tag">{c.format === "live" && <span className="live-dot" />}{FORMAT_LABEL[c.format]}</span>
                {c.ce && <span className="ce">CE · {c.hours} HRS</span>}
                {c.open && <span className="tag">Open to non-cohort</span>}
              </div>
              <h1 className="d1">{c.title}</h1>
              <p className="lede">{c.desc.split(". ").slice(0, 2).join(". ")}.</p>
              <Link href={`/faculty/${f.slug}`} style={{ display: "flex", gap: 16, alignItems: "center", textDecoration: "none", color: "var(--ink)", paddingTop: 12, borderTop: "1px solid var(--rule)" }}>
                <span style={{ width: 72, flex: "none" }}><PortraitBox slot={f.photo} name={f.name} ini={f.ini} cap="" /></span>
                <span style={{ display: "flex", flexDirection: "column", gap: 2 }}><span className="d4">{f.name}</span><span className="small">{deptByCode(f.dept).name} · {f.lineage}</span></span>
              </Link>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", borderTop: "2px solid var(--ink)", borderBottom: "1px solid var(--rule)" }}>
              {[["Units", c.units], ["Contact hours", c.hours], ["Weeks", c.weeks], ["Starts", c.start]].map(([l, v], i) => (
                <div key={l as string} style={{ padding: i === 0 ? "18px 16px 18px 0" : "18px 16px", borderLeft: i ? "1px solid var(--rule)" : 0 }}>
                  <div className="eyebrow">{l}</div><div className={`d3 ${typeof v === "number" ? "num" : ""}`} style={{ marginTop: 6 }}>{v}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h2 className="d3">About the course</h2>
              <p className="body" style={{ fontSize: 17, maxWidth: "46em" }}>{c.desc}</p>
            </div>

            <Syllabus c={c} />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 32 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <h3 className="eyebrow" style={{ color: "var(--ink)" }}>Prerequisites</h3>
                <div className="row" style={{ gap: 8 }}>
                  <span className="pre" style={{ fontFamily: "inherit" }}>200-hr training or equivalent</span><span className="pre" style={{ fontFamily: "inherit" }}>2+ years teaching</span>
                  {c.prereqs.map((p) => <Link key={p} className="pre done" href={`/courses/${p}`}>{p}</Link>)}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <h3 className="eyebrow" style={{ color: "var(--ink)" }}>Required for</h3>
                <div className="row" style={{ gap: 8 }}>{requiredFor.length ? requiredFor.map((x) => <Link key={x.code} className="pre" href={`/courses/${x.code}`}>{x.code}</Link>) : <span className="small">Nothing yet. It stands on its own.</span>}</div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <h3 className="eyebrow" style={{ color: "var(--ink)" }}>Counts toward</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 15 }}>{c.counts.map((x) => <span key={x}>{x}</span>)}{c.ce && <span>{c.hours} YACEP CE hours</span>}</div>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <h2 className="d3">More in {d.name}</h2>
              <div className="g-auto">{related.map((x) => <CourseCard key={x.code} c={x} />)}</div>
            </div>
          </div>

          <aside style={{ flex: "1 1 340px", maxWidth: 420, display: "flex", flexDirection: "column", gap: 16, position: "sticky", top: 16 }}>
            <div style={{ border: "1.5px solid var(--ink)", background: "var(--card)" }}>
              <div style={{ padding: 22, display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}><span className="eyebrow">Tuition</span><span className="d3">{c.price}</span></div>
                <p className="small">Included for students in the founding cohort.</p>
                <Link className="btn btn-primary btn-lg" href="/apply" style={{ width: "100%" }}>{noPlaces ? "Part of your capstone year" : `Enrol in ${c.code}`}</Link>
                <Link className="btn" href="/apply" style={{ width: "100%" }}>Apply to the programme instead</Link>
                {!noPlaces && <>
                  <div className="small" style={{ display: "flex", justifyContent: "space-between" }}><span>{taken} of {cap} places taken</span><span className="mono">{cap - taken} left</span></div>
                  <div style={{ height: 6, background: "var(--paper-2)" }}><div style={{ width: `${(taken / cap) * 100}%`, height: 6, background: "var(--ink)" }} /></div>
                </>}
              </div>
              <Schedule c={c} />
            </div>
          </aside>
        </div>
      </TzProvider>
    </div>
  );
}
