import Link from "next/link";
import type { Course } from "@/content/courses";
import { FORMAT_SHORT, FORMAT_LABEL, TYPE_LABEL } from "@/content/courses";
import { facultyBySlug } from "@/content/faculty";
import { deptByCode } from "@/content/departments";
import { AvatarImg, PortraitBox } from "./Photo";
import type { Faculty } from "@/content/faculty";
import { coursesByFaculty } from "@/content/courses";

export function CourseCard({ c, showType }: { c: Course; showType?: boolean }) {
  const f = facultyBySlug(c.fac);
  return (
    <Link className={`cc d-${c.k}`} href={`/courses/${c.code}`}>
      <span className="cc-band" />
      <div className="cc-in">
        <div className="cc-top"><span className="cc-code">{c.code}</span><span className="row" style={{ gap: 6 }}>{showType && <span className="tag">{TYPE_LABEL[c.type]}</span>}<span className="tag">{FORMAT_SHORT[c.format]}</span>{c.ce && <span className="ce">CE</span>}</span></div>
        <h3 className="cc-title">{c.title}</h3>
        {f && <div className="cc-fac"><AvatarImg slot={f.photo} ini={f.ini} name={f.name} />{f.name}</div>}
        <div className="cc-meta"><span><b>{c.units}</b> units</span><span><b>{c.weeks}</b> {c.format === "res" && c.weeks === 1 ? "wk" : "wks"}</span><span>{c.start === "Any time" || c.start === "Cohort only" || c.start.includes("London") ? c.start : <>Starts <b>{c.start}</b></>}</span></div>
      </div>
    </Link>
  );
}
export function CourseRow({ c }: { c: Course }) {
  const f = facultyBySlug(c.fac);
  return (
    <Link className={`cl d-${c.k}`} href={`/courses/${c.code}`}>
      <span className="band" />
      <span className="cc-code">{c.code}</span>
      <span className="serif" style={{ fontSize: 19, lineHeight: 1.2 }}>{c.title}</span>
      <span className="hide-sm small">{f?.name}</span>
      <span className="hide-sm mono small">{FORMAT_SHORT[c.format]}</span>
      <span className="hide-sm mono small">{c.units} units</span>
      <span className="hide-sm small">{c.start}</span>
      <span>{c.ce ? <span className="ce">CE</span> : null}</span>
    </Link>
  );
}
export function DeptTile({ code, slug, k, name, scope, count }: { code: string; slug: string; k: string; name: string; scope: string; count: number }) {
  return (
    <Link className={`dt d-${k}`} href={`/departments/${slug}`}>
      <span className="code">{code}</span><h3>{name}</h3><p>{scope}</p><span className="cnt">{count} courses →</span>
    </Link>
  );
}
export function FacultyCard({ f }: { f: Faculty }) {
  const d = deptByCode(f.dept);
  const cs = coursesByFaculty(f.slug).map((c) => c.code).slice(0, 3).join(", ");
  return (
    <Link className={`fc d-${f.k}`} href={`/faculty/${f.slug}`}>
      <PortraitBox slot={f.photo} name={f.name} ini={f.ini} cap="Portrait · mid-teaching">
        <div className="over" style={{ zIndex: 4 }}>Teaches {cs} · {f.podOpen > 0 ? `Pod open: ${f.podOpen} place${f.podOpen > 1 ? "s" : ""}` : "Pod full"}</div>
      </PortraitBox>
      <span className="dept">{d.name}{f.role === "Chair" ? " · Chair" : ""}</span>
      <h4>{f.name}</h4>
      <p>{f.lineage}</p>
    </Link>
  );
}
export { FORMAT_LABEL };
