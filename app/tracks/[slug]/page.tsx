import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { tracks, trackBySlug } from "@/content/tracks";
import { courseByCode } from "@/content/courses";
import { facultyBySlug } from "@/content/faculty";
import { deptByCode } from "@/content/departments";
import { CourseCard } from "@/components/Cards";
import { PortraitBox } from "@/components/Photo";

export function generateStaticParams() { return tracks.map((t) => ({ slug: t.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const t = trackBySlug((await params).slug); return { title: t ? `${t.name} track` : "Track" }; }
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const t = trackBySlug((await params).slug); if (!t) notFound();
  const lead = facultyBySlug(t.lead)!;
  const req = t.required.map((c) => courseByCode(c)!); const el = t.electives.map((c) => courseByCode(c)!);
  const units = req.reduce((a, c) => a + c.units, 0);
  const depts = [...new Set(req.concat(el).map((c) => c.k))].join(",");
  return (
    <div className={`d-${t.k}`}>
      <div style={{ height: 8, background: "var(--d)" }} />
      <section className="wrap" style={{ paddingTop: 28, paddingBottom: "clamp(48px,6vw,88px)" }}>
        <nav className="small" aria-label="Breadcrumb" style={{ display: "flex", gap: 8 }}><Link href="/curriculum" style={{ color: "var(--ink-3)" }}>Curriculum</Link><span>/</span><span>Specialization tracks</span><span>/</span><span style={{ color: "var(--ink)" }}>{t.name}</span></nav>
        <div className="eyebrow" style={{ margin: "40px 0 22px", color: "var(--d)" }}>Specialization track · {deptByCode(t.dept).name}</div>
        <h1 className="d0" style={{ maxWidth: "14ch" }}>{t.name}</h1>
        <div className="split" style={{ marginTop: 40, alignItems: "end" }}>
          <p className="lede">{t.blurb}</p>
          <div className="row" style={{ gap: 10 }}><Link className="btn btn-primary btn-lg" href="/apply">Apply for the founding cohort</Link><Link className="btn btn-lg" href={`/catalog?dept=${depts}`}>See the courses</Link></div>
        </div>
      </section>
      <section style={{ background: "var(--paper-2)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
        <div className="wrap sec-sm split" style={{ alignItems: "start" }}>
          <div>
            <div className="eyebrow" style={{ marginBottom: 14 }}>Who it’s for</div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>{t.forYou.map((x, i) => <li key={i} className="body" style={{ padding: "14px 0", borderTop: "1px solid var(--rule)", fontSize: 17 }}>{x}</li>)}</ul>
          </div>
          <Link href={`/faculty/${lead.slug}`} style={{ display: "flex", gap: 20, alignItems: "center", textDecoration: "none", color: "var(--ink)" }}>
            <span style={{ width: 140, flex: "none" }}><PortraitBox slot={lead.photo} name={lead.name} ini={lead.ini} cap="" /></span>
            <span style={{ display: "flex", flexDirection: "column", gap: 6 }}><span className="eyebrow">Lead faculty</span><span className="d3">{lead.name}</span><span className="small">{lead.lineage}</span></span>
          </Link>
        </div>
      </section>
      <section className="wrap sec-sm">
        <div className="sec-head"><div><div className="eyebrow" style={{ marginBottom: 14 }}>Required</div><h2 className="d2">{req.length} courses, {units} units.</h2></div></div>
        <div className="g-auto">{req.map((c) => <CourseCard key={c.code} c={c} showType />)}</div>
      </section>
      <section className="wrap" style={{ paddingBottom: "clamp(40px,5vw,72px)" }}>
        <div className="sec-head"><div><div className="eyebrow" style={{ marginBottom: 14 }}>Track electives · choose from</div><h2 className="d2">Widen it, or go deeper.</h2></div></div>
        <div className="g-auto">{el.map((c) => <CourseCard key={c.code} c={c} showType />)}</div>
      </section>
      <section style={{ background: "var(--ink)", color: "var(--paper)" }}>
        <div className="wrap sec">
          <div className="split" style={{ alignItems: "start" }}>
            <div><div className="eyebrow" style={{ color: "#A69E90", marginBottom: 18 }}>Capstone</div><h2 className="d2">{t.capstone}.</h2><p style={{ color: "#CFC7B8", marginTop: 18, fontSize: 18, lineHeight: 1.6, maxWidth: "34em" }}>{t.capstoneBody}</p></div>
            <div>
              <div className="eyebrow" style={{ color: "#A69E90", marginBottom: 14 }}>What a graduate can do</div>
              {t.outcomes.map((o, i) => <div key={i} style={{ padding: "16px 0", borderTop: "1px solid #3A362F", display: "flex", gap: 16 }}><span className="mono" style={{ color: "#FF8A6B" }}>0{i + 1}</span><span style={{ fontSize: 17 }}>{o}</span></div>)}
              <p className="small" style={{ marginTop: 16, color: "#A69E90" }}>These describe what the track trains for. They are not statistics or graduate testimonials.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="wrap sec-sm">
        <p className="body"><b style={{ fontWeight: 500 }}>Start with:</b> {t.reading}</p>
      </section>
    </div>
  );
}
