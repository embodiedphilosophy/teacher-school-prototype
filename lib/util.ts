import { courses } from "@/content/courses";
export const countIn = (code: string) => courses.filter((c) => c.dept === code).length;
