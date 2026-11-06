"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AvatarImg } from "@/components/Photo";
import { student, assignments, practice } from "@/content/student";
import { SCHOOL_NAME } from "@/content/config";

type St = { joined: boolean; setJoined: (b: boolean) => void; logged: boolean; setLogged: (b: boolean) => void; streak: number; done: Record<string, boolean>; toggleDone: (id: string) => void; filled: boolean };
const Ctx = createContext<St>(null as unknown as St);
export const useDash = () => useContext(Ctx);

const ico = (d: string) => <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d={d} /></svg>;
const items = [
  ["/dashboard", "Today", "M3 9.5 10 4l7 5.5V16H3z", true],
  ["/dashboard/courses", "My courses", "M4 4h5v12H4zM11 4h5v12h-5z", false],
  ["/dashboard/schedule", "Schedule", "M3 4.5h14v12H3zM3 8.5h14M7 2.5v4M13 2.5v4", false],
  ["/dashboard/practice", "Practice log", "M4 16V9M8 16V5M12 16v-6M16 16V7", false],
  ["/dashboard/transcript", "Transcript", "M5 3h7l3 3v11H5zM8 9h5M8 12h5", false],
] as const;

export function DashShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [joined, setJoined] = useState(false);
  const [logged, setLogged] = useState(false);
  const [filled, setFilled] = useState(false);
  const [done, setDone] = useState<Record<string, boolean>>(Object.fromEntries(assignments.map((a) => [a.id, a.done])));
  useEffect(() => { const t = setTimeout(() => setFilled(true), 300); return () => clearTimeout(t); }, []);
  const base = (() => { let s = 0; for (let i = practice.length - 1; i >= 0 && practice[i]; i--) s++; return s; })();
  const streak = base + (logged ? 1 : 0);
  return (
    <Ctx.Provider value={{ joined, setJoined, logged, setLogged, streak, done, toggleDone: (id) => setDone((d) => ({ ...d, [id]: !d[id] })), filled }}>
      <div className="app">
        <nav className="side" aria-label="Dashboard">
          <Link className="wordmark hide-sm" href="/" style={{ padding: "6px 12px 22px", height: "auto", background: "none" }}><span className="sq"><i></i></span><b style={{ fontSize: 18 }}>{SCHOOL_NAME}</b></Link>
          {items.map(([h, l, d, exact]) => { const on = exact ? path === h : path.startsWith(h); return <Link key={h} href={h} className={on ? "on" : ""} aria-current={on ? "page" : undefined}>{ico(d)}{l}</Link>; })}
          <Link href="/mentorship">{ico("M10 4a3 3 0 100 6 3 3 0 000-6zM4 17c1-3 3.5-4.5 6-4.5s5 1.5 6 4.5")}Mentor &amp; pod</Link>
          <Link href="/catalog">{ico("M9 4a5 5 0 100 10A5 5 0 009 4zM13 13l4 4")}Catalog</Link>
          <div className="hide-sm" style={{ marginTop: "auto", padding: "16px 12px 0", borderTop: "1px solid var(--rule)" }}>
            <div className="small">{student.cohort} · {student.pod}</div>
            <div className="small" style={{ marginTop: 2 }}>Track: {student.track}</div>
            <div className="small" style={{ marginTop: 10 }}><Link href="/" style={{ color: "var(--ink-2)" }}>Log out (prototype)</Link></div>
          </div>
        </nav>
        <div className="main">
          <div className="row" style={{ justifyContent: "flex-end", gap: 10, marginBottom: 8 }}>
            <ThemeToggle />
            <AvatarImg slot="avatars/maya-okafor" ini="MO" name="Maya Okafor" />
          </div>
          {children}
        </div>
      </div>
    </Ctx.Provider>
  );
}
