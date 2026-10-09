import { ImageResponse } from "next/og";
import { company } from "@/content/site";

export const alt = company.name;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#17222f",
          color: "#f8f5ef",
          padding: "72px 80px",
          fontFamily: "serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 6, color: "#c4a785" }}>
          STOCKHOLMS ETUI- &amp; KOFFERTFABRIK WOLF AB
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 76, lineHeight: 1.05 }}>
          <span>Väskor efter era behov.</span>
          <span style={{ color: "#c4a785" }}>Erfarenhet sedan generationer.</span>
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "rgba(248,245,239,0.7)" }}>
          Specialtillverkade väskor och etuier · Resväskor från välkända märken
        </div>
      </div>
    ),
    size,
  );
}
