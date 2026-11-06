import Link from "next/link";
import type { Metadata } from "next";
import { founding } from "@/content/cohorts";
import { FaqList } from "@/components/Faq";
import { faqs } from "@/content/faqs";
export const metadata: Metadata = { title: "Admissions" };
const steps = [["Application", "training, teaching history, a short statement. 30–40 minutes; saves as you go."], ["Teaching sample", "15 minutes of a real class, unedited, phone footage is fine."], ["Conversation", "30 minutes with a member of faculty."], ["Decision & pod placement", "within two weeks of the conversation."]];
export default function Page() {
  return (
    <>
      <section className="wrap" style={{ paddingTop: "clamp(56px, 7vw, 104px)", paddingBottom: 64 }}>
        <div className="eyebrow" style={{ marginBottom: 24 }}>Admissions · founding cohort</div>
        <h1 className="d0" style={{ maxWidth: "13ch" }}>We admit teachers, <span className="it">not beginners.</span></h1>
        <p className="lede" style={{ marginTop: 32 }}>Prior training and two years in front of a room. That floor is what lets us start where other trainings stop.</p>
        <div className="row" style={{ marginTop: 32, gap: 12 }}><Link className="btn btn-primary btn-lg" href="/apply">Start your application</Link><a className="btn btn-lg" href="#tuition">Tuition &amp; scholarships</a></div>
      </section>

      <section className="wrap" style={{ paddingBottom: "clamp(56px, 7vw, 96px)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", border: "1.5px solid var(--ink)" }}>
          <div style={{ padding: 32, borderRight: "1px solid var(--rule)" }}><div className="mono" style={{ color: "var(--accent)", fontSize: 13 }}>REQUIRED</div><div className="d2" style={{ margin: "10px 0" }}>Prior training</div><p className="body">A 200-hour training or an equivalent apprenticeship. Tell us about it; we read the whole story, not the certificate.</p></div>
          <div style={{ padding: 32, borderRight: "1px solid var(--rule)" }}><div className="mono" style={{ color: "var(--accent)", fontSize: 13 }}>REQUIRED</div><div className="d2" style={{ margin: "10px 0" }}>Two years teaching</div><p className="body">At least two years of regular classes, privates or programmes, in any style or setting.</p></div>
          <div style={{ padding: 32, background: "var(--paper-2)" }}><div className="mono" style={{ color: "var(--ink-3)", fontSize: 13 }}>WHO THRIVES HERE</div><div className="d2" style={{ margin: "10px 0" }}>The restless</div><p className="body">Teachers who have outgrown their training, read beyond it, and want to be watched teaching by someone better than them. Bring a notebook. Bring your worst class.</p></div>
        </div>
      </section>

      <section id="tuition" style={{ background: "var(--paper-2)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
        <div className="wrap sec-sm">
          <div className="split" style={{ alignItems: "start" }}>
            <div>
              <h2 className="d2" style={{ marginBottom: 28 }}>How admission works</h2>
              <ol style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {steps.map(([t, d], i) => (
                  <li key={t} style={{ display: "grid", gridTemplateColumns: "48px 1fr", gap: 16, padding: "18px 0", borderTop: "1px solid var(--rule-2)", borderBottom: i === 3 ? "1px solid var(--rule-2)" : 0 }}>
                    <span className="mono" style={{ color: "var(--accent)" }}>0{i + 1}</span><span><b style={{ fontWeight: 500 }}>{t}</b> <span className="body">· {d}</span></span>
                  </li>
                ))}
              </ol>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <div className="cohort">
                <div><div className="eyebrow">Applications close</div><div className="d4" style={{ marginTop: 8 }}>{founding.closes}</div></div>
                <div><div className="eyebrow">Cohort starts</div><div className="d4" style={{ marginTop: 8 }}>{founding.starts}</div></div>
                <div><div className="eyebrow">Seats remaining</div><div className="d4 num" style={{ marginTop: 8 }}>{founding.seatsLeft} of {founding.seatsTotal}</div>
                  <div className="seats" role="img" aria-label={`${founding.seatsLeft} of ${founding.seatsTotal} seats remaining`}>{Array.from({ length: founding.seatsTotal }, (_, i) => <i key={i} className={i < founding.seatsTotal - founding.seatsLeft ? "" : "free"} />)}</div></div>
              </div>
              <div style={{ background: "var(--card)", border: "1px solid var(--rule)", padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}><h3 className="d3">Tuition</h3><span className="d3">[£ per year]</span></div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 8, fontSize: 14 }}>
                  <div style={{ border: "1px solid var(--rule)", padding: 12 }}><b style={{ fontWeight: 500 }}>In full</b><div className="small">[discount]</div></div>
                  <div style={{ border: "1px solid var(--rule)", padding: 12 }}><b style={{ fontWeight: 500 }}>By term</b><div className="small">3 payments</div></div>
                  <div style={{ border: "1px solid var(--rule)", padding: 12 }}><b style={{ fontWeight: 500 }}>Monthly</b><div className="small">10 payments</div></div>
                </div>
                <p className="small"><b style={{ fontWeight: 500, color: "var(--ink)" }}>Scholarships.</b> Founding scholarships cover [up to 50%] of tuition, awarded on need and promise. Apply in step 5.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="wrap sec">
        <div className="split" style={{ alignItems: "start" }}>
          <div><div className="eyebrow" style={{ marginBottom: 18 }}>Questions</div><h2 className="d2">Before you apply.</h2></div>
          <FaqList items={faqs.filter((f) => f.topic === "admissions")} />
        </div>
      </section>

      <section style={{ background: "var(--ink)", color: "var(--paper)" }}>
        <div className="wrap sec-sm" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <h2 className="d2" style={{ maxWidth: "18ch" }}>It takes about an hour. It saves as you go.</h2>
          <Link className="btn btn-primary btn-lg" href="/apply">Start your application</Link>
        </div>
      </section>
    </>
  );
}
