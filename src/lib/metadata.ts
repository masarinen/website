import type { Metadata } from "next";
import { company, siteUrl } from "@/content/site";

/** Bygger sidmetadata med gemensamma Open Graph-inställningar. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title?: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = title ? `${title} | ${company.name}` : company.name;
  return {
    title: title ?? { absolute: company.name },
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: "sv_SE",
      siteName: company.name,
      title: fullTitle,
      description,
      url: `${siteUrl}${path}`,
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
