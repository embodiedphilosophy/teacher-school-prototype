import Link from "next/link";
import type { Metadata } from "next";
import { Photo, AvatarImg } from "@/components/Photo";
export const metadata: Metadata = { title: "Mentorship" };
const arc: [string, string, string, number][] = [
  ["WEEK 0", "Placement", "You join a pod and meet your master before the first course.", 0],
  ["MONTHLY", "Pod meetings", "Cases, readings and your own classes, every month.", 0],
  ["EACH TERM", "Observed teaching", "A real class, written feedback, your written reply.", 0],
  ["YEAR 2–3", "Practicum", "Teaching observed by two faculty; a public capstone.", 0],
  ["INVITED", "Assist", "Assist live sessions and residencies alongside a master.", 1],
  ["·", "Lead breakouts", "Run small-group work inside a master’s course.", 1],
  ["·", "Teaching Fellow", "Join the faculty. In time, take a pod of your own.", 1],
];
const pillars = [["01", "The pod", "Four to six teachers and one master, together for the length of your credential. Placement by the faculty, with your request considered."], ["02", "Monthly meetings", "Ninety minutes, live. Case discussion, a shared reading, and each teacher’s question from their own classes."], ["03", "One-to-ones", "At least once a term with your master: your progress, your track, the teacher you are becoming."], ["04", "Observed teaching", "Each term you teach a real class, recorded or in the room. Your master writes it up. You reply in writing."]];
export default function Page() {
  return (
    <>
      <section className="wrap" style={{ paddingTop: "clamp(56px, 7vw, 104px)", paddingBottom: "clamp(56px, 7vw, 96px)" }}>
        <div className="eyebrow" style={{ marginBottom: 24 }}>Mentorship &amp; apprenticeship</div>
        <h1 className="d0" style={{ maxWidth: "14ch" }}>You will be <span className="it">observed.</span></h1>
        <div className="split" style={{ marginTop: 48, alignItems: "end" }}>
          <p className="lede">Every student is placed in a pod of four to six teachers with a master. Mentorship isn’t a perk. It’s the whole point: you will be observed, challenged and accompanied, from your first course to your capstone, and beyond it if you choose to apprentice.</p>
          <Photo slot="mentorship/hero" ratio="16 / 9" priority alt="Two people at a café table; one annotates the other’s notebook" cap="a master gives feedback after class, notebook open. Real room." />
        </div>
      </section>

      <section style={{ borderTop: "2px solid var(--ink)" }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))" }}>
          {pillars.map(([n, t, b], i) => (
            <div key={n} style={{ padding: `32px ${i === 3 ? 0 : 28}px 40px ${i === 0 ? 0 : 28}px`, borderRight: i < 3 ? "1px solid var(--rule)" : 0 }}>
              <div className="mono" style={{ color: "var(--accent)", fontSize: 13 }}>{n}</div><h3 className="d3" style={{ margin: "12px 0 10px" }}>{t}</h3><p className="body">{b}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="wrap" style={{ paddingBottom: "clamp(56px,7vw,96px)" }}>
        <div className="split" style={{ alignItems: "center" }}>
          <Photo slot="mentorship/assisting" ratio="4 / 3" alt="A teacher’s hand on a student’s shoulder blade, adjusting a pose, in a timber-floored studio" cap="a hand on a shoulder blade, adjusting a real body." />
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div className="eyebrow">In the room</div>
            <h2 className="d2">Hands-on, with permission.</h2>
            <p className="lede">Assisting is taught as a skill with consent built in: the question, the pause, the hand. Your master watches you do it, and tells you what they saw.</p>
            <div><Link className="link arrow" href="/courses/AS240">Hands-on Assisting (AS240)</Link></div>
          </div>
        </div>
      </section>

      <section style={{ background: "var(--ink)", color: "var(--paper)" }}>
        <div className="wrap sec">
          <div className="eyebrow" style={{ color: "#A69E90", marginBottom: 18 }}>The mentorship arc</div>
          <h2 className="d1" style={{ maxWidth: "18ch", marginBottom: 64 }}>From student in a pod to teacher of one.</h2>
          <div style={{ overflowX: "auto" }} tabIndex={0} aria-label="Mentorship arc (scrolls sideways on small screens)">
            <div style={{ minWidth: 1000, position: "relative" }}>
              <div style={{ position: "absolute", left: 0, right: 0, top: 13, height: 2, background: "#3A362F" }} />
              <div style={{ position: "absolute", left: 0, width: "62%", top: 12, height: 4, background: "#FF7350" }} />
              <ol style={{ listStyle: "none", margin: 0, padding: 0, display: "grid", gridTemplateColumns: "repeat(7, minmax(0, 1fr))", gap: 16, position: "relative" }}>
                {arc.map(([when, title, desc, inv]) => (
                  <li key={title} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    <span style={{ width: 28, height: 28, borderRadius: "50%", background: inv ? "#11100D" : "#FF7350", border: "2px solid #FF7350" }} />
                    <span className="mono" style={{ fontSize: 12, color: "#A69E90", letterSpacing: ".06em" }}>{when}</span>
                    <span className="d4" style={{ color: "#EEE8DC" }}>{title}</span>
                    <span style={{ fontSize: 14, color: "#BDB5A6" }}>{desc}</span>
                  </li>
                ))}
              </ol>
              <div style={{ display: "grid", gridTemplateColumns: "62fr 38fr", marginTop: 40, gap: 16 }}>
                <div className="mono" style={{ borderTop: "1px solid #5A554B", paddingTop: 10, fontSize: 12, color: "#A69E90", letterSpacing: ".1em" }}>MENTORED · FOUNDATIONS → SPECIALIST</div>
                <div className="mono" style={{ borderTop: "1px solid #FF7350", paddingTop: 10, fontSize: 12, color: "#FF7350", letterSpacing: ".1em" }}>APPRENTICESHIP · BY INVITATION</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap sec">
        <div className="split" style={{ alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 22, position: "sticky", top: 24 }}>
            <div className="eyebrow">What feedback looks like</div>
            <h2 className="d2">Written, specific, and kept on your record.</h2>
            <p className="lede">Observation notes go into your portfolio. Over three years they become the most honest account of your teaching you will ever have.</p>
          </div>
          <article style={{ background: "var(--card)", border: "1px solid var(--rule)", boxShadow: "0 30px 60px -40px rgba(22,20,15,.5)" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--rule)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}><AvatarImg slot="faculty/tamsin-achterberg" ini="TA" name="Tamsin Achterberg" /><div><div style={{ fontWeight: 500 }}>Observed class · Term 2</div><div className="small">Tamsin Achterberg → Maya Okafor · Mixed-level vinyāsa, 75 min</div></div></div>
              <span className="tag">Sample</span>
            </div>
            <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
              <div><div className="eyebrow" style={{ marginBottom: 6 }}>What worked</div><p className="body">Your opening five minutes earned the room’s trust: you named the arc of the class and then kept to it. The cue for the back leg in vīrabhadrāsana II was clean and economical.</p></div>
              <div><div className="eyebrow" style={{ marginBottom: 6 }}>What to work on</div><p className="body">At 22:40 you demonstrated for most of a sequence and stopped watching. Three students were compensating in the lower back and nobody saw it. Teach the next one from the floor, not the mat.</p></div>
              <div><div className="eyebrow" style={{ marginBottom: 6 }}>Reading</div><p className="body">Revisit the TP140 notes on attention; bring one question on “seeing” to the pod.</p></div>
              <div style={{ borderTop: "1px solid var(--rule)", paddingTop: 16, display: "flex", gap: 10, flexWrap: "wrap" }}><span className="tag">Presence 4/5</span><span className="tag">Sequencing 4/5</span><span className="tag">Observation 2/5</span><span className="tag">Language 3/5</span></div>
            </div>
          </article>
        </div>
      </section>

      <section style={{ background: "var(--paper-2)", borderTop: "1px solid var(--rule)" }}>
        <div className="wrap sec-sm split" style={{ alignItems: "center" }}>
          <p className="pq" style={{ fontSize: "clamp(28px, 3vw, 42px)" }}>“A teacher is formed in the room, under someone’s eye.”</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-start" }}>
            <p className="body">Request a mentor in your application. Pods are confirmed before the cohort starts.</p>
            <div className="row" style={{ gap: 10 }}><Link className="btn btn-primary btn-lg" href="/apply">Apply for the founding cohort</Link><Link className="btn btn-lg" href="/faculty">See who mentors</Link></div>
          </div>
        </div>
      </section>
    </>
  );
}
