import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { faculty, facultyBySlug } from "@/content/faculty";
import { deptByCode } from "@/content/departments";
import { coursesByFaculty } from "@/content/courses";
import { CourseCard } from "@/components/Cards";
import { PortraitBox } from "@/components/Photo";
import { TrailerButton } from "./TrailerButton";

export function generateStaticParams() { return faculty.map((f) => ({ slug: f.slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> { const f = facultyBySlug((await params).slug); return { title: f?.name ?? "Faculty" }; }
const TONE: Record<string, string> = { pt: "#E0808F", as: "#E2B04F", ms: "#5FC0B8", bm: "#9AA6F0", tp: "#9CC46A", th: "#CC92D6", sk: "#A3B3C2" };
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const f = facultyBySlug((await params).slug); if (!f) notFound();
  const d = deptByCode(f.dept); const cs = coursesByFaculty(f.slug);
  const filled = f.podSize - f.podOpen;
  const first = f.name.replace("Dr. ", "").split(" ")[0];
  return (
    <div className={`d-${f.k}`}>
      <section style={{ background: "#11100D", color: "#EEE8DC" }}>
        <div className="wrap" style={{ paddingTop: 28, paddingBottom: "clamp(48px, 6vw, 88px)" }}>
          <nav className="small" aria-label="Breadcrumb" style={{ display: "flex", gap: 8, marginBottom: 32, color: "#A69E90" }}><Link href="/faculty" style={{ color: "#A69E90" }}>Faculty</Link><span>/</span><span style={{ color: "#EEE8DC" }}>{f.name}</span></nav>
          <div className="split" style={{ alignItems: "end" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <span className="eyebrow" style={{ color: TONE[f.k] }}>{d.name} · {f.role}</span>
              <h1 className="d0" style={{ fontSize: "clamp(48px, 6.4vw, 104px)" }}>{f.name}</h1>
              <p className="lede" style={{ color: "#CFC7B8" }}>{f.lineage}</p>
              <div className="row" style={{ gap: 10 }}>
                <span className="tag" style={{ color: "#CFC7B8", borderColor: "#4A453C" }}>{f.podOpen > 0 && <span className="live-dot" />}{f.podOpen > 0 ? `Pod open · ${f.podOpen} place${f.podOpen > 1 ? "s" : ""}` : "Pod full"}</span>
                <span className="tag" style={{ color: "#CFC7B8", borderColor: "#4A453C" }}>Teaching {cs.length} course{cs.length === 1 ? "" : "s"} this year</span>
                <span className="tag" style={{ color: "#CFC7B8", borderColor: "#4A453C" }}>{f.city}</span>
              </div>
            </div>
            <div className="trailer" style={{ background: "#25221C" }}>
              <TrailerButton name={f.name} />
              <span className="cap">Trailer · 2 min · mid-seminar</span>
            </div>
          </div>
        </div>
      </section>

      <div className="wrap" style={{ display: "flex", flexWrap: "wrap", gap: "clamp(40px, 6vw, 96px)", paddingTop: "clamp(56px, 7vw, 96px)", paddingBottom: 120, alignItems: "flex-start" }}>
        <div style={{ flex: "999 1 560px", minWidth: 0, display: "flex", flexDirection: "column", gap: 64 }}>
          <div style={{ display: "grid", gridTemplateColumns: "minmax(0,1fr) 200px", gap: 32, alignItems: "start" }} className="bio-grid">
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <h2 className="d3">Biography</h2>
              <p className="body" style={{ fontSize: 18, lineHeight: 1.6 }}>{f.bio}</p>
              {!f.real && <p className="small">A fictional faculty member, written for the prototype.</p>}
            </div>
            <div style={{ order: 2 }}><PortraitBox slot={f.photo} name={f.name} ini={f.ini} cap={f.real ? "Photo to come" : "Portrait"} /></div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 40 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <h3 className="eyebrow" style={{ color: "var(--ink)" }}>Lineage &amp; training</h3>
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {(f.real
                  ? ["DPhil candidate, Oxford (AMES)", "MPhil, Oxford · MA, The New School · MSc, LSE", "Contemplative lineage through Paul Muller-Ortega", "Founding Director, Embodied Philosophy"]
                  : [f.lineage, `Based in ${f.city}`, `${d.name}, ${f.role === "Chair" ? "Chair" : "Faculty"}`]
                ).map((x, i, a) => <li key={x} style={{ padding: "12px 0", borderTop: "1px solid var(--rule)", borderBottom: i === a.length - 1 ? "1px solid var(--rule)" : 0 }}>{x}</li>)}
              </ul>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <h3 className="eyebrow" style={{ color: "var(--ink)" }}>Areas of teaching</h3>
              <div className="row" style={{ gap: 8 }}>{f.areas.map((a) => <Link key={a} className="chip" style={{ textDecoration: "none" }} href={`/catalog?dept=${f.k}`}>{a}</Link>)}</div>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}><h2 className="d3">Courses this year</h2><Link className="link arrow" href={`/catalog?q=${encodeURIComponent(f.name.replace("Dr. ", ""))}`}>Catalog</Link></div>
            <div className="g-auto">{cs.map((c) => <CourseCard key={c.code} c={c} showType />)}</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <h2 className="d3" style={{ marginBottom: 16 }}>Selected writing &amp; recordings</h2>
            {f.writing.map((w, i, a) => (
              <div key={w.title} style={{ display: "grid", gridTemplateColumns: "120px 1fr auto", gap: 20, padding: "18px 0", borderTop: "1px solid var(--rule)", borderBottom: i === a.length - 1 ? "1px solid var(--rule)" : 0, alignItems: "baseline" }}>
                <span className="mono small">{w.kind}</span><span className="d4">{w.title}</span><span className="small">{w.note}</span>
              </div>
            ))}
          </div>
        </div>

        <aside style={{ flex: "1 1 320px", maxWidth: 400, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ border: "1.5px solid var(--ink)", background: "var(--card)", padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
            <span className="eyebrow" style={{ color: "var(--ink)" }}>Mentorship · 2026–27</span>
            <div className="d3">{f.podOpen > 0 ? "Pod open" : "Pod full"}</div>
            <div style={{ display: "flex", gap: 6 }}>
              {Array.from({ length: f.podSize }, (_, i) => i < filled ? <span key={i} className="avatar">{String.fromCharCode(65 + i)}</span> : <span key={i} className="avatar" style={{ background: "transparent", border: "1.5px dashed var(--accent)", color: "var(--accent)" }}>+</span>)}
            </div>
            <p className="small">{filled} of {f.podSize} places filled. Pod meets monthly, {f.podMeets}.</p>
            <Link className="btn btn-primary" href="/apply" style={{ width: "100%" }}>{f.podOpen > 0 ? `Request ${first} as mentor` : "Join the waiting list"}</Link>
            <p className="small">Requests are made in your application; final pod placement is by the faculty.</p>
          </div>
          {f.quote && (
            <figure style={{ margin: 0, padding: "24px 0", borderTop: "2px solid var(--ink)" }}>
              <blockquote className="serif it" style={{ margin: 0, fontSize: 24, lineHeight: 1.25, fontWeight: 300 }}>“{f.quote}”</blockquote>
              <figcaption className="pq-attr" style={{ marginTop: 12 }}>{f.name}</figcaption>
            </figure>
          )}
        </aside>
      </div>
    </div>
  );
}
