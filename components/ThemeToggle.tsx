"use client";
import { useEffect, useState } from "react";
export function ThemeToggle({ className = "btn btn-sm", dark = false }: { className?: string; dark?: boolean }) {
  const [isDark, setIsDark] = useState(false);
  useEffect(() => { setIsDark(!!document.getElementById("root")?.classList.contains("theme-dark")); }, []);
  const toggle = () => {
    const el = document.getElementById("root"); if (!el) return;
    const next = !el.classList.contains("theme-dark");
    el.classList.toggle("theme-dark", next); setIsDark(next);
    try { localStorage.setItem("theme", next ? "dark" : "light"); } catch {}
  };
  return <button type="button" className={className} onClick={toggle} aria-pressed={isDark} style={dark ? { borderColor: "#5A554B", color: "#E9E3D7" } : undefined}>{isDark ? "Light mode" : "Dark mode"}</button>;
}
