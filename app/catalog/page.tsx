import { Suspense } from "react";
import type { Metadata } from "next";
import { CatalogClient } from "./CatalogClient";
export const metadata: Metadata = { title: "Course catalog" };
export default function Page() {
  return <Suspense fallback={<div className="wrap sec"><p className="small">Loading the catalog…</p></div>}><CatalogClient /></Suspense>;
}
