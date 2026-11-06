// PLACEHOLDER — tracks, outcomes and capstone formats are invented for the prototype.
export type Track = {
  slug: string; name: string; dept: string; k: string; lead: string; who: string; cap: string; blurb: string;
  forYou: string[]; required: string[]; electives: string[]; capstone: string; capstoneBody: string; outcomes: string[]; reading: string;
};
export const tracks: Track[] = [
  { slug: "teaching-the-texts", name: "Teaching the Texts", dept: "PT", k: "pt", lead: "jacob-kyle", who: "For teachers who want to teach philosophy with the sources open.", cap: "a taught text seminar",
    blurb: "Depth in the primary sources, and the craft of teaching them to people who came for a stretch and stayed for the argument.",
    forYou: ["You already quote the Sūtra and want to read it properly.", "You lead philosophy sessions and suspect your handouts are doing too much of the thinking.", "You are curious about Sanskrit and willing to be corrected."],
    required: ["PT210", "SK210", "PT320"], electives: ["PT250", "PT340", "SK310", "SK330", "AS120"],
    capstone: "A taught text seminar", capstoneBody: "You design and teach a multi-session seminar on a text you have read in depth, to a real group, observed by two faculty. You submit the syllabus, your annotated reading list and a short reflective essay on what the group taught you.",
    outcomes: ["Lead a text-based study group or course with the sources in front of you.", "Read a short passage of the Sūtra in Sanskrit and say what the translation decided for you.", "Design a reading-based module for a teacher training.", "Write about a text without borrowing the author’s vocabulary."],
    reading: "Yogasūtra with the Bhāṣya; Īśvarapratyabhijñākārikā I; a Sanskrit grammar and a very good dictionary." },
  { slug: "therapeutic-practice", name: "Therapeutic Practice", dept: "TH", k: "th", lead: "lucinda-marrow-sato", who: "For teachers working one-to-one and with chronic conditions.", cap: "a supervised case series",
    blurb: "Careful, modest, evidence-aware work with individuals, and the judgement to know where your competence ends.",
    forYou: ["Your students increasingly arrive with a diagnosis and a question.", "You want to work one-to-one and be good at it, not merely brave.", "You are comfortable being supervised, and comfortable saying 'I don't know'."],
    required: ["TH260", "MS130", "TP260", "TH380"], electives: ["TH240", "TH270", "TH340", "MS310", "MS340", "BM340"],
    capstone: "A supervised case series", capstoneBody: "Across eight weeks you work with three volunteer clients under supervision and present a case series: intake, plan, adaptation, outcome, and your honest account of what you would do differently.",
    outcomes: ["Run a thoughtful intake and agree modest, real goals with a student.", "Adapt practice for common conditions and explain the reasoning.", "Work alongside clinicians and write a clear referral letter.", "Keep appropriate records and recognise the limit of your scope."],
    reading: "Scope-of-practice guidance; a pain-science primer; the course reader on adaptation." },
  { slug: "teaching-meditation", name: "Teaching Meditation", dept: "BM", k: "bm", lead: "wren-halloran", who: "For teachers leading prāṇāyāma and dhyāna as a primary practice.", cap: "a six-week course",
    blurb: "A track for teachers who sit, and who want to guide others with standards: honest about the benefits, careful about the risks.",
    forYou: ["You already lead meditation and want to do it with less performance and more craft.", "You want the texts and the physiology, not just the technique.", "You want to know what to do when a sit goes badly."],
    required: ["BM250", "BM330", "BM340"], electives: ["BM140", "BM230", "SK201", "PT250", "TH160"],
    capstone: "A six-week course", capstoneBody: "You design and teach a six-week meditation course to real students, with a safety plan, a written rationale and observation by two faculty. You present the course, the feedback and your revisions.",
    outcomes: ["Guide a ten-to-forty-minute practice in plain language and stop on time.", "Describe a technique honestly, including its limits.", "Recognise a difficult experience and respond calmly.", "Design and teach a short, defensible meditation course."],
    reading: "Classical sources on dhyāna; a respiratory physiology primer; a cushion." },
  { slug: "teacher-educator", name: "Teacher Educator", dept: "TP", k: "tp", lead: "tamsin-achterberg", who: "For senior teachers who train and mentor other teachers.", cap: "a mentored training module",
    blurb: "How to teach teachers: observation, feedback, course design and the ethics of holding power over someone's development.",
    forYou: ["You already train or mentor teachers and have never been taught how.", "You want to give feedback that changes practice, not feelings.", "You are planning a training and would like it to be good."],
    required: ["TP150", "TP240", "TP340"], electives: ["MS220", "AS310", "AS340", "SK330", "TP260"],
    capstone: "A mentored training module", capstoneBody: "You design a module for new teachers, deliver it to a real group and observe other teachers working with it. A faculty mentor supervises throughout. You submit the module, your observation notes and a reflective account.",
    outcomes: ["Design and run an observation and feedback programme.", "Write feedback that a teacher can act on.", "Plan a training module with aims, assessment and a defensible structure.", "Handle a struggling trainee with firmness and care."],
    reading: "The course reader on teacher development; a pencil." },
];
export const trackBySlug = (s: string) => tracks.find((t) => t.slug === s);
