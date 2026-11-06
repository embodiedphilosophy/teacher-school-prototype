import Link from "next/link";
export default function NotFound() {
  return (<section className="wrap sec"><div className="eyebrow" style={{ marginBottom: 24 }}>404</div><h1 className="d1">That page is not on the syllabus.</h1><p className="lede" style={{ marginTop: 20 }}>Try the catalog, or start again from the home page.</p><div className="row" style={{ marginTop: 28 }}><Link className="btn btn-primary" href="/catalog">Browse the catalog</Link><Link className="btn" href="/">Home</Link></div></section>);
}
