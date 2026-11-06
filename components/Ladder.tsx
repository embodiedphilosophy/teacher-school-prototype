"use client";
import { useEffect, useRef, useState } from "react";
export const rungs = [
  { name: "Foundations", meta: "12 units · about 9 months", study: "Core courses across the departments, taught live, alongside your pod from week one. PT101 and TP140 are required; the rest you choose.", assess: "Weekly written responses, one observed class with written feedback, a practice log.", leads: "Continue to the Diploma. Foundations courses also carry CE hours." },
  { name: "Diploma", meta: "+24 units · year two", study: "Distribution across departments at the 200 level and electives of your choosing.", assess: "Observed teaching each term, a teaching portfolio, a reading examination in texts.", leads: "Teach with a recognised diploma; apply to a specialization track." },
  { name: "Specialist", meta: "+12 units · track + capstone", study: "One specialization track at the 300–400 level, a supervised practicum, and a capstone.", assess: "A practicum observed by two faculty and a public capstone (a course, a paper or a programme).", leads: "Lead specialist courses; mentor newer teachers; apply as Fellow." },
  { name: "Fellow", meta: "By invitation", study: "Apprenticeship: assist live sessions, lead breakouts, then co-teach with a master.", assess: "Faculty review of a year of assisting and a co-taught course.", leads: "Join the school as a Teaching Fellow, with your own pod in time." },
];
export function Ladder() {
  const [open, setOpen] = useState(0);
  const [filled, setFilled] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (!("IntersectionObserver" in window)) { setFilled(true); return; }
    const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { setFilled(true); io.disconnect(); } }, { threshold: 0.35 });
    io.observe(el); return () => io.disconnect();
  }, []);
  const cur = rungs[open >= 0 ? open : 0];
  return (
    <div ref={ref}>
      <div className="ladder">
        {rungs.map((r, i) => (
          <button key={r.name} type="button" className={open === i ? "rung open" : "rung"} onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
            <span className="fill" style={{ width: filled ? "100%" : "0%", transitionDelay: `${i * 0.35}s` }} />
            <span className="plus" aria-hidden="true">{open === i ? "−" : "+"}</span>
            <span className="step">STEP 0{i + 1}</span>
            <h3>{r.name}</h3>
            <span className="meta">{r.meta}</span>
          </button>
        ))}
      </div>
      {open >= 0 && (
        <div className="ladder-detail">
          <div><div className="eyebrow" style={{ marginBottom: 10 }}>What you study</div><p className="body">{cur.study}</p></div>
          <div><div className="eyebrow" style={{ marginBottom: 10 }}>How you’re assessed</div><p className="body">{cur.assess}</p></div>
          <div><div className="eyebrow" style={{ marginBottom: 10 }}>It qualifies you to</div><p className="body">{cur.leads}</p></div>
        </div>
      )}
    </div>
  );
}
