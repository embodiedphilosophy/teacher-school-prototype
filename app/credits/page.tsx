import type { Metadata } from "next";
import { photoCredits } from "@/content/photo-credits";
export const metadata: Metadata = { title: "Photo credits" };
export default function Page() {
  return (
    <section className="wrap sec">
      <div className="eyebrow" style={{ marginBottom: 24 }}>Credits</div>
      <h1 className="d1">Photography.</h1>
      <p className="lede" style={{ marginTop: 20 }}>Every photograph on this prototype is a real, freely licensed image from Unsplash or Pexels, credited here with its source. Where a picture is not yet in place, a grey placeholder with a description stands in.</p>
      <div style={{ marginTop: 48, overflowX: "auto" }}>
        <table className="tbl" style={{ minWidth: 640 }}>
          <thead><tr><th>File</th><th>Photographer</th><th>Source</th><th>Licence</th></tr></thead>
          <tbody>
            {photoCredits.length === 0 && <tr><td colSpan={4} className="small">No photographs have been added yet. Credits appear here as each image is sourced.</td></tr>}
            {photoCredits.map((p) => <tr key={p.file}><td className="mono small">{p.file}</td><td>{p.photographer}</td><td><a className="link small" href={p.source} rel="noopener noreferrer">{p.source.replace(/^https?:\/\//, "")}</a></td><td className="small">{p.license}</td></tr>)}
          </tbody>
        </table>
      </div>
    </section>
  );
}
