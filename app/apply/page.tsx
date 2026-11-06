import type { Metadata } from "next";
import { ApplyForm } from "./ApplyForm";
export const metadata: Metadata = { title: "Apply" };
export default function Page() { return <ApplyForm />; }
