import type { Metadata } from "next";
import { Noto_Serif_Display, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import "../styles/school.css";
import "../styles/extras.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { SCHOOL_NAME } from "@/content/config";

const serif = Noto_Serif_Display({ subsets: ["latin", "latin-ext"], weight: ["300", "400", "500"], style: ["normal", "italic"], variable: "--f-serif", display: "swap" });
const sans = IBM_Plex_Sans({ subsets: ["latin", "latin-ext"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--f-sans", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin", "latin-ext"], weight: ["400", "500"], variable: "--f-mono", display: "swap" });

export const metadata: Metadata = {
  title: { default: `${SCHOOL_NAME} — A school for teachers`, template: `%s — ${SCHOOL_NAME}` },
  description: "A university-model school for working yoga teachers: departments, specializations, and a mentor who watches you teach. Prototype.",
  robots: { index: false, follow: false },
};

const themeScript = `try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.getElementById('root').classList.add('theme-dark')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <div id="root" className="s" suppressHydrationWarning>
          <script dangerouslySetInnerHTML={{ __html: themeScript }} />
          <a className="skip" href="#main">Skip to content</a>
          <Nav />
          <main id="main">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
