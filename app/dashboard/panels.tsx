"use client";
import Link from "next/link";
import { useDash } from "./DashShell";
import { student, week, assignments, pod, chat, feedback, practice, practiceNotes, transcript } from "@/content/student";
import { facultyBySlug } from "@/content/faculty";
import { courseByCode } from "@/content/courses";
import { CourseCard } from "@/components/Cards";
import { AvatarImg, PortraitBox } from "@/components/Photo";

export function Header({ title }: { title?: string }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div className="eyebrow">{student.today} · {student.term}</div>
      <h1 className="d2" style={{ marginTop: 8 }}>{title ?? `Good morning, ${student.first}.`}</h1>
    </div>
  );
}
export function ProgressPanel() {
  const { filled } = useDash();
  const L = [["Foundations", "9/12", "75%", true], ["Diploma", "+24", "0%", false], ["Specialist", "+12", "0%", false], ["Fellow", "invite", "0%", false]] as const;
  return (
    <section className="panel" style={{ marginBottom: 20 }}>
      <div className="panel-h"><h3>Progress</h3><span className="mono small">{student.unitsDone} of {student.unitsNeeded} units · Foundations</span></div>
      <div className="mini-ladder">{L.map(([n, note, w, cur]) => <div key={n}><div className="bar"><b style={{ width: filled ? w : "0%" }} /></div><div className={cur ? "lbl cur" : "lbl"}>{n} · {note}</div></div>)}</div>
      <p className="small" style={{ marginTop: 14 }}>{student.unitsNeeded - student.unitsDone} units to your Foundations Certificate. On track for <b style={{ fontWeight: 500, color: "var(--ink)" }}>{student.targetDate}</b>.</p>
    </section>
  );
}
export function WeekPanel({ full }: { full?: boolean }) {
  const { joined, setJoined, done, toggleDone } = useDash();
  const list = full ? week : week.slice(1, 4);
  return (
    <section className="panel">
      <div className="panel-h"><h3>This week</h3><span className="mono small">Times in London (GMT)</span></div>
      {list.map((s) => (
        <div className="session" key={s.id}>
          <div style={{ display: "flex", flexDirection: "column" }}><span className="mono" style={{ fontSize: 12, color: "var(--ink-3)" }}>{s.day}</span><span className="mono" style={{ fontSize: 16, fontWeight: 500 }}>{s.time}</span></div>
          <div style={{ minWidth: 0 }}>
            <div className="row" style={{ gap: 8 }}><span className={`mono d-${s.k}`} style={{ fontSize: 12, color: "var(--d)", fontWeight: 500 }}>{s.code}</span>{s.live && <span className="tag" style={{ color: "var(--live)", borderColor: "var(--live)" }}><span className="live-dot" />Live now</span>}</div>
            <div style={{ fontWeight: 500, marginTop: 2 }}>{s.title}</div><div className="small">{s.who}</div>
          </div>
          <div>{s.live ? <button type="button" className={`btn btn-sm ${joined ? "btn-ink" : "btn-primary"}`} aria-live="polite" onClick={() => setJoined(!joined)}>{joined ? "Joined · opening room…" : "Join session"}</button> : <button type="button" className="btn btn-sm">Add to calendar</button>}</div>
        </div>
      ))}
      <div style={{ borderTop: "1px solid var(--rule)", marginTop: 6, paddingTop: 16 }}>
        <div className="eyebrow" style={{ marginBottom: 10 }}>Due</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 15 }}>
          {assignments.map((a) => (
            <label key={a.id} style={{ display: "flex", gap: 10, alignItems: "center", cursor: "pointer" }}>
              <input type="checkbox" checked={!!done[a.id]} onChange={() => toggleDone(a.id)} style={{ width: 18, height: 18, accentColor: "var(--accent)" }} />
              <span style={{ flex: 1, textDecoration: done[a.id] ? "line-through" : "none", color: done[a.id] ? "var(--ink-3)" : undefined }}>{a.course} · {a.text}</span>
              <span className="mono small" style={{ color: !done[a.id] && a.due === "Thu" ? "var(--accent)" : undefined }}>{done[a.id] ? "Done" : a.due}</span>
            </label>
          ))}
        </div>
      </div>
    </section>
  );
}
export function MentorPanel() {
  const m = facultyBySlug(student.mentor)!;
  return (
    <section className="panel">
      <div className="panel-h"><h3>My mentor</h3><Link className="link small" href="/mentorship">{student.pod}</Link></div>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <span style={{ width: 76, flex: "none" }}><PortraitBox slot={m.photo} name={m.name} ini={m.ini} cap="" /></span>
        <div><div className="d4">{m.name}</div><div className="small">Philosophy &amp; Texts</div><div className="small" style={{ marginTop: 6, color: "var(--ink)" }}>Next 1:1 · <b style={{ fontWeight: 500 }}>{student.nextOneToOne}</b></div></div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 18 }}>
        <div style={{ display: "flex" }}>{pod.map((p, i) => <span key={p.name} style={{ marginLeft: i ? -10 : 0 }}><AvatarImg slot={p.photo} ini={p.ini} name={p.name} /></span>)}</div>
        <span className="small">5 in your pod · meets {student.podNext}</span>
      </div>
      <div style={{ marginTop: 18, border: "1px solid var(--rule)", background: "var(--paper)" }}>
        <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--rule)", display: "flex", justifyContent: "space-between" }}><span className="eyebrow">Pod chat</span><span className="mono small">3 new</span></div>
        <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
          {chat.slice(0, 3).map((c) => <div key={c.text}><b style={{ fontWeight: 500 }}>{c.who}</b> <span className="body">{c.text}</span></div>)}
        </div>
      </div>
      <div style={{ marginTop: 18, paddingTop: 16, borderTop: "1px solid var(--rule)" }}>
        <div className="eyebrow" style={{ marginBottom: 8 }}>Latest feedback · {feedback[0].title.toLowerCase()}, {feedback[0].date}</div>
        <p className="serif it" style={{ fontSize: 18, lineHeight: 1.35 }}>“{feedback[0].quote}”</p>
        <Link className="link small" href="/mentorship" style={{ display: "inline-block", marginTop: 10 }}>Read full notes</Link>
      </div>
    </section>
  );
}
export function PracticePanel({ big }: { big?: boolean }) {
  const { logged, setLogged, streak } = useDash();
  const cells = [...practice.map((v) => (v ? `l${v}` : "")), logged ? "l3" : ""];
  const weeks = Array.from({ length: 8 }, (_, w) => practice.slice(w * 7, w * 7 + 7).filter(Boolean).length);
  return (
    <section className="panel">
      <div className="panel-h"><h3>Practice log</h3><span className="mono small" aria-live="polite">{streak}-day streak</span></div>
      <p className="small" style={{ marginBottom: 14 }}>Daily sādhana is a programme requirement: 5 of 7 days.</p>
      <div className="heat" role="img" aria-label="Practice over the last eight weeks">{cells.map((c, i) => <i key={i} className={c} />)}</div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8 }} className="mono small"><span>8 weeks ago</span><span>Today</span></div>
      <div style={{ display: "flex", gap: 10, alignItems: "center", marginTop: 18, flexWrap: "wrap" }}>
        <button type="button" className={`btn btn-sm ${logged ? "btn-ink" : "btn-primary"}`} onClick={() => setLogged(!logged)} aria-pressed={logged}>{logged ? "Logged today ✓" : "Log today’s practice"}</button>
        <span className="small">This morning: {practiceNotes[0]}</span>
      </div>
      {big && (
        <table className="tbl" style={{ marginTop: 28 }}>
          <thead><tr><th>Week</th><th>Days practised</th><th>Target</th></tr></thead>
          <tbody>{weeks.map((n, i) => <tr key={i}><td className="mono small">{i === 7 ? "This week" : `${7 - i} wks ago`}</td><td className="mono">{n + (i === 7 && logged ? 1 : 0)} of 7</td><td>{n >= 5 ? <span className="tag" style={{ color: "var(--live)", borderColor: "var(--live)" }}>Met</span> : <span className="tag">Below 5</span>}</td></tr>)}</tbody>
        </table>
      )}
    </section>
  );
}
export function TrackPanel() {
  return (
    <section className="panel">
      <div className="panel-h"><h3>For your track</h3><Link className="link small" href={`/tracks/${student.trackSlug}`}>{student.track}</Link></div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {["PT210", "SK210"].map((c) => <CourseCard key={c} c={courseByCode(c)!} />)}
      </div>
    </section>
  );
}
export function TranscriptPanel() {
  return (
    <section className="panel" style={{ marginTop: 20 }}>
      <div className="panel-h"><h3>Transcript</h3><span className="row" style={{ gap: 14 }}><span className="mono small">{student.unitsDone} units · {student.ceHours} CE hrs</span><button type="button" className="btn btn-sm" onClick={() => alert("Prototype: a PDF transcript would download here.")}>Download transcript</button></span></div>
      <div style={{ overflowX: "auto" }}>
        <table className="tbl" style={{ minWidth: 640 }}>
          <thead><tr><th>Code</th><th>Course</th><th>Term</th><th>Units</th><th>CE hrs</th><th>Status</th><th></th></tr></thead>
          <tbody>{transcript.map((r) => (
            <tr key={r.code}>
              <td className={`mono d-${r.k}`} style={{ color: "var(--d)", fontWeight: 500 }}><Link href={`/courses/${r.code}`} style={{ color: "inherit", textDecoration: "none" }}>{r.code}</Link></td>
              <td>{r.title}</td><td className="mono small">{r.term}</td><td className="mono">{r.units}</td><td className="mono">{r.ce}</td>
              <td><span className="tag" style={r.status === "Complete" ? { color: "var(--live)", borderColor: "var(--live)" } : undefined}>{r.status}{r.note ? ` · ${r.note}` : ""}</span></td>
              <td>{r.status === "Complete" && <button type="button" className="link small" style={{ background: "none", borderTop: 0, borderLeft: 0, borderRight: 0, font: "inherit", cursor: "pointer" }} onClick={() => alert("Prototype: a certificate would open here.")}>Certificate</button>}</td>
            </tr>))}</tbody>
        </table>
      </div>
    </section>
  );
}
export function FeedbackList() {
  return (
    <section className="panel" style={{ marginTop: 20 }}>
      <div className="panel-h"><h3>Mentor feedback</h3></div>
      {feedback.map((f) => (
        <div key={f.date + f.title} style={{ padding: "16px 0", borderTop: "1px solid var(--rule)" }}>
          <div className="mono small">{f.date} · {f.by}</div><div style={{ fontWeight: 500, margin: "4px 0" }}>{f.title}</div>
          <p className="serif it" style={{ fontSize: 18 }}>“{f.quote}”</p><p className="body" style={{ marginTop: 6, fontSize: 15 }}>{f.body}</p>
        </div>
      ))}
    </section>
  );
}
export function PodChat() {
  return (
    <section className="panel">
      <div className="panel-h"><h3>Pod chat · {student.pod}</h3></div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 15 }}>{chat.map((c) => <div key={c.text}><b style={{ fontWeight: 500 }}>{c.who}</b> <span className="body">{c.text}</span></div>)}</div>
    </section>
  );
}
