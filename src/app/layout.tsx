import type { Metadata, Viewport } from "next";
import "@fontsource/cormorant-garamond/latin-500.css";
import "@fontsource/cormorant-garamond/latin-600.css";
import "@fontsource/cormorant-garamond/latin-500-italic.css";
import "@fontsource-variable/hanken-grotesk/wght.css";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RevealObserver } from "@/components/RevealObserver";
import { company, siteUrl } from "@/content/site";

const description =
  "Familjeföretag med över 180 års erfarenhet av etuier, skrin och väskor. Mjuka eller hårda väskor efter era behov – och resväskor från välkända märken i vår webbutik.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: company.name, template: `%s | ${company.name}` },
  description,
  applicationName: company.name,
  formatDetection: { telephone: false },
  openGraph: {
    type: "website",
    locale: "sv_SE",
    siteName: company.name,
    title: company.name,
    description,
    url: siteUrl,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#f8f5ef",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: company.name,
  url: siteUrl,
  telephone: "+46-8-736 08 55",
  email: company.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.address.street,
    postalCode: company.address.postalCode,
    addressLocality: company.address.city,
    addressCountry: company.address.country,
  },
  sameAs: company.social.map((s) => s.href),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sv" suppressHydrationWarning>
      <head>
        {/* Markerar att JS finns, så att in-animationer bara används när de kan visas. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="flex min-h-dvh flex-col">
        <Header />
        <main id="innehall" className="flex-1 focus:outline-none" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
