import type { MetadataRoute } from "next";
import { mainNav, siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return mainNav.map((item) => ({
    url: `${siteUrl}${item.href === "/" ? "" : item.href}`,
    changeFrequency: "monthly",
    priority: item.href === "/" ? 1 : 0.7,
  }));
}
