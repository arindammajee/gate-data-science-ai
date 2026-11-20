import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, Outfit } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";
import { AppShell } from "@/components/shell";
import { ProgressProvider } from "@/lib/progress";
import { getCatalog } from "@/lib/content";
import { HOME_DESCRIPTION, HOME_TITLE, SITE_NAME, pageUrl, siteOrigin } from "@/lib/site";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces" });
const plex = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex" });

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin()),
  applicationName: SITE_NAME,
  title: {
    default: HOME_TITLE,
    template: "%s | GATE DA 2027",
  },
  description: HOME_DESCRIPTION,
  alternates: { canonical: pageUrl("/") },
  openGraph: {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: pageUrl("/"),
    siteName: SITE_NAME,
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const catalog = getCatalog();
  return (
    <html lang="en" className={`${outfit.variable} ${fraunces.variable} ${plex.variable}`} data-theme="dark" suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var t=localStorage.getItem('pramana-theme');document.documentElement.dataset.theme=t==='light'?'light':'dark';}catch(e){document.documentElement.dataset.theme='dark';}})();",
          }}
        />
        <ProgressProvider>
          <AppShell catalog={catalog}>{children}</AppShell>
        </ProgressProvider>
      </body>
    </html>
  );
}
