"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { SCHOOL_NAME, SCHOOL_TAGLINE, PROTOTYPE_NOTE } from "@/content/config";
import { ThemeToggle } from "./ThemeToggle";

export function Footer() {
  const path = usePathname();
  const [done, setDone] = useState(false);
  if (path.startsWith("/dashboard")) return null;
  const col = { display: "flex", flexDirection: "column", gap: 10 } as const;
  const h = { color: "#A69E90" } as const;
  return (
    <footer className="foot">
      <div className="wrap sec-sm">
        <div className="split" style={{ alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18, maxWidth: 480 }}>
            <div className="d3">Letters from the faculty</div>
            <p className="small">Essays, course openings and cohort dates. Monthly, never more.</p>
            {done ? <p role="status" style={{ color: "#fff" }}>Thank you. (Prototype: nothing was sent.)</p> : (
              <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <label htmlFor="nl" style={{ position: "absolute", left: -9999 }}>Email address</label>
                <input id="nl" className="input" type="email" required placeholder="you@studio.com" style={{ flex: "1 1 220px", background: "transparent", borderColor: "#5A554B", color: "#fff" }} />
                <button className="btn btn-primary" type="submit">Subscribe</button>
              </form>
            )}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 24, fontSize: 15 }}>
            <div style={col}><span className="eyebrow" style={h}>School</span><Link href="/curriculum">Curriculum</Link><Link href="/catalog">Catalog</Link><Link href="/faculty">Faculty</Link><Link href="/mentorship">Mentorship</Link></div>
            <div style={col}><span className="eyebrow" style={h}>Join</span><Link href="/admissions">Admissions</Link><Link href="/catalog?ce=1">CE courses</Link><Link href="/admissions#tuition">Scholarships</Link><Link href="/dashboard">Student log in</Link></div>
            <div style={col}><span className="eyebrow" style={h}>About</span><Link href="/manifesto">Manifesto</Link><Link href="/about">Governance</Link><Link href="/london">London</Link><Link href="/credits">Photo credits</Link></div>
          </div>
        </div>
        <div style={{ marginTop: 56, paddingTop: 24, borderTop: "1px solid #3A362F", display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ display: "flex", gap: 12, alignItems: "center" }}><span style={{ width: 10, height: 10, background: "#FF7350", display: "inline-block" }} /><span><b style={{ fontWeight: 500 }}>London campus — coming.</b> <span className="small">Pop-up residencies from Year 2, a permanent home in Year 3.</span></span></span>
          <span className="small">© 2026 {SCHOOL_NAME}. {SCHOOL_TAGLINE}</span>
        </div>
        <div style={{ marginTop: 20, display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "space-between", alignItems: "center" }}>
          <span className="mono small" style={{ fontSize: 12, letterSpacing: ".04em" }}>{PROTOTYPE_NOTE}</span>
          <ThemeToggle dark />
        </div>
      </div>
    </footer>
  );
}
