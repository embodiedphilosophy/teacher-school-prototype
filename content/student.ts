// PLACEHOLDER — Maya Okafor and her pod are fictional. Dates and figures are invented.
export const student = {
  name: "Maya Okafor", first: "Maya", ini: "MO", cohort: "Founding cohort", pod: "Pod Ākāśa", track: "Teaching the Texts", trackSlug: "teaching-the-texts",
  mentor: "cormac-itzkowitz", today: "Tuesday 23 February", term: "Week 6 of Term 1", unitsDone: 9, unitsNeeded: 12, ceHours: 42, targetDate: "[June 2027]",
  nextOneToOne: "Thu 25 Feb, 17:00", podNext: "Wed 24 Feb, 18:00",
};
export type Member = { name: string; ini: string; photo: string; city: string };
export const pod: Member[] = [
  { name: "Maya Okafor", ini: "MO", photo: "avatars/maya-okafor", city: "Manchester" },
  { name: "Rohan Teague", ini: "RT", photo: "avatars/rohan-teague", city: "Leeds" },
  { name: "Amara Solheim", ini: "AS", photo: "avatars/amara-solheim", city: "Bergen" },
  { name: "Leila Haddad-Burke", ini: "LH", photo: "avatars/leila-haddad-burke", city: "Montréal" },
  { name: "Dev Pillai", ini: "DP", photo: "avatars/dev-pillai", city: "Singapore" },
];
export type Session = { id: string; day: string; time: string; code: string; k: string; title: string; who: string; live?: boolean };
export const week: Session[] = [
  { id: "s1", day: "MON", time: "19:00", code: "BM130", k: "bm", title: "Seminar 5: Counting and the stop rule", who: "Wren Halloran · 90 min" },
  { id: "s2", day: "TUE · NOW", time: "07:30", code: "BM130", k: "bm", title: "Morning prāṇāyāma lab", who: "Wren Halloran · 60 min", live: true },
  { id: "s3", day: "TUE", time: "18:00", code: "PT101", k: "pt", title: "Seminar 6: Tantra and embodiment", who: "Jacob Kyle · 120 min" },
  { id: "s4", day: "WED", time: "18:00", code: "POD", k: "tp", title: "Pod Ākāśa monthly meeting", who: "Cormac Itzkowitz · 90 min" },
  { id: "s5", day: "THU", time: "07:30", code: "PT101", k: "pt", title: "Practice lab (optional)", who: "Jacob Kyle · 60 min" },
  { id: "s6", day: "THU", time: "17:00", code: "1:1", k: "pt", title: "One-to-one with Cormac", who: "Termly review · 30 min" },
  { id: "s7", day: "FRI", time: "12:00", code: "SK101", k: "sk", title: "Monthly live clinic", who: "Devika Arunagiri · 60 min" },
];
export const assignments = [
  { id: "a1", course: "PT101", text: "Week 6 response: tantra and embodiment", due: "Thu", done: false },
  { id: "a2", course: "BM130", text: "Draft your one-page safety protocol", due: "Sun", done: false },
  { id: "a3", course: "TP140", text: "Read the observation protocol before 2 March", due: "Mon", done: false },
  { id: "a4", course: "SK101", text: "Transliteration quiz 3", due: "Done", done: true },
];
export const chat = [
  { who: "Rohan T.", text: "Has anyone tried the recognition cue from week 7 in a beginners’ class?" },
  { who: "Cormac", text: "Try it first in śavāsana, not in a standing pose. Report back Wednesday." },
  { who: "Amara S.", text: "I tried it. The room went quiet in a good way. Then someone asked what ‘recognition’ meant and I panicked." },
  { who: "Leila H.", text: "Panic is a good sign. Write it down for the pod." },
  { who: "Dev P.", text: "I’ll bring the footnote I keep misreading. Bring your pencils." },
];
export const feedback = [
  { date: "2 Feb", title: "Observed class · Term 1", by: "Cormac Itzkowitz", quote: "You stopped watching at 22:40. Teach the next one from the floor, not the mat.", body: "Strong opening and a clean arc. The risk is demonstrating for too long. Three students were compensating and nobody saw it. Revisit your notes on attention." },
  { date: "19 Jan", title: "One-to-one · first meeting", by: "Cormac Itzkowitz", quote: "Choose one text and read it until it argues back.", body: "We agreed a reading plan for the term: the first pāda of the Sūtra, slowly, with the Bhāṣya beside it." },
  { date: "8 Jan", title: "Placement note", by: "Tamsin Achterberg", quote: "You are placed with a philosopher because you asked for one. Don’t waste him.", body: "Pod Ākāśa has five members and meets on the first Wednesday of each month." },
];
// eight weeks (56 days) of practice; 0 = none, 1-3 = intensity. Oldest first.
export const practice: number[] = [3,2,0,3,3,1,2, 3,3,2,0,3,2,3, 2,3,3,3,0,2,3, 3,2,3,3,3,1,0, 3,3,2,3,3,3,2, 3,0,3,3,2,3,3, 3,3,3,2,3,3,3, 3,3,3,3,3,2];
export const practiceNotes = ["prāṇāyāma 20 min · japa 15 min", "āsana 45 min", "sit 25 min", "prāṇāyāma 15 min · reading 30 min"];
export type TRow = { code: string; k: string; title: string; term: string; units: string; ce: string; status: "Complete" | "In progress" | "Upcoming"; note?: string };
export const transcript: TRow[] = [
  { code: "MS120", k: "ms", title: "Functional Anatomy for Teachers", term: "Autumn 26", units: "3", ce: "30", status: "Complete" },
  { code: "SK101", k: "sk", title: "Sanskrit for Teachers I", term: "Autumn 26", units: "2", ce: "12", status: "Complete" },
  { code: "PT110", k: "pt", title: "Reading Slowly: A Method for Difficult Texts", term: "Winter 26", units: "2", ce: "—", status: "Complete" },
  { code: "MS130", k: "ms", title: "Pain Science for Teachers", term: "Winter 26", units: "2", ce: "—", status: "Complete" },
  { code: "PT101", k: "pt", title: "Foundations of Yoga Philosophy", term: "Spring 27", units: "3", ce: "—", status: "In progress", note: "wk 6" },
  { code: "BM130", k: "bm", title: "Prāṇāyāma: Theory and Practice", term: "Spring 27", units: "2", ce: "—", status: "In progress", note: "wk 5" },
  { code: "TP140", k: "tp", title: "The Observed Class", term: "Spring 27", units: "2", ce: "—", status: "Upcoming", note: "starts 2 Mar" },
];
