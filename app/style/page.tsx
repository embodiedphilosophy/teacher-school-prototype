import Link from "next/link";
import type { Metadata } from "next";
import { CourseCard } from "@/components/Cards";
import { courseByCode } from "@/content/courses";
import { departments } from "@/content/departments";
export const metadata: Metadata = { title: "Style tile", robots: { index: false } };
const LIGHT: Record<string, string> = { pt: "#7A2433", as: "#9A6A0E", ms: "#1D6A66", bm: "#34428A", tp: "#4C6A26", th: "#6C3A75", sk: "#4E5D6C" };
const DARK: Record<string, string> = { pt: "#E0808F", as: "#E2B04F", ms: "#5FC0B8", bm: "#9AA6F0", tp: "#9CC46A", th: "#CC92D6", sk: "#A3B3C2" };
export default function Page() {
  return (
    <div className="wrap sec-sm" style={{ display: "flex", flexDirection: "column", gap: 56 }}>
      <div style={{ borderBottom: "2px solid var(--ink)", paddingBottom: 28 }}><span className="eyebrow">Style tile · internal</span><h1 className="d1" style={{ marginTop: 14 }}>Prospectus, product, manifesto.</h1></div>
      <div className="split">
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <span className="eyebrow">Display · Noto Serif Display 300 / 400, italic for emphasis</span>
          <p className="d0" style={{ fontSize: "clamp(48px, 7vw, 104px)" }}>Sādhana is <span className="it">a discipline.</span></p>
          <p className="d2">Prāṇāyāma, Pratyabhijñā, Śiva-sūtra, dhyāna, ṛṣi, Haṭhapradīpikā</p>
          <p className="small" role="note">IAST check, in all three families: ā ī ū ṛ ṝ ḷ ṃ ḥ ṅ ñ ṭ ḍ ṇ ś ṣ</p>
          <p className="serif" style={{ fontSize: 28 }}>ā ī ū ṛ ṝ ḷ ṃ ḥ ṅ ñ ṭ ḍ ṇ ś ṣ · Ā Ī Ū Ṛ Ś Ṣ Ṭ Ḍ Ṇ</p>
          <p style={{ fontSize: 22 }}>ā ī ū ṛ ṝ ḷ ṃ ḥ ṅ ñ ṭ ḍ ṇ ś ṣ · Ā Ī Ū Ṛ Ś Ṣ Ṭ Ḍ Ṇ</p>
          <p className="mono" style={{ fontSize: 22 }}>ā ī ū ṛ ṝ ḷ ṃ ḥ ṅ ñ ṭ ḍ ṇ ś ṣ · Ā Ī Ū Ṛ Ś Ṣ Ṭ Ḍ Ṇ</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <span className="eyebrow">Interface · IBM Plex Sans 400 / 500</span>
          <p style={{ fontSize: 21, lineHeight: 1.5 }}>Foundations, departments, specializations and a mentor who watches you teach. Built by master teachers for working teachers.</p>
          <p className="body">Body copy at 16 / 1.55. Short declarative sentences. Real terms, used correctly.</p>
          <span className="eyebrow" style={{ marginTop: 12 }}>Data · IBM Plex Mono 400 / 500</span>
          <p className="mono" style={{ fontSize: 20 }}>PT101 · 3 units · 36 contact hrs · CE</p>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "6px 20px", fontSize: 14, color: "var(--ink-2)" }}>
            <span className="mono">D0</span><span>128 / 0.94 · hero declarations</span><span className="mono">D1</span><span>84 / 1.0 · section statements</span><span className="mono">D2</span><span>52 / 1.06 · section heads</span><span className="mono">D3</span><span>32 / 1.15 · panel heads</span>
          </div>
        </div>
      </div>
      <div>
        <span className="eyebrow">Seven departments · light / dark tone</span>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))", gap: 10, marginTop: 16 }}>
          {departments.map((d) => (
            <div key={d.code} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ height: 110, background: LIGHT[d.k], color: "#fff", padding: 10, display: "flex", alignItems: "flex-end" }}><span className="mono" style={{ fontSize: 18, fontWeight: 500 }}>{d.code}</span></div>
              <div style={{ height: 34, background: "#11100D", display: "flex", alignItems: "center", padding: "0 10px" }}><span style={{ width: "100%", height: 6, background: DARK[d.k] }} /></div>
              <b style={{ fontWeight: 500, fontSize: 14 }}>{d.name}</b><span className="mono small" style={{ fontSize: 12 }}>{LIGHT[d.k]}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="split" style={{ alignItems: "start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}><span className="eyebrow">Course card</span><CourseCard c={courseByCode("PT101")!} /></div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span className="eyebrow">Buttons, chips, tags</span>
          <div className="row" style={{ gap: 10 }}><Link className="btn btn-primary" href="/apply">Apply for the founding cohort</Link><Link className="btn" href="/catalog">Browse CE courses</Link><Link className="btn btn-ink" href="/dashboard">Join session</Link></div>
          <div className="row" style={{ gap: 8 }}><span className="chip on">Selected</span><span className="chip">Option</span><span className="tag"><span className="live-dot" />Live</span><span className="ce">CE</span><span className="pre done">PT101</span><span className="pre todo">SK101</span></div>
          <div className="field" style={{ maxWidth: 360 }}><label htmlFor="ex">Field</label><input id="ex" className="input" placeholder="you@studio.com" /><span className="hint">Hint text sits underneath.</span></div>
        </div>
      </div>
    </div>
  );
}
