"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { faculty } from "@/content/faculty";
import { deptByCode } from "@/content/departments";

type Data = { step: number; name: string; email: string; where: string; tz: string; training: number; school: string; years: string; classes: string; settings: string[]; gap: string; mentor: string; statement: string; file: string; scholarship: boolean; scholarshipWhy: string; confirm: boolean };
const EMPTY: Data = { step: 1, name: "", email: "", where: "", tz: "Europe/London", training: 0, school: "", years: "2–4 years", classes: "", settings: [], gap: "", mentor: "No preference", statement: "", file: "", scholarship: false, scholarshipWhy: "", confirm: false };
const LABELS = ["About you & your training", "Teaching experience", "Statement", "Teaching sample", "Review & scholarships"];
const KEY = "apply-v1";
const wc = (s: string) => (s.trim() ? s.trim().split(/\s+/).length : 0);

export function ApplyForm() {
  const [d, setD] = useState<Data>(EMPTY);
  const [ready, setReady] = useState(false);
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const [now, setNow] = useState(Date.now());
  const [done, setDone] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const top = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try { const raw = localStorage.getItem(KEY); if (raw) { const p = JSON.parse(raw); setD({ ...EMPTY, ...p.data }); setSavedAt(p.at); } else { setD((x) => ({ ...x, tz: Intl.DateTimeFormat().resolvedOptions().timeZone || x.tz })); } } catch {}
    setReady(true);
  }, []);
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 5000); return () => clearInterval(t); }, []);
  useEffect(() => {
    if (!ready || done) return;
    const t = setTimeout(() => { try { const at = Date.now(); localStorage.setItem(KEY, JSON.stringify({ data: d, at })); setSavedAt(at); } catch {} }, 400);
    return () => clearTimeout(t);
  }, [d, ready, done]);

  const up = <K extends keyof Data>(k: K, v: Data[K]) => setD((x) => ({ ...x, [k]: v }));
  const go = (n: number) => { setErr(null); up("step", n); top.current?.scrollIntoView({ behavior: "smooth", block: "start" }); };
  const secs = savedAt ? Math.max(0, Math.round((now - savedAt) / 1000)) : null;
  const savedLabel = secs === null ? "not yet" : secs < 5 ? "just now" : secs < 60 ? `${secs} seconds ago` : `${Math.round(secs / 60)} min ago`;

  const next = () => {
    if (d.step === 1 && (!d.name.trim() || !/\S+@\S+\.\S+/.test(d.email))) return setErr("Please add your name and a valid email so we know who you are.");
    if (d.step === 3 && wc(d.statement) < 20) return setErr("A few more sentences, please: at least 20 words. This is the part we read most closely.");
    go(Math.min(5, d.step + 1));
  };
  const submit = () => {
    if (!d.confirm) return setErr("Please tick the box to confirm your application is accurate.");
    try { localStorage.removeItem(KEY); } catch {}
    setDone("APP-2027-" + String(1000 + Math.floor(Math.random() * 8999)));
    window.scrollTo({ top: 0 });
  };
  const nextLabels = ["Continue to teaching experience", "Continue to statement", "Continue to teaching sample", "Continue to review"];

  if (done) {
    return (
      <section className="wrap sec" style={{ maxWidth: 820 }}>
        <div className="eyebrow" style={{ marginBottom: 20, display: "flex", gap: 12, alignItems: "center" }}><span className="live-dot" />Application received</div>
        <h1 className="d1">Thank you{d.name ? `, ${d.name.split(" ")[0]}` : ""}. We’ll be in touch.</h1>
        <p className="lede" style={{ marginTop: 24 }}>Prototype note: nothing was sent anywhere. In the real thing, a member of the faculty would read your application and write to you within two weeks, to arrange a conversation.</p>
        <p className="mono" style={{ marginTop: 24 }}>Reference · {done}</p>
        <div className="row" style={{ marginTop: 36, gap: 12 }}><Link className="btn btn-primary" href="/">Back to the home page</Link><Link className="btn" href="/dashboard">See the student dashboard</Link></div>
      </section>
    );
  }

  const box: React.CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 18 };
  return (
    <section className="wrap sec-sm" ref={top}>
      <div style={{ marginBottom: 32 }}><div className="eyebrow" style={{ marginBottom: 12 }}>Application · founding cohort</div><h1 className="d2">Start your application</h1></div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "clamp(32px, 5vw, 72px)", alignItems: "flex-start" }}>
        <aside style={{ flex: "1 1 260px", maxWidth: 320, display: "flex", flexDirection: "column", gap: 20 }}>
          <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
            {LABELS.map((l, i) => {
              const n = i + 1, cur = n === d.step, past = n < d.step;
              return <li key={l}><button type="button" onClick={() => go(n)} aria-current={cur ? "step" : undefined} style={{ display: "flex", width: "100%", gap: 12, alignItems: "center", height: 44, padding: "0 12px", background: cur ? "var(--ink)" : "transparent", color: cur ? "var(--paper)" : past ? "var(--ink)" : "var(--ink-3)", border: 0, font: "inherit", cursor: "pointer", textAlign: "left" }}><span className="mono" style={{ fontSize: 12, width: 22 }}>{past ? "✓" : "0" + n}</span><span style={{ fontSize: 15 }}>{l}</span></button></li>;
            })}
          </ol>
          <div className="small" role="status" style={{ display: "flex", gap: 8, alignItems: "center" }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--live)" }} />Saved · {savedLabel}</div>
        </aside>

        <form onSubmit={(e) => e.preventDefault()} noValidate style={{ flex: "999 1 520px", minWidth: 0, background: "var(--card)", border: "1.5px solid var(--ink)" }}>
          <div className="prog" role="progressbar" aria-valuemin={0} aria-valuemax={5} aria-valuenow={d.step} aria-label="Application progress" style={{ border: 0, height: 4 }}><b style={{ width: `${(d.step / 5) * 100}%` }} /></div>
          <div style={{ padding: "clamp(24px, 4vw, 48px)", display: "flex", flexDirection: "column", gap: 28 }}>
            <div><div className="mono small">STEP {d.step} OF 5</div><h2 className="d2" style={{ marginTop: 8 }}>{LABELS[d.step - 1]}</h2></div>

            {d.step === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                <div style={box}>
                  <div className="field"><label htmlFor="fn">Full name</label><input id="fn" className="input" value={d.name} onChange={(e) => up("name", e.target.value)} autoComplete="name" /></div>
                  <div className="field"><label htmlFor="em">Email</label><input id="em" className="input" type="email" value={d.email} onChange={(e) => up("email", e.target.value)} autoComplete="email" /></div>
                  <div className="field"><label htmlFor="lc">Where you teach</label><input id="lc" className="input" value={d.where} onChange={(e) => up("where", e.target.value)} placeholder="City, country" /></div>
                  <div className="field"><label htmlFor="tz2">Time zone</label><input id="tz2" className="input" value={d.tz} onChange={(e) => up("tz", e.target.value)} /></div>
                </div>
                <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
                  <legend style={{ fontSize: 14, fontWeight: 500, marginBottom: 10 }}>Your first training</legend>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
                    {[["200-hour", "Registered or not"], ["500-hour", "Or 200 + 300"], ["Apprenticeship", "Lineage or mentor-led"]].map(([t, s], i) => (
                      <label key={t} className={`radio-card${d.training === i ? " on" : ""}`}><input type="radio" name="tr" checked={d.training === i} onChange={() => up("training", i)} /><span><b style={{ fontWeight: 500, display: "block" }}>{t}</b><span className="small">{s}</span></span></label>
                    ))}
                  </div>
                </fieldset>
                <div className="field"><label htmlFor="sc">School and year</label><input id="sc" className="input" value={d.school} onChange={(e) => up("school", e.target.value)} placeholder="Training school, year" /><span className="hint">Add further trainings in your statement.</span></div>
              </div>
            )}

            {d.step === 2 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
                <div style={box}>
                  <div className="field"><label htmlFor="yr">Years teaching</label><select id="yr" className="input" value={d.years} onChange={(e) => up("years", e.target.value)}><option>2–4 years</option><option>5–9 years</option><option>10+ years</option></select><span className="hint">Two years is the minimum.</span></div>
                  <div className="field"><label htmlFor="hw">Classes per week, on average</label><input id="hw" className="input" type="number" min={0} value={d.classes} onChange={(e) => up("classes", e.target.value)} /></div>
                </div>
                <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
                  <legend style={{ fontSize: 14, fontWeight: 500, marginBottom: 10 }}>Where you teach (all that apply)</legend>
                  <div className="row" style={{ gap: 8 }}>
                    {["Studio", "Gym / leisure", "Privates", "Corporate", "Online", "Clinical / therapeutic"].map((l) => { const on = d.settings.includes(l); return <button key={l} type="button" aria-pressed={on} className={`chip${on ? " on" : ""}`} onClick={() => up("settings", on ? d.settings.filter((x) => x !== l) : [...d.settings, l])}>{l}</button>; })}
                  </div>
                </fieldset>
                <div className="field"><label htmlFor="gap">What gap are you trying to close?</label><textarea id="gap" className="input" value={d.gap} onChange={(e) => up("gap", e.target.value)} placeholder="A few sentences. Be specific about a class that went wrong." /><span className="hint">150 words or fewer · {wc(d.gap)} so far</span></div>
                <div className="field"><label htmlFor="men">Preferred mentor (optional)</label><select id="men" className="input" value={d.mentor} onChange={(e) => up("mentor", e.target.value)}><option>No preference</option>{faculty.map((f) => <option key={f.slug} value={f.name}>{f.name} · {deptByCode(f.dept).name}{f.podOpen === 0 ? " (pod full)" : ""}</option>)}</select></div>
              </div>
            )}

            {d.step === 3 && (
              <div className="field">
                <label htmlFor="st">Tell us about a class that went wrong, what you learned from it, and what you hope to be taught here.</label>
                <textarea id="st" className="input" style={{ minHeight: 260 }} value={d.statement} onChange={(e) => up("statement", e.target.value)} placeholder="Write plainly. We would rather read one honest paragraph than three polished ones." />
                <span className="hint">About 300–500 words · {wc(d.statement)} so far</span>
              </div>
            )}

            {d.step === 4 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <p className="body">Send us 15 minutes of a real class, unedited. Phone footage is fine; we are watching you teach, not the camerawork.</p>
                <label className="dropzone" htmlFor="file">
                  <input id="file" type="file" accept="video/*" style={{ position: "absolute", left: -9999 }} onChange={(e) => up("file", e.target.files?.[0]?.name ?? "")} />
                  {d.file ? <><div className="d4">{d.file}</div><div className="small" style={{ marginTop: 6 }}>Selected. Prototype: nothing is uploaded. Choose another file to replace it.</div></> : <><div className="d4">Choose a video file</div><div className="small" style={{ marginTop: 6 }}>MP4 or MOV, up to 2 GB · or paste a private link in your statement</div></>}
                </label>
                {d.file && <button type="button" className="btn btn-sm" style={{ alignSelf: "flex-start" }} onClick={() => up("file", "")}>Remove file</button>}
              </div>
            )}

            {d.step === 5 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                <dl style={{ margin: 0, display: "grid", gridTemplateColumns: "minmax(120px, 200px) 1fr", gap: "0 20px" }}>
                  {[["Name", d.name, 1], ["Email", d.email, 1], ["Where you teach", d.where, 1], ["First training", ["200-hour", "500-hour", "Apprenticeship"][d.training] + (d.school ? ` · ${d.school}` : ""), 1], ["Years teaching", d.years + (d.classes ? ` · ${d.classes} classes a week` : ""), 2], ["Settings", d.settings.join(", "), 2], ["Mentor", d.mentor, 2], ["Statement", d.statement ? `${wc(d.statement)} words` : "", 3], ["Teaching sample", d.file, 4]].map(([k, v, s]) => (
                    <div key={k as string} style={{ display: "contents" }}><dt className="small" style={{ padding: "12px 0", borderTop: "1px solid var(--rule)" }}>{k}</dt><dd style={{ margin: 0, padding: "12px 0", borderTop: "1px solid var(--rule)", display: "flex", justifyContent: "space-between", gap: 12 }}><span>{v || <span className="small">Not provided</span>}</span><button type="button" className="link" style={{ background: "none", borderTop: 0, borderLeft: 0, borderRight: 0, font: "inherit", fontSize: 13, cursor: "pointer" }} onClick={() => go(s as number)}>Edit</button></dd></div>
                  ))}
                </dl>
                <div style={{ borderTop: "1px solid var(--rule)", paddingTop: 20, display: "flex", flexDirection: "column", gap: 14 }}>
                  <h3 className="d3">Scholarships</h3>
                  <label className="check"><input type="checkbox" checked={d.scholarship} onChange={(e) => up("scholarship", e.target.checked)} /> I’d like to be considered for a founding scholarship</label>
                  {d.scholarship && <div className="field"><label htmlFor="sw">Tell us briefly about your circumstances (read separately from your admission decision)</label><textarea id="sw" className="input" value={d.scholarshipWhy} onChange={(e) => up("scholarshipWhy", e.target.value)} /></div>}
                  <label className="check"><input type="checkbox" checked={d.confirm} onChange={(e) => up("confirm", e.target.checked)} /> I confirm that this application is accurate.</label>
                </div>
              </div>
            )}

            {err && <p role="alert" style={{ color: "var(--accent)", fontWeight: 500 }}>{err}</p>}
            <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap", borderTop: "1px solid var(--rule)", paddingTop: 24 }}>
              <button type="button" className="btn" onClick={() => go(Math.max(1, d.step - 1))} disabled={d.step === 1} style={{ opacity: d.step === 1 ? 0.4 : 1 }}>Back</button>
              <div className="row" style={{ gap: 10 }}>
                <Link className="btn" href="/" style={{ borderColor: "transparent" }}>Save and finish later</Link>
                {d.step < 5 ? <button type="button" className="btn btn-primary" onClick={next}>{nextLabels[d.step - 1]}</button> : <button type="button" className="btn btn-primary" onClick={submit}>Submit application</button>}
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
