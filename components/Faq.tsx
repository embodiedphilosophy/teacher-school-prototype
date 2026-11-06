"use client";
import { useState } from "react";
export function FaqList({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);
  return (
    <div style={{ borderBottom: "1px solid var(--rule)" }}>
      {items.map((f, i) => (
        <div className="acc" key={f.q}>
          <button className="acc-h" type="button" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}><span className="t">{f.q}</span><span className="pm" aria-hidden="true">{open === i ? "−" : "+"}</span></button>
          {open === i && <p className="body" style={{ padding: "0 48px 24px 0" }}>{f.a}</p>}
        </div>
      ))}
    </div>
  );
}
