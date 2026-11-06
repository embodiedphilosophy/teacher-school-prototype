import Link from "next/link";
import type { Metadata } from "next";
import { Ladder } from "@/components/Ladder";
import { FaqList } from "@/components/Faq";
import { Photo } from "@/components/Photo";
import { tracks } from "@/content/tracks";
import { faqs } from "@/content/faqs";
import { deptByCode } from "@/content/departments";
export const metadata: Metadata = { title: "Curriculum" };
const stages = [
  { n: "01", level: "100", name: "Foundations core", desc: "Core courses across the departments. PT101 and TP140 are required of everyone; the rest you choose. Taken together, in cohort.", units: "12 units · ~9 months", courses: ["PT101", "TP140", "AS110", "MS120", "BM130"] },
  { n: "02", level: "200", name: "Distribution", desc: "Further courses across at least four departments, so no teacher specializes too early.", units: "12 units", courses: ["PT210", "MS250", "SK210"] },
  { n: "03", level: "200–300", name: "Electives", desc: "Your choice from the catalog, including residency modules once London opens.", units: "12 units", courses: ["AS240", "TH260", "SK201"] },
  { n: "04", level: "300", name: "Specialization", desc: "A track led by its faculty: required courses, track electives, a reading list.", units: "9 units", courses: ["PT320", "BM330"] },
  { n: "05", level: "400", name: "Practicum & capstone", desc: "Supervised teaching observed by two faculty, and a public capstone.", units: "3 units", courses: ["TP400"] },
];
export default function Page() {
  return (
    <>
      <section className="wrap" style={{ paddingTop: "clamp(56px, 7vw, 104px)", paddingBottom: 56 }}>
        <div className="eyebrow" style={{ marginBottom: 24 }}>Curriculum · how it works</div>
        <div className="split" style={{ alignItems: "end" }}>
          <h1 className="d1">A university model, built for teachers who <span className="it">already teach.</span></h1>
          <p className="lede">A shared core, breadth across seven departments, electives you choose, then depth in one specialization. Mentorship runs the whole length. Nothing is a weekend.</p>
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: "clamp(64px, 8vw, 120px)" }}>
        <div style={{ overflowX: "auto", paddingBottom: 8 }} tabIndex={0} aria-label="Curriculum structure diagram (scrolls sideways on small screens)">
          <div style={{ minWidth: 1080, display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))", gap: 0 }}>
            <div style={{ gridColumn: "1 / 2", padding: "10px 14px", background: "var(--ink)", color: "var(--paper)", fontFamily: "var(--f-mono), monospace", fontSize: 12, letterSpacing: ".1em" }}>FOUNDATIONS CERTIFICATE</div>
            <div style={{ gridColumn: "2 / 4", padding: "10px 14px", background: "var(--ink-2)", color: "var(--paper)", fontFamily: "var(--f-mono), monospace", fontSize: 12, letterSpacing: ".1em", borderLeft: "2px solid var(--paper)" }}>DIPLOMA</div>
            <div style={{ gridColumn: "4 / 6", padding: "10px 14px", background: "var(--accent)", color: "var(--accent-ink)", fontFamily: "var(--f-mono), monospace", fontSize: 12, letterSpacing: ".1em", borderLeft: "2px solid var(--paper)" }}>SPECIALIST → FELLOW BY INVITATION</div>
            {stages.map((s, i) => (
              <div key={s.n} style={{ padding: "28px 24px 28px 0", borderRight: "1px solid var(--rule)", display: "flex", flexDirection: "column", gap: 14, marginLeft: i === 0 ? 0 : 24 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}><span className="mono" style={{ fontSize: 13, color: "var(--accent)", fontWeight: 500 }}>{s.n}</span><span style={{ flex: 1, height: 1, background: "var(--rule-2)" }} /><span className="mono small">{s.level}</span></div>
                <h3 className="d3">{s.name}</h3>
                <p className="body" style={{ fontSize: 15 }}>{s.desc}</p>
                <div className="mono" style={{ fontSize: 13 }}>{s.units}</div>
                <div className="row" style={{ gap: 6 }}>{s.courses.map((c) => <Link key={c} className="pre" href={`/courses/${c}`}>{c}</Link>)}</div>
              </div>
            ))}
            <div style={{ gridColumn: "1 / 6", marginTop: 4, height: 64, border: "1.5px solid var(--ink)", display: "flex", alignItems: "center", padding: "0 20px", gap: 18, background: "var(--card)" }}>
              <span className="mono" style={{ fontSize: 12, letterSpacing: ".1em", fontWeight: 500 }}>MENTORSHIP</span>
              <span style={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                {["Pod placement", "Monthly pod", "Termly 1:1", "Observed teaching", "Capstone review", "Apprenticeship"].map((x, i, a) => <span key={x} style={{ display: "contents" }}><span className="small">{x}</span>{i < a.length - 1 && <span style={{ width: 6, height: 6, background: "var(--accent)", borderRadius: "50%" }} />}</span>)}
              </span>
            </div>
          </div>
        </div>
        <p className="small" style={{ marginTop: 16 }}>Unit counts and course codes are draft values for the prototype.</p>
      </section>

      <section className="wrap" style={{ paddingBottom: "clamp(48px, 6vw, 96px)" }}>
        <div className="sec-head"><div style={{ maxWidth: 720 }}><div className="eyebrow" style={{ marginBottom: 18 }}>The ladder</div><h2 className="d2">Four credentials. Click a rung.</h2></div></div>
        <Ladder />
      </section>

      <section style={{ background: "var(--ink)", color: "var(--paper)" }}>
        <div className="wrap sec-sm">
          <div className="eyebrow" style={{ color: "#A69E90", marginBottom: 18 }}>What we read</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(240px, 100%), 1fr))", gap: 16 }}>
            <Photo slot="curriculum/paperbacks" ratio="4 / 5" alt="A stack of battered paperbacks on a wooden table" cap="battered paperbacks, spines cracked." />
            <Photo slot="curriculum/annotated" ratio="4 / 5" alt="A page marked up in pencil with marginal notes" cap="a marked-up page, pencil in the margins." bw />
            <Photo slot="curriculum/manuscript" ratio="4 / 5" alt="A Devanāgarī manuscript page" cap="a Sanskrit manuscript page." />
            <Photo slot="curriculum/bookstore" ratio="4 / 5" alt="A narrow aisle in a used bookstore" cap="a used-bookstore aisle." />
          </div>
        </div>
      </section>

      <section style={{ background: "var(--paper-2)", borderBottom: "1px solid var(--rule)" }}>
        <div className="wrap sec-sm">
          <div className="split" style={{ alignItems: "start" }}>
            <div><div className="eyebrow" style={{ marginBottom: 18 }}>Where it happens</div><h2 className="d2">Online first. Then London.</h2></div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 0, borderTop: "2px solid var(--ink)" }}>
              <div style={{ padding: "18px 18px 0 0" }}><div className="mono small">YEAR 1–2</div><div className="d4" style={{ margin: "8px 0 6px" }}>Online cohorts</div><p className="small">Live seminars across UK and US hours, pods on video, observed teaching by recording.</p></div>
              <div style={{ padding: "18px 18px 0", borderLeft: "1px solid var(--rule)" }}><div className="mono small">YEAR 2</div><div className="d4" style={{ margin: "8px 0 6px" }}>London residencies</div><p className="small">Pop-up intensives for practicum, assisting and in-person observation.</p></div>
              <div style={{ padding: "18px 0 0 18px", borderLeft: "1px solid var(--rule)" }}><div className="mono small" style={{ color: "var(--accent)" }}>YEAR 3</div><div className="d4" style={{ margin: "8px 0 6px" }}>A London campus</div><p className="small">A permanent home for the school. <Link className="link" href="/london">Get announcements</Link></p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap sec">
        <div className="sec-head"><div style={{ maxWidth: 720 }}><div className="eyebrow" style={{ marginBottom: 18 }}>Specialization tracks</div><h2 className="d2">Depth in one thing, after breadth in all of them.</h2></div></div>
        <div className="g-auto">
          {tracks.map((t) => (
            <Link key={t.slug} className={`dt d-${t.k}`} href={`/tracks/${t.slug}`} style={{ minHeight: 240 }}>
              <span className="code">{t.dept} · TRACK</span><h3>{t.name}</h3><p>{t.who}</p><span className="cnt">Capstone: {t.cap} →</span>
            </Link>
          ))}
        </div>
        <p className="small" style={{ marginTop: 16 }}>Departments: {["PT", "TH", "BM", "TP"].map((c) => deptByCode(c).name).join(" · ")}.</p>
      </section>

      <section className="wrap" style={{ paddingBottom: "clamp(64px, 9vw, 136px)" }}>
        <div className="split" style={{ alignItems: "start" }}>
          <div><div className="eyebrow" style={{ marginBottom: 18 }}>Questions</div><h2 className="d2">What teachers ask us first.</h2></div>
          <FaqList items={faqs.filter((f) => f.topic === "curriculum")} />
        </div>
      </section>

      <section style={{ background: "var(--ink)", color: "var(--paper)" }}>
        <div className="wrap sec-sm" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <h2 className="d2" style={{ maxWidth: "18ch" }}>Start with the founding cohort.</h2>
          <div className="row" style={{ gap: 12 }}><Link className="btn btn-primary btn-lg" href="/apply">Apply for the founding cohort</Link><Link className="btn btn-lg" href="/catalog" style={{ borderColor: "var(--paper)", color: "var(--paper)" }}>Browse the catalog</Link></div>
        </div>
      </section>
    </>
  );
}
