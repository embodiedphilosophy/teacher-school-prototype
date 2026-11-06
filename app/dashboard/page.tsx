import { Header, ProgressPanel, WeekPanel, MentorPanel, PracticePanel, TrackPanel, TranscriptPanel } from "./panels";
export default function Page() {
  return (
    <>
      <Header />
      <ProgressPanel />
      <div className="dgrid"><WeekPanel /><MentorPanel /><PracticePanel /><TrackPanel /></div>
      <TranscriptPanel />
    </>
  );
}
