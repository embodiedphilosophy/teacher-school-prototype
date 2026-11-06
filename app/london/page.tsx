import type { Metadata } from "next";
import { Photo } from "@/components/Photo";
import { SignupForm } from "./SignupForm";
import { courseByCode } from "@/content/courses";
import Link from "next/link";
export const metadata: Metadata = { title: "London campus" };
const phases = [["YEAR 1–2", "Online cohorts", "Everything begins on screen: live seminars, pods on video, observed teaching by recording."], ["YEAR 2", "Pop-up residencies", "Week-long intensives in borrowed rooms, for assisting, practicum and in-person observation."], ["YEAR 3", "A permanent home", "A building with a library, a studio, a seminar room and a kitchen. A door you can knock on."]];
export default function Page() {
  const res = ["AS240", "TP400"].map((c) => courseByCode(c)!);
  return (
    <>
      <section className="wrap" style={{ paddingTop: "clamp(56px, 7vw, 104px)", paddingBottom: "clamp(40px, 5vw, 72px)" }}>
        <div className="eyebrow" style={{ marginBottom: 24, display: "flex", gap: 12, alignItems: "center" }}><span className="live-dot" />London · coming</div>
        <h1 className="d0" style={{ maxWidth: "12ch" }}>A school needs <span className="it">a room.</span></h1>
        <div className="split" style={{ marginTop: 40, alignItems: "end" }}>
          <p className="lede">We start online because that is where our students are. We end in London because that is where a school becomes a place: brick, steel, a long table and a shelf of books that people actually take down.</p>
          <Photo slot="london/warehouse" ratio="4 / 3" priority alt="The interior of a brick warehouse with steel-framed windows and timber floors" cap="a warehouse interior: brick, steel, timber." />
        </div>
      </section>
      <section style={{ borderTop: "2px solid var(--ink)" }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(260px, 100%), 1fr))" }}>
          {phases.map(([w, t, d], i) => <div key={w} style={{ padding: `32px ${i === 2 ? 0 : 28}px 40px ${i === 0 ? 0 : 28}px`, borderRight: i < 2 ? "1px solid var(--rule)" : 0 }}><div className="mono" style={{ color: i === 2 ? "var(--accent)" : "var(--ink-3)", fontSize: 13 }}>{w}</div><h2 className="d3" style={{ margin: "12px 0 10px" }}>{t}</h2><p className="body">{d}</p></div>)}
        </div>
      </section>
      <section className="wrap sec">
        <div className="split" style={{ alignItems: "center" }}>
          <Photo slot="london/rooftops" ratio="3 / 2" alt="Overcast rooftops and chimney stacks across a city, with no landmarks in view" cap="overcast city rooftops. City-generic, no landmarks." />
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div className="eyebrow">The campus we want</div>
            <h2 className="d2">Plain, bright, a bit worn.</h2>
            <p className="lede">A timber-floored studio with enough mats to be mismatched. A seminar room with one very good table. A library where the Sanskrit grammars sit beside the anatomy atlases and nobody minds. A kitchen, because arguments last longer than classes.</p>
          </div>
        </div>
      </section>
      <section style={{ background: "var(--paper-2)", borderTop: "1px solid var(--rule)", borderBottom: "1px solid var(--rule)" }}>
        <div className="wrap sec-sm">
          <div className="sec-head"><div><div className="eyebrow" style={{ marginBottom: 14 }}>Residencies · from Year 2</div><h2 className="d2">The first rooms.</h2></div></div>
          <div className="g-auto">
            {res.map((c) => <Link key={c.code} href={`/courses/${c.code}`} className={`cc d-${c.k}`}><span className="cc-band" /><div className="cc-in"><div className="cc-top"><span className="cc-code">{c.code}</span><span className="tag">Residency</span></div><h3 className="cc-title">{c.title}</h3><p className="small">{c.place}</p><div className="cc-meta"><span><b>{c.units}</b> units</span><span>{c.start}</span></div></div></Link>)}
          </div>
        </div>
      </section>
      <section className="wrap sec">
        <div className="split" style={{ alignItems: "center" }}>
          <div><div className="eyebrow" style={{ marginBottom: 14 }}>Be first to know</div><h2 className="d2">We’ll write once, when there is something to say.</h2></div>
          <SignupForm />
        </div>
      </section>
    </>
  );
}
