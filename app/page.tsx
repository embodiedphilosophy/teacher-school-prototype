import Link from "next/link";
import { Photo } from "@/components/Photo";
import { Ladder } from "@/components/Ladder";
import { CourseCard, DeptTile, FacultyCard } from "@/components/Cards";
import { departments } from "@/content/departments";
import { faculty, facultyBySlug } from "@/content/faculty";
import { courses } from "@/content/courses";
import { founding } from "@/content/cohorts";
import { SCHOOL_NAME } from "@/content/config";

const rows = [
  ["Who it admits", "Anyone", "Teachers with prior training and two years teaching"],
  ["Structure", "One intensive, then nothing", "Foundations, departments, electives, a specialization"],
  ["Mentorship", "Ends at graduation", "A master and a pod for the whole path"],
  ["Your teaching", "Rarely observed", "Observed every term, with written feedback"],
  ["Texts & tradition", "A weekend module", "A department, taught from the sources"],
];

export default function Home() {
  const strip = ["jacob-kyle", "odalys-renquist", "ansel-thackeray-obi", "wren-halloran", "tamsin-achterberg"].map((s) => facultyBySlug(s)!);
  const ce = ["PT101", "BM130", "MS120"].map((c) => courses.find((x) => x.code === c)!);
  const mentor = facultyBySlug("tamsin-achterberg")!;
  return (
    <>
      {/* 1 · HERO */}
      <section className="wrap" style={{ paddingTop: "clamp(48px, 7vw, 104px)", paddingBottom: "clamp(48px, 6vw, 88px)" }}>
        <div className="eyebrow" style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 28 }}><span className="live-dot" />Founding cohort · applications open</div>
        <h1 className="d0" style={{ maxWidth: "15ch" }}>The 200-hour training was never meant to be <span className="it">the end.</span></h1>
        <div className="split" style={{ marginTop: "clamp(40px, 5vw, 72px)", alignItems: "end" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 520 }}>
            <p className="lede">Foundations, departments, specializations and a mentor who watches you teach. Built by master teachers for working teachers.</p>
            <p className="serif it" style={{ fontSize: 22, fontWeight: 300 }}>No crystals. Some Sanskrit. A lot of feedback.</p>
            <div className="row" style={{ gap: 12 }}>
              <Link className="btn btn-primary btn-lg" href="/apply">Apply for the founding cohort</Link>
              <Link className="btn btn-lg" href="/curriculum">Explore the curriculum</Link>
            </div>
            <p className="small" style={{ borderTop: "1px solid var(--rule)", paddingTop: 16 }}>We admit teachers, not beginners: prior training and two years in front of a room. Your 200-hour certificate is a learner’s permit.</p>
          </div>
          <Photo slot="home/hero" priority sizes="(max-width: 900px) 100vw, 640px" ratio="4 / 3" alt="In a brick loft studio, an older teacher in the foreground, out of focus, watches a younger teacher lead a class" cap="a senior teacher watches a younger teacher lead a class in a loft studio. Documentary, natural light." />
        </div>
      </section>

      {/* 2 · PROBLEM */}
      <section style={{ background: "var(--ink)", color: "var(--paper)" }}>
        <Photo slot="home/problem" bw ratio="21 / 7" alt="A crowded subway car in black and white; nobody is looking at anyone else" cap="a crowded subway car, black and white. Nobody looking at each other." style={{ maxHeight: 360 }} sizes="100vw" />
        <div className="wrap sec">
          <div className="split" style={{ alignItems: "start" }}>
            <div>
              <div className="eyebrow" style={{ color: "#A69E90", marginBottom: 24 }}>The problem</div>
              <h2 className="d1">Thousands of new teachers qualify every year. Few are ever mentored. <span className="it" style={{ color: "#FF8A6B" }}>We think that’s the problem.</span></h2>
            </div>
            <div style={{ display: "flex", flexDirection: "column", paddingTop: 8 }}>
              <div className="eyebrow" style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16, paddingBottom: 12, borderBottom: "1px solid #3A362F" }}>
                <span /><span style={{ color: "#A69E90" }}>The 200-hour model</span><span style={{ color: "#FF8A6B" }}>This school</span>
              </div>
              {rows.map(([a, b, c], i) => (
                <div key={a} style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 16, padding: "18px 0", borderBottom: i < rows.length - 1 ? "1px solid #3A362F" : 0, fontSize: 15 }}>
                  <span style={{ color: "#A69E90" }}>{a}</span><span style={{ color: "#CFC7B8" }}>{b}</span><span>{c}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3 · LADDER */}
      <section className="wrap sec">
        <div className="sec-head">
          <div style={{ maxWidth: 760 }}>
            <div className="eyebrow" style={{ marginBottom: 18 }}>The model</div>
            <h2 className="d2">Four steps. Each one earned, none of them a weekend.</h2>
          </div>
          <Link className="link arrow" href="/curriculum">How the curriculum works</Link>
        </div>
        <Ladder />
      </section>
      <hr className="rule" />

      {/* 4 · DEPARTMENTS */}
      <section className="wrap sec">
        <div className="sec-head">
          <div style={{ maxWidth: 720 }}>
            <div className="eyebrow" style={{ marginBottom: 18 }}>Seven departments</div>
            <h2 className="d2">Yoga is not one subject. We teach it as seven.</h2>
          </div>
          <Link className="link arrow" href="/catalog">Browse the full catalog</Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(250px, 100%), 1fr))", gap: 16 }}>
          {departments.map((d) => <DeptTile key={d.code} {...d} count={courses.filter((c) => c.dept === d.code).length} />)}
          <Link className="dt d-ink" href="/curriculum" style={{ background: "transparent", borderStyle: "dashed" }}>
            <span className="code">+</span><h3>How departments fit together</h3><p>Foundations in every department, then depth in one.</p><span className="cnt">The university model →</span>
          </Link>
        </div>
      </section>

      {/* 5 · FACULTY STRIP */}
      <section style={{ background: "var(--paper-2)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
        <div className="wrap sec">
          <div className="sec-head">
            <div style={{ maxWidth: 720 }}>
              <div className="eyebrow" style={{ marginBottom: 18 }}>Founding faculty</div>
              <h2 className="d2">Taught by masters. Read like a faculty, not a line-up.</h2>
            </div>
            <Link className="link arrow" href="/faculty">All faculty</Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(210px, 100%), 1fr))", gap: 24 }}>
            {strip.map((f) => <FacultyCard key={f.slug} f={f} />)}
          </div>
        </div>
      </section>

      {/* 6 · MENTORSHIP SPOTLIGHT */}
      <section className="wrap sec">
        <div className="split" style={{ alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <Photo slot="home/mentorship" ratio="5 / 4" alt="Two people at a café table; one annotates the other’s notebook" cap="two people at a café table, one annotating the other’s notebook." />
            <div style={{ position: "relative", aspectRatio: "1 / 1", maxWidth: 360, width: "100%", border: "1px solid var(--rule)", borderRadius: "50%", alignSelf: "center" }} aria-label="A pod: one master teacher and five teachers" role="img">
              <div style={{ position: "absolute", inset: "18%", border: "1px dashed var(--rule-2)", borderRadius: "50%" }} />
              <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: "30%", aspectRatio: "1", borderRadius: "50%", background: "var(--accent)", color: "var(--accent-ink)", display: "grid", placeItems: "center", textAlign: "center", fontFamily: "var(--f-serif), Georgia, serif", fontSize: 15, lineHeight: 1.1 }}>Master<br />teacher</div>
              {[["A", { left: "50%", top: "4%", transform: "translateX(-50%)" }], ["B", { right: "6%", top: "30%" }], ["C", { right: "18%", bottom: "8%" }], ["D", { left: "18%", bottom: "8%" }], ["E", { left: "6%", top: "30%" }]].map(([l, st]) => (
                <div key={l as string} className="avatar" style={{ position: "absolute", width: 52, height: 52, ...(st as object) }}>{l as string}</div>
              ))}
              <span className="eyebrow" style={{ position: "absolute", left: 0, bottom: -26 }}>One pod · five teachers</span>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div className="eyebrow">Mentorship</div>
            <h2 className="d2">Every student is placed in a pod of four to six teachers with a master.</h2>
            <p className="lede">You will be observed, challenged and accompanied. Monthly pod meetings, one-to-ones each term, and observed teaching with written feedback, from your first course to your capstone. Mentorship isn’t a perk. It’s the whole point.</p>
            <figure style={{ margin: 0, paddingTop: 24, borderTop: "2px solid var(--ink)" }}>
              <blockquote className="serif it" style={{ margin: 0, fontSize: 26, lineHeight: 1.25, fontWeight: 300 }}>“Nobody improves from being told they were wonderful.”</blockquote>
              <figcaption className="pq-attr" style={{ marginTop: 14 }}>{mentor.name} · Founding faculty, Teaching &amp; Pedagogy</figcaption>
            </figure>
            <div><Link className="link arrow" href="/mentorship">How mentorship works</Link></div>
          </div>
        </div>
      </section>

      {/* 7 · COHORT */}
      <section className="wrap" style={{ paddingBottom: "clamp(64px, 9vw, 136px)" }}>
        <div className="sec-head" style={{ marginBottom: 24 }}>
          <h2 className="d3">The founding cohort</h2>
          <span className="tag"><span className="live-dot" /> Online · live</span>
        </div>
        <div className="cohort">
          <div><div className="eyebrow">Starts</div><div className="d4" style={{ marginTop: 8 }}>{founding.starts}</div><div className="small" style={{ marginTop: 4 }}>{founding.note}</div></div>
          <div><div className="eyebrow">Applications close</div><div className="d4" style={{ marginTop: 8 }}>{founding.closes}</div><div className="small" style={{ marginTop: 4 }}>Rolling review, decisions in two weeks</div></div>
          <div><div className="eyebrow">Seats remaining</div><div className="d4 num" style={{ marginTop: 8 }}>{founding.seatsLeft} of {founding.seatsTotal}</div>
            <div className="seats" role="img" aria-label={`${founding.seatsLeft} of ${founding.seatsTotal} seats remaining`}>{Array.from({ length: founding.seatsTotal }, (_, i) => <i key={i} className={i < founding.seatsTotal - founding.seatsLeft ? "" : "free"} />)}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "var(--paper-2)" }}><Link className="btn btn-primary" href="/apply">Apply for the founding cohort</Link></div>
        </div>
      </section>

      {/* 8 · CE */}
      <section style={{ borderTop: "1px solid var(--rule)" }}>
        <div className="wrap sec">
          <div className="sec-head">
            <div style={{ maxWidth: 720 }}>
              <div className="eyebrow" style={{ marginBottom: 18 }}>Continuing education · open now</div>
              <h2 className="d2">Not ready to apply? Take one course.</h2>
              <p className="body" style={{ marginTop: 14 }}>Selected courses are open to any qualified teacher and count as YACEP continuing-education hours.</p>
            </div>
            <Link className="btn" href="/catalog?ce=1">Browse CE courses</Link>
          </div>
          <div className="g-auto">{ce.map((c) => <CourseCard key={c.code} c={c} />)}</div>
        </div>
      </section>

      {/* 9 · MANIFESTO */}
      <section style={{ background: "var(--accent)", color: "var(--accent-ink)" }}>
        <div className="wrap sec">
          <div className="eyebrow" style={{ color: "inherit", opacity: 0.8, marginBottom: 28 }}>From the manifesto</div>
          <p className="pq" style={{ fontSize: "clamp(36px, 5vw, 76px)", maxWidth: "18ch" }}>“Yoga is a living tradition of knowledge. It deserves an institution that teaches it like one.”</p>
          <div className="row" style={{ marginTop: 36, justifyContent: "space-between" }}>
            <span className="pq-attr" style={{ color: "inherit", opacity: 0.85, margin: 0 }}>Signed by the founding faculty · {SCHOOL_NAME}</span>
            <Link className="btn" href="/manifesto" style={{ borderColor: "currentColor", color: "inherit" }}>Read the manifesto</Link>
          </div>
        </div>
      </section>
    </>
  );
}
