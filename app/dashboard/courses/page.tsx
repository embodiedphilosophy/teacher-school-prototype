import { Header, ProgressPanel, TrackPanel } from "../panels";
import { transcript } from "@/content/student";
import { courseByCode } from "@/content/courses";
import { CourseCard } from "@/components/Cards";
export default function Page() {
  const by = (s: string) => transcript.filter((t) => t.status === s).map((t) => courseByCode(t.code)!);
  return (
    <>
      <Header title="My courses" />
      <ProgressPanel />
      {([["In progress", "In progress"], ["Upcoming", "Upcoming"], ["Complete", "Completed"]] as const).map(([s, l]) => (
        <section key={s} style={{ marginBottom: 32 }}><h2 className="d3" style={{ marginBottom: 16 }}>{l}</h2><div className="g-auto">{by(s).map((c) => <CourseCard key={c.code} c={c} />)}</div></section>
      ))}
      <div className="dgrid"><TrackPanel /></div>
    </>
  );
}
