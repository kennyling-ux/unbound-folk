import type { Metadata } from "next";
import { HomePage } from "@/components/marketing-site";

export const metadata: Metadata = {
  title: "Unbound Folk — Creative Studio & Systems Partner",
  description:
    "Unbound Folk is a creative-tech studio in Malaysia. We help growing businesses look sharper and run smarter through brand design, AI-assisted content, custom software, and workflow automation.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return <HomePage />;
}
