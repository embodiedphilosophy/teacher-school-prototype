// PLACEHOLDER — the full catalog (42 invented courses).
import { pt } from "./pt"; import { as } from "./as"; import { ms } from "./ms"; import { bm } from "./bm";
import { tp } from "./tp"; import { th } from "./th"; import { sk } from "./sk";
export * from "./types";
export const courses = [...pt, ...as, ...ms, ...bm, ...tp, ...th, ...sk];
export const courseByCode = (c: string) => courses.find((x) => x.code === c);
export const coursesByDept = (code: string) => courses.filter((c) => c.dept === code);
export const coursesByFaculty = (slug: string) => courses.filter((c) => c.fac === slug);
