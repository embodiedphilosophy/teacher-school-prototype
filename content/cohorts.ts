// PLACEHOLDER — dates and seat counts are invented. Edit freely.
export type Cohort = { id: string; name: string; starts: string; closes: string; seatsTotal: number; seatsLeft: number; status: "open" | "soon"; note: string };
export const cohorts: Cohort[] = [
  { id: "founding", name: "Founding cohort", starts: "[January 2027]", closes: "[30 November 2026]", seatsTotal: 24, seatsLeft: 9, status: "open", note: "Online, live sessions in UK & US hours" },
  { id: "sept-2027", name: "September 2027 cohort", starts: "[September 2027]", closes: "[Opening soon]", seatsTotal: 24, seatsLeft: 24, status: "soon", note: "Applications open in spring 2027" },
];
export const founding = cohorts[0];
