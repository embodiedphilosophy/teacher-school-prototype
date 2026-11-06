import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import type { Metadata } from "next";
import { Photo } from "@/components/Photo";
import { faculty } from "@/content/faculty";
import { deptByCode } from "@/content/departments";
export const metadata: Metadata = { title: "Manifesto" };

type Block = { t: "p" | "q" | "h"; s: string };
function parse(md: string) {
  const lines = md.replace(/<!--[\s\S]*?-->/g, "").split("\n");
  const blocks: Block[] = []; let buf: string[] = [];
  const flush = () => { if (buf.length) { blocks.push({ t: "p", s: buf.join(" ") }); buf = []; } };
  for (const l of lines) {
    if (l.startsWith("## ")) { flush(); blocks.push({ t: "h", s: l.slice(3) }); }
    else if (l.startsWith("> ")) { flush(); blocks.push({ t: "q", s: l.slice(2) }); }
    else if (!l.trim()) flush(); else buf.push(l);
  }
  flush(); return blocks;
}
export default function Page() {
  const blocks = parse(fs.readFileSync(path.join(process.cwd(), "content", "manifesto.md"), "utf8"));
  const [lede, ...rest] = blocks;
  let firstPara = true;
  return (
    <>
      <section className="wrap" style={{ paddingTop: "clamp(56px, 7vw, 104px)", paddingBottom: "clamp(40px, 5vw, 72px)" }}>
        <div className="eyebrow" style={{ marginBottom: 24 }}>Manifesto · by the founding faculty</div>
        <h1 className="d1" style={{ maxWidth: "18ch" }}>{lede.s.split(". ")[0]}. <span className="it">{lede.s.split(". ").slice(1).join(". ")}</span></h1>
      </section>
      <Photo slot="manifesto/hero" bw ratio="21 / 8" priority sizes="100vw" alt="A crowded lecture hall in black and white, every seat taken, everyone writing" cap="a crowded lecture hall in black and white, or a fist of chalk at a blackboard." style={{ maxHeight: 520 }} />
      <article className="wrap prose" style={{ paddingTop: "clamp(48px, 6vw, 96px)", paddingBottom: "clamp(48px, 6vw, 96px)", maxWidth: 860 }}>
        {rest.map((b, i) => {
          if (b.t === "h") return <h2 key={i} className="d2">{b.s}</h2>;
          if (b.t === "q") return <blockquote key={i} className="pq" style={{ margin: "56px 0", paddingLeft: 24, borderLeft: "4px solid var(--accent)" }}>“{b.s}”</blockquote>;
          const cls = firstPara ? "dropcap" : undefined; firstPara = false;
          return <p key={i} className={cls}>{b.s}</p>;
        })}
      </article>
      <section style={{ background: "var(--paper-2)", borderTop: "1px solid var(--rule)" }}>
        <div className="wrap sec-sm">
          <div className="eyebrow" style={{ marginBottom: 24 }}>Signed by the founding faculty</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(260px, 100%), 1fr))", gap: "28px 32px" }}>
            {faculty.map((f) => (
              <Link key={f.slug} href={`/faculty/${f.slug}`} className={`d-${f.k}`} style={{ textDecoration: "none", color: "var(--ink)", borderTop: "1px solid var(--rule-2)", paddingTop: 12 }}>
                <div className="serif it" style={{ fontSize: 30, fontWeight: 300, lineHeight: 1.1 }}>{f.name}</div>
                <div className="mono small" style={{ marginTop: 6, color: "var(--d)" }}>{deptByCode(f.dept).name}{f.role === "Chair" ? " · Chair" : ""}</div>
              </Link>
            ))}
          </div>
          <p className="small" style={{ marginTop: 28 }}>Prototype: nine of these faculty are fictional.</p>
        </div>
      </section>
      <section style={{ background: "var(--accent)", color: "var(--accent-ink)" }}>
        <div className="wrap sec-sm" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
          <p className="pq" style={{ fontSize: "clamp(28px, 3.4vw, 48px)", maxWidth: "20ch" }}>Bring a notebook. Bring your worst class.</p>
          <Link className="btn btn-lg" href="/apply" style={{ borderColor: "currentColor", color: "inherit" }}>Apply for the founding cohort</Link>
        </div>
      </section>
    </>
  );
}
