import { Home } from "@/components/home";
import { JsonLd } from "@/components/json-ld";
import { getCatalog } from "@/lib/content";
import { sections } from "@/lib/sections";
import { plainMath } from "@/lib/math-text";
import { HOME_DESCRIPTION, HOME_TITLE, SITE_NAME, pageMetadata, pageUrl } from "@/lib/site";

export const metadata = pageMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: "/",
});

export default function Page() {
  const catalog = getCatalog();
  const course = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: SITE_NAME,
    description: HOME_DESCRIPTION,
    url: pageUrl("/"),
    inLanguage: "en",
    educationalLevel: "Graduate admission test",
    isAccessibleForFree: true,
    about: ["GATE DA 2027", "GATE Data Science and AI", "Artificial Intelligence", "Machine learning"],
    teaches: "GATE 2027 Data Science and Artificial Intelligence syllabus, plus General Aptitude",
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      url: pageUrl("/"),
    },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: "PT18W",
    },
    syllabusSections: sections.map((section) => ({
      "@type": "Syllabus",
      name: plainMath(section.title),
      description: plainMath(section.blurb),
    })),
  };

  return (
    <>
      <JsonLd data={course} />
      <Home catalog={catalog} />
    </>
  );
}
