import type { Metadata } from "next";
import { DashShell } from "./DashShell";
export const metadata: Metadata = { title: "Student dashboard" };
export default function Layout({ children }: { children: React.ReactNode }) { return <DashShell>{children}</DashShell>; }
