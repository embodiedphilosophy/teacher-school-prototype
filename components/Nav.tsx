"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SCHOOL_NAME } from "@/content/config";

const links = [["/curriculum", "Curriculum"], ["/faculty", "Faculty"], ["/mentorship", "Mentorship"], ["/admissions", "Admissions"]] as const;

export function Wordmark() {
  return (
    <Link className="wordmark" href="/"><span className="sq"><i></i></span><b>{SCHOOL_NAME}</b><span>Placeholder</span></Link>
  );
}

export function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  useEffect(() => { setOpen(false); }, [path]);
  useEffect(() => { document.body.style.overflow = open ? "hidden" : ""; }, [open]);
  if (path.startsWith("/dashboard")) return null;
  return (
    <header className="nav">
      <div className="wrap nav-in">
        <Wordmark />
        <nav className="nav-links" aria-label="Main">
          {links.map(([h, l]) => <Link key={h} href={h} className={path.startsWith(h) ? "on" : ""} aria-current={path.startsWith(h) ? "page" : undefined}>{l}</Link>)}
        </nav>
        <div className="nav-right">
          <Link className="nav-login small" href="/dashboard" style={{ textDecoration: "none", color: "var(--ink-2)" }}>Student log in</Link>
          <Link className="btn btn-primary" href="/apply">Apply</Link>
          <button className="menu-btn" type="button" aria-label="Open menu" aria-expanded={open} onClick={() => setOpen(true)}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M3 6h14M3 10h14M3 14h14" /></svg>
          </button>
        </div>
      </div>
      {open && (
        <div className="mm" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="mm-top">
            <Wordmark />
            <button className="menu-btn" style={{ display: "inline-flex" }} type="button" aria-label="Close menu" onClick={() => setOpen(false)}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M4 4l12 12M16 4L4 16" /></svg>
            </button>
          </div>
          {links.map(([h, l]) => <Link key={h} href={h} className="big">{l}</Link>)}
          <Link href="/catalog" className="big">Catalog</Link>
          <Link href="/apply" className="btn btn-primary btn-lg" style={{ marginTop: 24 }}>Apply</Link>
          <Link href="/dashboard" className="sm">Student log in</Link>
          <Link href="/manifesto" className="sm">Manifesto</Link>
        </div>
      )}
    </header>
  );
}
