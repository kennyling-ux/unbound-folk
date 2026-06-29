import type { Metadata } from "next";
import { CreativePage } from "@/components/marketing-site";

export const metadata: Metadata = {
  title: "Creative — Unbound Folk",
  description:
    "Brand visuals, motion graphics, 3D product content, and AI-assisted creative for businesses that want to show up looking like they mean it. Based in Malaysia.",
  alternates: { canonical: "/creative" },
};

export default function Page() {
  return <CreativePage />;
}
