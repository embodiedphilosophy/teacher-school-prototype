"use client";
import { useState } from "react";
export function SignupForm() {
  const [done, setDone] = useState(false);
  if (done) return <p role="status" className="d4">Thank you. We’ll write when there is news. <span className="small" style={{ display: "block", marginTop: 6 }}>(Prototype: nothing was sent.)</span></p>;
  return (
    <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} style={{ display: "flex", gap: 8, flexWrap: "wrap", maxWidth: 520 }}>
      <label htmlFor="lm" style={{ position: "absolute", left: -9999 }}>Email address</label>
      <input id="lm" className="input" type="email" required placeholder="you@studio.com" style={{ flex: "1 1 240px" }} />
      <button className="btn btn-primary" type="submit">Tell me first</button>
    </form>
  );
}
