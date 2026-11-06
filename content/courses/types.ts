// PLACEHOLDER — all course content below is invented for the prototype.
export type CType = "core" | "elective" | "spec" | "prac";
export type CFormat = "live" | "self" | "res";
export type Week = { title: string; reading: string; task: string; label?: string };
export type Course = {
  code: string; title: string; dept: string; k: string; level: 100 | 200 | 300 | 400; type: CType; format: CFormat;
  units: number; weeks: number; hours: number; ce: boolean; open: boolean; fac: string; start: string; startMonth: number;
  desc: string; prereqs: string[]; counts: string[]; syllabus: Week[]; price: string; slot?: [number, number, number, number]; place?: string;
};
export const TYPE_LABEL: Record<CType, string> = { core: "Core", elective: "Elective", spec: "Specialization", prac: "Practicum" };
export const FORMAT_LABEL: Record<CFormat, string> = { live: "Online live", self: "Self-paced", res: "Residency" };
export const FORMAT_SHORT: Record<CFormat, string> = { live: "Live", self: "Self-paced", res: "Residency" };
type W = [string, string, string];
// Compact builder. start: "[12 Jan]" style display, or "Any time" / "Cohort only"; month 1-9 of 2027 for sorting.
export function C(code: string, title: string, level: Course["level"], type: CType, format: CFormat, units: number, ce: boolean, open: boolean, fac: string,
  start: string, startMonth: number, prereqs: string[], counts: string[], desc: string, syl: W[], opt: Partial<Course> = {}): Course {
  const k = { PT: "pt", AS: "as", MS: "ms", BM: "bm", TP: "tp", TH: "th", SK: "sk" }[code.slice(0, 2) as "PT"];
  const weeks = opt.weeks ?? syl.length;
  const hours = format === "res" ? 35 : format === "self" ? units * 10 : units * 12;
  return { code, title, dept: code.slice(0, 2), k, level, type, format, units, weeks, hours, ce, open, fac, start, startMonth, desc, prereqs, counts, price: "[£ price]",
    syllabus: syl.map(([title, reading, task]) => ({ title, reading, task })), ...opt };
}
